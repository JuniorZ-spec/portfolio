'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import RotatingWord from '@/components/RotatingWord';
import OrbitDiagram from '@/components/OrbitDiagram';
import LogoMarquee from '@/components/LogoMarquee';
import LiveClock from '@/components/LiveClock';
import { AboutIntro, Experience, Credentials } from './about/AboutContent';
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
  const [firstName, ...restName] = t.heroHeadlineName.split(' ');
  const lastName = restName.join(' ');
  const letters = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <span className="hero-letter" key={`${offset}-${i}`} style={{ '--i': offset + i } as CSSProperties} aria-hidden="true">
        {ch}
      </span>
    ));

  return (
    <>
      {/* HERO */}
      <section className="hero-v2 surface-light">
        <div className="hero-v2-inner container">
          <div className="hero-v2-copy">
            <p className="hero-v2-eyebrow">
              <RotatingWord words={t.rotatingWords} />
            </p>
            <h1 className="hero-name" aria-label={`${t.heroHeadline1} ${t.heroHeadlineName}`}>
              <span className="hero-name-hello">{t.heroHeadline1}</span>
              <span className="hero-name-outline">{letters(firstName, 0)}</span>
              <span className="hero-name-solid">{letters(lastName, firstName.length)}</span>
            </h1>
            <p className="hero-v2-tagline">{t.heroHeadline2}</p>
            <p className="hero-v2-proof">{t.heroProof}</p>
            <div className="hero-v2-actions">
              <Link href="/contact" className="btn btn-primary btn-pill magnetic">
                {t.btnStartProject}
              </Link>
              <Link href="/#work" className="btn btn-outline btn-pill magnetic">
                {t.btnSeeWork}
              </Link>
            </div>
            <div className="hero-v2-foot">
              {t.heroBadges.map((b) => (
                <a href={b.href} target="_blank" rel="noopener" className="hero-v2-badge" key={b.text}>
                  <img className="hero-v2-badge-icon" src={b.icon} alt="" width={24} height={24} />
                  {b.text}
                </a>
              ))}
              <p className="hero-v2-meta">
                <span>{dict[locale].footer.status}</span>
                <span>{t.heroMetaLocation}</span>
                <LiveClock />
              </p>
            </div>
          </div>
          <div className="hero-v2-visual">
            <OrbitDiagram />
          </div>
        </div>
      </section>

      {/* WORK */}
      <div id="work">
        <ProjectsContent showAllLink />
      </div>

      {/* TECH LOGO MARQUEE */}
      <LogoMarquee logos={HERO_LOGOS} />

      {/* ABOUT — white surface */}
      <div id="about">
        <AboutIntro />
      </div>

      {/* EXPERIENCE */}
      <div id="experience">
        <Experience />
      </div>

      {/* CERTIFICATIONS & LEARNING */}
      <div id="credentials">
        <Credentials />
      </div>

      {/* CONTACT */}
      <div id="contact">
        <ContactContent />
      </div>
    </>
  );
}
