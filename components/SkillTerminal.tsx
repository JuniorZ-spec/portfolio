'use client';

import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '@/lib/skills';
import { useLanguage, type Locale } from '@/lib/i18n/LanguageContext';

type Line = { type: 'welcome' | 'command' | 'output'; text: string };

const CATEGORY_ALIASES: Record<string, string> = {
  langages: 'Langages',
  languages: 'Langages',
  lang: 'Langages',
  frameworks: 'Frameworks',
  framework: 'Frameworks',
  database: 'Bases de données',
  databases: 'Bases de données',
  db: 'Bases de données',
  cloud: 'Plateformes Cloud',
  containers: 'Conteneurs & Orchestration',
  container: 'Conteneurs & Orchestration',
  docker: 'Conteneurs & Orchestration',
  kubernetes: 'Conteneurs & Orchestration',
  iac: 'Infrastructure as Code',
  terraform: 'Infrastructure as Code',
  cicd: 'CI/CD & Automatisation',
  ci: 'CI/CD & Automatisation',
  automation: 'CI/CD & Automatisation',
  supervision: 'Supervision',
  monitoring: 'Supervision',
  observability: 'Supervision',
};

const TERMINAL_TEXT: Record<
  Locale,
  {
    welcome: string;
    help: string[];
    categories: string;
    categoryNotFound: (arg: string) => string;
    skillNotFound: (arg: string) => string;
    mastery: string;
    levelsGuide: string[];
    levelLabel: (level: number) => string;
    notFound: (cmd: string) => string;
    quickCommands: { cmd: string; label: string; hint: string }[];
    ariaLabel: string;
  }
> = {
  fr: {
    welcome: "Bienvenue dans Skills Explorer. Tape 'help' pour voir les commandes disponibles.",
    help: [
      'Commandes disponibles :',
      "  help                Affiche ce message d'aide",
      '  ls categories       Liste toutes les catégories',
      '  ls <categorie>      Liste les compétences d\'une catégorie (ex: ls cloud)',
      '  cat <competence>    Détaille une compétence (ex: cat Docker)',
      '  levels              Affiche le guide des niveaux de maîtrise',
      '  clear               Vide le terminal',
    ],
    categories: 'Catégories :',
    categoryNotFound: (arg) =>
      `ls: catégorie introuvable : '${arg}'. Tape 'ls categories' pour voir les catégories disponibles.`,
    skillNotFound: (arg) => `cat: compétence introuvable : '${arg}'`,
    mastery: 'Maîtrise',
    levelsGuide: [
      'Guide des niveaux de maîtrise :',
      '  90-100%   Expert',
      '  80-89%    Avancé',
      '  70-79%    Intermédiaire+',
      '  < 70%     Intermédiaire',
    ],
    levelLabel: (level) => (level >= 90 ? 'Expert' : level >= 80 ? 'Avancé' : level >= 70 ? 'Intermédiaire+' : 'Intermédiaire'),
    notFound: (cmd) => `bash: ${cmd}: commande introuvable. Tape 'help' pour voir les commandes.`,
    quickCommands: [
      { cmd: 'help', label: '$ help', hint: 'Voir les commandes' },
      { cmd: 'ls cloud', label: '$ ls cloud', hint: 'Compétences cloud' },
      { cmd: 'levels', label: '$ levels', hint: 'Guide de maîtrise' },
      { cmd: 'cat Docker', label: '$ cat Docker', hint: "Détail d'une compétence" },
    ],
    ariaLabel: 'Terminal de compétences interactif',
  },
  en: {
    welcome: "Welcome to Skills Explorer. Type 'help' to see available commands.",
    help: [
      'Available commands:',
      '  help                Show this help message',
      '  ls categories       List all skill categories',
      '  ls <category>       List skills in a category (e.g. ls cloud)',
      '  cat <skill>         Show details for a skill (e.g. cat Docker)',
      '  levels              Show the proficiency level guide',
      '  clear               Clear the terminal',
    ],
    categories: 'Categories:',
    categoryNotFound: (arg) =>
      `ls: category not found: '${arg}'. Type 'ls categories' to see available categories.`,
    skillNotFound: (arg) => `cat: skill not found: '${arg}'`,
    mastery: 'Proficiency',
    levelsGuide: [
      'Proficiency level guide:',
      '  90-100%   Expert',
      '  80-89%    Advanced',
      '  70-79%    Intermediate+',
      '  < 70%     Intermediate',
    ],
    levelLabel: (level) => (level >= 90 ? 'Expert' : level >= 80 ? 'Advanced' : level >= 70 ? 'Intermediate+' : 'Intermediate'),
    notFound: (cmd) => `bash: ${cmd}: command not found. Type 'help' for available commands.`,
    quickCommands: [
      { cmd: 'help', label: '$ help', hint: 'Show commands' },
      { cmd: 'ls cloud', label: '$ ls cloud', hint: 'Cloud skills' },
      { cmd: 'levels', label: '$ levels', hint: 'Proficiency guide' },
      { cmd: 'cat Docker', label: '$ cat Docker', hint: 'Skill details' },
    ],
    ariaLabel: 'Interactive skills terminal',
  },
};

function bar(level: number) {
  const filled = Math.round(level / 10);
  return `[${'█'.repeat(filled)}${'░'.repeat(10 - filled)}] ${level}%`;
}

function handleCommand(raw: string, locale: Locale): Line[] {
  const t = TERMINAL_TEXT[locale];
  const ALL_SKILLS = CATEGORIES.flatMap((c) => c.skills.map((s) => ({ ...s, category: c.title[locale] })));
  const [cmd, ...rest] = raw.trim().toLowerCase().split(/\s+/);
  const arg = rest.join(' ');
  const out: Line[] = [];

  if (cmd === 'help') {
    t.help.forEach((line) => out.push({ type: 'output', text: line }));
  } else if (cmd === 'ls' && arg === 'categories') {
    out.push({ type: 'output', text: t.categories });
    CATEGORIES.forEach((c) =>
      out.push({ type: 'output', text: `  ${c.title[locale]} (${c.skills.length})` })
    );
  } else if (cmd === 'ls') {
    const targetTitle =
      CATEGORY_ALIASES[arg] ??
      CATEGORIES.find((c) => c.title[locale].toLowerCase().includes(arg))?.title.fr;
    const category = CATEGORIES.find((c) => c.title.fr === targetTitle);
    if (category) {
      out.push({ type: 'output', text: `${category.title[locale]}:` });
      category.skills.forEach((s) =>
        out.push({ type: 'output', text: `  ${s.name.padEnd(20, ' ')} ${bar(s.level)}` })
      );
    } else {
      out.push({ type: 'output', text: t.categoryNotFound(arg) });
    }
  } else if (cmd === 'cat') {
    const skill =
      ALL_SKILLS.find((s) => s.name.toLowerCase() === arg) ??
      ALL_SKILLS.find((s) => s.name.toLowerCase().includes(arg));
    if (skill) {
      out.push(
        { type: 'output', text: `${skill.name} — ${skill.category}` },
        { type: 'output', text: `${t.mastery} : ${bar(skill.level)} (${t.levelLabel(skill.level)})` }
      );
    } else {
      out.push({ type: 'output', text: t.skillNotFound(arg) });
    }
  } else if (cmd === 'levels') {
    t.levelsGuide.forEach((line) => out.push({ type: 'output', text: line }));
  } else {
    out.push({ type: 'output', text: t.notFound(cmd) });
  }

  return out;
}

export default function SkillTerminal() {
  const { locale } = useLanguage();
  const t = TERMINAL_TEXT[locale];
  const [lines, setLines] = useState<Line[]>([{ type: 'welcome', text: t.welcome }]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines([{ type: 'welcome', text: t.welcome }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setLines([{ type: 'welcome', text: t.welcome }]);
      setInput('');
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: 'command', text: trimmed },
      ...handleCommand(trimmed, locale),
    ]);
    setInput('');
  };

  return (
    <>
      <div className="terminal-window skill-terminal" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-bar">
          <span className="dot dot-red"></span>
          <span className="dot dot-amber"></span>
          <span className="dot dot-green"></span>
          <span className="terminal-title skill-terminal-label">skills-terminal</span>
        </div>
        <div className="skill-terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                line.type === 'command'
                  ? 'skill-terminal-line skill-terminal-command'
                  : line.type === 'welcome'
                  ? 'skill-terminal-line skill-terminal-welcome'
                  : 'skill-terminal-line'
              }
            >
              {line.type === 'command' ? <span className="cmd-prompt">$ </span> : null}
              {line.text}
            </p>
          ))}
          <form
            className="skill-terminal-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              runCommand(input);
            }}
          >
            <span className="cmd-prompt">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              aria-label={t.ariaLabel}
            />
          </form>
        </div>
      </div>

      <div className="skill-quick-commands">
        {t.quickCommands.map((q) => (
          <button key={q.cmd} type="button" className="skill-quick-btn" onClick={() => runCommand(q.cmd)}>
            <span className="skill-quick-cmd">{q.label}</span>
            <span className="skill-quick-hint">{q.hint}</span>
          </button>
        ))}
      </div>
    </>
  );
}
