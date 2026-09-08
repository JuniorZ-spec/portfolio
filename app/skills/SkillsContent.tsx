'use client';

import { CATEGORIES } from '@/lib/skills';
import SkillTerminal from '@/components/SkillTerminal';
import ProficiencyBar from '@/components/ProficiencyBar';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { dict } from '@/lib/i18n/dictionary';

export default function SkillsContent() {
  const { locale } = useLanguage();
  const t = dict[locale].skills;

  return (
    <section className="section container">
      <div className="section-heading center" style={{ marginTop: '2rem' }}>
        <p className="eyebrow">{t.eyebrow}</p>
        <h2>{t.title}</h2>
        <p className="section-sub">{t.sub}</p>
        <div className="cmd-dots" aria-hidden="true">
          <span className="dot dot-red"></span>
          <span className="dot dot-amber"></span>
          <span className="dot dot-green"></span>
        </div>
      </div>

      <div className="skills-grid">
        {CATEGORIES.map((category) => (
          <div className="skill-category" key={category.title.fr}>
            <div className="skill-category-header">
              <span className="skill-category-icon">{category.icon}</span>
              <h3>{category.title[locale]}</h3>
            </div>
            <div className="skill-items">
              {category.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-item-name">
                    <span className="skill-item-icon">{skill.icon}</span>
                    {skill.name}
                  </div>
                  <div className="proficiency-row">
                    <span>{t.proficiency}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <ProficiencyBar level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE SKILL EXPLORER */}
      <div className="section-heading center" style={{ marginTop: '4rem' }}>
        <p className="eyebrow">{t.explorerEyebrow}</p>
        <h2>{t.explorerTitle}</h2>
        <p className="section-sub">{t.explorerSub}</p>
      </div>
      <SkillTerminal />

      <h3 className="skills-cat" style={{ marginTop: '4rem' }}>
        {t.practicesTitle}
      </h3>
      <div className="skills-list">
        {t.practices.map((practice) => (
          <span key={practice}>{practice}</span>
        ))}
      </div>
    </section>
  );
}
