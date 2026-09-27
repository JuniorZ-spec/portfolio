export type Project = {
  slug: string;
  title: { fr: string; en: string };
  category: 'DevOps' | 'Full-Stack';
  logo: string;
  image?: string;
  preview?: string;
  slides?: string[];
  imageFit?: 'cover' | 'contain';
  imageBg?: string;
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
  /** Real screenshots proving the outcome (dashboards, GitOps consoles), shown in the Outcome tab. */
  evidence?: { src: string; caption: { fr: string; en: string } }[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'twitch-clone',
    title: { fr: 'Twitch Clone', en: 'Twitch Clone' },
    category: 'DevOps',
    logo: 'kubernetes',
    image: '/projects/twitch-architecture.jpg',
    imageFit: 'contain',
    imageBg: '#08090b',
    description: {
      fr: "Plateforme de streaming auto-hébergée sur Kubernetes (k3s), provisionnée sur Azure via Terraform avec GitOps ArgoCD. Pipeline CI/CD GitHub Actions avec scan de sécurité Trivy, et 99.8% de disponibilité mesurée sur 30 jours.",
      en: "Self-hosted streaming platform on Kubernetes (k3s), provisioned on Azure via Terraform with ArgoCD GitOps. GitHub Actions CI/CD pipeline with Trivy security scanning, and 99.8% uptime measured over 30 days.",
    },
    stack: ['Kubernetes', 'Terraform', 'ArgoCD', 'Azure', 'GitHub Actions', 'cert-manager', 'MySQL', 'Redis', 'MinIO'],
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
          fr: "Provisionne le réseau et les nœuds Azure de façon reproductible : l'infrastructure entière est versionnée dans Git.",
          en: 'Provisions the Azure network and nodes reproducibly: the whole infrastructure is version-controlled in Git.',
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
          fr: "Synchronise en continu l'état du cluster avec ce qui est déclaré dans Git : aucun déploiement manuel.",
          en: 'Continuously syncs cluster state with what is declared in Git: no manual deployment.',
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
      {
        label: 'SRS',
        sub: 'RTMP → HLS',
        desc: {
          fr: "Serveur de streaming (Simple Realtime Server) : encaisse le flux RTMP des streamers et le convertit en HLS pour les viewers, derrière son propre load balancer.",
          en: 'Streaming server (Simple Realtime Server): ingests the RTMP feed from streamers and transcodes it to HLS for viewers, behind its own load balancer.',
        },
      },
      {
        label: 'MySQL',
        sub: 'Base de données',
        desc: {
          fr: 'Persiste les comptes, streams et relations (follow/block) via Prisma.',
          en: 'Persists accounts, streams and relations (follow/block) via Prisma.',
        },
      },
      {
        label: 'Redis',
        sub: 'Cache',
        desc: {
          fr: "Cache applicatif pour les données à accès fréquent (présence, statuts en direct).",
          en: 'Application cache for frequently accessed data (presence, live status).',
        },
      },
      {
        label: 'MinIO',
        sub: 'Stockage objet',
        desc: {
          fr: 'Stockage compatible S3, auto-hébergé, pour les miniatures et avatars uploadés.',
          en: 'S3-compatible, self-hosted storage for uploaded thumbnails and avatars.',
        },
      },
    ],
    terminalCommands: [
      '$ terraform apply',
      '$ kubectl get nodes',
      '$ argocd app sync twitch-prod',
      '$ kubectl get pods -n twitch-prod',
      '# app, srs, srs-rtmp-lb, redis, mysql, minio → Running',
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
        '99.897% de disponibilité mesurée sur 30 jours (Grafana, SLO error-budget)',
        '7 ressources ArgoCD Synced/Healthy : app, ingress, srs, srs-rtmp-lb, redis, mysql, minio',
        'Déploiement continu déclenché par Git, sans intervention manuelle',
        'Scan de sécurité automatisé à chaque build',
      ],
      en: [
        '99.897% uptime measured over 30 days (Grafana SLO error-budget)',
        '7 ArgoCD resources Synced/Healthy: app, ingress, srs, srs-rtmp-lb, redis, mysql, minio',
        'Git-triggered continuous delivery, no manual intervention',
        'Automated security scan on every build',
      ],
    },
    evidence: [
      {
        src: '/projects/twitch-argocd.jpg',
        caption: {
          fr: 'ArgoCD : application twitch-prod Synced/Healthy, 7 ressources déployées depuis Git.',
          en: 'ArgoCD: twitch-prod application Synced/Healthy, 7 resources deployed from Git.',
        },
      },
      {
        src: '/projects/twitch-grafana.jpg',
        caption: {
          fr: 'Grafana : 99.897% de disponibilité mesurée sur les 30 derniers jours.',
          en: 'Grafana: 99.897% availability measured over the last 30 days.',
        },
      },
    ],
  },
  {
    slug: 'home-energy-tracker',
    title: { fr: 'Home Energy Tracker · Multi-AZ', en: 'Home Energy Tracker · Multi-AZ' },
    category: 'DevOps',
    logo: 'springboot',
    image: '/projects/home-energy-architecture.jpg',
    imageFit: 'contain',
    description: {
      fr: "Projet DevOps construit sur une application forkée (7 microservices Spring Boot, avec permission de l'auteur original). Terraform v1 (EC2 + Docker Compose) → v2 : réécriture pour la résilience : VPC 2 AZ, Auto Scaling Group derrière un ALB, RDS MySQL Multi-AZ, secrets dans AWS Secrets Manager, accès SSM uniquement. Pipeline Jenkins CI/CD + scan GitHub Actions (tfsec/tflint/Trivy) sur l'infra.",
      en: "DevOps project built on a forked application (7 Spring Boot microservices, used with the original author's permission). Terraform v1 (EC2 + Docker Compose) → v2: resilience rewrite: 2-AZ VPC, Auto Scaling Group behind an ALB, RDS MySQL Multi-AZ, secrets in AWS Secrets Manager, SSM-only access. Jenkins CI/CD pipeline + GitHub Actions infra scanning (tfsec/tflint/Trivy).",
    },
    stack: ['Terraform', 'AWS ASG', 'RDS Multi-AZ', 'Jenkins', 'GitHub Actions', 'Spring Boot', 'Kafka'],
    repo: 'https://github.com/JuniorZ-spec/home-energy-tracker',
    featured: true,
    note: { fr: "Application forkée (leetjourney), infra et CI/CD ajoutées", en: "Forked application (leetjourney), infra and CI/CD added on top" },
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
          fr: "Fait varier le nombre d'instances selon la charge CPU : un vrai événement de scale-out a été observé au démarrage (2 → 3 → 2).",
          en: 'Varies instance count based on CPU load: a real scale-out event was observed at boot time (2 → 3 → 2).',
        },
      },
      {
        label: 'RDS MySQL',
        sub: 'Multi-AZ',
        desc: {
          fr: "Remplace le MySQL conteneurisé de la v1 : bascule automatique vers une réplique en cas de panne.",
          en: 'Replaces the containerized MySQL from v1: automatic failover to a standby replica.',
        },
      },
      {
        label: 'Secrets Manager',
        sub: 'Zéro fichier .env',
        desc: {
          fr: "Génère et stocke les secrets, récupérés par l'instance via son rôle IAM au démarrage, plus aucun .env en clair.",
          en: 'Generates and stores secrets, fetched by the instance via its IAM role at boot, no more plaintext .env.',
        },
      },
      {
        label: 'GitHub Actions',
        sub: 'tfsec · tflint · Trivy',
        desc: {
          fr: "Scan de sécurité à chaque push Terraform, publiquement vérifiable (badge dans le README). Son premier run a trouvé de vrais problèmes (variable non sécurisée par défaut, volumes non chiffrés, IMDSv2 non forcé), corrigés depuis. Les rares alertes volontairement conservées (ALB public, écoute HTTP seule) sont documentées en commentaire, pas ignorées en silence.",
          en: 'Security scan on every Terraform push, publicly verifiable (badge in the README). Its first run found real issues (insecure-by-default variable, unencrypted volumes, IMDSv2 not enforced), fixed since. The few alerts deliberately kept (public ALB, HTTP-only listener) are documented inline, not silently ignored.',
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
        "Pipeline Jenkins : build des 7 services Maven, push vers ECR privé, déploiement SSH, identifiants tirés du credential store Jenkins, jamais en dur.",
        "v2 : réécriture pour la résilience : VPC dédié 2 AZ, Auto Scaling Group derrière un ALB, RDS MySQL Multi-AZ.",
        "Secrets générés par Terraform et stockés dans AWS Secrets Manager, accès admin en SSM uniquement (zéro port SSH ouvert).",
        "GitHub Actions (terraform-ci.yml) : fmt, validate, tflint, scan tfsec et Trivy sur chaque push touchant Terraform.",
      ],
      en: [
        "v1: single EC2 instance + Docker Compose, containerized MySQL, secrets in a .env file.",
        "Jenkins pipeline: builds the 7 Maven services, pushes to a private ECR, deploys over SSH, credentials pulled from Jenkins' own credential store, never hardcoded.",
        "v2: resilience rewrite: dedicated 2-AZ VPC, Auto Scaling Group behind an ALB, RDS MySQL Multi-AZ.",
        "Secrets generated by Terraform and stored in AWS Secrets Manager, SSM-only admin access (zero open SSH port).",
        "GitHub Actions (terraform-ci.yml): fmt, validate, tflint, tfsec and Trivy scan on every push touching Terraform.",
      ],
    },
    outcome: {
      fr: [
        "Événement d'auto-scaling réel observé (pas juste écrit dans le Terraform) : 2 → 3 → 2 instances au démarrage",
        'RDS confirmé Multi-AZ (primaire eu-west-3b, standby eu-west-3a), ALB vérifié en HTTP 200',
        'Infra volontairement arrêtée entre les vérifications : discipline de coût appliquée systématiquement',
        "Scan de sécurité CI (tfsec/tflint/Trivy) publiquement vérifiable : a trouvé et fait corriger 3 vrais problèmes dès son premier run",
      ],
      en: [
        'Real auto-scaling event observed (not just written in Terraform): 2 → 3 → 2 instances at boot',
        'RDS confirmed Multi-AZ (primary eu-west-3b, standby eu-west-3a), ALB verified with HTTP 200',
        'Infra deliberately stopped between verifications: cost discipline applied consistently',
        'Publicly verifiable CI security scan (tfsec/tflint/Trivy): found and got 3 real issues fixed on its first run',
      ],
    },
  },
  {
    slug: 'save-money',
    title: { fr: 'Save Money · Gestion de finance', en: 'Save Money · Expense Tracker' },
    category: 'DevOps',
    logo: 'amazonaws',
    image: '/projects/fina-landing.jpg',
    slides: ['/projects/fina-landing.jpg', '/projects/fina-dashboard.jpg', '/projects/fina-features.jpg'],
    description: {
      fr: "Suivi de dépenses déployé en production sur AWS EC2 (Terraform), avec pipeline CI/CD en deux étapes vers un registre ECR privé. IAM Role sans credentials stockés, HTTPS via Let's Encrypt, supervision Prometheus/Grafana.",
      en: "Expense tracker deployed to production on AWS EC2 (Terraform), with a two-stage CI/CD pipeline pushing to a private ECR registry. IAM Role with no stored credentials, HTTPS via Let's Encrypt, Prometheus/Grafana monitoring.",
    },
    stack: ['AWS EC2', 'Terraform', 'ECR', 'GitHub Actions', 'Nginx', 'Prometheus', 'Grafana'],
    repo: 'https://github.com/JuniorZ-spec/SAVE-MONEY',
    live: 'https://fina-tracker.vercel.app',
    architectureFlow: [
      {
        label: 'Terraform',
        sub: 'EC2 + Security Group',
        desc: {
          fr: "Provisionne l'instance EC2 (t3.micro, Ubuntu 22.04) et son Security Group (22/80/443) de façon reproductible.",
          en: 'Provisions the EC2 instance (t3.micro, Ubuntu 22.04) and its Security Group (22/80/443) reproducibly.',
        },
      },
      {
        label: 'GitHub Actions',
        sub: 'CI + CD séparés',
        desc: {
          fr: "CI (lint, typecheck) et build+push ECR d'un côté, CD déclenché par workflow_run de l'autre : impossible de déployer du code qui n'a pas passé la CI.",
          en: 'CI (lint, typecheck) and ECR build+push on one side, CD triggered by workflow_run on the other: impossible to deploy code that failed CI.',
        },
      },
      {
        label: 'ECR',
        sub: 'Registre privé',
        desc: {
          fr: "Registre Docker privé AWS. Le CD s'authentifie avec un token temporaire de 12h généré à la volée, aucun credential stocké sur le serveur.",
          en: 'Private AWS Docker registry. The CD authenticates with a 12h temporary token generated on the fly, no credential stored on the server.',
        },
      },
      {
        label: 'EC2',
        sub: 'Docker Compose',
        desc: {
          fr: 'Le serveur pull les images depuis ECR et relance la stack via docker compose up -d, sans interruption manuelle.',
          en: 'The server pulls images from ECR and restarts the stack via docker compose up -d, no manual intervention.',
        },
      },
      {
        label: 'Nginx',
        sub: "TLS · Let's Encrypt",
        desc: {
          fr: "Seul point d'entrée public : route /api vers le serveur Node.js, / vers le client React, et redirige tout le trafic HTTP vers HTTPS.",
          en: 'The only public entry point: routes /api to the Node.js server, / to the React client, and redirects all HTTP traffic to HTTPS.',
        },
      },
      {
        label: 'Node Exporter',
        sub: 'Prometheus · Grafana',
        desc: {
          fr: "CloudWatch gratuit ne remonte pas la RAM : Node Exporter expose ~300 métriques système que Prometheus scrape toutes les 15s, visualisées dans Grafana.",
          en: 'Free CloudWatch does not report RAM: Node Exporter exposes ~300 system metrics that Prometheus scrapes every 15s, visualized in Grafana.',
        },
      },
    ],
    terminalCommands: [
      '$ git push origin main',
      '$ aws ecr get-login-password | docker login --username AWS --password-stdin $ECR',
      '$ docker compose pull && docker compose up -d --remove-orphans',
      '# workflow_run: CD attend la fin de la CI avant de déployer',
    ],
    implementationSteps: {
      fr: [
        "Infrastructure AWS EC2 provisionnée avec Terraform (auparavant créée à la main dans la console).",
        "Deux pipelines séparés : ci.yml vérifie le code (lint, typecheck, build), cd.yml se déclenche seulement si la CI a réussi (workflow_run).",
        "Images Docker buildées et poussées vers un registre ECR privé, authentification par token temporaire 12h.",
        "Nginx en unique point d'entrée public, HTTPS via Let's Encrypt (certbot + nip.io, l'instance n'a pas de nom de domaine).",
        "Supervision Prometheus/Grafana via Node Exporter, pour voir la RAM et le disque que CloudWatch gratuit ne remonte pas.",
      ],
      en: [
        "AWS EC2 infrastructure provisioned with Terraform (previously created by hand in the console).",
        "Two separate pipelines: ci.yml checks the code (lint, typecheck, build), cd.yml only fires if CI succeeded (workflow_run).",
        "Docker images built and pushed to a private ECR registry, authenticated with a 12h temporary token.",
        "Nginx as the sole public entry point, HTTPS via Let's Encrypt (certbot + nip.io, since the instance has no domain name).",
        "Prometheus/Grafana monitoring via Node Exporter, to see RAM and disk that free-tier CloudWatch doesn't report.",
      ],
    },
    outcome: {
      fr: [
        "CD qui ne se déclenche jamais sur du code n'ayant pas passé la CI (workflow_run)",
        'Déploiement sans credentials stockés sur le serveur (token ECR temporaire de 12h)',
        'Monitoring système réel via Node Exporter (RAM, disque, CPU) en complément de CloudWatch',
        'HTTPS automatique renouvelé tous les 90 jours (cron + certbot)',
      ],
      en: [
        'CD that never triggers on code that failed CI (workflow_run)',
        'Deployment with no credentials stored on the server (12h temporary ECR token)',
        'Real system monitoring via Node Exporter (RAM, disk, CPU) on top of CloudWatch',
        'Automatic HTTPS renewed every 90 days (cron + certbot)',
      ],
    },
    evidence: [
      {
        src: '/projects/fina-pipeline.jpg',
        caption: {
          fr: "Schéma réel du pipeline : CI (lint/build) → build Docker → push ECR → CD déclenché par workflow_run → pull sur l'EC2.",
          en: 'Real pipeline diagram: CI (lint/build) → Docker build → ECR push → CD triggered by workflow_run → pull on the EC2.',
        },
      },
      {
        src: '/projects/fina-grafana.jpg',
        caption: {
          fr: 'Grafana / Node Exporter sur le t3.micro en production : RAM, disque, réseau et uptime réels.',
          en: 'Grafana / Node Exporter on the production t3.micro: real RAM, disk, network and uptime.',
        },
      },
    ],
  },
  {
    slug: 'multi-jeux',
    title: { fr: 'GameCloud · Plateforme AWS EKS', en: 'GameCloud · AWS EKS Platform' },
    category: 'DevOps',
    logo: 'amazonaws',
    image: '/projects/gamecloud-architecture.jpg',
    imageFit: 'contain',
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
          fr: "Seule porte d'entrée vers l'API EKS privée, via AWS Systems Manager, zéro clé SSH stockée.",
          en: 'The only entry point to the private EKS API, via AWS Systems Manager, zero stored SSH key.',
        },
      },
      {
        label: 'GitHub Actions',
        sub: 'CI + OIDC',
        desc: {
          fr: 'Build, scan Trivy, push vers ECR taggé par SHA, authentification OIDC, aucune clé AWS stockée dans GitHub.',
          en: 'Build, Trivy scan, push to ECR tagged by commit SHA, OIDC authentication, no AWS key stored in GitHub.',
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
          fr: "Deux mécanismes d'identité AWS pour les pods, démontrés et comparés : aucune clé AWS stockée dans le cluster.",
          en: 'Two AWS identity mechanisms for pods, demonstrated and compared: no AWS key ever stored in the cluster.',
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
    evidence: [
      {
        src: '/projects/gamecloud-argocd-apps.jpg',
        caption: {
          fr: 'ArgoCD : les 8 Applications (auth, frontend, datastores, 4 mini-jeux, score) Synced/Healthy.',
          en: 'ArgoCD: all 8 Applications (auth, frontend, datastores, 4 mini-games, score) Synced/Healthy.',
        },
      },
      {
        src: '/projects/gamecloud-grafana.jpg',
        caption: {
          fr: 'Grafana : utilisation CPU/mémoire réelle du cluster, détail par namespace (gamecloud : 9 pods, 9 workloads).',
          en: 'Grafana: real cluster CPU/memory usage, broken down by namespace (gamecloud: 9 pods, 9 workloads).',
        },
      },
      {
        src: '/projects/gamecloud-budget.jpg',
        caption: {
          fr: "AWS Budgets : budget mensuel configuré à 20$ avec alertes automatiques, discipline de coût appliquée à chaque session.",
          en: 'AWS Budgets: $20 monthly budget with automatic alerts, cost discipline applied to every session.',
        },
      },
    ],
  },
  {
    slug: 'bus-reservation',
    title: {
      fr: 'Réservation de bus multi-compagnies',
      en: 'Multi-Carrier Bus Booking',
    },
    category: 'Full-Stack',
    logo: 'react',
    image: '/projects/bus-landing.jpg',
    slides: ['/projects/bus-landing.jpg', '/projects/bus-admin.jpg', '/projects/bus-company.jpg'],
    description: {
      fr: "Réservation de tickets de bus multi-compagnies avec authentification JWT et gestion des rôles voyageur/compagnie/admin. Backend Render, frontend Vercel, base Neon PostgreSQL et cache Redis. En parallèle, projet vitrine DevOps : migration vers une architecture AWS (ECS Fargate, RDS, SQS FIFO + Lambda) qui élimine une vraie race condition sur la réservation de sièges.",
      en: "Multi-carrier bus ticket booking app with JWT auth and traveler/company/admin role management. Render backend, Vercel frontend, Neon PostgreSQL database and Redis cache. In parallel, a DevOps showcase project: migration to an AWS architecture (ECS Fargate, RDS, SQS FIFO + Lambda) that eliminates a real race condition on seat booking.",
    },
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'GitHub Actions', 'AWS ECS', 'SQS', 'Lambda'],
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
      {
        label: 'GitHub Actions',
        sub: 'OIDC · Trivy',
        desc: {
          fr: "CI/CD authentifiée par OIDC (aucune clé AWS statique), scan de sécurité Trivy bloquant, puis push vers ECR. Volet AWS éphémère : déployé et vérifié, démonté entre les sessions.",
          en: 'CI/CD authenticated via OIDC (no static AWS key), blocking Trivy security scan, then push to ECR. Ephemeral AWS track: deployed and verified, torn down between sessions.',
        },
      },
      {
        label: 'ECR',
        sub: 'Registre immuable',
        desc: {
          fr: "Repos ECR immutables : pas de tag latest, chaque déploiement référence un sha de commit exact et ne peut être écrasé.",
          en: 'Immutable ECR repos: no latest tag, every deployment references an exact commit sha and can never be overwritten.',
        },
      },
      {
        label: 'ECS Fargate',
        sub: 'API + ALB',
        desc: {
          fr: "API sur ECS Fargate derrière un ALB, secrets en SSM Parameter Store. Vérifié en conditions réelles : curl sur /health répond 200 à travers toute la chaîne.",
          en: 'API on ECS Fargate behind an ALB, secrets in SSM Parameter Store. Verified end-to-end: curl on /health returns 200 through the whole chain.',
        },
      },
      {
        label: 'RDS PostgreSQL',
        sub: 'db.t4g.micro',
        desc: {
          fr: "En subnet public avec security group verrouillé plutôt qu'une NAT Gateway : compromis de coût assumé et documenté, pas un oubli.",
          en: 'In a public subnet with a locked-down security group instead of a NAT Gateway: a documented cost trade-off, not an oversight.',
        },
      },
      {
        label: 'SQS FIFO',
        sub: 'File de réservation',
        desc: {
          fr: "Chaque demande de réservation de siège passe par une file FIFO avant traitement, pour sérialiser les accès concurrents au même siège.",
          en: 'Every seat booking request goes through a FIFO queue before processing, to serialize concurrent access to the same seat.',
        },
      },
      {
        label: 'Lambda',
        sub: 'booking-processor',
        desc: {
          fr: "Traite chaque message de la file et s'appuie sur une contrainte base de données (@@unique([tripId, seat])), pas sur l'ordre d'arrivée, pour garantir zéro double réservation.",
          en: 'Processes each queue message and relies on a database constraint (@@unique([tripId, seat])), not message order, to guarantee zero duplicate booking.',
        },
      },
    ],
    implementationSteps: {
      fr: [
        "Authentification JWT avec rôles voyageur/compagnie/admin, backend Render, frontend Vercel, base Neon PostgreSQL.",
        "Audit du code existant : la logique de réservation lisait puis écrivait sans contrainte DB, une race condition classique sur la confirmation de siège.",
        "Migration Terraform en modules isolés (bootstrap, network, ecr, frontend, backend, async) : OIDC GitHub Actions, ECS Fargate + ALB + RDS vérifiés bout-en-bout.",
        "Ajout d'une file SQS FIFO + Lambda devant la réservation, avec la contrainte @@unique([tripId, seat]) comme véritable garant de l'absence de doublon.",
        "Test de charge k6 sur un trajet neuf de 40 sièges avec 50 utilisateurs simultanés, vérifié aussi bien via l'API qu'en requêtant directement la base.",
      ],
      en: [
        "JWT authentication with traveler/company/admin roles, Render backend, Vercel frontend, Neon PostgreSQL database.",
        "Audited the existing code: the booking logic read then wrote with no DB constraint, a textbook race condition on seat confirmation.",
        "Terraform migration in isolated modules (bootstrap, network, ecr, frontend, backend, async): OIDC GitHub Actions, ECS Fargate + ALB + RDS verified end-to-end.",
        "Added an SQS FIFO queue + Lambda in front of booking, with the @@unique([tripId, seat]) constraint as the real guarantee against duplicates.",
        "k6 load test on a fresh 40-seat trip with 50 concurrent users, verified both via the API and by querying the database directly.",
      ],
    },
    outcome: {
      fr: [
        'Race condition réelle reproduite puis éliminée : 2 requêtes simultanées sur le même siège → 1 confirmée, 1 rejetée proprement',
        "Test de charge k6 (50 utilisateurs, 40 sièges) : 40 confirmations, 10 refus, 0 doublon — vérifié par une requête SQL directe",
        "API vérifiée en conditions réelles : ALB → ECS Fargate → RDS répond HTTP 200 sur /health",
        'Infra AWS démontée après vérification (budget ~60$ maîtrisé), démo permanente sur Vercel + Render',
      ],
      en: [
        'Real race condition reproduced then eliminated: 2 simultaneous requests on the same seat → 1 confirmed, 1 cleanly rejected',
        'k6 load test (50 users, 40 seats): 40 confirmations, 10 rejections, 0 duplicates — verified with a direct SQL query',
        'API verified end-to-end: ALB → ECS Fargate → RDS returns HTTP 200 on /health',
        'AWS infra torn down after verification (~$60 budget kept in check), permanent demo on Vercel + Render',
      ],
    },
  },
  {
    slug: 'gym-program',
    title: { fr: 'Gym Program', en: 'Gym Program' },
    category: 'Full-Stack',
    logo: 'typescript',
    image: '/projects/gym-landing.jpg',
    slides: ['/projects/gym-landing.jpg', '/projects/gym-dashboard.jpg', '/projects/gym-wizard.jpg'],
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
      {
        label: 'GitHub Actions',
        sub: '2 jobs parallèles',
        desc: {
          fr: "Job client (lint + build) et job server (prisma generate + tsc --noEmit) en parallèle à chaque push/PR sur main. La CI ne bloque pas Vercel directement, mais la protection de branche sur main interdit tout merge tant qu'elle est rouge.",
          en: 'Client job (lint + build) and server job (prisma generate + tsc --noEmit) run in parallel on every push/PR to main. CI does not gate Vercel directly, but branch protection on main blocks any merge while it is red.',
        },
      },
      {
        label: 'Vercel',
        sub: 'Frontend React',
        desc: {
          fr: "Intégration Git native (Root Directory client/) : chaque push sur main déploie la prod, chaque PR génère une preview isolée. vercel.json gère le rewrite SPA pour que React Router ne 404 pas au rechargement.",
          en: 'Native Git integration (Root Directory client/): every push to main deploys to prod, every PR gets an isolated preview. vercel.json handles the SPA rewrite so React Router does not 404 on refresh.',
        },
      },
      {
        label: 'Render',
        sub: 'Backend Node.js',
        desc: {
          fr: "Le job deploy-server de la CI n'appelle le Deploy Hook Render qu'après un job server vert (needs: server) : le serveur ne se redéploie jamais sur du code cassé. Config du service versionnée en Blueprint (render.yaml) plutôt que cliquée à la main.",
          en: "The CI's deploy-server job only calls the Render Deploy Hook after a green server job (needs: server): the server never redeploys broken code. Service config is version-controlled as a Blueprint (render.yaml) rather than clicked by hand.",
        },
      },
      {
        label: 'PostgreSQL',
        sub: 'Prisma · Neon',
        desc: {
          fr: "4 modèles Prisma (UserProfile, TrainingPlan, WeightLog, SessionLog). Le serveur tourne avec tsx directement en prod plutôt que tsc + node dist/, pour éviter un souci de résolution ESM sur les imports relatifs sans extension .js.",
          en: '4 Prisma models (UserProfile, TrainingPlan, WeightLog, SessionLog). The server runs with tsx directly in prod rather than tsc + node dist/, to avoid an ESM resolution issue on relative imports without a .js extension.',
        },
      },
      {
        label: 'OpenRouter',
        sub: 'Génération IA',
        desc: {
          fr: "Génère le plan d'entraînement à partir du profil complet (objectif, niveau, poids, matériel, blessures signalées), stocké versionné par utilisateur dans TrainingPlan.",
          en: 'Generates the workout plan from the full profile (goal, level, weight, equipment, reported injuries), stored versioned per user in TrainingPlan.',
        },
      },
    ],
    implementationSteps: {
      fr: [
        "8 routes REST (profil, génération de plan, poids, séances) consommées par le client React via un module lib/api dédié.",
        "CI GitHub Actions en 2 jobs parallèles (client : lint+build ; server : prisma generate + tsc --noEmit), protection de branche sur main.",
        "Déploiement backend sur Render piloté par Blueprint (render.yaml versionné), Deploy Hook déclenché seulement après succès du job server.",
        "Frontend déployé sur Vercel via intégration Git native, avec preview automatique sur chaque pull request.",
        "Secrets jamais commités : .env.example documente les variables, les vraies valeurs vivent uniquement dans les dashboards Vercel/Render/GitHub.",
      ],
      en: [
        "8 REST routes (profile, plan generation, weight, sessions) consumed by the React client through a dedicated lib/api module.",
        "GitHub Actions CI as 2 parallel jobs (client: lint+build; server: prisma generate + tsc --noEmit), branch protection on main.",
        "Backend deployment on Render driven by a Blueprint (version-controlled render.yaml), Deploy Hook only triggered after the server job succeeds.",
        "Frontend deployed on Vercel via native Git integration, with an automatic preview on every pull request.",
        "Secrets never committed: .env.example documents the variables, real values live only in the Vercel/Render/GitHub Actions dashboards.",
      ],
    },
    outcome: {
      fr: [
        'Déploiement serveur bloqué si la CI échoue (needs: server), jamais de code cassé en production',
        'Migrations de base automatiques et sans intervention manuelle',
        "Limite assumée plutôt que cachée : aucune suite de tests automatisés pour l'instant, prochaine brique identifiée",
      ],
      en: [
        'Server deployment blocked if CI fails (needs: server), never broken code in production',
        'Automatic database migrations, no manual intervention',
        'Honestly stated limitation: no automated test suite yet, identified as the next piece to add',
      ],
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
      {
        label: 'React',
        sub: 'Frontend · Vite',
        desc: {
          fr: "React 19 + React Router 7, appels API centralisés dans un module axios dédié, accès protégé par un ProtectedRoute qui s'appuie sur AuthContext.",
          en: 'React 19 + React Router 7, API calls centralized in a dedicated axios module, access gated by a ProtectedRoute backed by AuthContext.',
        },
      },
      {
        label: 'Node.js / Express',
        sub: 'API REST',
        desc: {
          fr: "Express 5 en ESM. Toutes les routes sauf /api/auth/* passent par un authMiddleware qui vérifie le token JWT transmis en en-tête Authorization.",
          en: 'Express 5 in ESM. Every route except /api/auth/* passes through an authMiddleware that verifies the JWT sent in the Authorization header.',
        },
      },
      {
        label: 'MongoDB',
        sub: 'Mongoose',
        desc: {
          fr: "5 schémas Mongoose (User, Project, Step, Note, Conversation). Les notes peuvent référencer un projet de façon optionnelle, les étapes appartiennent à un projet.",
          en: '5 Mongoose schemas (User, Project, Step, Note, Conversation). Notes can optionally reference a project, steps belong to a project.',
        },
      },
      {
        label: 'Gemini API',
        sub: 'Assistant contextuel',
        desc: {
          fr: "Chaque message envoyé à l'assistant est enrichi avec le contexte réel de l'utilisateur (ses projets et tâches en cours), pas un chat générique sans mémoire de l'état de l'app.",
          en: "Every message sent to the assistant is enriched with the user's real context (their projects and current tasks), not a generic chat with no awareness of the app's state.",
        },
      },
    ],
    implementationSteps: {
      fr: [
        "Authentification JWT avec mots de passe hachés (bcryptjs), middleware unique appliqué à toutes les routes protégées.",
        "5 modèles Mongoose (User, Project, Step, Note, Conversation) avec relations optionnelles entre notes et projets.",
        "Suivi de statut par étape de projet (à faire/en cours/terminé), CRUD complet côté API et interface.",
        "Assistant IA conversationnel (Gemini) qui reçoit le contexte réel des projets et tâches de l'utilisateur à chaque message, pas seulement l'historique de discussion.",
      ],
      en: [
        "JWT authentication with hashed passwords (bcryptjs), a single middleware applied to every protected route.",
        "5 Mongoose models (User, Project, Step, Note, Conversation) with optional relations between notes and projects.",
        "Per-step project status tracking (todo/in progress/completed), full CRUD on both API and interface.",
        "Conversational AI assistant (Gemini) that receives the user's real projects and tasks context on every message, not just chat history.",
      ],
    },
  },
  {
    slug: 'ecom-website',
    title: { fr: 'Prostore · E-commerce', en: 'Prostore · E-commerce' },
    category: 'Full-Stack',
    logo: 'nextdotjs',
    image: '/projects/prostore.png',
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
