export type Project = {
  slug: string;
  title: { fr: string; en: string };
  category: 'DevOps' | 'Full-Stack';
  logo: string;
  image?: string;
  description: { fr: string; en: string };
  stack: string[];
  repo: string;
  live?: string;
  coldStart?: boolean;
  note?: { fr: string; en: string };
  featured?: boolean;
  highlights?: { fr: string[]; en: string[] };
};

export const PROJECTS: Project[] = [
  {
    slug: 'twitch-clone',
    title: { fr: 'Twitch Clone', en: 'Twitch Clone' },
    category: 'DevOps',
    logo: 'kubernetes',
    image: '/projects/twitch-clone.png',
    description: {
      fr: "Plateforme de streaming auto-hébergée sur Kubernetes (k3s), provisionnée sur Azure via Terraform avec GitOps ArgoCD. Pipeline CI/CD GitHub Actions avec scan de sécurité Trivy, et 99.8% de disponibilité mesurée sur 30 jours.",
      en: "Self-hosted streaming platform on Kubernetes (k3s), provisioned on Azure via Terraform with ArgoCD GitOps. GitHub Actions CI/CD pipeline with Trivy security scanning, and 99.8% uptime measured over 30 days.",
    },
    stack: ['Kubernetes', 'Terraform', 'ArgoCD', 'Azure', 'GitHub Actions', 'cert-manager'],
    repo: 'https://github.com/JuniorZ-spec/Twitch-Clone-Project',
    featured: true,
    highlights: {
      fr: ['99.8% de disponibilité (30j)', 'GitOps ArgoCD', 'Scan sécurité Trivy'],
      en: ['99.8% uptime (30d)', 'ArgoCD GitOps', 'Trivy security scan'],
    },
  },
  {
    slug: 'home-energy-tracker',
    title: { fr: 'Home Energy Tracker', en: 'Home Energy Tracker' },
    category: 'DevOps',
    logo: 'springboot',
    description: {
      fr: "Plateforme de suivi énergétique en 7 microservices Spring Boot, avec pipeline Jenkins déclaratif (build, tests, scan Trivy). Infrastructure AWS provisionnée avec Terraform, Kafka pour les flux temps réel et supervision Prometheus/Grafana.",
      en: "Energy tracking platform built as 7 Spring Boot microservices, with a declarative Jenkins pipeline (build, tests, Trivy scan). AWS infrastructure provisioned with Terraform, Kafka for real-time streams, Prometheus/Grafana monitoring.",
    },
    stack: ['Spring Boot', 'Jenkins', 'Kafka', 'Terraform', 'AWS EC2', 'Keycloak'],
    repo: 'https://github.com/JuniorZ-spec/home-energy-tracker',
    featured: true,
    highlights: {
      fr: ['7 microservices Spring Boot', 'Kafka temps réel', 'Prometheus/Grafana'],
      en: ['7 Spring Boot microservices', 'Real-time Kafka streams', 'Prometheus/Grafana'],
    },
  },
  {
    slug: 'save-money',
    title: { fr: 'Save Money — Gestion de finance', en: 'Save Money — Expense Tracker' },
    category: 'DevOps',
    logo: 'amazonaws',
    image: '/projects/save-money.png',
    description: {
      fr: "Suivi de dépenses déployé en production sur AWS EC2 (Terraform), avec pipeline CI/CD en deux étapes vers un registre ECR privé. IAM Role sans credentials stockés, HTTPS via Let's Encrypt, supervision Prometheus/Grafana.",
      en: "Expense tracker deployed to production on AWS EC2 (Terraform), with a two-stage CI/CD pipeline pushing to a private ECR registry. IAM Role with no stored credentials, HTTPS via Let's Encrypt, Prometheus/Grafana monitoring.",
    },
    stack: ['AWS EC2', 'Terraform', 'ECR', 'GitHub Actions', 'Nginx', 'Prometheus'],
    repo: 'https://github.com/JuniorZ-spec/SAVE-MONEY',
  },
  {
    slug: 'multi-jeux',
    title: { fr: 'Plateforme multi-jeux', en: 'Multi-Game Platform' },
    category: 'DevOps',
    logo: 'docker',
    description: {
      fr: "Cluster Kubernetes local (Kind) hébergeant 7 microservices découplés (auth, jeux, scores), avec bases PostgreSQL et Redis dédiées et auto-scaling serverless (scale-to-zero) via KEDA. Pipeline CI/CD GitHub Actions : cluster Kind éphémère à chaque run, rolling update avec images taguées par commit SHA, rollback automatique (kubectl rollout undo) si un déploiement échoue, et agrégation centralisée des logs (Loki/Promtail) avec vérification automatisée de l'ingestion.",
      en: "Local Kubernetes cluster (Kind) running 7 decoupled microservices (auth, games, scores), with dedicated PostgreSQL and Redis backends and serverless auto-scaling (scale-to-zero) via KEDA. GitHub Actions CI/CD pipeline: ephemeral Kind cluster on every run, rolling update with commit-SHA-tagged images, automatic rollback (kubectl rollout undo) if any deployment fails, and centralized log aggregation (Loki/Promtail) with automated ingestion verification.",
    },
    stack: ['Kubernetes', 'KEDA', 'Redis', 'PostgreSQL', 'GitHub Actions', 'Flask', 'Loki'],
    repo: 'https://github.com/JuniorZ-spec/game-cloud',
    featured: true,
    highlights: {
      fr: ['7 microservices découplés', 'Auto-scaling KEDA (scale-to-zero)', 'Rollback CI/CD automatique'],
      en: ['7 decoupled microservices', 'KEDA auto-scaling (scale-to-zero)', 'Automatic CI/CD rollback'],
    },
  },
  {
    slug: 'bus-reservation',
    title: {
      fr: 'Réservation de bus multi-compagnies',
      en: 'Multi-Carrier Bus Booking',
    },
    category: 'Full-Stack',
    logo: 'react',
    image: '/projects/bus-reservation.png',
    description: {
      fr: "Réservation de tickets de bus multi-compagnies avec authentification JWT et gestion des rôles voyageur/compagnie/admin. Pipeline CI/CD GitHub Actions (lint backend/frontend, vérification TypeScript, audit sécurité, build Docker), backend Render, frontend Vercel, base Neon PostgreSQL et cache Redis.",
      en: "Multi-carrier bus ticket booking app with JWT auth and traveler/company/admin role management. GitHub Actions CI/CD pipeline (backend/frontend lint, TypeScript check, security audit, Docker build), Render backend, Vercel frontend, Neon PostgreSQL database and Redis cache.",
    },
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'GitHub Actions'],
    repo: 'https://github.com/JuniorZ-spec/FINAL-TICKET-BUS',
    live: 'https://ticket-bus-taupe.vercel.app',
    coldStart: true,
  },
  {
    slug: 'vagrant-labs',
    title: {
      fr: 'Virtualisation & Automatisation avec Vagrant',
      en: 'Vagrant Infrastructure Automation Labs',
    },
    category: 'DevOps',
    logo: 'vagrant',
    description: {
      fr: "5 labs progressifs d'automatisation infrastructure : provisioning de VMs avec Vagrant, playbooks Ansible avec rôles réutilisables, secrets chiffrés (Ansible Vault). Déploiement de Semaphore comme interface web CI/CD pour Ansible.",
      en: '5 progressive infrastructure automation labs: VM provisioning with Vagrant, Ansible playbooks with reusable roles, secrets encrypted with Ansible Vault. Semaphore deployed as a web CI/CD interface for Ansible.',
    },
    stack: ['Vagrant', 'Ansible', 'VirtualBox', 'Semaphore', 'Docker'],
    repo: 'https://github.com/JuniorZ-spec/VIRTUALISATION-ET-AUTOMATISATIONAVEC-VAGRANT',
  },
  {
    slug: 'gym-program',
    title: { fr: 'Gym Program', en: 'Gym Program' },
    category: 'Full-Stack',
    logo: 'typescript',
    image: '/projects/gym-program.png',
    description: {
      fr: "Génération de programmes sportifs personnalisés par IA (OpenRouter), avec suivi de progression (poids, séances). CI GitHub Actions (lint, typecheck, Prisma generate) en 2 jobs parallèles ; le déploiement backend sur Render (via Deploy Hook) n'est déclenché qu'après succès de la CI. Frontend React sur Vercel, migrations Prisma automatiques au déploiement.",
      en: 'AI-generated personalized workout plans (OpenRouter), with progress tracking (weight, sessions). GitHub Actions CI (lint, typecheck, Prisma generate) running as 2 parallel jobs; backend deployment on Render (via Deploy Hook) only triggers after CI passes. React frontend on Vercel, automatic Prisma migrations on deploy.',
    },
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'GitHub Actions'],
    repo: 'https://github.com/JuniorZ-spec/GYM-PROGRAM',
    live: 'https://gym-program-pearl.vercel.app',
    coldStart: true,
  },
  {
    slug: 'cyborg-note',
    title: { fr: 'CyborgNote', en: 'CyborgNote' },
    category: 'Full-Stack',
    logo: 'googlegemini',
    image: '/projects/cyborg-note.png',
    description: {
      fr: "Compagnon intelligent combinant gestion de projets, prise de notes et assistant IA conversationnel (Gemini API). Authentification JWT, suivi de statut par projet (à faire/en cours/terminé), assistant contextuel pour la planification.",
      en: 'Intelligent companion combining project management, note-taking and a conversational AI assistant (Gemini API). JWT authentication, per-project status tracking (todo/in progress/completed), context-aware planning assistant.',
    },
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
    repo: 'https://github.com/JuniorZ-spec/Cyborg-Note',
  },
  {
    slug: 'ecom-website',
    title: { fr: 'Prostore — E-commerce', en: 'Prostore — E-commerce' },
    category: 'Full-Stack',
    logo: 'nextdotjs',
    description: {
      fr: "Plateforme e-commerce complète : dashboard admin avec analytics, paiements Stripe & PayPal, gestion produits/commandes/utilisateurs. Projet de formation basé sur un cours Next.js (Traversy Media).",
      en: 'Full e-commerce platform: admin dashboard with analytics, Stripe & PayPal payments, product/order/user management. Training project based on a Next.js course (Traversy Media).',
    },
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Tailwind CSS'],
    repo: 'https://github.com/JuniorZ-spec/ecom-website',
    live: 'https://prostore-zeta-pearl.vercel.app',
    note: { fr: 'Projet de formation', en: 'Training project' },
  },
];
