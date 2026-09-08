'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function BlogContent() {
  const { locale } = useLanguage();
  const t = dict[locale].blog;

  return (
    <section className="section container">
      <div className="section-heading center" style={{ marginTop: '2rem' }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
      </div>
      <div className="blog-empty">
        <p>{t.echo}</p>
        <p className="section-sub">{t.sub}</p>
      </div>
    </section>
  );
}
