export const dict = {
  fr: {
    nav: {
      openMenu: 'Ouvrir le menu',
    },
    footer: {
      copyright: 'ZINZINDOHOUE Olivier Junior. Tous droits réservés.',
      status: 'Ouvert aux postes DevOps / Platform / Cloud junior',
    },
    home: {
      whoami: 'whoami',
      welcomeTag: 'Bienvenue — laissez-moi me présenter',
      heroLines: [{ text: 'Ingénieur DevOps' }, { text: '& Full-Stack', className: 'glow' }],
      heroSr: 'Ingénieur DevOps & Full-Stack',
      heroText:
        "Je suis Olivier — Ingénieur DevOps junior avec un solide bagage full-stack. Je couvre tout le cycle : construire l'application (Node.js, React, PostgreSQL) et tout ce qui l'amène en production — CI/CD, Kubernetes, infrastructure as code, monitoring. À l'aise des deux côtés du mur, ce qui revient à dire : pas de mur.",
      seeProjects: 'Voir mes projets',
      contactMe: 'Me contacter',
      rotatingWords: ['DEVOPS', 'CLOUD', 'FULL-STACK'],
      heroHeadline1: "Salut, je suis",
      heroHeadlineName: 'Olivier Junior',
      heroHeadline2: "Je construis les applications et l'infrastructure qui les fait tourner.",
      heroSubline:
        "Ingénieur DevOps & Cloud avec un bagage full-stack. De la première ligne de code au monitoring en production. Cotonou, Bénin — en remote partout dans le monde.",
      btnStartProject: 'Démarrer un projet',
      btnSeeWork: 'Voir mon travail',
      btnResume: 'Voir mon CV',
      heroBadges: [
        {
          icon: '/certs/aws-saa.png',
          text: 'Certifié AWS Solutions Architect – Associate',
          href: 'https://www.credly.com/badges/5d5a3911-780f-4f19-94dc-394a9556896d/public_url',
        },
      ],
      stats: [
        { value: 2, suffix: '+', label: "Années d'expérience" },
        { value: 2, suffix: '', label: 'Plateformes Cloud' },
        { value: 22, suffix: '', label: 'Projets réalisés' },
        { value: 30, suffix: '+', label: 'Technologies' },
      ],
      techEyebrow: '$ ls ./technologies',
      techTitle: 'Featured Technologies',
      techSub:
        "Une sélection des outils que j'utilise au quotidien pour construire et déployer des systèmes cloud fiables.",
      ctaTitle: 'Ready to Deploy Your Vision?',
      ctaText:
        "De l'infrastructure à l'application, je transforme vos idées en systèmes fonctionnels, automatisés et prêts pour la production.",
      ctaStart: 'Démarrer un projet',
      ctaViewCode: 'View Code',
      howEyebrow: '$ cat workflow.md',
      howTitle: 'Comment je travaille',
      howSub: 'Le déroulé concret, du premier échange à la mise en production.',
      howSteps: [
        {
          icon: '💬',
          title: 'Cadrage',
          text: "On discute du besoin réel, des contraintes techniques et du budget. Pas de sur-ingénierie : je propose ce qui est nécessaire, pas ce qui impressionne.",
        },
        {
          icon: '🧱',
          title: 'Architecture & Infra',
          text: "Infrastructure définie en code (Terraform), reproductible et versionnée. Choix des services cloud justifiés par le besoin, pas par la mode.",
        },
        {
          icon: '⚙️',
          title: 'Build & Automatisation',
          text: 'Développement applicatif et pipeline CI/CD (tests, scan sécurité, déploiement automatisé). Chaque étape est reproductible et documentée.',
        },
        {
          icon: '📈',
          title: 'Mise en prod & Suivi',
          text: 'Déploiement, monitoring (Prometheus/Grafana quand pertinent) et passation claire — tu sais ce qui tourne, où, et comment le maintenir.',
        },
      ],
      servicesEyebrow: '$ cat services.md',
      servicesTitle: 'Services',
      servicesSub: 'Ce sur quoi je peux intervenir, seul ou en complément de ton équipe.',
      services: [
        {
          icon: '🧱',
          title: 'Infrastructure as Code',
          text: 'Provisionnement cloud avec Terraform : VPC, EC2, RDS, IAM, réseau — versionné et reproductible.',
        },
        {
          icon: '⚙️',
          title: 'Pipelines CI/CD',
          text: 'GitHub Actions ou Jenkins : build, tests, scan sécurité (Trivy), déploiement automatisé.',
        },
        {
          icon: '☸️',
          title: 'Kubernetes & GitOps',
          text: 'Déploiement et orchestration de conteneurs, mise en place ArgoCD pour un déploiement continu basé sur Git.',
        },
        {
          icon: '💻',
          title: 'Développement Full-Stack',
          text: "Applications web bout en bout : Node.js, React/Next.js, PostgreSQL — de l'idée à la mise en production.",
        },
      ],
      faqEyebrow: '$ cat faq.md',
      faqTitle: 'Questions fréquentes',
      faq: [
        {
          q: 'Quel type de mission acceptes-tu ?',
          a: "Missions freelance full-stack ou DevOps/Cloud, ainsi que des postes junior DevOps / Platform / Cloud. Je précise toujours honnêtement si un besoin dépasse mon niveau actuel.",
        },
        {
          q: 'Comment se passe une première prise de contact ?',
          a: "Un échange (visio ou écrit) pour comprendre le besoin, avant tout devis ou engagement. Aucune obligation.",
        },
        {
          q: 'Travailles-tu en remote ?',
          a: 'Oui, je suis basé à Cotonou, Bénin, et travaille entièrement en remote avec des clients partout dans le monde.',
        },
        {
          q: 'Peux-tu reprendre un projet existant ?',
          a: "Oui — audit du code/infra existant avant toute intervention, pour proposer des changements justifiés plutôt que de tout réécrire.",
        },
      ],
    },
    about: {
      eyebrow: '$ cat about.md',
      title: 'À propos de moi',
      sub: 'Parcours, philosophie technique et expérience professionnelle.',
      aboutHeadline: "Construire des plateformes cloud fiables, par l'automatisation.",
      capabilities: [
        { icon: '🧱', title: 'Infrastructure as Code' },
        { icon: '⚙️', title: 'Automatisation CI/CD' },
        { icon: '☸️', title: 'Kubernetes & GitOps' },
        { icon: '☁️', title: 'Cloud Multi-plateforme' },
        { icon: '📊', title: 'Monitoring & Observabilité' },
        { icon: '💻', title: 'Développement Full-Stack' },
      ],
      bioTitle: '$ cat bio.txt',
      bioLead:
        'Salut, je suis Olivier — Ingénieur DevOps junior avec un solide bagage full-stack.',
      bioP1:
        "Je couvre tout le cycle : construire l'application (Node.js, React, PostgreSQL) et tout ce qui l'amène en production — pipelines CI/CD, Kubernetes, infrastructure as code, monitoring.",
      bioP2: 'À l\'aise des deux côtés du mur, ce qui revient à dire : pas de mur.',
      bioP3:
        "Étudiant en Master (MSc) Systèmes, Réseaux et Cloud Computing à l'ESGIS, ouvert aux postes DevOps / Platform / Cloud junior — les missions full-stack sont aussi les bienvenues.",
      quickStatsTitle: 'Quick Stats',
      quickStats: [
        { label: 'Expérience', value: '2+ ans' },
        { label: 'Plateformes Cloud', value: 'AWS, Azure' },
        { label: 'Projets', value: '22 réalisés' },
        { label: 'Technologies', value: '30+ maîtrisées' },
      ],
      specTitle: 'Spécialisations',
      specTags: [
        'Infrastructure as Code',
        'CI/CD Automation',
        'Kubernetes & GitOps',
        'Développement Full-Stack',
      ],
      philosophyEyebrow: '$ cat philosophy.md',
      philosophyTitle: 'Philosophie technique',
      philosophySub: 'Les principes qui guident mon approche du développement et du DevOps.',
      philosophyCards: [
        {
          icon: '⚡',
          title: "Automatisation d'abord",
          text: 'Tout processus manuel devrait être automatisé, chaque déploiement doit être reproductible.',
        },
        {
          icon: '</>',
          title: 'Infrastructure as Code',
          text: "Traiter l'infrastructure avec la même rigueur que le code applicatif : Terraform, GitOps, review systématique.",
        },
        {
          icon: '☁',
          title: 'Cloud Native',
          text: 'Concevoir pour le cloud dès le départ : conteneurisation, orchestration Kubernetes, observabilité.',
        },
      ],
      timelineEyebrow: '$ cat career.log',
      timelineTitle: 'Career Timeline',
      timelineSub: 'Mon parcours, du développement full-stack au DevOps & cloud.',
      timeline: [
        {
          icon: '💻',
          title: 'Développeur Web Full-Stack — Freelance',
          period: '2025 – Présent',
          loc: 'Télétravail',
          text: "Prise en charge complète de projets web full-stack pour des clients variés : analyse du besoin, conception de l'architecture, développement front-end et back-end, conteneurisation avec Docker et mise en production autonome. Stack : Node.js, Express, React, Next.js, PostgreSQL, MongoDB, APIs REST.",
        },
        {
          icon: '🎓',
          title: 'MSc — Systèmes, Réseaux et Cloud Computing',
          period: '2025 – Présent',
          loc: 'ESGIS, Cotonou, Bénin',
          text: 'Spécialisation infrastructure cloud, réseaux et systèmes distribués.',
        },
        {
          icon: '💻',
          title: 'Développeur Web — Acxs IT',
          period: '2024 – 2025',
          loc: 'Cotonou, Bénin',
          text: "Contribution active au développement front-end et back-end sur des applications en production. Conception et exécution de tests unitaires et d'intégration, réduction des régressions. Revues de code, gestion des branches Git, pull requests documentées, collaboration avec l'équipe Réseaux & Sécurité.",
        },
        {
          icon: '💻',
          title: 'Développeur Web — KKM Cosmétique',
          period: '2023 – 2024',
          loc: 'Cotonou, Bénin',
          text: "Développement complet de l'interface front-end, conception et implémentation des routes API REST, modélisation de la logique métier et intégration des modules de la plateforme e-commerce de l'entreprise.",
        },
        {
          icon: '🎓',
          title: 'Licence — Génie Logiciel',
          period: '2021 – 2024',
          loc: 'IFRI, Cotonou, Bénin',
          text: 'Formation en développement logiciel : algorithmique, bases de données, génie logiciel.',
        },
      ],
      certEyebrow: '$ cat certifications.md',
      certTitle: 'Certifications',
      certs: ['AWS Certified Solutions Architect – Associate'],
      certVerify: 'Voir sur Credly →',
      otherCertsTitle: 'Autres formations certifiantes',
      otherCerts: [
        { title: 'LFS158: Introduction to Kubernetes', issuer: 'The Linux Foundation', date: 'Août 2026' },
        {
          title: 'Linux Foundation Certified System Administrator (LFCS) Cert Prep',
          issuer: 'LinkedIn',
          date: 'Juillet 2026',
        },
        {
          title: 'Certified Kubernetes Administrator (CKA) Cert Prep',
          issuer: 'LinkedIn',
          date: 'Juin 2026',
        },
        {
          title: 'Microsoft Azure Essentials Professional Certificate by Microsoft and LinkedIn',
          issuer: 'Microsoft',
          date: 'Juin 2026',
        },
        {
          title:
            'GitHub Actions Workshop: Create CI/CD Pipelines to Automate, Build, Test and Deploy your Application by Microsoft Press',
          issuer: 'LinkedIn',
          date: 'Juin 2026',
        },
        {
          title: 'DevOps Professional Certificate by PagerDuty and LinkedIn',
          issuer: 'PagerDuty',
          date: 'Juin 2026',
        },
        { title: 'Docker Foundations Professional Certificate', issuer: 'Docker, Inc', date: 'Juin 2026' },
      ],
      certInProgressLabel: 'En cours',
      certsInProgress: [],
    },
    skills: {
      eyebrow: '$ ls -la skills/',
      title: 'Compétences techniques',
      sub: "Le cycle complet du développement jusqu'au déploiement autonome — cloud, infrastructure et développement.",
      proficiency: 'Maîtrise',
      explorerEyebrow: '$ ./explore.sh',
      explorerTitle: 'Interactive Skill Explorer',
      explorerSub: 'Utilise des commandes terminal pour explorer mes compétences en détail.',
      practicesTitle: 'Pratiques & Méthodologies',
      practices: [
        'REST API',
        'Tests unitaires & intégration',
        'Code Review',
        'GitOps',
        'Architecture microservices',
      ],
    },
    projects: {
      eyebrow: '$ docker ps -a',
      title: 'Projets',
      sub: 'Liste des projets déployés et applications réalisées.',
      featuredTitle: 'Projets phares',
      allTitle: 'Tous les projets',
      filterAll: 'All Projects',
      viewCode: 'Voir le code',
      viewLive: 'Live',
      infraOffNote: '☁ Infra éteinte (coûts cloud) — réactivable sur demande pour une démo',
      coldStartNote: '⏱ Backend gratuit (Render) — 30-60s de chargement au premier accès',
      summaryTitle: '$ cat project_summary.txt',
      totalProjects: 'Total Projects',
      devopsProjects: 'DevOps Projects',
      fullStackProjects: 'Full-Stack Projects',
      techUsed: 'Technologies Used',
      summaryEcho:
        '$ echo "Chaque projet illustre une mise en œuvre réelle d\'architecture cloud-native et de bonnes pratiques de développement moderne."',
      ctaTitle: 'Interested in Collaboration?',
      ctaText:
        'Ces projets illustrent mon expertise en DevOps et en développement full-stack. Discutons de la manière dont on peut travailler ensemble sur votre prochain projet.',
      ctaViewAll: 'Voir tous les projets',
      ctaStart: 'Démarrer un projet',
      moreOnGithub: "D'autres projets et expérimentations sont disponibles sur mon GitHub →",
    },
    blog: {
      eyebrow: '$ ls ./blog',
      title: 'Blog',
      echo: '$ echo "Articles à venir..."',
      sub: "Je prépare des articles sur Kubernetes, GitOps et le déploiement d'infrastructures cloud. Reviens bientôt.",
    },
    caseStudies: {
      eyebrow: '$ cat case-studies.md',
      title: 'Études de cas',
      sub: 'Trois projets détaillés en format problème / solution / résultat.',
      problem: 'Problème :',
      solution: 'Solution :',
      result: 'Résultat :',
      viewRepo: 'Voir le repo →',
      studies: [
        {
          title: 'Twitch Clone — Streaming auto-hébergé',
          problem:
            "déployer une plateforme de streaming complète et résiliente sans dépendre d'un service tiers managé.",
          solution:
            'cluster k3s sur Azure provisionné via Terraform, 6 services (Next.js, MySQL, Redis, MinIO S3, SRS), GitOps ArgoCD avec auto-sync et self-heal, HPA.',
          result:
            'infrastructure reproductible, auto-scaling de 2 à 5 replicas, observabilité complète via Prometheus/Grafana.',
        },
        {
          title: 'Home Energy Tracker — Microservices Java',
          problem:
            'suivre la consommation énergétique via une architecture scalable et observable, avec authentification centralisée.',
          solution:
            '7 microservices Spring Boot 4 / Java 21, pipeline Jenkins déclaratif (build, tests, scan Trivy), Kafka KRaft, InfluxDB, Keycloak OAuth2.',
          result:
            "infrastructure AWS provisionnée avec Terraform (EC2, security group restreint par IP), observabilité Prometheus/Grafana et sécurité renforcée par scan de vulnérabilités automatisé.",
        },
        {
          title: 'Save Money — Sécuriser un déploiement AWS sans budget',
          problem:
            "déployer une application en production sur AWS sans stocker de credentials sensibles dans le code ni sur le serveur, avec un budget proche de zéro.",
          solution:
            "EC2 t3.micro provisionné avec Terraform (eu-west-3), IAM Role attaché à l'instance (permissions ECR en lecture seule, aucune clé stockée), pipeline en 2 étapes (ci.yml build + push ECR, cd.yml déploiement via SSH déclenché par workflow_run), HTTPS gratuit via Let's Encrypt/nip.io.",
          result:
            "déploiement continu sécurisé sans secret AWS exposé, coût d'infrastructure minimal, supervision Prometheus + Node Exporter + Grafana pour suivre la santé du serveur.",
        },
      ],
    },
    contact: {
      eyebrow: '$ ./contact.sh',
      title: 'Discutons de votre projet',
      sub: 'Une idée, une opportunité, une question ? Écrivez-moi, je réponds rapidement.',
      location: '📍 Cotonou, Bénin',
      formName: 'Nom',
      formEmail: 'Email',
      formMessage: 'Votre message',
      formSend: 'Envoyer',
    },
  },
  en: {
    nav: {
      openMenu: 'Open menu',
    },
    footer: {
      copyright: 'ZINZINDOHOUE Olivier Junior. All rights reserved.',
      status: 'Open to junior DevOps / Platform / Cloud roles',
    },
    home: {
      whoami: 'whoami',
      welcomeTag: 'Welcome — let me introduce myself',
      heroLines: [{ text: 'DevOps Engineer' }, { text: '& Full-Stack Dev', className: 'glow' }],
      heroSr: 'DevOps Engineer & Full-Stack Dev',
      heroText:
        "Hi, I'm Olivier — a Junior DevOps Engineer with a solid full-stack background. I cover the whole lifecycle: building the application (Node.js, React, PostgreSQL) and everything that gets it to production — CI/CD pipelines, Kubernetes, infrastructure as code, monitoring. Comfortable on either side of the wall, which means: no wall.",
      seeProjects: 'View my projects',
      contactMe: 'Contact me',
      rotatingWords: ['DEVOPS', 'CLOUD', 'FULL-STACK'],
      heroHeadline1: "Hey, I'm",
      heroHeadlineName: 'Olivier Junior',
      heroHeadline2: 'I build applications and the infrastructure that runs them.',
      heroSubline:
        'DevOps & Cloud Engineer with a full-stack background. From the first line of code to production monitoring. Cotonou, Benin — working remote worldwide.',
      btnStartProject: 'Start a project',
      btnSeeWork: 'See my work',
      btnResume: 'View resume',
      heroBadges: [
        {
          icon: '/certs/aws-saa.png',
          text: 'AWS Certified Solutions Architect – Associate',
          href: 'https://www.credly.com/badges/5d5a3911-780f-4f19-94dc-394a9556896d/public_url',
        },
      ],
      stats: [
        { value: 2, suffix: '+', label: 'Years of experience' },
        { value: 2, suffix: '', label: 'Cloud Platforms' },
        { value: 22, suffix: '', label: 'Projects shipped' },
        { value: 30, suffix: '+', label: 'Technologies' },
      ],
      techEyebrow: '$ ls ./technologies',
      techTitle: 'Featured Technologies',
      techSub:
        'A selection of the tools I use day to day to build and ship reliable cloud systems.',
      ctaTitle: 'Ready to Deploy Your Vision?',
      ctaText:
        'From infrastructure to application, I turn your ideas into functional, automated, production-ready systems.',
      ctaStart: 'Start a project',
      ctaViewCode: 'View Code',
      howEyebrow: '$ cat workflow.md',
      howTitle: 'How I Work',
      howSub: 'The concrete flow, from first conversation to production.',
      howSteps: [
        {
          icon: '💬',
          title: 'Discovery',
          text: "We talk through the real need, technical constraints and budget. No over-engineering: I propose what's necessary, not what's impressive.",
        },
        {
          icon: '🧱',
          title: 'Architecture & Infra',
          text: 'Infrastructure defined as code (Terraform), reproducible and version-controlled. Cloud service choices justified by the need, not by trend.',
        },
        {
          icon: '⚙️',
          title: 'Build & Automation',
          text: 'Application development and CI/CD pipeline (tests, security scan, automated deployment). Every step is reproducible and documented.',
        },
        {
          icon: '📈',
          title: 'Ship & Monitor',
          text: "Deployment, monitoring (Prometheus/Grafana when relevant) and a clear handover — you know what's running, where, and how to maintain it.",
        },
      ],
      servicesEyebrow: '$ cat services.md',
      servicesTitle: 'Services',
      servicesSub: 'What I can take on, solo or alongside your team.',
      services: [
        {
          icon: '🧱',
          title: 'Infrastructure as Code',
          text: 'Cloud provisioning with Terraform: VPC, EC2, RDS, IAM, networking — version-controlled and reproducible.',
        },
        {
          icon: '⚙️',
          title: 'CI/CD Pipelines',
          text: 'GitHub Actions or Jenkins: build, tests, security scanning (Trivy), automated deployment.',
        },
        {
          icon: '☸️',
          title: 'Kubernetes & GitOps',
          text: 'Container deployment and orchestration, ArgoCD setup for Git-based continuous delivery.',
        },
        {
          icon: '💻',
          title: 'Full-Stack Development',
          text: 'End-to-end web applications: Node.js, React/Next.js, PostgreSQL — from idea to production.',
        },
      ],
      faqEyebrow: '$ cat faq.md',
      faqTitle: 'Frequently Asked Questions',
      faq: [
        {
          q: 'What kind of work do you take on?',
          a: "Freelance full-stack or DevOps/Cloud missions, as well as junior DevOps / Platform / Cloud roles. I'm always upfront if something is beyond my current level.",
        },
        {
          q: "What's the first step to work together?",
          a: 'A conversation (call or written) to understand the need, before any quote or commitment. No obligation.',
        },
        {
          q: 'Do you work remote?',
          a: "Yes, I'm based in Cotonou, Benin, and work fully remote with clients worldwide.",
        },
        {
          q: 'Can you take over an existing project?',
          a: 'Yes — I audit the existing code/infra before touching anything, to propose justified changes rather than rewriting everything.',
        },
      ],
    },
    about: {
      eyebrow: '$ cat about.md',
      title: 'About me',
      sub: 'Background, technical philosophy and professional experience.',
      aboutHeadline: 'Building reliable cloud platforms, through automation.',
      capabilities: [
        { icon: '🧱', title: 'Infrastructure as Code' },
        { icon: '⚙️', title: 'CI/CD Automation' },
        { icon: '☸️', title: 'Kubernetes & GitOps' },
        { icon: '☁️', title: 'Multi-Cloud' },
        { icon: '📊', title: 'Monitoring & Observability' },
        { icon: '💻', title: 'Full-Stack Development' },
      ],
      bioTitle: '$ cat bio.txt',
      bioLead: "Hi, I'm Olivier — Junior DevOps Engineer with a solid full-stack background.",
      bioP1:
        "I cover the whole lifecycle: building the application (Node.js, React, PostgreSQL) and everything that gets it to production — CI/CD pipelines, Kubernetes, infrastructure as code, monitoring.",
      bioP2: 'Comfortable on either side of the wall, which means: no wall.',
      bioP3:
        'MSc student in Systems, Networks & Cloud Computing at ESGIS. Open to junior DevOps / Platform / Cloud roles — full-stack missions welcome too.',
      quickStatsTitle: 'Quick Stats',
      quickStats: [
        { label: 'Experience', value: '2+ years' },
        { label: 'Cloud Platforms', value: 'AWS, Azure' },
        { label: 'Projects', value: '22 shipped' },
        { label: 'Technologies', value: '30+ mastered' },
      ],
      specTitle: 'Specializations',
      specTags: [
        'Infrastructure as Code',
        'CI/CD Automation',
        'Kubernetes & GitOps',
        'Full-Stack Development',
      ],
      philosophyEyebrow: '$ cat philosophy.md',
      philosophyTitle: 'Technical Philosophy',
      philosophySub: 'The principles that guide my approach to development and DevOps.',
      philosophyCards: [
        {
          icon: '⚡',
          title: 'Automation First',
          text: 'Every manual process should be automated, every deployment should be reproducible.',
        },
        {
          icon: '</>',
          title: 'Infrastructure as Code',
          text: 'Treat infrastructure with the same rigor as application code: Terraform, GitOps, systematic review.',
        },
        {
          icon: '☁',
          title: 'Cloud Native',
          text: 'Design for the cloud from day one: containerization, Kubernetes orchestration, observability.',
        },
      ],
      timelineEyebrow: '$ cat career.log',
      timelineTitle: 'Career Timeline',
      timelineSub: 'My journey, from full-stack development to DevOps & cloud.',
      timeline: [
        {
          icon: '💻',
          title: 'Full-Stack Web Developer — Freelance',
          period: '2025 – Present',
          loc: 'Remote',
          text: 'End-to-end delivery of full-stack web projects for a range of clients: needs analysis, architecture design, front-end and back-end development, containerization with Docker and autonomous production deployment. Stack: Node.js, Express, React, Next.js, PostgreSQL, MongoDB, REST APIs.',
        },
        {
          icon: '🎓',
          title: 'MSc — Systems, Networks & Cloud Computing',
          period: '2025 – Present',
          loc: 'ESGIS, Cotonou, Benin',
          text: 'Specialization in cloud infrastructure, networking and distributed systems.',
        },
        {
          icon: '💻',
          title: 'Web Developer — Acxs IT',
          period: '2024 – 2025',
          loc: 'Cotonou, Benin',
          text: 'Active contribution to front-end and back-end development on production applications. Designed and ran unit and integration tests, reducing regressions. Regular code reviews, disciplined Git branching, documented pull requests, cross-team collaboration with the Network & Security team.',
        },
        {
          icon: '💻',
          title: 'Web Developer — KKM Cosmétique',
          period: '2023 – 2024',
          loc: 'Cotonou, Benin',
          text: "Full front-end interface development, REST API route design and implementation, business logic modeling, and integration of the company's e-commerce platform modules.",
        },
        {
          icon: '🎓',
          title: 'BSc — Software Engineering',
          period: '2021 – 2024',
          loc: 'IFRI, Cotonou, Benin',
          text: 'Software development training: algorithms, databases, software engineering.',
        },
      ],
      certEyebrow: '$ cat certifications.md',
      certTitle: 'Certifications',
      certs: ['AWS Certified Solutions Architect – Associate'],
      certVerify: 'View on Credly →',
      otherCertsTitle: 'Other certification training',
      otherCerts: [
        { title: 'LFS158: Introduction to Kubernetes', issuer: 'The Linux Foundation', date: 'Aug 2026' },
        {
          title: 'Linux Foundation Certified System Administrator (LFCS) Cert Prep',
          issuer: 'LinkedIn',
          date: 'Jul 2026',
        },
        {
          title: 'Certified Kubernetes Administrator (CKA) Cert Prep',
          issuer: 'LinkedIn',
          date: 'Jun 2026',
        },
        {
          title: 'Microsoft Azure Essentials Professional Certificate by Microsoft and LinkedIn',
          issuer: 'Microsoft',
          date: 'Jun 2026',
        },
        {
          title:
            'GitHub Actions Workshop: Create CI/CD Pipelines to Automate, Build, Test and Deploy your Application by Microsoft Press',
          issuer: 'LinkedIn',
          date: 'Jun 2026',
        },
        {
          title: 'DevOps Professional Certificate by PagerDuty and LinkedIn',
          issuer: 'PagerDuty',
          date: 'Jun 2026',
        },
        { title: 'Docker Foundations Professional Certificate', issuer: 'Docker, Inc', date: 'Jun 2026' },
      ],
      certInProgressLabel: 'In progress',
      certsInProgress: [],
    },
    skills: {
      eyebrow: '$ ls -la skills/',
      title: 'Technical Skills',
      sub: 'The full cycle from development to autonomous deployment — cloud, infrastructure and development.',
      proficiency: 'Proficiency',
      explorerEyebrow: '$ ./explore.sh',
      explorerTitle: 'Interactive Skill Explorer',
      explorerSub: 'Use terminal commands to explore my skills in detail.',
      practicesTitle: 'Practices & Methodologies',
      practices: [
        'REST API',
        'Unit & Integration Testing',
        'Code Review',
        'GitOps',
        'Microservices Architecture',
      ],
    },
    projects: {
      eyebrow: '$ docker ps -a',
      title: 'Projects',
      sub: 'List of deployed projects and applications.',
      featuredTitle: 'Featured Projects',
      allTitle: 'All Projects',
      filterAll: 'All Projects',
      viewCode: 'Code',
      viewLive: 'Live',
      infraOffNote: '☁ Infra powered off (cloud costs) — spun back up on request for a demo',
      coldStartNote: '⏱ Free-tier backend (Render) — first load takes 30-60s to wake up',
      summaryTitle: '$ cat project_summary.txt',
      totalProjects: 'Total Projects',
      devopsProjects: 'DevOps Projects',
      fullStackProjects: 'Full-Stack Projects',
      techUsed: 'Technologies Used',
      summaryEcho:
        '$ echo "Each project demonstrates a real-world implementation of cloud-native architecture and modern development practices."',
      ctaTitle: 'Interested in Collaboration?',
      ctaText:
        "These projects showcase my expertise in DevOps and full-stack development. Let's discuss how we can work together on your next project.",
      ctaViewAll: 'View all projects',
      ctaStart: 'Start a project',
      moreOnGithub: 'More projects and experiments are available on my GitHub →',
    },
    blog: {
      eyebrow: '$ ls ./blog',
      title: 'Blog',
      echo: '$ echo "Articles coming soon..."',
      sub: "I'm working on articles about Kubernetes, GitOps and cloud infrastructure deployment. Check back soon.",
    },
    caseStudies: {
      eyebrow: '$ cat case-studies.md',
      title: 'Case Studies',
      sub: 'Three projects detailed in problem / solution / result format.',
      problem: 'Problem:',
      solution: 'Solution:',
      result: 'Result:',
      viewRepo: 'View repo →',
      studies: [
        {
          title: 'Twitch Clone — Self-hosted Streaming',
          problem:
            'deploy a complete, resilient streaming platform without depending on a managed third-party service.',
          solution:
            'k3s cluster on Azure provisioned via Terraform, 6 services (Next.js, MySQL, Redis, MinIO S3, SRS), GitOps with ArgoCD (auto-sync and self-heal), HPA.',
          result:
            'reproducible infrastructure, auto-scaling from 2 to 5 replicas, full observability via Prometheus/Grafana.',
        },
        {
          title: 'Home Energy Tracker — Java Microservices',
          problem:
            'track energy consumption through a scalable, observable architecture with centralized authentication.',
          solution:
            '7 Spring Boot 4 / Java 21 microservices, declarative Jenkins pipeline (build, tests, Trivy scan), Kafka KRaft, InfluxDB, Keycloak OAuth2.',
          result:
            'AWS infrastructure provisioned with Terraform (EC2, IP-restricted security group), Prometheus/Grafana observability, and hardened security via automated vulnerability scanning.',
        },
        {
          title: 'Save Money — Securing an AWS Deployment on a Zero Budget',
          problem:
            'deploy a production application on AWS without storing sensitive credentials in code or on the server, on a near-zero budget.',
          solution:
            "EC2 t3.micro provisioned with Terraform (eu-west-3), an IAM Role attached to the instance (read-only ECR permissions, no stored keys), a two-stage pipeline (ci.yml builds and pushes to ECR, cd.yml deploys via SSH triggered by workflow_run), free HTTPS via Let's Encrypt/nip.io.",
          result:
            'secure continuous deployment with no exposed AWS secrets, minimal infrastructure cost, Prometheus + Node Exporter + Grafana monitoring for server health.',
        },
      ],
    },
    contact: {
      eyebrow: '$ ./contact.sh',
      title: "Let's talk about your project",
      sub: 'Got an idea, an opportunity, a question? Write to me, I reply quickly.',
      location: '📍 Cotonou, Benin',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Your message',
      formSend: 'Send',
    },
  },
} as const;

export type Dictionary = typeof dict.fr;
