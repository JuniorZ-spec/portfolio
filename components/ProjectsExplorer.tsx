'use client';

import { useMemo, useState } from 'react';
import { PROJECTS, type Project } from '@/lib/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

type Filter = 'All' | Project['category'];

export default function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>('All');
  const { locale } = useLanguage();
  const t = dict[locale].projects;

  const counts = useMemo(
    () => ({
      All: PROJECTS.length,
      DevOps: PROJECTS.filter((p) => p.category === 'DevOps').length,
      'Full-Stack': PROJECTS.filter((p) => p.category === 'Full-Stack').length,
    }),
    []
  );

  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <div className="project-filter-bar">
        {(['All', 'DevOps', 'Full-Stack'] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn${filter === f ? ' active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'All' ? t.filterAll : f}
            <span className="filter-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className="cards-grid">
        {visible.map((project, i) => (
          <article
            className="proj-card spotlight"
            key={project.slug}
            data-reveal
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
          >
            <div className="proj-banner">
              {project.image ? (
                <img
                  className="proj-banner-photo"
                  src={project.image}
                  alt={project.title[locale]}
                  width={600}
                  height={400}
                  loading="lazy"
                />
              ) : (
                <div className="proj-banner-fallback">
                  <img
                    src={`https://cdn.simpleicons.org/${project.logo}`}
                    alt=""
                    width={56}
                    height={56}
                  />
                </div>
              )}
              <span
                className={`proj-badge proj-badge-${project.category === 'DevOps' ? 'devops' : 'fullstack'}`}
              >
                {project.category}
              </span>
            </div>
            <div className="proj-body">
              <h3>{project.title[locale]}</h3>
              {project.note && <span className="proj-note">{project.note[locale]}</span>}
              <p>{project.description[locale]}</p>
              <div className="proj-stack">
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="proj-links">
                <a href={project.repo} target="_blank" rel="noopener">
                  {t.viewCode}
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener">
                    {t.viewLive}
                  </a>
                )}
              </div>
              {project.coldStart && <p className="proj-infra-note">{t.coldStartNote}</p>}
            </div>
          </article>
        ))}
      </div>

      <p className="proj-infra-note-global">{t.infraOffNote}</p>
    </>
  );
}
