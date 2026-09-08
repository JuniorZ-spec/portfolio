'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useLanguage();
  const t = dict[locale].footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-social">
          <a
            href="https://github.com/JuniorZ-spec"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.08 1.84 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/olivierjrzz/"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56z" />
            </svg>
          </a>
          <a href="mailto:zinzindohouejunior@gmail.com" aria-label="Email">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 6l-10 7L2 6" />
              <path d="M2 6h20v12H2z" />
            </svg>
          </a>
        </div>
        <div className="footer-terminal">
          <p>
            <span className="cmd-prompt">$</span> cat copyright.txt
          </p>
          <p className="footer-copy">
            © {year} {t.copyright}
          </p>
          <p className="footer-status">
            <span className="status-dot"></span> {t.status}
          </p>
        </div>
      </div>
    </footer>
  );
}
