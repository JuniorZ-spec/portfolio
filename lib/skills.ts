export type Skill = { name: string; icon: string; level: number };
export type Category = { title: { fr: string; en: string }; icon: string; skills: Skill[] };

export const CATEGORIES: Category[] = [
  {
    title: { fr: 'Langages', en: 'Languages' },
    icon: '</>',
    skills: [
      { name: 'JavaScript', icon: 'JS', level: 72 },
      { name: 'TypeScript', icon: 'TS', level: 68 },
      { name: 'Python', icon: 'PY', level: 58 },
      { name: 'HTML', icon: '</>', level: 70 },
      { name: 'CSS', icon: '#', level: 68 },
    ],
  },
  {
    title: { fr: 'Frameworks', en: 'Frameworks' },
    icon: '⚛',
    skills: [
      { name: 'Node.js', icon: '⬢', level: 70 },
      { name: 'Express.js', icon: 'Ex', level: 68 },
      { name: 'React.js', icon: '⚛', level: 70 },
      { name: 'Next.js', icon: '▲', level: 68 },
      { name: 'Tailwind CSS', icon: '~', level: 65 },
    ],
  },
  {
    title: { fr: 'Bases de données', en: 'Databases' },
    icon: '🗄',
    skills: [
      { name: 'PostgreSQL', icon: 'PG', level: 68 },
      { name: 'MongoDB', icon: 'Mo', level: 65 },
      { name: 'MySQL', icon: 'My', level: 60 },
      { name: 'Redis', icon: 'Rd', level: 58 },
    ],
  },
  {
    title: { fr: 'Plateformes Cloud', en: 'Cloud Platforms' },
    icon: '☁',
    skills: [
      { name: 'AWS', icon: 'AWS', level: 68 },
      { name: 'Microsoft Azure', icon: 'Az', level: 58 },
    ],
  },
  {
    title: { fr: 'Conteneurs & Orchestration', en: 'Containers & Orchestration' },
    icon: '📦',
    skills: [
      { name: 'Docker', icon: 'Do', level: 70 },
      { name: 'Kubernetes', icon: 'K8s', level: 65 },
    ],
  },
  {
    title: { fr: 'Infrastructure as Code', en: 'Infrastructure as Code' },
    icon: '⌘',
    skills: [
      { name: 'Terraform', icon: 'TF', level: 68 },
      { name: 'Ansible', icon: 'A', level: 55 },
      { name: 'Vagrant', icon: 'Vg', level: 50 },
    ],
  },
  {
    title: { fr: 'CI/CD & Automatisation', en: 'CI/CD & Automation' },
    icon: '⚙',
    skills: [
      { name: 'Git', icon: 'Gi', level: 72 },
      { name: 'GitHub Actions', icon: '⚙', level: 70 },
      { name: 'ArgoCD', icon: 'A', level: 62 },
      { name: 'Jenkins', icon: 'J', level: 60 },
      { name: 'GitLab CI', icon: 'GL', level: 55 },
      { name: 'Semaphore', icon: 'Sm', level: 48 },
    ],
  },
  {
    title: { fr: 'Supervision', en: 'Monitoring & Observability' },
    icon: 'Ob',
    skills: [
      { name: 'Prometheus', icon: 'Pr', level: 65 },
      { name: 'Grafana', icon: 'Gr', level: 65 },
      { name: 'KEDA', icon: 'K', level: 55 },
      { name: 'Loki', icon: 'Lk', level: 52 },
      { name: 'ELK Stack', icon: 'EL', level: 50 },
      { name: 'cert-manager', icon: 'CM', level: 48 },
    ],
  },
];
