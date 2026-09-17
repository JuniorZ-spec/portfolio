'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';
import { getNodeIcon } from '@/lib/nodeIcons';
import TerminalTyping from '@/components/TerminalTyping';

type Tab = 'overview' | 'features' | 'architecture' | 'implementation' | 'outcome';

export default function ProjectDetail({ project }: { project: Project }) {
  const { locale } = useLanguage();
  const t = dict[locale].projects;
  const t2 = dict[locale].projectDetail;
  const [tab, setTab] = useState<Tab>('overview');
  const [activeNode, setActiveNode] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: t2.tabOverview },
    ...(project.features ? [{ id: 'features' as Tab, label: t2.tabFeatures }] : []),
    ...(project.architectureFlow ? [{ id: 'architecture' as Tab, label: t2.tabArchitecture }] : []),
    ...(project.implementationSteps ? [{ id: 'implementation' as Tab, label: t2.tabImplementation }] : []),
    ...(project.outcome ? [{ id: 'outcome' as Tab, label: t2.tabOutcome }] : []),
  ];

  return (
    <section className="section container proj-detail">
      <Link href="/projects" className="proj-detail-back">
        ← {t2.backToProjects}
      </Link>

      <p className="proj-detail-tags">{project.stack.join(' · ')}</p>
      <h1 className="proj-detail-title">{project.title[locale]}</h1>
      <p className="proj-detail-desc">{project.description[locale]}</p>

      <div className="proj-stack" style={{ margin: '1.2rem 0' }}>
        {project.stack.map((tech, i) => (
          <span className="proj-stack-item" key={tech}>
            <span className="proj-stack-pill">{tech}</span>
            {i < project.stack.length - 1 && <span className="proj-stack-arrow">→</span>}
          </span>
        ))}
      </div>

      <div className="proj-detail-actions">
        <a href={project.repo} target="_blank" rel="noopener" className="btn btn-primary btn-pill">
          {t.viewCode}
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener" className="btn btn-outline btn-pill">
            {t.viewLive}
          </a>
        )}
      </div>

      <div className="proj-detail-tabbar">
        {tabs.map((tb, i) => (
          <button
            key={tb.id}
            type="button"
            className={`proj-detail-tab${tab === tb.id ? ' active' : ''}`}
            onClick={() => setTab(tb.id)}
          >
            {String(i + 1).padStart(2, '0')} {tb.label}
          </button>
        ))}
      </div>

      <div className="proj-detail-panel" data-reveal>
        {tab === 'overview' && (
          <div>
            <p className="eyebrow">{String(tabs.findIndex((tb) => tb.id === 'overview') + 1).padStart(2, '0')} — {t2.tabOverview.toUpperCase()}</p>
            <h2>{t2.overviewHeading}</h2>
            <p className="proj-detail-panel-text">{project.description[locale]}</p>
            {project.note && <p className="proj-note" style={{ marginTop: '0.8rem' }}>{project.note[locale]}</p>}
            {project.coldStart && <p className="proj-infra-note" style={{ marginTop: '0.8rem' }}>{t.coldStartNote}</p>}
            {!project.live && <p className="proj-infra-note-global" style={{ marginTop: '1.2rem', textAlign: 'left' }}>{t.infraOffNote}</p>}
          </div>
        )}

        {tab === 'features' && project.features && (
          <div>
            <p className="eyebrow">{String(tabs.findIndex((tb) => tb.id === 'features') + 1).padStart(2, '0')} — {t2.tabFeatures.toUpperCase()}</p>
            <h2>{t2.featuresHeading}</h2>
            <div className="capability-grid">
              {project.features.map((f, i) => (
                <div className="capability-card" key={f[locale]}>
                  <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{f[locale]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'architecture' && project.architectureFlow && (
          <div>
            <p className="eyebrow">{String(tabs.findIndex((tb) => tb.id === 'architecture') + 1).padStart(2, '0')} — {t2.tabArchitecture.toUpperCase()}</p>
            <h2>{t2.architectureHeading}</h2>
            <p className="proj-detail-panel-text" style={{ marginBottom: '1.4rem' }}>{t2.architectureHint}</p>
            <div className="arch-flow-toolbar">
              <button type="button" className="arch-flow-expand-btn" onClick={() => setExpanded(true)}>
                {t2.expandDiagram} ↗
              </button>
            </div>
            {expanded && <div className="arch-flow-backdrop" onClick={() => setExpanded(false)} />}
            <div className={`arch-flow-layout${expanded ? ' arch-flow-layout-expanded' : ''}`}>
              {expanded && (
                <button
                  type="button"
                  className="arch-flow-close"
                  aria-label={t2.closeDiagram}
                  onClick={() => setExpanded(false)}
                >
                  ×
                </button>
              )}
              <div className="arch-flow">
                {project.architectureFlow.map((node, i) => {
                  const icon = getNodeIcon(node.label);
                  return (
                    <div className="arch-flow-item" key={node.label}>
                      <button
                        type="button"
                        className={`arch-flow-node${activeNode === i ? ' active' : ''}`}
                        onMouseEnter={() => setActiveNode(i)}
                        onFocus={() => setActiveNode(i)}
                        onClick={() => setActiveNode(i)}
                      >
                        {icon && (
                          <img className="arch-flow-node-icon" src={`https://cdn.simpleicons.org/${icon}`} alt="" width={22} height={22} />
                        )}
                        <strong>{node.label}</strong>
                        <span>{node.sub}</span>
                      </button>
                      {i < project.architectureFlow!.length - 1 && (
                        <span className="arch-flow-connector">
                          <span className="arch-flow-dot" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="arch-flow-info">
                <h3>{project.architectureFlow[activeNode].label}</h3>
                <p>
                  {project.architectureFlow[activeNode].desc?.[locale] ?? project.architectureFlow[activeNode].sub}
                </p>
              </div>
            </div>
            {project.terminalCommands && (
              <div className="terminal-window" style={{ marginTop: '2rem' }}>
                <div className="terminal-bar">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-amber"></span>
                  <span className="dot dot-green"></span>
                  <span className="terminal-title">TERMINAL</span>
                </div>
                <div className="terminal-body">
                  <TerminalTyping lines={project.terminalCommands} />
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'implementation' && project.implementationSteps && (
          <div>
            <p className="eyebrow">{String(tabs.findIndex((tb) => tb.id === 'implementation') + 1).padStart(2, '0')} — {t2.tabImplementation.toUpperCase()}</p>
            <h2>{t2.implementationHeading}</h2>
            <div className="impl-steps">
              {project.implementationSteps[locale].map((step, i) => (
                <div className="impl-step" key={step}>
                  <span className="impl-step-num">{String(i + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'outcome' && project.outcome && (
          <div>
            <p className="eyebrow">{String(tabs.findIndex((tb) => tb.id === 'outcome') + 1).padStart(2, '0')} — {t2.tabOutcome.toUpperCase()}</p>
            <h2>{t2.outcomeHeading}</h2>
            <ul className="outcome-list">
              {project.outcome[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
