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
  architectureFlow?: { label: string; sub: string; desc?: { fr: string; en: string } }[];
  terminalCommands?: string[];
  implementationSteps?: { fr: string[]; en: string[] };
  outcome?: { fr: string[]; en: string[] };
  features?: { icon: string; fr: string; en: string }[];
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
    architectureFlow: [
      {
        label: 'Terraform',
        sub: 'IaC',
        desc: {
          fr: "Provisionne le réseau et les nœuds Azure de façon reproductible — l'infrastructure entière est versionnée dans Git.",
          en: 'Provisions the Azure network and nodes reproducibly — the whole infrastructure is version-controlled in Git.',
        },
      },
      {
        label: 'Azure',
        sub: 'Cloud',
        desc: {
          fr: 'Héberge les machines qui font tourner le cluster k3s et le trafic entrant.',
          en: 'Hosts the machines running the k3s cluster and incoming traffic.',
        },
      },
      {
        label: 'k3s',
        sub: 'Kubernetes',
        desc: {
          fr: 'Distribution Kubernetes légère qui orchestre les conteneurs de la plateforme de streaming.',
          en: 'Lightweight Kubernetes distribution orchestrating the streaming platform containers.',
        },
      },
      {
        label: 'ArgoCD',
        sub: 'GitOps',
        desc: {
          fr: "Synchronise en continu l'état du cluster avec ce qui est déclaré dans Git — aucun déploiement manuel.",
          en: 'Continuously syncs cluster state with what is declared in Git — no manual deployment.',
        },
      },
      {
        label: 'cert-manager',
        sub: 'TLS',
        desc: {
          fr: 'Émet et renouvelle automatiquement les certificats TLS pour le trafic HTTPS.',
          en: 'Automatically issues and renews TLS certificates for HTTPS traffic.',
        },
      },
    ],
    terminalCommands: [
      '$ terraform apply',
      '$ kubectl get nodes',
      '$ argocd app sync twitch-clone',
      '$ kubectl get pods -n streaming',
    ],
    implementationSteps: {
      fr: [
        "Infrastructure Azure provisionnée avec Terraform (réseau, nœuds k3s).",
        "Cluster Kubernetes k3s déployé et configuré.",
        "ArgoCD mis en place pour la livraison continue GitOps (Git comme source de vérité).",
        "cert-manager configuré pour les certificats TLS automatiques.",
        "Pipeline GitHub Actions avec scan de sécurité Trivy avant chaque déploiement.",
      ],
      en: [
        "Azure infrastructure provisioned with Terraform (network, k3s nodes).",
        "k3s Kubernetes cluster deployed and configured.",
        "ArgoCD set up for GitOps continuous delivery (Git as source of truth).",
        "cert-manager configured for automatic TLS certificates.",
        "GitHub Actions pipeline with Trivy security scanning before every deployment.",
      ],
    },
    outcome: {
      fr: [
        '99.8% de disponibilité mesurée sur 30 jours',
        'Déploiement continu déclenché par Git, sans intervention manuelle',
        'Scan de sécurité automatisé à chaque build',
      ],
      en: [
        '99.8% uptime measured over 30 days',
        'Git-triggered continuous delivery, no manual intervention',
        'Automated security scan on every build',
      ],
    },
  },
  {
    slug: 'home-energy-tracker',
    title: { fr: 'Home Energy Tracker — Multi-AZ', en: 'Home Energy Tracker — Multi-AZ' },
    category: 'DevOps',
    logo: 'springboot',
    description: {
      fr: "Projet DevOps construit sur une application forkée (7 microservices Spring Boot, avec permission de l'auteur original). Terraform v1 (EC2 + Docker Compose) → v2 : réécriture pour la résilience — VPC 2 AZ, Auto Scaling Group derrière un ALB, RDS MySQL Multi-AZ, secrets dans AWS Secrets Manager, accès SSM uniquement. Pipeline Jenkins CI/CD + scan GitHub Actions (tfsec/tflint/Trivy) sur l'infra.",
      en: "DevOps project built on a forked application (7 Spring Boot microservices, used with the original author's permission). Terraform v1 (EC2 + Docker Compose) → v2: resilience rewrite — 2-AZ VPC, Auto Scaling Group behind an ALB, RDS MySQL Multi-AZ, secrets in AWS Secrets Manager, SSM-only access. Jenkins CI/CD pipeline + GitHub Actions infra scanning (tfsec/tflint/Trivy).",
    },
    stack: ['Terraform', 'AWS ASG', 'RDS Multi-AZ', 'Jenkins', 'Spring Boot', 'Kafka'],
    repo: 'https://github.com/JuniorZ-spec/home-energy-tracker',
    featured: true,
    note: { fr: "Application forkée (leetjourney) — infra et CI/CD ajoutées", en: "Forked application (leetjourney) — infra and CI/CD added on top" },
    highlights: {
      fr: ['v1 → v2 : passage en Multi-AZ résilient', 'Auto-scaling réellement observé (ASG)', 'Secrets Manager, zéro SSH'],
      en: ['v1 → v2: moved to resilient Multi-AZ', 'Real observed auto-scaling event (ASG)', 'Secrets Manager, zero SSH'],
    },
    architectureFlow: [
      {
        label: 'ALB',
        sub: '2 zones de dispo.',
        desc: {
          fr: "Répartit le trafic entre les instances de l'Auto Scaling Group sur 2 zones de disponibilité.",
          en: 'Distributes traffic across the Auto Scaling Group instances in 2 availability zones.',
        },
      },
      {
        label: 'Auto Scaling Group',
        sub: '7 microservices',
        desc: {
          fr: "Fait varier le nombre d'instances selon la charge CPU — un vrai événement de scale-out a été observé au démarrage (2 → 3 → 2).",
          en: 'Varies instance count based on CPU load — a real scale-out event was observed at boot time (2 → 3 → 2).',
        },
      },
      {
        label: 'RDS MySQL',
        sub: 'Multi-AZ',
        desc: {
          fr: "Remplace le MySQL conteneurisé de la v1 — bascule automatique vers une réplique en cas de panne.",
          en: 'Replaces the containerized MySQL from v1 — automatic failover to a standby replica.',
        },
      },
      {
        label: 'Secrets Manager',
        sub: 'Zéro fichier .env',
        desc: {
          fr: "Génère et stocke les secrets — récupérés par l'instance via son rôle IAM au démarrage, plus aucun .env en clair.",
          en: 'Generates and stores secrets — fetched by the instance via its IAM role at boot, no more plaintext .env.',
        },
      },
    ],
    terminalCommands: [
      '$ terraform apply   # terraform-v2/',
      '$ curl https://<alb-dns>/actuator/health',
      '# {"status":"UP"}',
      '$ terraform destroy  # fin de la fenêtre de vérification',
    ],
    implementationSteps: {
      fr: [
        "v1 : instance EC2 unique + Docker Compose, MySQL conteneurisé, secrets en fichier .env.",
        "Pipeline Jenkins : build des 7 services Maven, push vers ECR privé, déploiement SSH — identifiants tirés du credential store Jenkins, jamais en dur.",
        "v2 : réécriture pour la résilience — VPC dédié 2 AZ, Auto Scaling Group derrière un ALB, RDS MySQL Multi-AZ.",
        "Secrets générés par Terraform et stockés dans AWS Secrets Manager, accès admin en SSM uniquement (zéro port SSH ouvert).",
        "GitHub Actions (terraform-ci.yml) : fmt, validate, tflint, scan tfsec et Trivy sur chaque push touchant Terraform.",
      ],
      en: [
        "v1: single EC2 instance + Docker Compose, containerized MySQL, secrets in a .env file.",
        "Jenkins pipeline: builds the 7 Maven services, pushes to a private ECR, deploys over SSH — credentials pulled from Jenkins' own credential store, never hardcoded.",
        "v2: resilience rewrite — dedicated 2-AZ VPC, Auto Scaling Group behind an ALB, RDS MySQL Multi-AZ.",
        "Secrets generated by Terraform and stored in AWS Secrets Manager, SSM-only admin access (zero open SSH port).",
        "GitHub Actions (terraform-ci.yml): fmt, validate, tflint, tfsec and Trivy scan on every push touching Terraform.",
      ],
    },
    outcome: {
      fr: [
        "Événement d'auto-scaling réel observé (pas juste écrit dans le Terraform) : 2 → 3 → 2 instances au démarrage",
        'RDS confirmé Multi-AZ (primaire eu-west-3b, standby eu-west-3a), ALB vérifié en HTTP 200',
        'Infra volontairement arrêtée entre les vérifications — discipline de coût appliquée systématiquement',
      ],
      en: [
        'Real auto-scaling event observed (not just written in Terraform): 2 → 3 → 2 instances at boot',
        'RDS confirmed Multi-AZ (primary eu-west-3b, standby eu-west-3a), ALB verified with HTTP 200',
        'Infra deliberately stopped between verifications — cost discipline applied consistently',
      ],
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
    architectureFlow: [
      { label: 'Nginx', sub: "HTTPS · Let's Encrypt" },
      { label: 'AWS EC2', sub: 'Terraform' },
      { label: 'ECR', sub: 'Registry' },
      { label: 'IAM Role', sub: 'Sans credentials' },
    ],
    terminalCommands: [
      '$ terraform apply',
      '$ docker push $ECR_REPO:latest',
      '$ ssh ec2-user@host "docker pull && docker compose up -d"',
    ],
    implementationSteps: {
      fr: [
        "Infrastructure AWS EC2 provisionnée avec Terraform.",
        "Pipeline CI/CD GitHub Actions en deux étapes : build+push vers ECR, puis déploiement.",
        "IAM Role attaché à l'instance — aucun credential stocké dans le code.",
        "HTTPS configuré via Let's Encrypt.",
        "Supervision Prometheus/Grafana.",
      ],
      en: [
        "AWS EC2 infrastructure provisioned with Terraform.",
        "Two-stage GitHub Actions CI/CD pipeline: build+push to ECR, then deployment.",
        "IAM Role attached to the instance — no credentials stored in code.",
        "HTTPS configured via Let's Encrypt.",
        "Prometheus/Grafana monitoring.",
      ],
    },
    outcome: {
      fr: ['Déploiement sans credentials stockés (IAM Role)', 'Pipeline CI/CD en deux étapes vers un registre privé', 'HTTPS automatique'],
      en: ['Deployment with no stored credentials (IAM Role)', 'Two-stage CI/CD pipeline to a private registry', 'Automatic HTTPS'],
    },
  },
  {
    slug: 'multi-jeux',
    title: { fr: 'GameCloud — Plateforme AWS EKS', en: 'GameCloud — AWS EKS Platform' },
    category: 'DevOps',
    logo: 'amazonaws',
    image: '/projects/gamecloud-frontend.png',
    description: {
      fr: "Plateforme cloud AWS complète et réutilisable autour d'une appli de démo à 7 microservices : VPC privé sur 3 zones de disponibilité, cluster EKS dont l'API n'est jamais exposée à Internet (accès uniquement via bastion SSM), CI/CD GitOps (GitHub Actions + ArgoCD ApplicationSet + Image Updater), identités sans clé statique (IRSA et EKS Pod Identity), et observabilité complète (Prometheus/Grafana + Elasticsearch/Kibana). Un environnement Kind local existe aussi pour itérer sans dépendance cloud.",
      en: "A complete, reusable AWS cloud platform built around a 7-microservice demo app: private VPC across 3 availability zones, an EKS cluster whose API is never exposed to the Internet (bastion-only SSM access), GitOps CI/CD (GitHub Actions + ArgoCD ApplicationSet + Image Updater), key-less identities (IRSA and EKS Pod Identity), and full observability (Prometheus/Grafana + Elasticsearch/Kibana). A local Kind environment also exists to iterate without any cloud dependency.",
    },
    stack: ['Terraform', 'Amazon EKS', 'ArgoCD', 'GitHub Actions', 'IRSA', 'Prometheus', 'Grafana'],
    repo: 'https://github.com/JuniorZ-spec/game-cloud',
    featured: true,
    highlights: {
      fr: ['EKS privé (API jamais exposée)', 'IRSA + EKS Pod Identity', 'GitOps ArgoCD (auto-sync + self-heal)'],
      en: ['Private EKS (API never exposed)', 'IRSA + EKS Pod Identity', 'ArgoCD GitOps (auto-sync + self-heal)'],
    },
    architectureFlow: [
      {
        label: 'Terraform',
        sub: 'VPC + EKS + bastion',
        desc: {
          fr: 'Provisionne un VPC privé sur 3 zones de disponibilité et un cluster EKS dont le point de terminaison public est désactivé.',
          en: 'Provisions a private VPC across 3 availability zones and an EKS cluster with its public endpoint disabled.',
        },
      },
      {
        label: 'Bastion SSM',
        sub: 'Seul accès admin',
        desc: {
          fr: "Seule porte d'entrée vers l'API EKS privée, via AWS Systems Manager — zéro clé SSH stockée.",
          en: 'The only entry point to the private EKS API, via AWS Systems Manager — zero stored SSH key.',
        },
      },
      {
        label: 'GitHub Actions',
        sub: 'CI + OIDC',
        desc: {
          fr: 'Build, scan Trivy, push vers ECR taggé par SHA — authentification OIDC, aucune clé AWS stockée dans GitHub.',
          en: 'Build, Trivy scan, push to ECR tagged by commit SHA — OIDC authentication, no AWS key stored in GitHub.',
        },
      },
      {
        label: 'ArgoCD',
        sub: 'GitOps + Image Updater',
        desc: {
          fr: "ApplicationSet + chart Helm générique pour les 7 services, Image Updater pour un déploiement 100% automatique du commit au pod.",
          en: 'ApplicationSet + generic Helm chart for the 7 services, Image Updater for a fully automatic commit-to-pod deployment.',
        },
      },
      {
        label: 'IRSA / Pod Identity',
        sub: 'Sans clé statique',
        desc: {
          fr: "Deux mécanismes d'identité AWS pour les pods, démontrés et comparés — aucune clé AWS stockée dans le cluster.",
          en: 'Two AWS identity mechanisms for pods, demonstrated and compared — no AWS key ever stored in the cluster.',
        },
      },
      {
        label: 'Prometheus / ELK',
        sub: 'Observabilité',
        desc: {
          fr: 'Métriques (Prometheus/Grafana) et logs (Elasticsearch/Kibana) réels sur la plateforme.',
          en: 'Real metrics (Prometheus/Grafana) and logs (Elasticsearch/Kibana) across the platform.',
        },
      },
    ],
    terminalCommands: [
      '$ terraform apply',
      '$ kubectl get applications -n argocd',
      '$ kubectl exec pod-identity-test -- aws sts get-caller-identity',
      '$ terraform destroy   # entre chaque pause',
    ],
    implementationSteps: {
      fr: [
        "VPC privé Terraform sur 3 AZ + cluster EKS avec API publique désactivée, accès admin via bastion SSM uniquement.",
        "Pipeline CI GitHub Actions : build, scan Trivy, push ECR par SHA de commit, auth OIDC (zéro clé AWS dans GitHub).",
        "CD GitOps avec ArgoCD (ApplicationSet + chart Helm générique) et Image Updater pour un déploiement 100% automatique.",
        "Réseau applicatif via Gateway API + AWS Load Balancer Controller → ALB public.",
        "Identités sans clé statique : IRSA (EBS CSI, ALB Controller, Image Updater) et EKS Pod Identity, comparées directement.",
        "Observabilité complète : Prometheus/Grafana pour les métriques, Elasticsearch/Kibana pour les logs.",
      ],
      en: [
        "Private Terraform VPC across 3 AZs + EKS cluster with public API disabled, admin access via bastion SSM only.",
        "GitHub Actions CI pipeline: build, Trivy scan, push to ECR tagged by commit SHA, OIDC auth (zero AWS key in GitHub).",
        "GitOps CD with ArgoCD (ApplicationSet + generic Helm chart) and Image Updater for a fully automatic deployment.",
        "Application networking via Gateway API + AWS Load Balancer Controller → public ALB.",
        "Key-less identities: IRSA (EBS CSI, ALB Controller, Image Updater) and EKS Pod Identity, directly compared.",
        "Full observability: Prometheus/Grafana for metrics, Elasticsearch/Kibana for logs.",
      ],
    },
    outcome: {
      fr: [
        '8 Applications ArgoCD Synced/Healthy, 9 pods Running, reconstruits à l\'identique 3 fois depuis le code',
        '4 incidents réels diagnostiqués et corrigés côté datastore (CSI, StorageClass, PGDATA), jamais de correction manuelle sur le cluster',
        'Plateforme démontée puis reconstruite entre chaque pause pour maîtriser les coûts (budget AWS ~26$, alerte à 20$)',
      ],
      en: [
        '8 ArgoCD Applications Synced/Healthy, 9 pods Running, rebuilt identically 3 times straight from code',
        '4 real incidents diagnosed and fixed on the datastore side (CSI, StorageClass, PGDATA), never a manual cluster fix',
        'Platform torn down and rebuilt between every pause to control costs (~$26 AWS budget, alert at $20)',
      ],
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
    features: [
      { icon: '👥', fr: 'Comptes voyageur, compagnie et administrateur', en: 'Traveler, company and admin accounts' },
      { icon: '🚌', fr: 'Gestion des bus, stations et trajets', en: 'Buses, stations and routes management' },
      { icon: '🎫', fr: 'Réservation avec suivi des sièges en temps réel', en: 'Booking with real-time seat tracking' },
      { icon: '📊', fr: 'Interface admin de supervision', en: 'Admin supervision dashboard' },
      { icon: '🔌', fr: 'API REST complète pour le frontend', en: 'Full REST API for the frontend' },
    ],
    architectureFlow: [
      { label: 'Vercel', sub: 'Frontend React' },
      { label: 'Render', sub: 'Backend Node.js' },
      { label: 'Neon PostgreSQL', sub: 'Base de données' },
      { label: 'Redis', sub: 'Cache' },
    ],
    implementationSteps: {
      fr: [
        "Authentification JWT avec rôles voyageur/compagnie/admin.",
        "Pipeline CI/CD GitHub Actions (lint backend/frontend, vérification TypeScript, audit sécurité, build Docker).",
        "Backend déployé sur Render, frontend sur Vercel.",
        "Base PostgreSQL (Neon) et cache Redis.",
      ],
      en: [
        "JWT authentication with traveler/company/admin roles.",
        "GitHub Actions CI/CD pipeline (backend/frontend lint, TypeScript check, security audit, Docker build).",
        "Backend deployed on Render, frontend on Vercel.",
        "PostgreSQL database (Neon) and Redis cache.",
      ],
    },
    outcome: {
      fr: ['Pipeline CI/CD complet avant chaque déploiement', 'Démo live accessible (cold start 30-60s, hébergement gratuit)'],
      en: ['Full CI/CD pipeline before every deployment', 'Live demo available (30-60s cold start, free hosting)'],
    },
  },
  {
    slug: 'vagrant-labs',
    title: {
      fr: 'Virtualisation & Automatisation avec Vagrant',
      en: 'Vagrant Infrastructure Automation Labs',
    },
    category: 'DevOps',
    logo: 'vagrant',
    image: '/projects/vagrant-labs.png',
    description: {
      fr: "5 labs progressifs d'automatisation infrastructure : provisioning de VMs avec Vagrant, playbooks Ansible avec rôles réutilisables, secrets chiffrés (Ansible Vault). Déploiement de Semaphore comme interface web CI/CD pour Ansible.",
      en: '5 progressive infrastructure automation labs: VM provisioning with Vagrant, Ansible playbooks with reusable roles, secrets encrypted with Ansible Vault. Semaphore deployed as a web CI/CD interface for Ansible.',
    },
    stack: ['Vagrant', 'Ansible', 'VirtualBox', 'Semaphore', 'Docker'],
    repo: 'https://github.com/JuniorZ-spec/VIRTUALISATION-ET-AUTOMATISATIONAVEC-VAGRANT',
    architectureFlow: [
      { label: 'Vagrant', sub: 'Provisioning VM' },
      { label: 'Ansible', sub: 'Playbooks & rôles' },
      { label: 'Ansible Vault', sub: 'Secrets chiffrés' },
      { label: 'Semaphore', sub: 'Interface CI/CD' },
    ],
    implementationSteps: {
      fr: [
        "Provisioning de VMs avec Vagrant.",
        "Playbooks Ansible avec rôles réutilisables.",
        "Secrets chiffrés avec Ansible Vault.",
        "Semaphore déployé comme interface web CI/CD pour Ansible.",
      ],
      en: [
        "VM provisioning with Vagrant.",
        "Ansible playbooks with reusable roles.",
        "Secrets encrypted with Ansible Vault.",
        "Semaphore deployed as a web CI/CD interface for Ansible.",
      ],
    },
    outcome: {
      fr: ["5 labs progressifs, du provisioning simple à l'automatisation complète", 'Secrets jamais en clair (Ansible Vault)'],
      en: ['5 progressive labs, from simple provisioning to full automation', 'Secrets never in plaintext (Ansible Vault)'],
    },
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
    features: [
      { icon: '🧑', fr: 'Profil utilisateur (objectif, niveau, poids, matériel disponible)', en: 'User profile (goal, level, weight, available equipment)' },
      { icon: '🤖', fr: 'Génération de programme personnalisé par IA (OpenRouter)', en: 'AI-generated personalized workout plan (OpenRouter)' },
      { icon: '📈', fr: 'Dashboard de progression avec graphiques (Recharts)', en: 'Progress dashboard with charts (Recharts)' },
      { icon: '🏋️', fr: 'Suivi des séances complétées et du poids', en: 'Tracking of completed sessions and weight' },
    ],
    architectureFlow: [
      { label: 'Vercel', sub: 'Frontend React' },
      { label: 'Render', sub: 'Backend Node.js' },
      { label: 'PostgreSQL', sub: 'Prisma' },
      { label: 'OpenRouter', sub: 'Génération IA' },
    ],
    implementationSteps: {
      fr: [
        "CI GitHub Actions en 2 jobs parallèles (lint, typecheck, Prisma generate).",
        "Déploiement backend sur Render (Deploy Hook) déclenché seulement après succès de la CI.",
        "Migrations Prisma automatiques au déploiement.",
        "Génération de programmes sportifs personnalisés via l'API OpenRouter.",
      ],
      en: [
        "GitHub Actions CI as 2 parallel jobs (lint, typecheck, Prisma generate).",
        "Backend deployment on Render (Deploy Hook) only triggered after CI passes.",
        "Automatic Prisma migrations on deploy.",
        "Personalized workout plan generation via the OpenRouter API.",
      ],
    },
    outcome: {
      fr: ['Déploiement bloqué si la CI échoue', 'Migrations de base automatiques et sans intervention manuelle'],
      en: ['Deployment blocked if CI fails', 'Automatic database migrations, no manual intervention'],
    },
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
    features: [
      { icon: '🔐', fr: 'Inscription et connexion par email/mot de passe (JWT)', en: 'Email/password signup and login (JWT)' },
      { icon: '📁', fr: 'Projets avec étapes (à faire / en cours / terminé)', en: 'Projects with stages (todo / in progress / completed)' },
      { icon: '📝', fr: 'Notes libres, éventuellement liées à un projet', en: 'Free-form notes, optionally linked to a project' },
      { icon: '💬', fr: 'Assistant IA (Gemini) qui connaît le contexte de tes projets et tâches', en: 'AI assistant (Gemini) aware of your projects and tasks context' },
    ],
    architectureFlow: [
      { label: 'React', sub: 'Frontend' },
      { label: 'Node.js / Express', sub: 'API' },
      { label: 'MongoDB', sub: 'Données' },
      { label: 'Gemini API', sub: 'Assistant IA' },
    ],
    implementationSteps: {
      fr: [
        "Authentification JWT.",
        "Suivi de statut par projet (à faire/en cours/terminé).",
        "Intégration de l'assistant IA conversationnel via l'API Gemini.",
      ],
      en: [
        "JWT authentication.",
        "Per-project status tracking (todo/in progress/completed).",
        "Conversational AI assistant integration via the Gemini API.",
      ],
    },
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
    features: [
      { icon: '📊', fr: 'Dashboard admin avec analytics', en: 'Admin dashboard with analytics' },
      { icon: '💳', fr: 'Paiements Stripe & PayPal', en: 'Stripe & PayPal payments' },
      { icon: '🛍️', fr: 'Gestion produits, commandes et utilisateurs', en: 'Product, order and user management' },
    ],
    architectureFlow: [
      { label: 'Next.js', sub: 'Vercel' },
      { label: 'PostgreSQL', sub: 'Prisma' },
      { label: 'Stripe / PayPal', sub: 'Paiement' },
    ],
    implementationSteps: {
      fr: [
        'Dashboard admin avec analytics.',
        'Intégration paiements Stripe & PayPal.',
        'Gestion produits/commandes/utilisateurs.',
      ],
      en: [
        'Admin dashboard with analytics.',
        'Stripe & PayPal payment integration.',
        'Product/order/user management.',
      ],
    },
  },
];
