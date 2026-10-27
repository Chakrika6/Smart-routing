import React, { useState } from 'react';
import {
  Settings2, BookOpen, Brain, Zap, CheckCircle2,
  Clock, BarChart3, Bell, Shield,
  ChevronRight, HelpCircle
} from 'lucide-react';

const SUBJECT_TAGS = [
  { id: 'OS', label: 'Operating Systems', color: '#6366f1' },
  { id: 'DBMS', label: 'DBMS & SQL', color: '#10b981' },
  { id: 'CN', label: 'Computer Networks', color: '#f59e0b' },
  { id: 'OOP', label: 'OOP Concepts', color: '#c084fc' },
  { id: 'DS', label: 'Data Structures', color: '#34d399' },
  { id: 'ALGO', label: 'Algorithms', color: '#f87171' },
  { id: 'CO', label: 'Computer Organization', color: '#60a5fa' },
  { id: 'DIST', label: 'Distributed Systems', color: '#fb923c' },
];

export default function TestConfigPanel({ onSaveConfig, currentConfig }) {
  const [questionCount, setQuestionCount] = useState(currentConfig?.questionCount || 5);
  const [level, setLevel] = useState(currentConfig?.level || 'Mixed');
  const [timePerQuestion, setTimePerQuestion] = useState(currentConfig?.timePerQuestion || 40);
  const [saved, setSaved] = useState(false);

  const LEVELS = [
    {
      id: 'Easy',
      label: 'Easy',
      desc: 'Fundamental concepts — suitable for freshers.',
      icon: '🟢',
      color: '#34d399',
      bg: 'rgba(52, 211, 153, 0.1)',
      border: 'rgba(52, 211, 153, 0.3)'
    },
    {
      id: 'Medium',
      label: 'Medium',
      desc: 'Applied knowledge — tests conceptual depth.',
      icon: '🟡',
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.1)',
      border: 'rgba(251, 191, 36, 0.3)'
    },
    {
      id: 'Hard',
      label: 'Hard',
      desc: 'Advanced scenarios — for senior roles.',
      icon: '🔴',
      color: '#f87171',
      bg: 'rgba(248, 113, 113, 0.1)',
      border: 'rgba(248, 113, 113, 0.3)'
    },
    {
      id: 'Mixed',
      label: 'Adaptive (Smart Routing)',
      desc: 'AI adjusts difficulty based on candidate performance in real-time.',
      icon: '⚡',
      color: '#818cf8',
      bg: 'rgba(129, 140, 248, 0.1)',
      border: 'rgba(129, 140, 248, 0.4)'
    },
  ];

  const handleSave = () => {
    const config = {
      questionCount,
      level,
      timePerQuestion,
      configuredBy: 'Prof. Ananya Sharma',
      configuredAt: new Date().toISOString(),
      isActive: true
    };
    onSaveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const selectedLevel = LEVELS.find(l => l.id === level);

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Header */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
            flexShrink: 0
          }}>
            <Settings2 size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Faculty Control Panel</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Configure before student registration opens
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#fff', marginBottom: '4px' }}>
              Test Configuration & <span className="gradient-text">Smart Routing Setup</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Set how many questions students receive, the difficulty level, and time limits. Students will be notified instantly upon registration.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
        {/* Left: Configuration Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Question Count */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <HelpCircle size={20} />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '2px' }}>Number of Questions</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  How many questions each student must answer
                </p>
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Questions Count</span>
                <span style={{
                  color: '#818cf8', fontWeight: 800, fontSize: '1.5rem',
                  background: 'rgba(99, 102, 241, 0.15)',
                  padding: '2px 14px', borderRadius: '8px'
                }}>
                  {questionCount}
                </span>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                value={questionCount}
                onChange={e => setQuestionCount(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '4px',
                  appearance: 'none',
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${((questionCount - 3) / 5) * 100}%, rgba(255,255,255,0.12) ${((questionCount - 3) / 5) * 100}%, rgba(255,255,255,0.12) 100%)`,
                  cursor: 'pointer',
                  outline: 'none',
                  border: 'none'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                <span>3 (Quick)</span>
                <span>5 (Standard)</span>
                <span>8 (Comprehensive)</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { n: 3, label: '3 Q (5 min)', sub: 'Quick Screen' },
                { n: 5, label: '5 Q (8 min)', sub: 'Standard' },
                { n: 8, label: '8 Q (12 min)', sub: 'Full Assess' }
              ].map(p => (
                <button
                  key={p.n}
                  onClick={() => setQuestionCount(p.n)}
                  className="btn btn-sm"
                  style={{
                    background: questionCount === p.n ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.04)',
                    border: questionCount === p.n ? '1px solid #818cf8' : '1px solid var(--border-color)',
                    color: questionCount === p.n ? '#818cf8' : 'var(--text-muted)',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '8px 14px',
                    lineHeight: 1.2
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{p.label}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{p.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '2px' }}>Difficulty Level</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Choose fixed difficulty or enable Adaptive Smart Routing
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {LEVELS.map(lv => (
                <div
                  key={lv.id}
                  onClick={() => setLevel(lv.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: level === lv.id ? lv.bg : 'rgba(255,255,255,0.03)',
                    border: level === lv.id ? `1.5px solid ${lv.border}` : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    gridColumn: lv.id === 'Mixed' ? 'span 2' : 'auto'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{lv.icon}</span>
                      <span style={{ fontWeight: 700, color: level === lv.id ? lv.color : '#fff', fontSize: '0.95rem' }}>
                        {lv.label}
                      </span>
                    </div>
                    {level === lv.id && (
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: lv.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <CheckCircle2 size={14} color="#fff" />
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {lv.desc}
                  </span>
                  {lv.id === 'Mixed' && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px',
                      padding: '6px 10px', borderRadius: '8px',
                      background: 'rgba(129, 140, 248, 0.1)', border: '1px solid rgba(129, 140, 248, 0.2)'
                    }}>
                      <Zap size={12} color="#818cf8" />
                      <span style={{ fontSize: '0.75rem', color: '#818cf8' }}>
                        Smart Routing: Correct answer → harder question | Wrong → easier
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time Per Question */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)', color: '#34d399',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Clock size={20} />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1rem', marginBottom: '2px' }}>Time Per Question</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  Seconds given per question before auto-advance
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { t: 30, label: '30s', sub: 'Fast-paced' },
                { t: 40, label: '40s', sub: 'Standard' },
                { t: 60, label: '60s', sub: 'Relaxed' },
                { t: 90, label: '90s', sub: 'Extended' }
              ].map(p => (
                <button
                  key={p.t}
                  onClick={() => setTimePerQuestion(p.t)}
                  className="btn btn-sm"
                  style={{
                    background: timePerQuestion === p.t ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                    border: timePerQuestion === p.t ? '1px solid #34d399' : '1px solid var(--border-color)',
                    color: timePerQuestion === p.t ? '#34d399' : 'var(--text-muted)',
                    flexDirection: 'column',
                    gap: '2px',
                    padding: '10px 18px'
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: '1rem' }}>{p.label}</span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{p.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Config Summary + Save */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '100px' }}>
          {/* Summary Card */}
          <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(129, 140, 248, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Brain size={18} color="#818cf8" />
              <h3 style={{ color: '#fff', fontSize: '1rem' }}>Test Summary</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Questions', value: `${questionCount} Questions`, icon: '📝', color: '#818cf8' },
                { label: 'Difficulty', value: selectedLevel?.label, icon: selectedLevel?.icon, color: selectedLevel?.color },
                { label: 'Time per Q', value: `${timePerQuestion} seconds`, icon: '⏱️', color: '#34d399' },
                { label: 'Est. Duration', value: `~${Math.ceil(questionCount * timePerQuestion / 60)} minutes`, icon: '📅', color: '#fbbf24' },
                { label: 'Subject Area', value: 'Computer Fundamentals', icon: '💻', color: '#c084fc' },
              ].map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)'
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {item.icon} {item.label}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: item.color }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Smart Routing Explanation */}
            {level === 'Mixed' && (
              <div style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Zap size={14} color="#818cf8" />
                  <span style={{ fontSize: '0.82rem', color: '#818cf8', fontWeight: 700 }}>Smart Routing Active</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  Test begins at <strong style={{ color: '#fff' }}>Medium</strong> level. Correct answer → next question gets harder. Wrong answer → next gets easier. Final score reflects peak achieved difficulty.
                </p>
              </div>
            )}

            {/* Subject coverage */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Subjects Covered:
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {SUBJECT_TAGS.map(s => (
                  <span
                    key={s.id}
                    style={{
                      fontSize: '0.7rem',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: `${s.color}22`,
                      border: `1px solid ${s.color}44`,
                      color: s.color,
                      fontWeight: 600
                    }}
                  >
                    {s.id}
                  </span>
                ))}
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.95rem', justifyContent: 'center' }}
              onClick={handleSave}
            >
              {saved ? (
                <><CheckCircle2 size={18} /> Config Saved & Active!</>
              ) : (
                <><Shield size={18} /> Publish Test Config</>
              )}
            </button>

            {saved && (
              <div style={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                color: '#34d399'
              }}>
                <Bell size={14} />
                Students will be notified on registration!
              </div>
            )}
          </div>

          {/* Subject Topics Info */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <BookOpen size={16} color="#c084fc" />
              <h4 style={{ color: '#fff', fontSize: '0.9rem' }}>CS Fundamentals Covered</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '🖥️', subject: 'Operating Systems', topics: 'Processes, Memory, Scheduling' },
                { icon: '🗄️', subject: 'DBMS & SQL', topics: 'ACID, Normalization, Queries' },
                { icon: '🌐', subject: 'Computer Networks', topics: 'TCP/UDP, OSI, Routing' },
                { icon: '🔷', subject: 'OOP', topics: 'Polymorphism, SOLID, Patterns' },
                { icon: '📊', subject: 'Data Structures', topics: 'Trees, Graphs, Hashing' },
                { icon: '⚙️', subject: 'Algorithms', topics: 'Sorting, Complexity, Search' },
              ].map(s => (
                <div key={s.subject} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#e0e7ff', fontWeight: 600 }}>{s.subject}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.topics}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
