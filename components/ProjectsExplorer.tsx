'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PROJECTS, type Project } from '@/lib/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';
import { getNodeIcon, iconSrc } from '@/lib/nodeIcons';
import ProjectShot from '@/components/ProjectShot';

const monogram = (label: string) => {
  const words = label.split(/[\s/]+/).filter(Boolean);
  return words.length > 1 ? words.map((w) => w[0]).join('').slice(0, 3).toUpperCase() : label.slice(0, 2);
};

type Filter = 'All' | Project['category'];

export default function ProjectsExplorer({ layout = 'carousel' }: { layout?: 'carousel' | 'grid' }) {
  const [filter, setFilter] = useState<Filter>('All');
  const { locale } = useLanguage();
  const t = dict[locale].projects;
  const t2 = dict[locale].projectDetail;

  const counts = useMemo(
    () => ({
      All: PROJECTS.length,
      DevOps: PROJECTS.filter((p) => p.category === 'DevOps').length,
      'Full-Stack': PROJECTS.filter((p) => p.category === 'Full-Stack').length,
    }),
    []
  );

  const visible = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  const track = layout === 'carousel' ? [...visible, ...visible] : visible;

  const renderCard = (project: Project, key: string, delayIndex = 0) => {
    const address = project.live ? project.live.replace(/^https?:\/\//, '') : '';
    const flow = (project.architectureFlow ?? []).slice(0, 4);

    return (
      <article className="proj-card spotlight" key={key} data-reveal style={{ transitionDelay: `${(delayIndex % visible.length) * 0.12}s` }}>
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className={`proj-stage proj-stage-${project.category === 'DevOps' ? 'devops' : 'fullstack'}`}
        >
          <span className="proj-badge">{project.category}</span>
          {project.live && <span className="proj-live">{t.viewLive}</span>}
          <div className="proj-window">
            <div className="proj-window-bar" aria-hidden="true">
              <span className="proj-window-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="proj-window-url">{address}</span>
            </div>
            {project.image ? (
              <ProjectShot
                src={project.image}
                preview={project.preview}
                slides={project.slides}
                alt={project.title[locale]}
                fit={project.imageFit}
                bg={project.imageBg}
              />
            ) : (
              <div className="proj-window-body">
                <div className="proj-flow" aria-hidden="true">
                  {flow.map((node, i) => {
                    const icon = getNodeIcon(node.label);
                    return (
                      <span className="proj-flow-step" key={node.label}>
                        <span className="proj-flow-node">
                          <span className="proj-flow-icon">
                            {icon ? (
                              <img src={iconSrc(icon)} alt="" width={24} height={24} />
                            ) : (
                              <b>{monogram(node.label)}</b>
                            )}
                          </span>
                          <span className="proj-flow-label">{node.label}</span>
                        </span>
                        {i < flow.length - 1 && <span className="proj-flow-arrow">→</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Link>
        <span className="proj-cursor" aria-hidden="true">
          {t.viewShort} ↗
        </span>
        <div className="proj-body">
          <h3>
            <Link href={`/projects/${project.slug}`}>{project.title[locale]}</Link>
          </h3>
          {project.note && <span className="proj-note">{project.note[locale]}</span>}
          <p>{project.description[locale]}</p>
          <div className="proj-stack">
            {project.stack.slice(0, 3).map((tech, i, arr) => (
              <span className="proj-stack-item" key={tech}>
                <span className="proj-stack-pill">{tech}</span>
                {i < arr.length - 1 && <span className="proj-stack-arrow">→</span>}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="proj-stack-pill proj-stack-more">+{project.stack.length - 3}</span>
            )}
          </div>
          <div className="proj-links">
            <Link href={`/projects/${project.slug}`}>{t2.viewDetails}</Link>
            <a href={project.repo} target="_blank" rel="noopener">
              {t.viewCode}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener"
                title={project.coldStart ? t.coldStartNote : undefined}
              >
                {t.viewLive}
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

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

      {layout === 'carousel' ? (
        <div className="proj-carousel-viewport">
          <div className="proj-carousel-track" style={{ animationDuration: `${visible.length * 7}s` }}>
            {track.map((project, i) => renderCard(project, `${project.slug}-${i}`, i))}
          </div>
        </div>
      ) : (
        <div className="proj-grid">{track.map((project, i) => renderCard(project, project.slug, i))}</div>
      )}

      <p className="proj-infra-note-global">{t.infraOffNote}</p>
    </>
  );
}
