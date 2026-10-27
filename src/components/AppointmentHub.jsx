import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle2, Search, Filter, Check, Eye } from 'lucide-react';
import { AGENCY_INFO, INITIAL_JOBS } from '../mockData';

export default function AppointmentHub({ 
  appointments = [], 
  onBookAppointment 
}) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const filteredAppointments = safeAppointments.filter(app => {
    if (!app) return false;
    const name = (app.candidateName || '').toLowerCase();
    const role = (app.role || '').toLowerCase();
    const email = (app.email || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    const matchesSearch = name.includes(q) || role.includes(q) || email.includes(q);
    const matchesRole = selectedRole === 'ALL' || app.role === selectedRole;
    
    const appType = (app.type || '').toLowerCase();
    let matchesType = true;
    if (filterType === 'DIRECT') matchesType = appType.includes('direct');
    if (filterType === 'SCREENED') matchesType = appType.includes('screened') || appType.includes('ai');

    return matchesSearch && matchesRole && matchesType;
  });

  const countDirect = safeAppointments.filter(a => (a.type || '').toLowerCase().includes('direct')).length;
  const countScreened = safeAppointments.filter(a => (a.type || '').toLowerCase().includes('screened') || (a.type || '').toLowerCase().includes('ai')).length;

  return (
    <div style={{ padding: '24px 0', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Director Master Schedule</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confirmed 1-on-1 Interviews</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>
              Interview Calendar for <span className="gradient-text">{AGENCY_INFO.director}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              View and manage all upcoming candidate interviews, AI assessment score previews, and scheduled time slots.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 18px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Scheduled</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>{safeAppointments.length} Slots</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', padding: '12px 18px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>AI Shortlisted</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#818cf8' }}>{countScreened}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Full-Width Master Calendar Panel */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        {/* Filter Controls Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          
          {/* Track Filter Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className="btn btn-sm" 
              style={{
                background: filterType === 'ALL' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: filterType === 'ALL' ? '#818cf8' : 'var(--text-muted)',
                border: filterType === 'ALL' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-color)'
              }}
              onClick={() => setFilterType('ALL')}
            >
              All Scheduled ({safeAppointments.length})
            </button>

            <button 
              className="btn btn-sm"
              style={{
                background: filterType === 'SCREENED' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: filterType === 'SCREENED' ? '#34d399' : 'var(--text-muted)',
                border: filterType === 'SCREENED' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)'
              }}
              onClick={() => setFilterType('SCREENED')}
            >
              AI Shortlisted ({countScreened})
            </button>

            <button 
              className="btn btn-sm"
              style={{
                background: filterType === 'DIRECT' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: filterType === 'DIRECT' ? '#c084fc' : 'var(--text-muted)',
                border: filterType === 'DIRECT' ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid var(--border-color)'
              }}
              onClick={() => setFilterType('DIRECT')}
            >
              Direct Requests ({countDirect})
            </button>
          </div>

          {/* Search & Position Filters */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search candidate..." 
                className="form-input"
                style={{ paddingLeft: '36px' }}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="form-select"
              style={{ width: '180px' }}
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
            >
              <option value="ALL">All Roles</option>
              {INITIAL_JOBS.map(j => (
                <option key={j.id} value={j.title}>{j.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Master Schedule Grid Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {filteredAppointments.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No upcoming interview appointments match your filter criteria.
            </div>
          ) : (
            filteredAppointments.map(app => {
              const isDirect = (app.type || '').toLowerCase().includes('direct');
              return (
                <div 
                  key={app.id || Math.random()} 
                  className="glass-panel glass-panel-hover"
                  style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    {/* Top Pill */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className={isDirect ? 'badge badge-purple' : 'badge badge-shortlist'}>
                        {isDirect ? 'Direct Application' : 'AI Shortlisted'}
                      </span>
                      {app.score && (
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399' }}>
                          Score: {app.score}%
                        </span>
                      )}
                    </div>

                    {/* Candidate Info */}
                    <h4 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '4px' }}>
                      {app.candidateName || 'Candidate'}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      {app.email} • <strong>{app.role}</strong>
                    </p>

                    {/* Date & Time Slot highlight */}
                    <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '12px', borderRadius: '10px', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.88rem', color: '#e0e7ff', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Calendar size={16} color="#818cf8" /> {app.date || 'Scheduled Date'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={16} color="#34d399" /> {app.time || 'Scheduled Time'}
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '16px' }}>
                      <strong style={{ color: '#e0e7ff' }}>Notes:</strong> {app.notes || 'No extra interview notes.'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} /> Confirmed Slot
                    </span>
                    <button className="btn btn-secondary btn-sm" onClick={() => alert(`Opening interview preparation file for ${app.candidateName}`)}>
                      <Eye size={14} /> Prep Notes
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
