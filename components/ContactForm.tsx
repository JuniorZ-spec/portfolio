'use client';

import { useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const { locale } = useLanguage();
  const t = dict[locale].contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value ?? '';
    const email = emailRef.current?.value ?? '';
    const message = messageRef.current?.value ?? '';

    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:zinzindohouejunior@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" placeholder={t.formName} required ref={nameRef} />
      <input type="email" placeholder={t.formEmail} required ref={emailRef} />
      <textarea placeholder={t.formMessage} required ref={messageRef}></textarea>
      <button type="submit" className="btn btn-primary">
        {t.formSend}
      </button>
    </form>
  );
}
