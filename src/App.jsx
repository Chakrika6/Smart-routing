import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AgencyDashboard from './components/AgencyDashboard';
import CandidateScreening from './components/CandidateScreening';
import AppointmentHub from './components/AppointmentHub';

import { INITIAL_CANDIDATES, INITIAL_JOBS, APPOINTMENTS, AGENCY_INFO } from './mockData';

export default function App() {
  const [portalMode, setPortalMode] = useState('director');
  const [directorTab, setDirectorTab] = useState('dashboard');

  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── Student registers (no test yet) ──────────────────────────
  const handleApplicationSubmitted = (newCandidate) => {
    setCandidates(prev => {
      // If candidate already exists (e.g. test completion update), replace them
      const exists = prev.find(c => c.id === newCandidate.id || c.email === newCandidate.email);
      if (exists) {
        return prev.map(c => (c.id === exists.id ? { ...c, ...newCandidate } : c));
      }
      return [newCandidate, ...prev];
    });

    if (newCandidate.status === 'Registered (Awaiting Test Config)') {
      showToast(`📋 New Registration: ${newCandidate.name} — configure their test now!`);
    } else if (newCandidate.testCompleted) {
      showToast(`✅ ${newCandidate.name} completed their test — Score: ${newCandidate.score}%`);
    }
  };

  // ── Mam configures test for a specific student ───────────────
  const handleConfigureStudentTest = (candidateId, config) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          testConfig: config,
          status: 'Test Ready - Notified'
        };
      }
      return c;
    }));
    const cand = candidates.find(c => c.id === candidateId);
    showToast(`🔔 Test configured for ${cand?.name} — ${config.questionCount}Q · ${config.level} · ${config.timePerQuestion}s. Student notified!`);
  };

  // ── Director shortlists a candidate ─────────────────────────
  const handleShortlistCandidate = (cand) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === cand.id) {
        return { ...c, status: 'Shortlisted & Confirmed', shortlistedByDirector: true };
      }
      return c;
    }));

    const newApp = {
      id: `app-${Date.now().toString().slice(-4)}`,
      candidateName: cand.name,
      email: cand.email,
      role: cand.role,
      score: cand.score,
      type: 'AI Screened (Shortlisted)',
      status: 'Confirmed by Mam',
      date: cand.requestedSlot ? cand.requestedSlot.split(' at ')[0] : '2026-10-08',
      time: cand.requestedSlot ? cand.requestedSlot.split(' at ')[1] : '11:30 AM',
      notes: `Shortlisted by Director Prof. Sharma with ${cand.score}% score.`
    };
    setAppointments(prev => [newApp, ...prev]);
    showToast(`✓ Shortlisted ${cand.name} for Interview!`);
  };

  const handleRejectCandidate = (cand) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === cand.id) return { ...c, status: 'Knockout / Filtered Out', shortlistedByDirector: false };
      return c;
    }));
    showToast(`Application rejected for ${cand.name}`);
  };

  const handleBookAppointment = (newApp) => {
    setAppointments(prev => [newApp, ...prev]);
    showToast(`Interview slot added to Mam's Calendar`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        directorTab={directorTab}
        setDirectorTab={setDirectorTab}
        pendingConfigCount={candidates.filter(c => c.status === 'Registered (Awaiting Test Config)').length}
      />

      {/* Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#fff', padding: '14px 20px', borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(16, 185, 129, 0.5)',
          zIndex: 1000, fontWeight: 600, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '8px',
          maxWidth: '400px'
        }}>
          {toastMessage}
        </div>
      )}

      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '0 24px' }}>

        {/* DIRECTOR PORTAL */}
        {portalMode === 'director' && (
          <>
            {directorTab === 'dashboard' && (
              <AgencyDashboard
                candidates={candidates}
                jobs={jobs}
                appointments={appointments}
                onShortlistCandidate={handleShortlistCandidate}
                onRejectCandidate={handleRejectCandidate}
                onConfigureStudentTest={handleConfigureStudentTest}
                setActiveTab={(tab) => setDirectorTab(tab)}
              />
            )}
            {directorTab === 'appointments' && (
              <AppointmentHub
                appointments={appointments}
                onBookAppointment={handleBookAppointment}
              />
            )}
          </>
        )}

        {/* CANDIDATE PORTAL */}
        {portalMode === 'candidate' && (
          <CandidateScreening
            onApplicationSubmitted={handleApplicationSubmitted}
            candidates={candidates}
          />
        )}
      </main>

      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '24px', textAlign: 'center',
        color: 'var(--text-muted)', fontSize: '0.85rem',
        marginTop: '40px', background: 'rgba(11, 15, 25, 0.8)'
      }}>
        <div>
          <strong>{AGENCY_INFO.name}</strong> • Director: <strong>{AGENCY_INFO.director}</strong>
        </div>
        <div style={{ marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          Active View: {portalMode === 'director' ? "Director Portal (Mam's View)" : "Candidate Portal"}
        </div>
      </footer>
    </div>
  );
}
