'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const { locale } = useLanguage();
  const t = dict[locale].home;

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a href="#contact" className="floating-cta magnetic">
        {t.btnStartProject}
      </a>
      <button
        type="button"
        className={`back-to-top${showTop ? ' visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </>
  );
}
