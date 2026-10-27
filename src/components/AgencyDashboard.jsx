import React, { useState } from 'react';
import {
  Users, CheckCircle2, AlertTriangle, XCircle, Calendar,
  Search, Eye, ShieldAlert, Sparkles, UserCheck, Clock,
  Settings2, Bell, Brain, Zap, HelpCircle, BarChart3
} from 'lucide-react';
import { AGENCY_INFO } from '../mockData';

// ── Per-Student Test Config Modal ─────────────────────────────────
function TestConfigModal({ candidate, onSave, onClose }) {
  const [questionCount, setQuestionCount] = useState(5);
  const [level, setLevel] = useState('Mixed');
  const [timePerQuestion, setTimePerQuestion] = useState(40);

  const LEVELS = [
    { id: 'Easy', label: '🟢 Easy', desc: 'Basic concepts — freshers', color: '#34d399' },
    { id: 'Medium', label: '🟡 Medium', desc: 'Applied knowledge', color: '#fbbf24' },
    { id: 'Hard', label: '🔴 Hard', desc: 'Advanced — senior roles', color: '#f87171' },
    { id: 'Mixed', label: '⚡ Adaptive (Smart Routing)', desc: 'AI adjusts difficulty in real-time', color: '#818cf8' },
  ];

  const handleSave = () => {
    onSave(candidate.id, {
      questionCount,
      level,
      timePerQuestion,
      configuredBy: 'Prof. Ananya Sharma',
      configuredAt: new Date().toISOString(),
      isActive: true
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 300, padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%', maxWidth: '560px', padding: '28px',
        border: '1px solid rgba(99, 102, 241, 0.5)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
              }}>
                <Settings2 size={18} />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>Configure Test for Student</h3>
                <p style={{ color: '#818cf8', fontSize: '0.82rem', margin: 0 }}>{candidate.name} · {candidate.email}</p>
              </div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>✕</button>
        </div>

        {/* Number of Questions */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <HelpCircle size={14} /> Number of Questions
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[3, 4, 5, 6, 7, 8].map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className="btn btn-sm"
                style={{
                  flex: 1,
                  background: questionCount === n ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255,255,255,0.04)',
                  border: questionCount === n ? '1.5px solid #818cf8' : '1px solid var(--border-color)',
                  color: questionCount === n ? '#818cf8' : 'var(--text-muted)',
                  fontWeight: questionCount === n ? 800 : 400,
                  fontSize: '0.9rem'
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px' }}>
            Est. duration: ~{Math.ceil(questionCount * timePerQuestion / 60)} min
          </div>
        </div>

        {/* Difficulty Level */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <BarChart3 size={14} /> Difficulty Level
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {LEVELS.map(lv => (
              <div
                key={lv.id}
                onClick={() => setLevel(lv.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '12px',
                  background: level === lv.id ? `${lv.color}18` : 'rgba(255,255,255,0.03)',
                  border: level === lv.id ? `1.5px solid ${lv.color}55` : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  gridColumn: lv.id === 'Mixed' ? 'span 2' : 'auto'
                }}
              >
                <div style={{ fontWeight: 700, color: level === lv.id ? lv.color : '#fff', fontSize: '0.85rem' }}>{lv.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '2px' }}>{lv.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Per Question */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Clock size={14} /> Time Per Question
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { t: 30, label: '30s' },
              { t: 40, label: '40s' },
              { t: 60, label: '60s' },
              { t: 90, label: '90s' }
            ].map(p => (
              <button
                key={p.t}
                onClick={() => setTimePerQuestion(p.t)}
                className="btn btn-sm"
                style={{
                  flex: 1,
                  background: timePerQuestion === p.t ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.04)',
                  border: timePerQuestion === p.t ? '1.5px solid #34d399' : '1px solid var(--border-color)',
                  color: timePerQuestion === p.t ? '#34d399' : 'var(--text-muted)',
                  fontWeight: timePerQuestion === p.t ? 800 : 400,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary + Action */}
        <div style={{
          padding: '12px 16px', borderRadius: '12px',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          marginBottom: '16px',
          fontSize: '0.82rem', color: '#c7d2fe'
        }}>
          <Bell size={13} style={{ display: 'inline', marginRight: '6px' }} />
          <strong>{candidate.name}</strong> will be notified instantly when you save this config and can then take their test.
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={handleSave}>
            <Bell size={16} /> Save Config & Notify Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AgencyDashboard({
  candidates,
  jobs,
  appointments,
  onShortlistCandidate,
  onRejectCandidate,
  onConfigureStudentTest,
  setActiveTab
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedJob, setSelectedJob] = useState('ALL');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [configuringCandidate, setConfiguringCandidate] = useState(null);

  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' ||
      (selectedStatus === 'AWAITING_CONFIG' && cand.status === 'Registered (Awaiting Test Config)') ||
      (selectedStatus === 'TEST_READY' && cand.status === 'Test Ready - Notified') ||
      (selectedStatus === 'PENDING' && cand.status.includes('Awaiting Shortlist')) ||
      (selectedStatus === 'SHORTLISTED' && cand.status.includes('Shortlisted')) ||
      (selectedStatus === 'REVIEW' && cand.status.includes('Needs')) ||
      (selectedStatus === 'KNOCKOUT' && cand.status.includes('Knockout'));

    const matchesJob = selectedJob === 'ALL' || cand.role === selectedJob;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const countAwaitingConfig = candidates.filter(c => c.status === 'Registered (Awaiting Test Config)').length;
  const countTestReady = candidates.filter(c => c.status === 'Test Ready - Notified').length;
  const countPending = candidates.filter(c => c.status.includes('Awaiting Shortlist')).length;
  const countShortlisted = candidates.filter(c => c.status.includes('Shortlisted')).length;
  const countReview = candidates.filter(c => c.status.includes('Needs')).length;
  const countKnockout = candidates.filter(c => c.status.includes('Knockout')).length;

  const getStatusBadge = (cand) => {
    if (cand.status === 'Registered (Awaiting Test Config)') return <span className="badge" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.3)' }}><Clock size={11} /> Awaiting Config</span>;
    if (cand.status === 'Test Ready - Notified') return <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', border: '1px solid rgba(99, 102, 241, 0.3)' }}><Bell size={11} /> Test Ready</span>;
    if (cand.status.includes('Shortlisted')) return <span className="badge badge-shortlist"><CheckCircle2 size={11} /> Shortlisted</span>;
    if (cand.status.includes('Awaiting')) return <span className="badge badge-review"><Clock size={11} /> Awaiting Shortlist</span>;
    if (cand.status.includes('Needs')) return <span className="badge badge-review"><AlertTriangle size={11} /> Needs Review</span>;
    if (cand.status.includes('Knockout')) return <span className="badge badge-reject"><ShieldAlert size={11} /> Knockout</span>;
    return <span className="badge">{cand.status}</span>;
  };

  return (
    <div style={{ padding: '24px 0' }}>
      {/* Director Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Agency Shortlisting Pipeline</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Register → Mam Configures Test → Student Takes Test → Director Shortlists</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>
              Director Command Center: <span className="gradient-text">{AGENCY_INFO.director}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Students register first, then you configure their individual test. Click <strong>"Configure Test"</strong> to assign questions, difficulty & time for each student.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-outline-purple" onClick={() => setActiveTab('appointments')}>
              <Calendar size={16} /> Schedule ({appointments.length})
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Total Students', value: candidates.length, color: '#818cf8', icon: <Users size={20} color="#818cf8" />, sub: 'All registered' },
          { label: 'Awaiting Test Config', value: countAwaitingConfig, color: '#fbbf24', icon: <Settings2 size={20} color="#fbbf24" />, sub: 'Need your config' },
          { label: 'Test Ready', value: countTestReady, color: '#818cf8', icon: <Bell size={20} color="#818cf8" />, sub: 'Notified, not taken' },
          { label: 'Shortlisted', value: countShortlisted, color: '#34d399', icon: <CheckCircle2 size={20} color="#34d399" />, sub: 'Interview locked' },
          { label: 'Knockout', value: countKnockout, color: '#f87171', icon: <XCircle size={20} color="#f87171" />, sub: 'Did not qualify' },
        ].map(stat => (
          <div key={stat.label} className="glass-panel" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>{stat.label}</span>
              {stat.icon}
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, marginTop: '8px', color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Table Panel */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Student Management Hub</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Configure tests for registered students & shortlist after they complete assessment</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Search student..." className="form-input"
                style={{ paddingLeft: '36px' }}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <select className="form-select" style={{ width: '160px' }} value={selectedJob}
              onChange={e => setSelectedJob(e.target.value)}>
              <option value="ALL">All Positions</option>
              {jobs.map(j => <option key={j.id} value={j.title}>{j.title}</option>)}
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '18px', overflowX: 'auto' }}>
          {[
            { id: 'ALL', label: 'All', count: candidates.length },
            { id: 'AWAITING_CONFIG', label: '⚙️ Needs Config', count: countAwaitingConfig, highlight: countAwaitingConfig > 0 },
            { id: 'TEST_READY', label: '🔔 Test Ready', count: countTestReady },
            { id: 'PENDING', label: 'Awaiting Shortlist', count: countPending },
            { id: 'SHORTLISTED', label: 'Shortlisted', count: countShortlisted },
            { id: 'REVIEW', label: 'Needs Review', count: countReview },
            { id: 'KNOCKOUT', label: 'Knockout', count: countKnockout },
          ].map(tab => (
            <button key={tab.id} onClick={() => setSelectedStatus(tab.id)} className="btn btn-sm"
              style={{
                background: selectedStatus === tab.id ? 'rgba(99, 102, 241, 0.2)' : tab.highlight ? 'rgba(251, 191, 36, 0.08)' : 'transparent',
                color: selectedStatus === tab.id ? '#818cf8' : tab.highlight ? '#fbbf24' : 'var(--text-muted)',
                border: selectedStatus === tab.id ? '1px solid rgba(99, 102, 241, 0.4)' : tab.highlight ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent',
                whiteSpace: 'nowrap'
              }}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 16px' }}>Student</th>
                <th style={{ padding: '12px 16px' }}>Position</th>
                <th style={{ padding: '12px 16px' }}>Test Config</th>
                <th style={{ padding: '12px 16px' }}>Score</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No students match this filter.</td></tr>
              ) : filteredCandidates.map(cand => (
                <tr key={cand.id} style={{
                  borderBottom: '1px solid var(--border-color)',
                  background: cand.status === 'Registered (Awaiting Test Config)' ? 'rgba(251, 191, 36, 0.03)' : 'transparent'
                }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{cand.name}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{cand.email}</div>
                  </td>

                  <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {cand.role}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    {cand.testConfig ? (
                      <div style={{ fontSize: '0.78rem' }}>
                        <span style={{ color: '#34d399', fontWeight: 700 }}>✓ Configured</span>
                        <div style={{ color: 'var(--text-dim)', marginTop: '2px' }}>
                          {cand.testConfig.questionCount}Q · {cand.testConfig.level} · {cand.testConfig.timePerQuestion}s
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#fbbf24' }}>Not yet configured</span>
                    )}
                  </td>

                  <td style={{ padding: '14px 16px' }}>
                    {cand.testCompleted ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '1.05rem', fontWeight: 800,
                          color: cand.score >= 75 ? '#34d399' : cand.score >= 60 ? '#fbbf24' : '#f87171'
                        }}>
                          {cand.score}%
                        </span>
                        <div style={{ width: '50px' }} className="progress-container">
                          <div className="progress-bar" style={{
                            width: `${cand.score}%`,
                            background: cand.score >= 75 ? '#10b981' : cand.score >= 60 ? '#f59e0b' : '#ef4444'
                          }} />
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Not taken yet</span>
                    )}
                  </td>

                  <td style={{ padding: '14px 16px' }}>{getStatusBadge(cand)}</td>

                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
                      {/* Configure Test button — shown for all students */}
                      <button
                        className="btn btn-sm"
                        style={{
                          background: cand.status === 'Registered (Awaiting Test Config)' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.04)',
                          border: cand.status === 'Registered (Awaiting Test Config)' ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid var(--border-color)',
                          color: cand.status === 'Registered (Awaiting Test Config)' ? '#fbbf24' : 'var(--text-muted)'
                        }}
                        onClick={() => setConfiguringCandidate(cand)}
                      >
                        <Settings2 size={13} />
                        {cand.testConfig ? 'Reconfigure' : 'Configure Test'}
                      </button>

                      {cand.testCompleted && (
                        <button className="btn btn-secondary btn-sm" onClick={() => setSelectedCandidate(cand)}>
                          <Eye size={13} /> Report
                        </button>
                      )}

                      {cand.testCompleted && !cand.shortlistedByDirector && !cand.status.includes('Knockout') && (
                        <button className="btn btn-emerald btn-sm" onClick={() => onShortlistCandidate(cand)}>
                          <UserCheck size={13} /> Shortlist
                        </button>
                      )}

                      {cand.shortlistedByDirector && (
                        <span style={{ fontSize: '0.76rem', color: '#34d399', fontWeight: 700, alignSelf: 'center' }}>✓ Locked</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Per-Student Config Modal */}
      {configuringCandidate && (
        <TestConfigModal
          candidate={configuringCandidate}
          onSave={onConfigureStudentTest}
          onClose={() => setConfiguringCandidate(null)}
        />
      )}

      {/* Candidate Report Modal */}
      {selectedCandidate && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, padding: '20px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '650px', padding: '28px', border: '1px solid var(--accent-primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-purple" style={{ marginBottom: '6px' }}>Applicant Evaluation Card</span>
                <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>{selectedCandidate.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{selectedCandidate.email} • {selectedCandidate.role}</p>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedCandidate(null)}>✕ Close</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'AI Score', value: `${selectedCandidate.score}%`, color: '#34d399' },
                { label: 'Tech Rating', value: `${selectedCandidate.technicalScore}%`, color: '#818cf8' },
                { label: 'Problem Solving', value: `${selectedCandidate.problemSolvingScore}%`, color: '#c084fc' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.label}</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {selectedCandidate.testConfig && (
              <div style={{ marginBottom: '16px', background: 'rgba(99,102,241,0.08)', padding: '12px 16px', borderRadius: '12px', fontSize: '0.82rem', color: '#c7d2fe' }}>
                <strong>Test Config used:</strong> {selectedCandidate.testConfig.questionCount} questions · {selectedCandidate.testConfig.level} level · {selectedCandidate.testConfig.timePerQuestion}s per question
              </div>
            )}

            <div style={{ marginBottom: '20px', background: 'rgba(99, 102, 241, 0.08)', padding: '16px', borderRadius: '12px', fontSize: '0.88rem', color: '#e0e7ff' }}>
              <strong>AI Observations:</strong> {selectedCandidate.summary}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="btn btn-secondary" onClick={() => { onRejectCandidate(selectedCandidate); setSelectedCandidate(null); }}>
                Reject Application
              </button>
              {!selectedCandidate.shortlistedByDirector ? (
                <button className="btn btn-emerald" onClick={() => { onShortlistCandidate(selectedCandidate); setSelectedCandidate(null); }}>
                  <UserCheck size={16} /> Approve & Shortlist for Interview
                </button>
              ) : (
                <span style={{ color: '#34d399', fontWeight: 700 }}>✓ Already Shortlisted</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
