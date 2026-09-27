'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';
import StatCounter from '@/components/StatCounter';
import AccentTitle from '@/components/AccentTitle';
import ItalicWord from '@/components/ItalicWord';
import { CATEGORIES } from '@/lib/skills';

const DEV_GROUPS = ['Languages', 'Frameworks', 'Databases'];
const namesFor = (groups: string[]) =>
  CATEGORIES.filter((c) => groups.includes(c.title.en)).flatMap((c) => c.skills.map((s) => s.name));
const DEV_TECH = namesFor(DEV_GROUPS);
const OPS_TECH = CATEGORIES.filter((c) => !DEV_GROUPS.includes(c.title.en)).flatMap((c) => c.skills.map((s) => s.name));

export function AboutIntro() {
  const { locale } = useLanguage();
  const t = dict[locale].about;
  const homeStats = dict[locale].home.stats;

  return (
    <div className="surface-light">
      <section className="section container">
        <div className="section-heading center" data-watermark={t.eyebrow}>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 data-num="02">
            <AccentTitle text={t.title} />
          </h2>
          <p className="section-sub">
            <ItalicWord text={t.sub} word={locale === 'fr' ? 'expérience' : 'experience'} />
          </p>
        </div>

        <div className="about-statement">
          <p className="about-statement-text">
            <ItalicWord text={t.aboutHeadline} word={locale === 'fr' ? 'fiables' : 'reliable'} />
          </p>
          <div className="about-bio-copy">
            <p>{t.bioLead}</p>
            <p>{t.bioP1}</p>
            <p>{t.bioP2}</p>
            <p>{t.bioP3}</p>
          </div>
        </div>

        <div className="about-stats">
          {homeStats.map((s) => (
            <div className="about-stat" key={s.label}>
              <span className="about-stat-num">
                <StatCounter target={s.value} suffix={s.suffix} />
              </span>
              <span className="about-stat-lab">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="eyebrow offer-eyebrow">{t.doEyebrow}</p>
        <div className="offer-grid">
          <div className="offer-card" data-reveal>
            <span className="offer-num">01</span>
            <h3>{t.devTitle}</h3>
            <p>{t.devText}</p>
            <div className="offer-tags">
              {DEV_TECH.map((tag) => (
                <span className="offer-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="offer-card offer-card-ops" data-reveal style={{ transitionDelay: '0.1s' }}>
            <span className="offer-num">02</span>
            <h3>{t.opsTitle}</h3>
            <p>{t.opsText}</p>
            <div className="offer-tags">
              {OPS_TECH.map((tag) => (
                <span className="offer-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function Experience() {
  const { locale } = useLanguage();
  const t = dict[locale].about;

  return (
    <section className="section container">
      <div className="section-heading center" data-watermark={locale === 'fr' ? 'EXPÉRIENCE' : 'EXPERIENCE'}>
        <p className="eyebrow">{t.timelineEyebrow}</p>
        <h2 data-num="03">
          <AccentTitle text={t.timelineTitle} />
        </h2>
        <p className="section-sub">
          <ItalicWord text={t.timelineSub} word="cloud" />
        </p>
      </div>
      <div className="role-list">
        {t.timeline.map((item, i) => (
          <div className="role-card spotlight" key={item.title} data-reveal style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="role-num">{String(t.timeline.length - i).padStart(2, '0')}</span>
            <div>
              <div className="role-meta">
                {i === 0 && <span className="role-current-dot" />}
                <span className="role-tag">{i === 0 ? t.currentRoleLabel : item.period}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="role-loc">{item.loc} · {item.period}</p>
              <p className="role-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Credentials() {
  const { locale } = useLanguage();
  const t = dict[locale].about;

  return (
    <div className="surface-light">
      <section className="section container">
        <div className="section-heading center" data-watermark={locale === 'fr' ? 'CERTIFS' : 'CERTS'}>
          <p className="eyebrow">{t.certEyebrow}</p>
          <h2 data-num="04">
            <AccentTitle text={t.certTitle} />
          </h2>
          <p className="section-sub">{t.certLegend}</p>
        </div>

        <div className="cert-ring">
          <a
            href="https://www.credly.com/badges/5d5a3911-780f-4f19-94dc-394a9556896d/public_url"
            target="_blank"
            rel="noopener"
            className="cert-featured"
            data-reveal
          >
            <img
              className="cert-featured-badge"
              src="/certs/aws-saa.png"
              alt="AWS Certified Solutions Architect – Associate"
              width={120}
              height={120}
            />
            <span className="cert-tag cert-tag-main">{t.certTagMain}</span>
            <h3>{t.certs[0]}</h3>
            <span className="cert-featured-link">{t.certVerify}</span>
          </a>

          {t.otherCerts.map((cert, i) => (
            <div className="cert-item" key={cert.title} data-reveal style={{ transitionDelay: `${(i % 3) * 0.07}s` }}>
              <span className="cert-tag">{t.certTagTraining}</span>
              <p className="cert-item-title">{cert.title}</p>
              <p className="cert-item-meta">
                {cert.issuer} · {cert.date}
              </p>
            </div>
          ))}
        </div>

        <div className="section-heading" style={{ marginTop: '4rem' }}>
          <p className="eyebrow">{t.learningEyebrow}</p>
          <h2>{t.learningTitle}</h2>
        </div>
        <div className="learning-grid">
          {t.learning.map((item, i) => (
            <div className="learning-card spotlight" key={item.title} data-reveal style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="learning-tag">{t.learningEyebrow}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function AboutContent() {
  return (
    <>
      <AboutIntro />
      <Experience />
      <Credentials />
    </>
  );
}
