import React from 'react';
import { Briefcase, Calendar, Sparkles, ArrowRightLeft } from 'lucide-react';
import { AGENCY_INFO } from '../mockData';

export default function Navbar({ portalMode, setPortalMode, directorTab, setDirectorTab, pendingConfigCount = 0 }) {
  return (
    <header style={{
      background: 'rgba(17, 24, 39, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: portalMode === 'director'
              ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
              : 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }} className="gradient-text">TalentAI</h1>
              <span className={portalMode === 'director' ? 'badge badge-purple' : 'badge badge-shortlist'} style={{ fontSize: '0.65rem' }}>
                {portalMode === 'director' ? "Director Portal (Mam's View)" : 'Candidate Portal'}
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              Director: <strong style={{ color: '#e0e7ff' }}>{AGENCY_INFO.director}</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>

          {/* Director Sub-Nav */}
          {portalMode === 'director' && (
            <div style={{
              display: 'flex', gap: '4px',
              background: 'rgba(255,255,255,0.04)',
              padding: '4px', borderRadius: '10px',
              border: '1px solid var(--border-color)'
            }}>
              <button
                onClick={() => setDirectorTab('dashboard')}
                className="btn btn-sm"
                style={{
                  background: directorTab === 'dashboard' ? 'rgba(99,102,241,0.3)' : 'transparent',
                  color: directorTab === 'dashboard' ? '#818cf8' : 'var(--text-muted)',
                  border: 'none', position: 'relative'
                }}
              >
                <Briefcase size={14} /> Student Hub
                {/* Badge showing pending configs */}
                {pendingConfigCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: '#fbbf24', color: '#000',
                    fontSize: '0.6rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1.5px solid #111827'
                  }}>
                    {pendingConfigCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setDirectorTab('appointments')}
                className="btn btn-sm"
                style={{
                  background: directorTab === 'appointments' ? 'rgba(139,92,246,0.3)' : 'transparent',
                  color: directorTab === 'appointments' ? '#c084fc' : 'var(--text-muted)',
                  border: 'none'
                }}
              >
                <Calendar size={14} /> Mam's Schedule
              </button>
            </div>
          )}

          {/* Portal Switch */}
          <button
            onClick={() => setPortalMode(portalMode === 'director' ? 'candidate' : 'director')}
            className="btn btn-secondary"
            style={{
              borderColor: portalMode === 'director' ? 'rgba(16,185,129,0.4)' : 'rgba(99,102,241,0.4)',
              color: portalMode === 'director' ? '#34d399' : '#818cf8',
              fontSize: '0.85rem'
            }}
          >
            <ArrowRightLeft size={14} />
            Switch to {portalMode === 'director' ? 'Candidate View' : "Mam's Portal"}
          </button>
        </div>
      </div>
    </header>
  );
}
