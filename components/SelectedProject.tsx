'use client';

import Link from 'next/link';
import { PROJECTS } from '@/lib/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function SelectedProject({ slug }: { slug: string }) {
  const { locale } = useLanguage();
  const t = dict[locale].home;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;

  return (
    <section className="section container">
      <div className="section-heading">
        <p className="eyebrow">{t.selectedEyebrow}</p>
        <h2>{t.selectedTitle}</h2>
        <p className="section-sub">{t.selectedSub}</p>
      </div>

      <Link href={`/projects/${project.slug}`} className="selected-project spotlight" data-reveal>
        <span className="selected-project-num">01</span>
        <p className="proj-detail-tags">{project.stack[0]}</p>
        <h3 className="selected-project-title">{project.title[locale]}</h3>
        <p className="proj-detail-panel-text selected-project-desc">{project.description[locale]}</p>

        {project.highlights && (
          <div className="proj-stack" style={{ margin: '1rem 0' }}>
            {project.highlights[locale].map((h, i) => (
              <span className="proj-stack-item" key={h}>
                <span className="proj-stack-pill">{h}</span>
                {i < project.highlights![locale].length - 1 && <span className="proj-stack-arrow">→</span>}
              </span>
            ))}
          </div>
        )}

        <span className="article-link">{t.selectedViewCaseStudy}</span>
      </Link>
    </section>
  );
}
