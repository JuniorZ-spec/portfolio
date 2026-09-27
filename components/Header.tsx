'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';
import { useTheme } from '@/lib/theme/ThemeContext';
import ScrollProgress from './ScrollProgress';
import CubeMark from './CubeMark';

import { PROJECTS } from '@/lib/projects';
import { dict as fullDict } from '@/lib/i18n/dictionary';
import { ARTICLES } from '@/lib/articles';
import { CATEGORIES } from '@/lib/skills';

const WORK_COUNT = PROJECTS.length;
const EXPERIENCE_COUNT = fullDict.fr.about.timeline.length;
const SKILLS_COUNT = CATEGORIES.reduce((n, c) => n + c.skills.length, 0);
const ARTICLES_COUNT = ARTICLES.filter((a) => a.status === 'published').length;

const NAV_LINKS = [
  { href: '/#about', label: 'About', count: null },
  { href: '/#work', label: 'Work', count: WORK_COUNT },
  { href: '/#experience', label: 'Experience', count: EXPERIENCE_COUNT },
  { href: '/skills', label: 'Skills', count: SKILLS_COUNT },
  { href: '/articles', label: 'Articles', count: ARTICLES_COUNT },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLanguage();
  const { theme, setTheme } = useTheme();
  const t = dict[locale].nav;

  return (
    <header className="header">
      <ScrollProgress />
      <nav className="nav container">
        <Link href="/" className="logo">
          <CubeMark size={24} /> OJ
        </Link>
        <button className="nav-toggle" aria-label={t.openMenu} onClick={() => setOpen((v) => !v)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`nav-links${open ? ' open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
              {link.count !== null && <span className="nav-count">[{link.count}]</span>}
            </Link>
          ))}
          <Link href="/#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Contact
          </Link>
          <div className="lang-switch">
            <button
              type="button"
              className={locale === 'fr' ? 'active' : ''}
              onClick={() => setLocale('fr')}
            >
              FR
            </button>
            <button
              type="button"
              className={locale === 'en' ? 'active' : ''}
              onClick={() => setLocale('en')}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="theme-switch"
            aria-label="Toggle dark/light theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            type="button"
            className="cmdk-trigger"
            aria-label="Open command palette"
            onClick={() => window.dispatchEvent(new CustomEvent('open-cmdk'))}
          >
            Ctrl K
          </button>
        </div>
      </nav>
    </header>
  );
}
