'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/articles';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function ArticleDetail({ article }: { article: Article }) {
  const { locale } = useLanguage();
  const t = dict[locale].articles;
  const sections = article.sections ?? [];
  const [active, setActive] = useState(sections[0]?.id);

  return (
    <section className="section container">
      <Link href="/articles" className="proj-detail-back">
        ← {t.backToArticles}
      </Link>

      <div className="article-header-card">
        <p className="proj-detail-tags">
          {article.category} · {article.status === 'published' ? 'PUBLISHED' : 'ROADMAP'}
        </p>
        <h1 className="proj-detail-title">{article.title}</h1>
        <p className="proj-detail-desc">{article.description}</p>
        <p className="article-meta">
          {article.date} · {article.readTime}
        </p>
        <div className="proj-stack" style={{ marginTop: '1rem' }}>
          {article.tags.map((tag) => (
            <span className="proj-stack-pill" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="article-layout">
        <aside className="article-toc">
          <p className="article-toc-label">{t.onThisPage}</p>
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`article-toc-item${active === s.id ? ' active' : ''}`}
              onClick={() => setActive(s.id)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span> {s.title}
            </a>
          ))}
          {article.pitfalls && (
            <a
              href="#pitfalls"
              className={`article-toc-item${active === 'pitfalls' ? ' active' : ''}`}
              onClick={() => setActive('pitfalls')}
            >
              <span>{String(sections.length + 1).padStart(2, '0')}</span> {t.pitfallsTitle}
            </a>
          )}
        </aside>

        <div className="article-body">
          {sections.map((s, i) => (
            <div className="article-section" id={s.id} key={s.id}>
              <p className="eyebrow">
                {String(i + 1).padStart(2, '0')} — {s.title.toUpperCase()}
              </p>
              <h2>{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="article-p">
                  {p}
                </p>
              ))}
              {s.code && (
                <div className="terminal-window" style={{ marginTop: '1.4rem' }}>
                  <div className="terminal-bar">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-amber"></span>
                    <span className="dot dot-green"></span>
                    <span className="terminal-title">{s.code.title}</span>
                  </div>
                  <div className="terminal-body">
                    {s.code.lines.map((line) => (
                      <p key={line} className="proj-detail-cmd">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {article.pitfalls && (
            <div className="article-section" id="pitfalls">
              <p className="eyebrow">
                {String(sections.length + 1).padStart(2, '0')} — {t.pitfallsTitle.toUpperCase()}
              </p>
              <h2>{t.pitfallsTitle}</h2>
              <p className="article-p">{t.pitfallsSub}</p>
              <div className="pitfall-list">
                {article.pitfalls.map((p) => (
                  <div className="pitfall-card" key={p.problem}>
                    <h3>{p.problem}</h3>
                    <p>
                      <strong>{t.cause}:</strong> {p.cause}
                    </p>
                    <p>
                      <strong>{t.fix}:</strong> {p.fix}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {article.sourceRepo && (
            <a href={article.sourceRepo} target="_blank" rel="noopener" className="article-link">
              {t.sourceRepo}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
