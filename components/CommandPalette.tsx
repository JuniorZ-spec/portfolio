'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PROJECTS } from '@/lib/projects';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useTheme } from '@/lib/theme/ThemeContext';

type Item = {
  label: string;
  sub?: string;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { locale } = useLanguage();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const onOpenEvent = () => setOpen(true);
    window.addEventListener('open-cmdk', onOpenEvent);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('open-cmdk', onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  const items: Item[] = useMemo(() => {
    const nav: Item[] = [
      { label: 'Home', sub: '/', action: () => router.push('/') },
      { label: 'About', sub: '/#about', action: () => router.push('/#about') },
      { label: 'Work', sub: '/#work', action: () => router.push('/#work') },
      { label: 'Skills', sub: '/skills', action: () => router.push('/skills') },
      { label: 'Case Studies', sub: '/case-studies', action: () => router.push('/case-studies') },
      { label: 'Contact', sub: '/#contact', action: () => router.push('/#contact') },
      {
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      },
    ];
    const projects: Item[] = PROJECTS.map((p) => ({
      label: p.title[locale],
      sub: `/projects/${p.slug}`,
      action: () => router.push(`/projects/${p.slug}`),
    }));
    return [...nav, ...projects];
  }, [router, locale, theme, setTheme]);

  const filtered = items.filter((it) => it.label.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          className="cmdk-input"
          placeholder="Search pages, projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered[0]) {
              filtered[0].action();
              setOpen(false);
            }
          }}
        />
        <div className="cmdk-list">
          {filtered.length === 0 && <p className="cmdk-empty">No results</p>}
          {filtered.map((it) => (
            <button
              key={it.label}
              className="cmdk-item"
              onClick={() => {
                it.action();
                setOpen(false);
              }}
            >
              <span>{it.label}</span>
              {it.sub && <span className="cmdk-item-sub">{it.sub}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
