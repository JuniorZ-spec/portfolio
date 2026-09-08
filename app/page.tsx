'use client';

import Link from 'next/link';
import StatCounter from '@/components/StatCounter';
import RotatingWord from '@/components/RotatingWord';
import AboutContent from './about/AboutContent';
import ProjectsContent from './projects/ProjectsContent';
import ContactContent from './contact/ContactContent';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

const HERO_LOGOS = [
  { slug: 'aws', name: 'AWS', src: 'https://skillicons.dev/icons?i=aws' },
  { slug: 'azure', name: 'Azure', src: 'https://skillicons.dev/icons?i=azure' },
  { slug: 'docker', name: 'Docker' },
  { slug: 'kubernetes', name: 'Kubernetes' },
  { slug: 'terraform', name: 'Terraform' },
  { slug: 'ansible', name: 'Ansible' },
  { slug: 'githubactions', name: 'GitHub Actions' },
  { slug: 'jenkins', name: 'Jenkins' },
  { slug: 'argo', name: 'ArgoCD' },
  { slug: 'prometheus', name: 'Prometheus' },
  { slug: 'grafana', name: 'Grafana' },
  { slug: 'nodedotjs', name: 'Node.js' },
  { slug: 'react', name: 'React' },
  { slug: 'postgresql', name: 'PostgreSQL' },
];

export default function HomePage() {
  const { locale } = useLanguage();
  const t = dict[locale].home;

  return (
    <>
      {/* HERO */}
      <section className="hero-v2">
        <div className="hero-v2-inner container">
          <p className="hero-v2-eyebrow">
            <RotatingWord words={t.rotatingWords} />
          </p>
          <h1 className="hero-v2-headline">
            {t.heroHeadline1} <span className="accent-text">{t.heroHeadlineName}</span>
            <br />
            {t.heroHeadline2}
          </h1>
          <p className="hero-v2-subline">{t.heroSubline}</p>
          <div className="hero-v2-actions">
            <Link href="/contact" className="btn btn-primary btn-pill magnetic">
              {t.btnStartProject}
            </Link>
            <Link href="/projects" className="btn btn-outline btn-pill magnetic">
              {t.btnSeeWork}
            </Link>
            <Link href="/contact" className="btn btn-subtle btn-pill magnetic">
              {t.btnResume}
            </Link>
          </div>
          <div className="hero-v2-badges">
            {t.heroBadges.map((b) => (
              <a href={b.href} target="_blank" rel="noopener" className="hero-v2-badge" key={b.text}>
                <img className="hero-v2-badge-icon" src={b.icon} alt="" width={24} height={24} />
                {b.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats container">
        {t.stats.map((s, i) => (
          <div className="stat-card spotlight" key={s.label} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
            <StatCounter target={s.value} suffix={s.suffix} />
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* FEATURED TECH */}
      <section className="section container">
        <div className="section-heading center">
          <p className="eyebrow">{t.techEyebrow}</p>
          <h2>{t.techTitle}</h2>
          <p className="section-sub">{t.techSub}</p>
        </div>
        <div className="tech-grid">
          {HERO_LOGOS.map((logo, i) => (
            <div className="tech-card spotlight" key={logo.slug} data-reveal style={{ transitionDelay: `${(i % 7) * 0.06}s` }}>
              <img
                className="tech-icon"
                src={logo.src ?? `https://cdn.simpleicons.org/${logo.slug}`}
                alt=""
                width={32}
                height={32}
              />
              {logo.name}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT (bio, philosophy, career timeline, certifications) */}
      <div id="about">
        <AboutContent />
      </div>

      {/* WORK */}
      <div id="work">
        <ProjectsContent />
      </div>

      {/* HOW I WORK */}
      <section className="section container">
        <div className="section-heading center">
          <p className="eyebrow">{t.howEyebrow}</p>
          <h2>{t.howTitle}</h2>
          <p className="section-sub">{t.howSub}</p>
        </div>
        <div className="how-grid">
          {t.howSteps.map((step, i) => (
            <div className="how-card spotlight" key={step.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="how-step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="how-icon">{step.icon}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section container">
        <div className="section-heading center">
          <p className="eyebrow">{t.servicesEyebrow}</p>
          <h2>{t.servicesTitle}</h2>
          <p className="section-sub">{t.servicesSub}</p>
        </div>
        <div className="capability-grid services-grid">
          {t.services.map((s, i) => (
            <div className="capability-card service-card spotlight" key={s.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="capability-icon">{s.icon}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section container">
        <div className="section-heading center">
          <p className="eyebrow">{t.faqEyebrow}</p>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {t.faq.map((item, i) => (
            <details className="faq-item" key={item.q} data-reveal style={{ transitionDelay: `${i * 0.06}s` }}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <div id="contact">
        <ContactContent />
      </div>
    </>
  );
}
