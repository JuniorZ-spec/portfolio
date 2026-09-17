'use client';

import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function ArticlesContent() {
  const { locale } = useLanguage();
  const t = dict[locale].articles;

  return (
    <section className="section container">
      <div className="section-heading" style={{ marginTop: '2rem' }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="articles-grid">
        {ARTICLES.map((a, i) => (
          <div className="article-card spotlight" key={a.slug} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="article-num">{String(i + 1).padStart(2, '0')}</span>
            <p className="article-tag">
              {a.category} · {a.status === 'published' ? 'PUBLISHED' : 'ROADMAP'}
            </p>
            <h3>{a.title}</h3>
            <p className="article-desc">{a.description}</p>
            <div className="proj-stack" style={{ margin: '1rem 0' }}>
              {a.tags.slice(0, 3).map((tag) => (
                <span className="proj-stack-pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {a.status === 'published' ? (
              <Link href={`/articles/${a.slug}`} className="article-link">
                {t.readArticle}
              </Link>
            ) : (
              <span className="article-link article-link-disabled">{t.readArticle}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
