import React, { useState } from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, Sliders, Cpu, GitBranch } from 'lucide-react';

export default function AiQuestionBuilder({ onAddJob }) {
  const [jobTitle, setJobTitle] = useState('Senior Cloud Architect');
  const [clientName, setClientName] = useState('FinTech Global');
  const [minScore, setMinScore] = useState(75);
  const [mustHaveInput, setMustHaveInput] = useState('AWS Services, Kubernetes, 5+ Yrs Exp');
  const [knockoutRule, setKnockoutRule] = useState('Incorrect response on Kubernetes cluster failover OR score < 75%');
  const [promptText, setPromptText] = useState('Generate 4 adaptive questions ranging from System Architecture to Kubernetes Security, with 1 mandatory knockout prerequisite check.');

  const [aiModel, setAiModel] = useState('Gemini 1.5 Pro / GPT-4o');
  const [routerStrategy, setRouterStrategy] = useState('Dynamic Difficulty Adaptation (SmartRouter)');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedDraft({
        title: jobTitle,
        client: clientName,
        minScore: minScore,
        mustHaves: mustHaveInput.split(',').map(s => s.trim()),
        knockoutRule: knockoutRule,
        generatorConfig: {
          modelName: aiModel,
          strategy: routerStrategy
        },
        questions: [
          {
            id: 1,
            text: `[Prerequisite Knockout] Do you have hands-on experience designing Kubernetes clusters for production workloads?`,
            type: 'Must-Have Check (Knockout Enabled)',
            difficulty: 'Easy'
          },
          {
            id: 2,
            text: `How do you resolve memory leaks in a distributed Node.js/Go microservices pod under high traffic spikes?`,
            type: 'Technical System Design',
            difficulty: 'Medium'
          },
          {
            id: 3,
            text: `Explain your strategy for zero-downtime database migration across multi-region cloud providers.`,
            type: 'Advanced Cloud Architecture',
            difficulty: 'Hard'
          }
        ]
      });
    }, 1200);
  };

  const handlePublish = () => {
    if (!generatedDraft) return;
    onAddJob({
      id: `job-${Date.now().toString().slice(-4)}`,
      title: generatedDraft.title,
      client: generatedDraft.client,
      location: 'Remote / Agency Screened',
      minScore: generatedDraft.minScore,
      mustHaves: generatedDraft.mustHaves,
      knockoutRule: generatedDraft.knockoutRule,
      questionsCount: generatedDraft.questions.length,
      status: 'Active',
      applicantsCount: 0
    });
    alert('Assessment Published to QuestionBank & Agency Shortlisting Hub!');
    setGeneratedDraft(null);
  };

  return (
    <div style={{ padding: '24px 0', maxWidth: '1050px', margin: '0 auto' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.1))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-purple">Phase 1 Setup: AI Engine & Criteria Configuration</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class Diagram Module: AIQuestionGenerator + SmartRouter</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: '#fff' }}>
              AI Question Generator & FilterCriteria Setup
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '4px' }}>
              Configure prompt templates, dynamic routing rules (`SmartRouter`), minimum score cutoffs (`FilterCriteria`), and mandatory knockout prerequisites.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Form */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#ec4899" /> AI Generator & Filter Parameters
          </h3>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Target Job Role</label>
              <input 
                type="text" 
                className="form-input"
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Client Organization</label>
              <input 
                type="text" 
                className="form-input"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>AI Model Name</label>
                <select 
                  className="form-select"
                  value={aiModel}
                  onChange={e => setAiModel(e.target.value)}
                >
                  <option value="Gemini 1.5 Pro / GPT-4o">Gemini Pro / GPT-4o</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Routing Engine Strategy</label>
                <select 
                  className="form-select"
                  value={routerStrategy}
                  onChange={e => setRouterStrategy(e.target.value)}
                >
                  <option value="Dynamic Difficulty Adaptation (SmartRouter)">SmartRouter Adaptive</option>
                  <option value="Linear Evaluation">Linear Evaluation</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>FilterCriteria Cutoff (%)</label>
                <input 
                  type="number" 
                  className="form-input"
                  min="50" max="95"
                  value={minScore}
                  onChange={e => setMinScore(Number(e.target.value))}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Must-Have Criteria</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={mustHaveInput}
                  onChange={e => setMustHaveInput(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: '#f87171', display: 'block', marginBottom: '4px' }}>
                <ShieldAlert size={14} style={{ display: 'inline', marginRight: '4px' }} /> Knockout Prerequisite Rule (`RoutingRule`)
              </label>
              <input 
                type="text" 
                className="form-input"
                style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}
                value={knockoutRule}
                onChange={e => setKnockoutRule(e.target.value)}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Prompt Template (`promptTemplate` attribute)</label>
              <textarea 
                rows="3"
                className="form-textarea"
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isGenerating}
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', padding: '12px' }}
            >
              {isGenerating ? 'Drafting Questions...' : 'Generate Questionnaire & Options'} <Sparkles size={16} />
            </button>
          </form>
        </div>

        {/* Right Draft Preview */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitBranch size={18} color="#818cf8" /> QuestionBank & SmartRouter Preview
          </h3>

          {generatedDraft ? (
            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '14px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{generatedDraft.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Client: {generatedDraft.client} • Min Score Cutoff: <strong style={{ color: '#34d399' }}>{generatedDraft.minScore}%</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#818cf8', marginTop: '2px' }}>
                  AI Engine: {generatedDraft.generatorConfig.modelName} • Strategy: {generatedDraft.generatorConfig.strategy}
                </div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', color: '#f87171', marginBottom: '16px' }}>
                <ShieldAlert size={14} style={{ display: 'inline', marginRight: '6px' }} />
                <strong>Knockout Rule:</strong> {generatedDraft.knockoutRule}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {generatedDraft.questions.map((q, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>Q{q.id}: {q.type}</span>
                      <span className={`badge diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#fff' }}>{q.text}</div>
                  </div>
                ))}
              </div>

              <button 
                className="btn btn-emerald" 
                style={{ width: '100%', padding: '12px' }}
                onClick={handlePublish}
              >
                <CheckCircle2 size={16} /> Publish Questionnaire to QuestionBank
              </button>
            </div>
          ) : (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Cpu size={40} style={{ opacity: 0.4, marginBottom: '12px' }} />
              <p style={{ fontSize: '0.9rem' }}>Fill in prompt & criteria on the left and click "Generate Questionnaire & Options" to view the AI question draft.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
