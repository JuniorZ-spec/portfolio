'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';
import StatCounter from '@/components/StatCounter';

export default function AboutContent() {
  const { locale } = useLanguage();
  const t = dict[locale].about;
  const homeStats = dict[locale].home.stats;

  return (
    <section className="section container">
      <div className="section-heading center" style={{ marginTop: '2rem' }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
      </div>

      <div className="about-hero">
        <div className="about-stat-list">
          {homeStats.map((s) => (
            <div className="about-stat-row" key={s.label}>
              <span className="about-stat-number">
                <StatCounter target={s.value} suffix={s.suffix} />
              </span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="about-bio">
          <p className="about-headline">{t.aboutHeadline}</p>
          <p>{t.bioLead}</p>
          <p>{t.bioP1}</p>
          <p>{t.bioP2}</p>
          <p>{t.bioP3}</p>
        </div>

        <div className="capability-grid">
          {t.capabilities.map((cap, i) => (
            <div
              className="capability-card spotlight"
              key={cap.title}
              data-reveal
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <span className="capability-icon">{cap.icon}</span>
              <span>{cap.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CAREER TIMELINE */}
      <div className="section-heading center" style={{ marginTop: '3.5rem' }}>
        <p className="eyebrow">{t.timelineEyebrow}</p>
        <h2>{t.timelineTitle}</h2>
        <p className="section-sub">{t.timelineSub}</p>
      </div>
      <div className="timeline">
        {t.timeline.map((item, i) => (
          <div className="timeline-item" key={item.title} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="timeline-marker">{item.icon}</span>
            <div className="timeline-card">
              <div className="timeline-top">
                <h3>{item.title}</h3>
                <span className="tag">{item.period}</span>
              </div>
              <p className="timeline-loc">{item.loc}</p>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CERTIFICATIONS */}
      <div className="section-heading" style={{ marginTop: '3.5rem' }}>
        <p className="eyebrow">{t.certEyebrow}</p>
        <h2>{t.certTitle}</h2>
      </div>
      <a
        href="https://www.credly.com/badges/5d5a3911-780f-4f19-94dc-394a9556896d/public_url"
        target="_blank"
        rel="noopener"
        className="cert-featured spotlight"
        data-reveal
      >
        <img
          className="cert-featured-badge"
          src="/certs/aws-saa.png"
          alt="AWS Certified Solutions Architect – Associate"
          width={72}
          height={72}
        />
        <div>
          <h3>{t.certs[0]}</h3>
          <span className="cert-featured-link">{t.certVerify}</span>
        </div>
      </a>

      <h3 className="skills-cat" style={{ marginTop: '2rem' }}>
        {t.otherCertsTitle}
      </h3>
      <div className="cert-list">
        {t.otherCerts.map((cert, i) => (
          <div className="cert-item spotlight" key={cert.title} data-reveal style={{ transitionDelay: `${(i % 4) * 0.06}s` }}>
            <p className="cert-item-title">{cert.title}</p>
            <p className="cert-item-meta">
              {cert.issuer} · {cert.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
