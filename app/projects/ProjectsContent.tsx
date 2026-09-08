'use client';

import Link from 'next/link';
import { PROJECTS } from '@/lib/projects';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function ProjectsContent() {
  const { locale } = useLanguage();
  const t = dict[locale].projects;
  const devopsCount = PROJECTS.filter((p) => p.category === 'DevOps').length;
  const fullStackCount = PROJECTS.filter((p) => p.category === 'Full-Stack').length;
  const techCount = new Set(PROJECTS.flatMap((p) => p.stack)).size;

  return (
    <section className="section container">
      <div className="section-heading center" style={{ marginTop: '2rem' }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
        <div className="cmd-dots" aria-hidden="true">
          <span className="dot dot-red"></span>
          <span className="dot dot-amber"></span>
          <span className="dot dot-green"></span>
        </div>
      </div>

      <ProjectsExplorer />

      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <a
          href="https://github.com/JuniorZ-spec"
          target="_blank"
          rel="noopener"
          style={{ color: 'var(--accent)', fontSize: '0.9rem' }}
        >
          {t.moreOnGithub}
        </a>
      </p>

      {/* SUMMARY */}
      <div className="terminal-window" style={{ marginTop: '3.5rem' }}>
        <div className="terminal-bar">
          <span className="dot dot-red"></span>
          <span className="dot dot-amber"></span>
          <span className="dot dot-green"></span>
          <span className="terminal-title">{t.summaryTitle}</span>
        </div>
        <div className="terminal-body">
          <div className="stat-row">
            <span>{t.totalProjects}</span>
            <span className="stat-val">{PROJECTS.length}</span>
          </div>
          <div className="stat-row">
            <span>{t.devopsProjects}</span>
            <span className="stat-val">{devopsCount}</span>
          </div>
          <div className="stat-row">
            <span>{t.fullStackProjects}</span>
            <span className="stat-val">{fullStackCount}</span>
          </div>
          <div className="stat-row">
            <span>{t.techUsed}</span>
            <span className="stat-val">{techCount}+</span>
          </div>
          <p style={{ marginTop: '1rem', color: 'var(--muted)', fontSize: '0.88rem' }}>
            {t.summaryEcho}
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-card" style={{ marginTop: '2.5rem' }}>
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <div className="hero-actions center">
          <a
            href="https://github.com/JuniorZ-spec"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
          >
            {t.ctaViewAll}
          </a>
          <Link href="/contact" className="btn btn-secondary">
            {t.ctaStart}
          </Link>
        </div>
      </div>
    </section>
  );
}
