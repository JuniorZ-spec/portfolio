'use client';

import ContactForm from '@/components/ContactForm';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function ContactContent() {
  const { locale } = useLanguage();
  const t = dict[locale].contact;

  return (
    <section className="section" style={{ marginTop: '1.5rem' }}>
      <div className="container contact-box">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
          <div className="contact-info">
            <p>
              📧 <a href="mailto:zinzindohouejunior@gmail.com">zinzindohouejunior@gmail.com</a>
            </p>
            <p>
              📞 <a href="tel:+2290194960226">+229 01 94 96 02 26</a>
            </p>
            <p>
              💼{' '}
              <a href="https://www.linkedin.com/in/olivierjrzz/" target="_blank" rel="noopener">
                linkedin.com/in/olivierjrzz
              </a>
            </p>
            <p>
              💻{' '}
              <a href="https://github.com/JuniorZ-spec" target="_blank" rel="noopener">
                github.com/JuniorZ-spec
              </a>
            </p>
            <p>{t.location}</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
