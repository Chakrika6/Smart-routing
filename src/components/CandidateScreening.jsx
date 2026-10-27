import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert, Clock, ArrowRight, RefreshCw, Award, Send,
  Bell, Brain, Zap, ChevronRight, BookOpen, BarChart3,
  TrendingUp, Search, CheckCircle2, Settings2, Hourglass
} from 'lucide-react';
import { CS_QUESTION_BANK, INITIAL_JOBS } from '../mockData';

// ─── Smart Routing Engine ─────────────────────────────────────────
function getNextQuestion(difficulty, usedIds) {
  const pool = CS_QUESTION_BANK[difficulty] || CS_QUESTION_BANK.Medium;
  const available = pool.filter(q => !usedIds.includes(q.id));
  if (available.length === 0) {
    const allAvailable = [
      ...CS_QUESTION_BANK.Easy,
      ...CS_QUESTION_BANK.Medium,
      ...CS_QUESTION_BANK.Hard
    ].filter(q => !usedIds.includes(q.id));
    if (allAvailable.length === 0) return null;
    return allAvailable[Math.floor(Math.random() * allAvailable.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

const DIFF_COLORS = {
  Easy: { text: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.35)' },
  Medium: { text: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.35)' },
  Hard: { text: '#f87171', bg: 'rgba(248, 113, 113, 0.12)', border: 'rgba(248, 113, 113, 0.35)' },
};

// ─── Smart Routing Indicator ──────────────────────────────────────
function SmartRoutingIndicator({ currentDifficulty, isAdaptive }) {
  const path = ['Easy', 'Medium', 'Hard'];
  if (!isAdaptive) return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '5px 12px', borderRadius: '20px',
      background: DIFF_COLORS[currentDifficulty]?.bg,
      border: `1px solid ${DIFF_COLORS[currentDifficulty]?.border}`,
    }}>
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: DIFF_COLORS[currentDifficulty]?.text }} />
      <span style={{ color: DIFF_COLORS[currentDifficulty]?.text, fontSize: '0.8rem', fontWeight: 700 }}>
        {currentDifficulty} Level
      </span>
    </div>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <Zap size={13} color="#818cf8" />
      <span style={{ fontSize: '0.74rem', color: '#818cf8', fontWeight: 700, marginRight: '2px' }}>Smart Route:</span>
      {path.map((d, i) => (
        <React.Fragment key={d}>
          <div style={{
            padding: '3px 10px', borderRadius: '20px', fontSize: '0.74rem', fontWeight: 700,
            background: d === currentDifficulty ? DIFF_COLORS[d].bg : 'rgba(255,255,255,0.04)',
            border: d === currentDifficulty ? `1px solid ${DIFF_COLORS[d].border}` : '1px solid transparent',
            color: d === currentDifficulty ? DIFF_COLORS[d].text : 'var(--text-dim)',
            transition: 'all 0.3s ease'
          }}>{d}</div>
          {i < 2 && <ChevronRight size={11} color="var(--text-dim)" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function CandidateScreening({ onApplicationSubmitted, candidates }) {
  // steps: 'register' | 'check_status' | 'waiting' | 'notification' | 'testing' | 'submitted' | 'knockout'
  const [step, setStep] = useState('register');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState('');
  const [registeredCandidate, setRegisteredCandidate] = useState(null);

  const [candidateInfo, setCandidateInfo] = useState({
    name: '',
    email: '',
    role: 'Senior Full-Stack Engineer',
    requestedDate: '2026-10-08',
    requestedTime: '11:30 AM',
    notes: ''
  });

  // Test state
  const [currentQ, setCurrentQ] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentDifficulty, setCurrentDifficulty] = useState('Medium');
  const [timerSeconds, setTimerSeconds] = useState(40);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [difficultyRoute, setDifficultyRoute] = useState([]);
  const [subjectStats, setSubjectStats] = useState({});
  const [finalResult, setFinalResult] = useState(null);
  const [activeConfig, setActiveConfig] = useState(null);

  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (step !== 'testing') return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (timerSeconds <= 0) { handleNextQuestion(null); return; }
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step, currentQ]);

  useEffect(() => {
    if (timerSeconds === 0 && step === 'testing') handleNextQuestion(null);
  }, [timerSeconds]);

  // ── Registration ──────────────────────────────────────────────
  const handleRegister = (e) => {
    e.preventDefault();
    if (!candidateInfo.name || !candidateInfo.email) return;
    // Submit registration (no test yet)
    if (typeof onApplicationSubmitted === 'function') {
      onApplicationSubmitted({
        id: `cand-${Date.now().toString().slice(-4)}`,
        name: candidateInfo.name,
        email: candidateInfo.email,
        role: candidateInfo.role,
        score: 0,
        technicalScore: 0,
        problemSolvingScore: 0,
        status: 'Registered (Awaiting Test Config)',
        appliedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        requestedSlot: `${candidateInfo.requestedDate} at ${candidateInfo.requestedTime}`,
        summary: 'Registered. Awaiting faculty test configuration.',
        aiNotes: 'Test not yet configured by faculty.',
        shortlistedByDirector: false,
        testCompleted: false,
        testConfig: null
      });
    }
    setRegisteredEmail(candidateInfo.email);
    setStep('check_status');
  };

  // ── Check Status by email ─────────────────────────────────────
  const handleCheckStatus = (e) => {
    e.preventDefault();
    const email = checkEmail.trim().toLowerCase();
    const found = (candidates || []).find(c => c.email.toLowerCase() === email);
    if (!found) { alert('No registration found with this email. Please register first.'); return; }
    setRegisteredCandidate(found);
    if (found.testConfig) {
      setActiveConfig(found.testConfig);
      setStep('notification');
    } else {
      setStep('waiting');
    }
  };

  // ── Start Test ────────────────────────────────────────────────
  const startTest = () => {
    const config = activeConfig;
    const startDiff = config.level === 'Mixed' ? 'Medium' : config.level;
    const firstQ = getNextQuestion(startDiff, []);
    setCurrentQ(firstQ);
    setUsedIds(firstQ ? [firstQ.id] : []);
    setQuestionIndex(0);
    setCorrectCount(0);
    setTotalScore(0);
    setMaxScore(0);
    setCurrentDifficulty(startDiff);
    setDifficultyRoute([startDiff]);
    setSubjectStats({});
    setSelectedOption(null);
    setTimerSeconds(config.timePerQuestion);
    setStep('testing');
  };

  // ── Next Question ─────────────────────────────────────────────
  const handleNextQuestion = (opt) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const config = activeConfig;
    const isCorrect = opt ? !!opt.isCorrect : false;
    const addedScore = opt ? (opt.scoreAdd || 0) : 0;
    const newTotal = totalScore + addedScore;
    const newMaxScore = maxScore + 30;

    setTotalScore(newTotal);
    setMaxScore(newMaxScore);
    if (isCorrect) setCorrectCount(prev => prev + 1);

    if (currentQ) {
      setSubjectStats(prev => ({
        ...prev,
        [currentQ.subject]: {
          total: (prev[currentQ.subject]?.total || 0) + 1,
          correct: (prev[currentQ.subject]?.correct || 0) + (isCorrect ? 1 : 0)
        }
      }));
    }

    const isAdaptive = config.level === 'Mixed';
    let nextDiff = currentDifficulty;
    if (isAdaptive) {
      if (isCorrect) {
        if (currentDifficulty === 'Easy') nextDiff = 'Medium';
        else if (currentDifficulty === 'Medium') nextDiff = 'Hard';
      } else {
        if (currentDifficulty === 'Hard') nextDiff = 'Medium';
        else if (currentDifficulty === 'Medium') nextDiff = 'Easy';
      }
    }

    const nextIndex = questionIndex + 1;

    if (nextIndex >= config.questionCount) {
      const finalPct = Math.min(Math.round((newTotal / Math.max(newMaxScore, 1)) * 100), 100);
      const result = {
        id: registeredCandidate?.id || `cand-${Date.now().toString().slice(-4)}`,
        name: registeredCandidate?.name || candidateInfo.name,
        email: registeredCandidate?.email || candidateInfo.email,
        role: registeredCandidate?.role || candidateInfo.role,
        score: finalPct,
        technicalScore: Math.min(finalPct + Math.floor(Math.random() * 8) - 2, 100),
        problemSolvingScore: Math.min(finalPct + Math.floor(Math.random() * 8) - 4, 100),
        status: finalPct >= 75 ? 'Applied (Awaiting Shortlist)' : finalPct >= 55 ? 'Needs Manual Review' : 'Knockout / Filtered Out',
        appliedDate: new Date().toISOString().replace('T', ' ').slice(0, 16),
        requestedSlot: registeredCandidate?.requestedSlot || `${candidateInfo.requestedDate} at ${candidateInfo.requestedTime}`,
        summary: `${config.questionCount}-Q CS Fundamentals test. ${correctCount + (isCorrect ? 1 : 0)} correct. Smart routing peak: ${nextDiff}.`,
        aiNotes: `Routing path: ${[...difficultyRoute, nextDiff].join(' → ')}`,
        shortlistedByDirector: false,
        testCompleted: true,
        testConfig: config
      };
      setFinalResult(result);
      if (typeof onApplicationSubmitted === 'function') onApplicationSubmitted(result);
      setStep('submitted');
      return;
    }

    const nextQ = getNextQuestion(nextDiff, [...usedIds]);
    setCurrentDifficulty(nextDiff);
    setDifficultyRoute(prev => [...prev, nextDiff]);
    setCurrentQ(nextQ);
    if (nextQ) setUsedIds(prev => [...prev, nextQ.id]);
    setQuestionIndex(nextIndex);
    setSelectedOption(null);
    setTimerSeconds(config.timePerQuestion);
  };

  const timerPct = activeConfig ? (timerSeconds / activeConfig.timePerQuestion) * 100 : 100;
  const timerColor = timerSeconds <= 10 ? '#f87171' : timerSeconds <= 20 ? '#fbbf24' : '#34d399';
  const isAdaptive = activeConfig?.level === 'Mixed';
  const diffColors = DIFF_COLORS[currentDifficulty] || DIFF_COLORS.Medium;

  return (
    <div style={{ maxWidth: '820px', margin: '24px auto' }}>

      {/* ── Register ── */}
      {step === 'register' && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px auto', color: '#fff',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
            }}>
              <Send size={30} />
            </div>
            <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Step 1 of 2 · Student Registration</span>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>Register for CS Assessment</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '540px', margin: '0 auto' }}>
              Submit your details. <strong>Prof. Ananya Sharma (Mam)</strong> will configure your personalized test, then you'll be notified to take it.
            </p>
          </div>

          {/* Flow Steps */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '28px', justifyContent: 'center' }}>
            {[
              { step: '1', label: 'Register', active: true },
              { step: '2', label: 'Mam Configures', active: false },
              { step: '3', label: 'Take Test', active: false },
              { step: '4', label: 'Get Result', active: false },
            ].map((s, i) => (
              <div key={s.step} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 4px auto',
                    background: s.active ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', fontWeight: 800, color: s.active ? '#fff' : 'var(--text-dim)'
                  }}>{s.step}</div>
                  <div style={{ fontSize: '0.7rem', color: s.active ? '#818cf8' : 'var(--text-dim)', whiteSpace: 'nowrap' }}>{s.label}</div>
                </div>
                {i < 3 && <div style={{ width: '40px', height: '2px', background: 'rgba(255,255,255,0.1)', margin: '0 4px 20px 4px' }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                <input type="text" required className="form-input" placeholder="e.g. Maya Lin"
                  value={candidateInfo.name} onChange={e => setCandidateInfo({ ...candidateInfo, name: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                <input type="email" required className="form-input" placeholder="maya@example.com"
                  value={candidateInfo.email} onChange={e => setCandidateInfo({ ...candidateInfo, email: e.target.value })} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Target Position *</label>
              <select className="form-select" value={candidateInfo.role}
                onChange={e => setCandidateInfo({ ...candidateInfo, role: e.target.value })}>
                {INITIAL_JOBS.map(j => <option key={j.id} value={j.title}>{j.title} ({j.client})</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Preferred Interview Date</label>
                <input type="date" className="form-input"
                  value={candidateInfo.requestedDate} onChange={e => setCandidateInfo({ ...candidateInfo, requestedDate: e.target.value })} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Preferred Time</label>
                <select className="form-select" value={candidateInfo.requestedTime}
                  onChange={e => setCandidateInfo({ ...candidateInfo, requestedTime: e.target.value })}>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Resume Link / Bio (Optional)</label>
              <textarea rows="2" className="form-textarea" placeholder="Paste LinkedIn URL or brief experience..."
                value={candidateInfo.notes} onChange={e => setCandidateInfo({ ...candidateInfo, notes: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '14px', marginTop: '4px' }}>
              Submit Registration <ArrowRight size={18} />
            </button>
          </form>

          {/* Already registered? */}
          <div style={{
            marginTop: '20px', padding: '14px 18px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 10px 0' }}>
              Already registered? Check if Mam has configured your test:
            </p>
            <button className="btn btn-secondary btn-sm" onClick={() => setStep('check_status')}>
              <Search size={14} /> Check My Test Status
            </button>
          </div>
        </div>
      )}

      {/* ── Check Status ── */}
      {step === 'check_status' && (
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px auto', color: '#fff',
            boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
          }}>
            <CheckCircle2 size={30} />
          </div>

          {registeredEmail && (
            <div style={{ marginBottom: '20px' }}>
              <span className="badge badge-shortlist">Registration Confirmed!</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '10px' }}>
                Your registration is submitted. Prof. Ananya Sharma (Mam) will configure your test shortly.
              </p>
            </div>
          )}

          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '8px' }}>Check Test Status</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px' }}>
            Enter your registered email to see if Mam has configured your test
          </p>

          <form onSubmit={handleCheckStatus} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '14px' }}>
              <input type="email" required className="form-input"
                placeholder="Enter your registered email"
                value={checkEmail}
                onChange={e => setCheckEmail(e.target.value)}
                style={{ textAlign: 'center' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px' }}>
              <Search size={16} /> Check Status
            </button>
          </form>

          <button className="btn btn-secondary btn-sm" style={{ marginTop: '16px' }} onClick={() => setStep('register')}>
            ← New Registration
          </button>
        </div>
      )}

      {/* ── Waiting for Mam to configure ── */}
      {step === 'waiting' && (
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '24px',
            background: 'rgba(251, 191, 36, 0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px auto', color: '#fbbf24',
            border: '1px solid rgba(251, 191, 36, 0.3)'
          }}>
            <Hourglass size={36} />
          </div>

          <span className="badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.3)', marginBottom: '14px' }}>
            Awaiting Faculty Configuration
          </span>

          <h2 style={{ fontSize: '1.7rem', color: '#fff', marginBottom: '12px' }}>
            Hang tight, {registeredCandidate?.name?.split(' ')[0]}!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '500px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
            Your registration has been received. <strong style={{ color: '#fff' }}>Prof. Ananya Sharma (Mam)</strong> is yet to configure your personalized test. Please check back shortly.
          </p>

          <div style={{
            display: 'flex', gap: '12px', justifyContent: 'center',
            padding: '16px 24px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            maxWidth: '420px', margin: '0 auto 28px auto', textAlign: 'left'
          }}>
            {[
              { icon: <Settings2 size={16} color="#fbbf24" />, label: 'Test Config', value: 'Not yet set by Mam' },
              { icon: <CheckCircle2 size={16} color="#34d399" />, label: 'Your Registration', value: 'Confirmed ✓' },
            ].map(item => (
              <div key={item.label} style={{ flex: 1, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                {item.icon}
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{item.label}</div>
                  <div style={{ fontSize: '0.82rem', color: '#e0e7ff', fontWeight: 600 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setStep('register')}>← Go Back</button>
            <button className="btn btn-primary" style={{ justifyContent: 'center' }}
              onClick={() => handleCheckStatus({ preventDefault: () => {} })}>
              <RefreshCw size={16} /> Refresh Status
            </button>
          </div>
        </div>
      )}

      {/* ── Test Ready Notification ── */}
      {step === 'notification' && registeredCandidate && activeConfig && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          {/* Notification Banner */}
          <div style={{
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.15))',
            border: '1.5px solid rgba(129, 140, 248, 0.5)',
            padding: '20px 24px',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.2)',
            marginBottom: '28px',
            display: 'flex', alignItems: 'flex-start', gap: '16px'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '16px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', flexShrink: 0,
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.5)'
            }}>
              <Bell size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#a5b4fc', marginBottom: '4px', textTransform: 'uppercase' }}>
                🔔 Notification from Faculty
              </div>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', margin: '0 0 6px 0' }}>
                Prof. Ananya Sharma has configured your test!
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {[
                  { icon: '📝', label: `${activeConfig.questionCount} Questions` },
                  { icon: activeConfig.level === 'Mixed' ? '⚡' : '🎯', label: `${activeConfig.level} Level` },
                  { icon: '⏱️', label: `${activeConfig.timePerQuestion}s / Q` },
                  { icon: '💻', label: 'CS Fundamentals' },
                ].map(tag => (
                  <div key={tag.label} style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    fontSize: '0.78rem', color: '#c7d2fe',
                    background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '8px'
                  }}>
                    <span>{tag.icon}</span><span>{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '8px' }}>
              Ready to go, <span className="gradient-text">{registeredCandidate.name.split(' ')[0]}!</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Your personalized CS Fundamentals test is all set. Here's what to expect:
            </p>
          </div>

          {/* Test details */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px',
            marginBottom: '24px'
          }}>
            {[
              { icon: '📝', label: 'Questions', value: `${activeConfig.questionCount} Questions`, color: '#818cf8' },
              { icon: activeConfig.level === 'Mixed' ? '⚡' : '🎯', label: 'Mode', value: activeConfig.level === 'Mixed' ? 'Adaptive Smart Routing' : `Fixed · ${activeConfig.level}`, color: activeConfig.level === 'Mixed' ? '#818cf8' : '#fbbf24' },
              { icon: '⏱️', label: 'Time per Q', value: `${activeConfig.timePerQuestion} seconds`, color: '#34d399' },
              { icon: '⏳', label: 'Est. Duration', value: `~${Math.ceil(activeConfig.questionCount * activeConfig.timePerQuestion / 60)} minutes`, color: '#fbbf24' },
              { icon: '📚', label: 'Subject', value: 'Computer Fundamentals', color: '#c084fc' },
              { icon: '👩‍🏫', label: 'Configured by', value: activeConfig.configuredBy || 'Prof. Ananya Sharma', color: '#34d399' },
            ].map(item => (
              <div key={item.label} style={{
                padding: '12px 16px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', gap: '10px', alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{item.label}</div>
                  <div style={{ fontSize: '0.85rem', color: item.color, fontWeight: 700 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {activeConfig.level === 'Mixed' && (
            <div style={{
              padding: '14px 16px', borderRadius: '12px',
              background: 'rgba(129, 140, 248, 0.08)',
              border: '1px solid rgba(129, 140, 248, 0.2)',
              marginBottom: '24px',
              display: 'flex', gap: '10px', alignItems: 'flex-start'
            }}>
              <Zap size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#c7d2fe', lineHeight: 1.5 }}>
                <strong>Smart Routing ON:</strong> Test starts at Medium difficulty. Get one right → next Q gets harder. Get one wrong → steps down. The system discovers your true knowledge level!
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setStep('check_status')}>← Go Back</button>
            <button className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1rem', justifyContent: 'center' }} onClick={startTest}>
              <Brain size={20} /> Begin Test Now
            </button>
          </div>
        </div>
      )}

      {/* ── Testing ── */}
      {step === 'testing' && currentQ && activeConfig && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          {/* Top Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-purple">Q {questionIndex + 1} of {activeConfig.questionCount}</span>
              <SmartRoutingIndicator currentDifficulty={currentDifficulty} isAdaptive={isAdaptive} />
            </div>
            {/* Circular Timer */}
            <div style={{ position: 'relative', width: '44px', height: '44px' }}>
              <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <circle cx="22" cy="22" r="18" fill="none" stroke={timerColor}
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - timerPct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
                />
              </svg>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 800, color: timerColor
              }}>{timerSeconds}</div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: '20px' }} className="progress-container">
            <div className="progress-bar" style={{
              width: `${((questionIndex + 1) / activeConfig.questionCount) * 100}%`,
              background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)'
            }} />
          </div>

          {/* Subject tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BookOpen size={14} color="var(--text-muted)" />
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {currentQ.subject} · {currentQ.topic}
            </span>
          </div>

          {/* Question */}
          <div style={{
            padding: '20px 24px', borderRadius: '16px',
            background: diffColors.bg, border: `1px solid ${diffColors.border}`,
            marginBottom: '20px'
          }}>
            <h3 style={{ fontSize: '1.12rem', color: '#fff', lineHeight: 1.6, margin: 0 }}>
              {currentQ.questionText}
            </h3>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt.id;
              const letters = ['A', 'B', 'C', 'D'];
              return (
                <div key={opt.id} onClick={() => setSelectedOption(opt.id)} style={{
                  padding: '14px 18px', borderRadius: '14px',
                  background: isSelected ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1.5px solid #818cf8' : '1px solid var(--border-color)',
                  cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '14px',
                  transition: 'all 0.18s ease',
                  transform: isSelected ? 'translateX(4px)' : 'translateX(0)'
                }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0,
                    background: isSelected ? '#818cf8' : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem', fontWeight: 800,
                    color: isSelected ? '#fff' : 'var(--text-muted)'
                  }}>{letters[idx]}</div>
                  <span style={{ color: isSelected ? '#fff' : 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {opt.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✓ {correctCount} correct so far</div>
            <button disabled={!selectedOption} className="btn btn-primary"
              style={{ opacity: selectedOption ? 1 : 0.5 }}
              onClick={() => {
                const opt = currentQ.options.find(o => o.id === selectedOption);
                handleNextQuestion(opt);
              }}>
              {questionIndex + 1 === activeConfig.questionCount ? 'Submit Final Answer' : 'Next Question'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {step === 'submitted' && finalResult && (
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '24px',
              background: finalResult.score >= 75
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : finalResult.score >= 55
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px auto', color: '#fff',
              boxShadow: `0 8px 32px ${finalResult.score >= 75 ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`
            }}>
              <Award size={40} />
            </div>

            <span className="badge badge-purple" style={{ marginBottom: '12px' }}>Test Completed!</span>
            <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '8px' }}>
              Well done, {finalResult.name.split(' ')[0]}!
            </h2>

            <div style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
              padding: '20px 40px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              margin: '16px 0 24px 0'
            }}>
              <div style={{
                fontSize: '3.5rem', fontWeight: 900,
                background: finalResult.score >= 75
                  ? 'linear-gradient(135deg, #34d399, #10b981)'
                  : finalResult.score >= 55
                    ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                    : 'linear-gradient(135deg, #f87171, #ef4444)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>{finalResult.score}%</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                {correctCount}/{activeConfig?.questionCount} correct answers
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            {/* Subject breakdown */}
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <BarChart3 size={15} color="#818cf8" />
                <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.82rem' }}>Subject Breakdown</span>
              </div>
              {Object.entries(subjectStats).length > 0 ? Object.entries(subjectStats).map(([subject, stats]) => (
                <div key={subject} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{subject}</span>
                    <span style={{ color: '#fff', fontWeight: 700 }}>{stats.correct}/{stats.total}</span>
                  </div>
                  <div style={{ height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }}>
                    <div style={{
                      height: '100%', borderRadius: '4px',
                      background: `hsl(${(stats.correct / stats.total) * 120}, 70%, 55%)`,
                      width: `${(stats.correct / stats.total) * 100}%`
                    }} />
                  </div>
                </div>
              )) : <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>No data yet.</p>}
            </div>

            {/* Routing path */}
            <div style={{ background: 'rgba(255,255,255,0.04)', padding: '16px', borderRadius: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <TrendingUp size={15} color="#10b981" />
                <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.82rem' }}>Smart Routing Path</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
                {difficultyRoute.map((d, i) => (
                  <React.Fragment key={i}>
                    <span style={{
                      padding: '3px 9px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700,
                      background: DIFF_COLORS[d]?.bg, color: DIFF_COLORS[d]?.text,
                      border: `1px solid ${DIFF_COLORS[d]?.border}`
                    }}>{d}</span>
                    {i < difficultyRoute.length - 1 && <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', alignSelf: 'center' }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                AI adapted difficulty based on your answers in real-time.
              </div>
            </div>
          </div>

          <div style={{
            padding: '14px 18px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Status: <span className={`badge ${finalResult.status.includes('Shortlist') ? 'badge-shortlist' : finalResult.status.includes('Review') ? 'badge-review' : 'badge-reject'}`}>
                {finalResult.status}
              </span>
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Your score has been sent to <strong style={{ color: '#fff' }}>Prof. Ananya Sharma</strong> for review.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => { setStep('register'); setRegisteredEmail(''); setCheckEmail(''); setRegisteredCandidate(null); setActiveConfig(null); }}>
              <RefreshCw size={16} /> New Registration
            </button>
          </div>
        </div>
      )}

      {/* ── Knockout ── */}
      {step === 'knockout' && (
        <div className="glass-panel" style={{ padding: '36px', textAlign: 'center', border: '1px solid rgba(239,68,68,0.4)' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'rgba(239,68,68,0.15)', color: '#f87171',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <ShieldAlert size={32} />
          </div>
          <span className="badge badge-reject" style={{ marginBottom: '12px' }}>Assessment Ended</span>
          <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '8px' }}>Prerequisite Not Met</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto 24px auto' }}>
            Your application has been recorded but the mandatory prerequisite was not satisfied.
          </p>
          <button className="btn btn-secondary" onClick={() => setStep('register')}>
            <RefreshCw size={16} /> New Application
          </button>
        </div>
      )}
    </div>
  );
}
