'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';
import { useTheme } from '@/lib/theme/ThemeContext';
import ScrollProgress from './ScrollProgress';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Work' },
  { href: '/skills', label: 'Skills' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/#contact', label: 'Contact' },
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
          <span className="prompt">&gt;_</span> OJ
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
            </Link>
          ))}
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
        </div>
      </nav>
    </header>
  );
}
