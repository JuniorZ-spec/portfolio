'use client';

import Link from 'next/link';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import AccentTitle from '@/components/AccentTitle';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function ProjectsContent({ showAllLink = false }: { showAllLink?: boolean }) {
  const { locale } = useLanguage();
  const t = dict[locale].projects;

  return (
    <section className="section container">
      <div className="section-heading center" data-watermark={t.eyebrow}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2 data-num="01">
          <AccentTitle text={t.title} />
        </h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <ProjectsExplorer layout={showAllLink ? 'carousel' : 'grid'} />

      <div className="section-more">
        {showAllLink && (
          <Link href="/projects" className="btn btn-outline btn-pill">
            {t.viewAll}
          </Link>
        )}
        <a href="https://github.com/JuniorZ-spec" target="_blank" rel="noopener" className="section-more-link">
          {t.moreOnGithub}
        </a>
      </div>
    </section>
  );
}
