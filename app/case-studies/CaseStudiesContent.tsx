'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function CaseStudiesContent() {
  const { locale } = useLanguage();
  const t = dict[locale].caseStudies;

  return (
    <section className="section container">
      <div className="section-heading center" style={{ marginTop: '2rem' }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>
      <div className="cards-grid">
        {t.studies.map((study, i) => (
          <article
            className="case-card spotlight"
            key={study.title}
            data-reveal
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{study.title}</h3>
            <p>
              <strong>{t.problem}</strong> {study.problem}
            </p>
            <p>
              <strong>{t.solution}</strong> {study.solution}
            </p>
            <p>
              <strong>{t.result}</strong> {study.result}
            </p>
            <a href="https://github.com/JuniorZ-spec" target="_blank" rel="noopener" className="article-link">
              {t.viewRepo}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
