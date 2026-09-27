export type ArticleSection = {
  id: string;
  title: string;
  body: string[];
  code?: { title: string; lines: string[] };
};

export type ArticlePitfall = {
  problem: string;
  cause: string;
  fix: string;
};

export type Article = {
  slug: string;
  status: 'published' | 'roadmap';
  category: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  sections?: ArticleSection[];
  pitfalls?: ArticlePitfall[];
  sourceRepo?: string;
};

export const ARTICLES: Article[] = [
  {
    slug: 'gamecloud-aws-eks-platform',
    status: 'published',
    category: 'AWS EKS',
    title: 'GameCloud : construire une plateforme AWS EKS privée',
    description:
      "Comment une appli de démo à 7 microservices Kind est devenue le prétexte pour construire une vraie plateforme AWS : VPC privé, EKS sans API publique, GitOps ArgoCD, identités sans clé et observabilité complète.",
    date: '16 Sep 2026',
    readTime: '12 min',
    tags: ['Amazon EKS', 'Terraform', 'ArgoCD', 'IRSA', 'GitOps'],
    sourceRepo: 'https://github.com/JuniorZ-spec/game-cloud',
    sections: [
      {
        id: 'contexte',
        title: 'Le contexte : une appli comme prétexte',
        body: [
          "GameCloud a démarré comme une appli à 7 microservices (auth, 4 mini-jeux, score, frontend) sur un cluster Kind local, sans CI/CD, éphémère par nature.",
          "L'objectif de ce projet n'a jamais été l'appli elle-même : c'est le prétexte pour construire une vraie plateforme cloud AWS réutilisable : VPC privé, EKS, GitOps, identités, observabilité, pensée pour fonctionner avec n'importe quelle autre application.",
        ],
      },
      {
        id: 'reseau',
        title: 'Réseau privé : VPC et EKS sans API publique',
        body: [
          'Le VPC est réparti sur 3 zones de disponibilité, avec des sous-réseaux publics (bastion, futur load balancer) et privés (nœuds EKS, jamais joignables directement depuis Internet).',
          "Le cluster EKS est configuré avec endpoint_public_access = false : son API n'est accessible que depuis l'intérieur du VPC. Seul un bastion, joint via AWS Systems Manager (SSM), peut lui parler, zéro clé SSH stockée nulle part.",
          "Une NAT Gateway unique (plutôt qu'une par zone) laisse les nœuds privés sortir vers Internet sans être eux-mêmes exposés, un choix d'économie assumé pour ce projet démo.",
        ],
        code: {
          title: 'TERRAFORM / VPC / EKS',
          lines: ['$ terraform apply', '$ aws eks describe-cluster --name gamecloud --query cluster.status', '$ aws ec2 describe-nat-gateways --query "NatGateways[0].State"'],
        },
      },
      {
        id: 'cicd',
        title: 'CI/CD : GitHub Actions + ArgoCD GitOps',
        body: [
          "La CI (GitHub Actions) build chaque image, la scanne avec Trivy, puis la pousse vers Amazon ECR taguée par le SHA du commit. L'authentification à AWS se fait par OIDC : aucune clé AWS stockée dans GitHub.",
          "La CD est gérée par ArgoCD en mode GitOps (auto-sync, self-heal) : une ApplicationSet génère les 7 Applications à partir d'un chart Helm générique. ArgoCD Image Updater ferme la boucle en mettant à jour automatiquement le tag d'image dès qu'une nouvelle image apparaît dans ECR, du commit au pod, sans commande manuelle.",
        ],
        code: {
          title: 'ARGOCD',
          lines: ['$ kubectl get applications -n argocd', '$ argocd app sync --core', '# 8 Applications (7 services + datastores), Synced/Healthy'],
        },
      },
      {
        id: 'reseau-applicatif',
        title: 'Réseau applicatif : Gateway API + ALB',
        body: [
          "Le trafic entrant passe par la Gateway API, couplée à l'AWS Load Balancer Controller qui provisionne un ALB public automatiquement à partir des ressources Kubernetes déclarées.",
        ],
      },
      {
        id: 'identites',
        title: 'Identités sans clé statique : IRSA et Pod Identity',
        body: [
          "IRSA (IAM Roles for Service Accounts) est utilisé dès la phase réseau pour l'EBS CSI driver, l'AWS Load Balancer Controller et l'Image Updater : chaque pod obtient un rôle IAM via un jeton OIDC fédéré, sans aucune clé AWS stockée.",
          "EKS Pod Identity est un mécanisme plus récent, démontré séparément sur un pod dédié : une simple association namespace + ServiceAccount → rôle IAM, gérée par un agent, sans fédération OIDC.",
          "Comparaison directe des deux : IRSA utilise AWS_WEB_IDENTITY_TOKEN_FILE et un token monté sous eks.amazonaws.com ; Pod Identity utilise AWS_CONTAINER_CREDENTIALS_FULL_URI et un agent local : deux mécanismes réellement distincts, pas juste deux noms pour la même chose.",
        ],
        code: {
          title: 'POD IDENTITY',
          lines: ['$ kubectl exec pod-identity-test -- aws sts get-caller-identity', '# Arn: arn:aws:sts::<ACCOUNT_ID>:assumed-role/gamecloud-eks-pod-identity-demo/...'],
        },
      },
      {
        id: 'observabilite',
        title: 'Observabilité : Prometheus/Grafana + Elasticsearch/Kibana',
        body: [
          'kube-prometheus-stack fournit des métriques réelles du cluster et des applications, visualisées dans Grafana. Les logs de tous les microservices sont centralisés dans Elasticsearch et consultables dans Kibana.',
        ],
      },
      {
        id: 'cout',
        title: 'Discipline de coût : détruire entre chaque pause',
        body: [
          "Contrairement à Kind (gratuit), un vrai cluster EKS coûte en continu. Règle appliquée systématiquement : dès qu'une pause de plusieurs heures s'annonce, toute l'infrastructure est détruite (terraform destroy après avoir retiré la Gateway/HTTPRoute pour ne pas laisser l'ALB orphelin) ; à la reprise, tout est reconstruit à l'identique depuis le code.",
          "La plateforme a été démontée et reconstruite 3 fois au total. Chaque reconstruction a confirmé qu'aucun incident déjà résolu ne revient, preuve concrète que la discipline IaC/GitOps tient sa promesse. Budget AWS réel du projet : environ 26$, avec une alerte de budget fixée à 20$.",
        ],
      },
    ],
    pitfalls: [
      {
        problem: "postgres restait bloqué en Pending (pod has unbound immediate PersistentVolumeClaims)",
        cause: "Un cluster EKS créé via Terraform brut n'installe pas le driver CSI EBS par défaut, contrairement à un cluster monté avec eksctl.",
        fix: "Ajout d'un addon aws-ebs-csi-driver avec un rôle IRSA dédié, le tout premier vrai usage d'IRSA du projet.",
      },
      {
        problem: 'Le PVC restait Pending même après le driver EBS installé',
        cause: "Aucune storageClassName n'était précisée et aucune classe n'était marquée par défaut sur le cluster.",
        fix: 'Ajout d\'une StorageClass gp3 explicite (provisioner ebs.csi.aws.com) plutôt que de dépendre d\'une classe par défaut ambiguë.',
      },
      {
        problem: 'postgres passait en CrashLoopBackOff (initdb: directory exists but is not empty)',
        cause: "Le volume EBS contenait un dossier lost+found créé par son propre filesystem.",
        fix: 'PGDATA pointé vers un sous-dossier du point de montage plutôt que sa racine.',
      },
      {
        problem: 'Un terraform apply accidentel a recréé tout le VPC/EKS/bastion juste après un destroy volontaire',
        cause: "apply réconcilie tout l'état désiré du code, comme les ressources étaient toujours définies dans les fichiers .tf, elles ont été entièrement recréées.",
        fix: "Corrigé par un second destroy immédiat. Leçon retenue : après un destroy volontaire, jamais d'apply pour un correctif mineur.",
      },
      {
        problem: 'Verrou Terraform DynamoDB corrompu (unexpected end of JSON input), même terraform force-unlock échouait',
        cause: 'Bug occasionnel du backend de verrouillage DynamoDB fait-maison (déjà identifié comme déprécié par Terraform).',
        fix: "Suppression directe de l'entrée bloquée via aws dynamodb delete-item après confirmation que c'était bien son propre verrou.",
      },
    ],
  },
  {
    slug: 'home-energy-tracker-multi-az',
    status: 'published',
    category: 'AWS · Terraform',
    title: "Home Energy Tracker : d'une instance EC2 à une architecture Multi-AZ",
    description:
      "Partir d'une application forkée pour construire une vraie infra AWS, puis la réécrire pour la résilience : VPC 2 AZ, Auto Scaling Group, RDS Multi-AZ, avec un événement d'auto-scaling réellement observé, pas juste écrit dans le Terraform.",
    date: '16 Sep 2026',
    readTime: '9 min',
    tags: ['Terraform', 'AWS', 'RDS Multi-AZ', 'Jenkins'],
    sourceRepo: 'https://github.com/JuniorZ-spec/home-energy-tracker',
    sections: [
      {
        id: 'contexte',
        title: "Le point de départ : une appli forkée, pas jouet",
        body: [
          "L'application (7 microservices Spring Boot, Kafka, MySQL, InfluxDB, Keycloak, Prometheus/Grafana) est un fork de leetjourney/home-energy-tracker, utilisé avec la permission de l'auteur original à des fins éducatives. Le code applicatif, le stack Compose et l'observabilité sont son travail.",
          "Ce qui est à moi : l'infrastructure construite et itérée autour : Terraform (deux générations), un pipeline Jenkins CI/CD, et une réécriture pour la résilience qui migre une instance EC2 unique vers une architecture Multi-AZ, avec un événement d'auto-scaling réellement observé.",
        ],
      },
      {
        id: 'v1',
        title: 'v1 : une instance EC2 et Docker Compose',
        body: [
          "Premier jet : une instance EC2 (t3.small, Ubuntu, 30 Go gp3) provisionnée par Terraform, avec un script user_data qui installe Docker et le plugin Compose au premier démarrage, le docker-compose.yml existant tourne sans modification.",
          "Un security group n'ouvre que le nécessaire : SSH restreint à mon IP, ports d'observabilité (Grafana, Prometheus, Kafka UI, Keycloak) restreints à mon IP, seule l'API Gateway (9000) est publique. Secrets dans un fichier .env sur l'instance.",
          "Pipeline Jenkins : build des 7 services Maven, conteneurisation, push vers ECR privé, déploiement par SSH. Identifiants AWS et SSH tirés du credential store de Jenkins, jamais en dur dans le pipeline.",
        ],
      },
      {
        id: 'v2',
        title: "v2 : réécriture pour la résilience",
        body: [
          "Faiblesse réelle de la v1 : une seule instance fait tout, y compris MySQL en conteneur. Si elle tombe, l'appli et ses données tombent ensemble.",
          "terraform-v2/ remplace ça par : VPC dédié sur 2 zones de disponibilité, Auto Scaling Group de 2 instances derrière un Application Load Balancer, RDS MySQL Multi-AZ avec bascule automatique, secrets générés par Terraform et stockés dans AWS Secrets Manager (récupérés via le rôle IAM de l'instance au démarrage), et accès admin en SSM uniquement, plus aucun port SSH ouvert.",
        ],
        code: {
          title: 'VÉRIFICATION EN PRODUCTION',
          lines: [
            '$ curl https://<alb-dns>/actuator/health',
            '{"status":"UP"}',
            '$ aws rds describe-db-instances --query "DBInstances[0].MultiAZ"',
            'true',
          ],
        },
      },
      {
        id: 'scaling',
        title: "L'auto-scaling, observé pour de vrai",
        body: [
          "La politique de scaling ciblant 50% de CPU s'est réellement déclenchée pendant le pic CPU du démarrage (pulls Docker + démarrage JVM) : la capacité désirée est passée de 2 à 3, puis revenue à 2 une fois le CPU stabilisé. Pas juste écrit dans le Terraform, observé en train de se produire.",
          "Limite connue, assumée plutôt que cachée : chaque instance de l'ASG fait tourner la stack entière (Kafka, Keycloak, InfluxDB, les 7 services), seul MySQL a été réellement extrait vers un service managé. Centraliser Kafka et Keycloak correctement serait un travail à part, non fait ici.",
        ],
      },
      {
        id: 'discipline-cout',
        title: 'Discipline de coût',
        body: [
          "L'instance v1 est volontairement laissée arrêtée plutôt que de tourner en continu, provisionner à la demande, vérifier, démonter. La stack v2 suit le même principe : appliquée pour une fenêtre de vérification, puis détruite.",
          "Un choix de coût assumé plutôt que caché : c7i-flex.large a été utilisé pour l'ASG au lieu d'un t3.*, parce que t3.small (2 Go de RAM) subissait une vraie pression OOM avec la stack complète (perte de connexion à l'agent SSM), et t3.medium était rejeté par la restriction Free Tier de ce compte AWS.",
        ],
      },
      {
        id: 'securite-ci',
        title: 'Un scan de sécurité qui a vraiment trouvé des problèmes',
        body: [
          "Contrairement au pipeline Jenkins (qui a besoin d'un serveur pas toujours allumé), terraform-ci.yml tourne sur l'infrastructure de GitHub à chaque push touchant Terraform : fmt, validate, tflint, un scan tfsec et un scan Trivy sur les Dockerfiles. Publiquement vérifiable via le badge du README, pas juste une promesse.",
          "Son tout premier run n'a pas été vert : il a trouvé une variable non sécurisée par défaut, des volumes non chiffrés et IMDSv2 non forcé sur les instances. Chaque correction est visible dans l'historique des commits.",
          "Les quelques alertes volontairement conservées (ALB public, écoute HTTP seule, pas de VPC Flow Logs, rétention RDS minimale) sont des compromis assumés pour une démo éphémère, supprimées avec un commentaire expliquant pourquoi, jamais ignorées en silence.",
        ],
      },
    ],
    pitfalls: [
      {
        problem: 'Build/push Docker échouant par intermittence sur erreurs réseau transitoires',
        cause: "Instabilité réseau ponctuelle pendant les étapes de build et de push vers ECR.",
        fix: "Étapes encapsulées dans retry(3) côté Jenkins plutôt que de laisser le pipeline échouer sur un incident transitoire.",
      },
      {
        problem: 'Docker BuildKit posait des problèmes dans cet environnement CI',
        cause: "Incompatibilité rencontrée en testant BuildKit pour accélérer les builds.",
        fix: "Retour à docker build classique plutôt que de s'acharner indéfiniment sur BuildKit.",
      },
      {
        problem: "t3.medium refusé au lancement pour l'ASG v2",
        cause: "Restriction de lancement au niveau du compte AWS, limitée au Free Tier.",
        fix: "Basculé sur c7i-flex.large, éligible Free Tier sur ce compte et suffisant en RAM (4 Go) pour éviter l'OOM subi avec t3.small.",
      },
      {
        problem: 'Le pipeline Jenkins restait bloqué sur des hôtes injoignables',
        cause: "La connexion SSH ne gérait pas explicitement la clé, l'utilisateur ni de délai de connexion, donc un hôte injoignable bloquait le run indéfiniment.",
        fix: "Connexion SSH durcie avec gestion explicite de la clé/utilisateur et des timeouts de connexion.",
      },
    ],
  },
  {
    slug: 'fina-tracker-cicd-monitoring',
    status: 'published',
    category: 'AWS EC2 · CI/CD',
    title: 'Fina Tracker : CI/CD, ECR et monitoring sur un t3.micro',
    description:
      "Comment un suivi de dépenses passe d'un EC2 configuré à la main à une infra Terraform, un pipeline CI/CD à deux étapes qui ne déploie jamais de code non testé, et un vrai monitoring système que CloudWatch gratuit ne fournit pas.",
    date: '22 Sep 2026',
    readTime: '9 min',
    tags: ['AWS EC2', 'Terraform', 'GitHub Actions', 'ECR', 'Prometheus'],
    sourceRepo: 'https://github.com/JuniorZ-spec/SAVE-MONEY',
    sections: [
      {
        id: 'contexte',
        title: 'Le contexte : une app fullstack, un objectif DevOps',
        body: [
          "Fina Tracker est une application de suivi de dépenses personnelles : React 19 + TypeScript + Vite côté client, Node.js + Express + TypeScript + Mongoose côté serveur, MongoDB Atlas en base.",
          "L'objectif de ce projet n'était pas l'application elle-même, mais de la faire tourner en production de façon fiable, sécurisée et automatisée, avec les pratiques utilisées en entreprise : conteneurisation, registre privé, CI/CD, infrastructure as code, monitoring.",
        ],
      },
      {
        id: 'docker',
        title: 'Docker : deux images, deux soucis de portabilité',
        body: [
          "Client et serveur sont conteneurisés séparément, chacun avec un Dockerfile dédié (build multi-stage côté client). Docker Compose orchestre les deux en local.",
          "Le premier vrai obstacle n'était pas Docker lui-même mais la portabilité : des dépendances du client (lightningcss-win32-x64-msvc, @rollup/rollup-win32-x64-msvc) qui n'existent que sous Windows faisaient planter npm ci sur l'image Alpine Linux du conteneur.",
        ],
      },
      {
        id: 'ecr',
        title: 'AWS ECR plutôt que Docker Hub',
        body: [
          "Les images sont poussées vers un registre privé AWS ECR plutôt que Docker Hub public, pour ne pas exposer le code applicatif packagé.",
          "Le déploiement s'authentifie avec aws ecr get-login-password, qui génère un token temporaire valable 12h, transmis à docker login : aucun mot de passe de registre stocké en dur sur le serveur.",
        ],
        code: {
          title: 'CD — PULL DEPUIS ECR',
          lines: [
            '$ aws ecr get-login-password --region eu-west-3 \\',
            '  | docker login --username AWS --password-stdin $ECR_REGISTRY',
            '$ docker compose pull',
            '$ docker compose up -d --remove-orphans',
          ],
        },
      },
      {
        id: 'cicd',
        title: 'CI/CD : deux fichiers, une seule responsabilité chacun',
        body: [
          "ci.yml vérifie le code (typecheck, build) sur chaque push et pull request. cd.yml déploie, et seulement ça — bonne pratique de séparation des responsabilités.",
          "Le CD se déclenche via workflow_run plutôt que sur push directement : il n'part que quand la CI est entièrement terminée et a réussi. Avec on: push sur les deux, ils démarreraient en parallèle, et le CD pourrait déployer les anciennes images pendant que la CI build encore les nouvelles.",
        ],
        code: {
          title: 'CD.YML — DÉCLENCHEUR',
          lines: [
            'on:',
            '  workflow_run:',
            '    workflows: ["CI"]',
            '    types: [completed]',
            'jobs:',
            '  deploy:',
            '    if: ${{ github.event.workflow_run.conclusion == \'success\' }}',
          ],
        },
      },
      {
        id: 'terraform',
        title: 'Terraform : sortir de la console AWS',
        body: [
          "L'EC2 avait d'abord été créé à la main dans la console AWS — problème : impossible de se souvenir de la configuration exacte dans 6 mois, et créer un second environnement revient à refaire tous les clics.",
          "Terraform décrit maintenant l'instance (t3.micro, Ubuntu 22.04) et son Security Group (22/80/443 en entrée) de façon reproductible et versionnée.",
        ],
      },
      {
        id: 'nginx',
        title: "Nginx et HTTPS sans nom de domaine",
        body: [
          "Nginx est l'unique point d'entrée public : /api vers le serveur Node.js, / vers le client React, et redirection 301 de tout le trafic HTTP vers HTTPS. Les services internes ne sont jamais exposés directement.",
          "Let's Encrypt exige un nom de domaine, que l'instance n'a pas. nip.io résout ça : 15.237.190.24.nip.io pointe automatiquement vers 15.237.190.24, ce qui suffit pour générer un certificat valide.",
        ],
      },
      {
        id: 'monitoring',
        title: 'Monitoring : ce que CloudWatch gratuit ne montre pas',
        body: [
          "CloudWatch en monitoring basique gratuit ne remonte pas l'usage RAM — seulement CPU et réseau. Pour voir la mémoire en temps réel, il faut soit du CloudWatch détaillé (payant), soit Node Exporter.",
          "Node Exporter, déjà présent dans le docker-compose, expose environ 300 métriques système que Prometheus scrape toutes les 15 secondes et que Grafana visualise : RAM, swap, espace disque, CPU réel.",
        ],
      },
    ],
    pitfalls: [
      {
        problem: 'npm ci plantait sur Alpine Linux au build du client',
        cause: "Des packages Windows-only (lightningcss-win32-x64-msvc, @rollup/rollup-win32-x64-msvc) étaient présents dans le package.json.",
        fix: 'Suppression de ces dépendances spécifiques à Windows.',
      },
      {
        problem: 'ERR_MODULE_NOT_FOUND en production côté serveur',
        cause: "Le serveur en ESM exige des extensions .js explicites dans les imports, que TypeScript n'ajoutait pas automatiquement.",
        fix: 'Bascule sur CommonJS dans le tsconfig plutôt que de corriger chaque import à la main.',
      },
      {
        problem: 'Le CD timeoutait à 30 minutes et échouait',
        cause: "Le build Docker sur le t3.micro (TypeScript + Vite) consommait toute la RAM disponible, et le cache Docker se perdait à chaque redémarrage du serveur.",
        fix: 'Migration du build vers GitHub Actions + push ECR, le serveur ne fait plus que pull une image déjà construite.',
      },
      {
        problem: "GitHub Actions échouait avec une erreur sur needs",
        cause: 'Le needs référençait le nom affiché du job ("FRONTEND JOB") au lieu de son ID YAML ("ci-client").',
        fix: 'Correction pour utiliser les IDs de jobs, les seuls identifiants que GitHub Actions reconnaît.',
      },
      {
        problem: 'Le CD déployait parfois des images pas encore prêtes',
        cause: "Le CD était déclenché sur on: push indépendamment de la CI, donc en parallèle plutôt qu'après elle.",
        fix: 'Migration du déclencheur vers workflow_run, qui attend la fin réussie de la CI avant de lancer le déploiement.',
      },
      {
        problem: "git pull refusait de merger sur l'EC2",
        cause: "L'instance avait des commits locaux que GitHub n'avait pas (7 vs 5), les historiques avaient divergé.",
        fix: 'git fetch origin puis git reset --hard origin/main : écrase l\'historique local pour correspondre exactement à origin.',
      },
    ],
  },
  {
    slug: 'ticket-bus-aws-race-condition',
    status: 'published',
    category: 'AWS ECS · SQS · Lambda',
    title: 'Ticket Bus : éliminer une race condition avec SQS FIFO + Lambda, prouvé par un test de charge',
    description:
      "Une plateforme de réservation de bus tournait déjà sur Vercel + Render. En parallèle, migration vers une architecture AWS pour corriger un vrai bug de concurrence sur la réservation de sièges, puis le prouver avec un test de charge k6 vérifié en base de données.",
    date: '24 Jul 2026',
    readTime: '11 min',
    tags: ['AWS ECS', 'SQS FIFO', 'Lambda', 'Terraform', 'RDS', 'k6'],
    sourceRepo: 'https://github.com/JuniorZ-spec/FINAL-TICKET-BUS',
    sections: [
      {
        id: 'contexte',
        title: 'Le contexte : un vrai bug trouvé en auditant le code',
        body: [
          "Ticket Bus est une plateforme de réservation de bus multi-compagnies (voyageurs, compagnies, admin), déjà en ligne sur Vercel (frontend) + Render (backend) + Neon PostgreSQL. Ce volet est un projet DevOps séparé, sans nouvelle fonctionnalité métier : migrer d'un déploiement EC2/SSH manuel vers une architecture AWS managée, pilotée en Terraform.",
          "L'audit du code existant a révélé un bug de fond, pas seulement organisationnel : bookSeat relisait les réservations actives et vérifiait l'absence de conflit en JavaScript, sans contrainte base de données ni transaction sérialisée — une race condition TOCTOU (time-of-check to time-of-use) classique. C'est la vraie raison technique de la migration vers SQS + Lambda, pas juste un exercice d'infrastructure.",
          "Contrainte budgétaire : environ 60$ de crédits AWS. L'infrastructure est donc éphémère par conception : terraform apply pour une session de démo, vérification, terraform destroy. Rien ne tourne en permanence sauf le frontend (S3/CloudFront), le state Terraform et les repos ECR.",
        ],
      },
      {
        id: 'fondations',
        title: 'Fondations : modules isolés, OIDC, moindre privilège incrémental',
        body: [
          "Terraform est découpé en modules séparés (bootstrap, network, ecr, frontend, backend, async), chacun avec son propre state : un terraform destroy de session de démo ne doit jamais pouvoir toucher le state du frontend permanent.",
          "Authentification CI/CD par OIDC GitHub Actions plutôt que des clés IAM statiques : jetons de session de courte durée, scope limité aux branches main/develop du repo exact, rien à faire fuiter.",
          "La policy IAM du rôle de déploiement est construite incrémentalement, un statement ajouté par phase à mesure que de nouveaux services sont introduits — le moindre privilège reste visible dans l'historique Git plutôt que d'être donné en bloc par confort.",
        ],
      },
      {
        id: 'ci-ecr',
        title: 'CI/CD : scan Trivy, ECR immuable',
        body: [
          "Le pipeline scanne les images avec Trivy avant de les pousser vers ECR. Les repos sont configurés en IMMUTABLE : pas de tag latest, chaque déploiement référence un sha de commit exact qui ne peut jamais être écrasé.",
          "Le repo ECR existant (25 images de l'ancien pipeline SSH) a été importé dans Terraform plutôt que recréé, pour ne perdre aucun historique.",
        ],
      },
      {
        id: 'infra',
        title: 'ECS Fargate, ALB, RDS : vérifié bout-en-bout',
        body: [
          "L'API tourne sur ECS Fargate derrière un Application Load Balancer, secrets en SSM Parameter Store. RDS PostgreSQL en subnet public avec security group verrouillé plutôt qu'une NAT Gateway — un compromis de coût assumé et documenté (une NAT Gateway coûte environ 0,045$/h même sans trafic), pas un oubli.",
          "Vérification en conditions réelles, pas seulement un plan Terraform qui passe : curl sur /health répond 200 à travers toute la chaîne ALB → ECS Fargate → RDS. Migration Prisma et données de démo injectées via une tâche ECS ponctuelle, sans ouvrir le moindre accès SSH.",
        ],
        code: {
          title: 'VÉRIFICATION RÉELLE',
          lines: [
            '$ curl http://<alb-dns>/health',
            '{"status":"ok"}',
            '$ aws ecs run-task --cluster $CLUSTER --task-definition $TASKDEF ...',
            '# migration Prisma + seed exécutés, logs CloudWatch confirmés',
          ],
        },
      },
      {
        id: 'race-condition',
        title: 'SQS FIFO + Lambda : la contrainte DB fait le travail, pas la queue',
        body: [
          "Chaque demande de réservation passe par une file SQS FIFO avant traitement par une fonction Lambda attachée au VPC. Le point clé : ce n'est pas l'ordre de traitement de la queue qui empêche les doublons, c'est la contrainte @@unique([tripId, seat]) sur le modèle BookingSeat, au niveau de la base de données elle-même.",
          "Test réel : deux requêtes book-seat envoyées en parallèle sur le même trajet, le même siège, avec des identifiants de transaction différents.",
        ],
        code: {
          title: 'TEST DE CONCURRENCE RÉEL',
          lines: [
            '$ (curl -X POST .../book-seat -d seat=5 -d tx=race-tx-A &',
            '   curl -X POST .../book-seat -d seat=5 -d tx=race-tx-B &)',
            'race-tx-A -> REJECTED',
            'race-tx-B -> CONFIRMED (booking cmry4h8zn0003w9yajvt53rvc)',
          ],
        },
      },
      {
        id: 'load-test',
        title: 'Test de charge k6 : 50 utilisateurs, 40 sièges, vérifié en SQL',
        body: [
          "Script k6 : 50 utilisateurs virtuels, chacun visant le siège ((VU-1) % 40) + 1 sur un trajet à 40 places. Par construction : les VU 1 à 40 obtiennent chacun un siège unique, les VU 41 à 50 retombent sur des sièges déjà pris — 40 confirmations et 10 refus attendus, pas au hasard.",
          "Premier essai invalidé : lancé sur un trajet dont 2 sièges étaient déjà réservés par les tests manuels précédents, faussant le résultat (38/12 au lieu de 40/10) — un problème d'hygiène de test, pas un bug. Corrigé avec un script qui seed un trajet entièrement neuf avant chaque run.",
          "Sur un trajet vierge, le résultat officiel correspond exactement à l'attendu, et vérifié une seconde fois indépendamment de l'API par une requête SQL directe sur la table de réservations.",
        ],
        code: {
          title: 'RÉSULTAT K6 + VÉRIFICATION SQL',
          lines: [
            'booking_confirmed: 40   (seuil count==40 ✓)',
            'booking_rejected:  10   (seuil count==10 ✓)',
            'http_req_failed: 0.00% (0/109)',
            '',
            'SELECT "tripId", seat, COUNT(*) FROM "BookingSeat"',
            'GROUP BY "tripId", seat HAVING COUNT(*) > 1;',
            '-- 0 lignes (sur 80 réservations cumulées, tous tests confondus)',
          ],
        },
      },
      {
        id: 'discipline',
        title: 'Ce qui reste bloqué, dit honnêtement',
        body: [
          "Le frontend S3 + CloudFront est prêt côté code, mais son déploiement attend une vérification de compte côté AWS Support — une restriction appliquée à tout nouveau compte créant des ressources CloudFront, indépendante du projet.",
          "L'infrastructure a été démontée une fois les phases vérifiées : le budget de 60$ ne permet pas de la laisser tourner en permanence. La démo permanente et accessible reste celle de Vercel + Render.",
        ],
      },
    ],
    pitfalls: [
      {
        problem: 'Blocage CloudFront : AccessDenied à la création de la distribution',
        cause: "Le compte AWS n'était pas encore \"vérifié\" par AWS pour utiliser CloudFront, une restriction indépendante des permissions IAM (le user avait pourtant AdministratorAccess).",
        fix: "Nécessite un ticket AWS Support pour lever la restriction. Le bucket S3, l'Origin Access Control et le blocage d'accès public ont pu être créés en attendant.",
      },
      {
        problem: "RDS refusait de se créer : InvalidParameterCombination",
        cause: "engine_version = \"16.4\" pour PostgreSQL n'existe pas dans la région eu-west-3.",
        fix: "Liste des versions réellement disponibles via aws rds describe-db-engine-versions, puis correction vers 16.9.",
      },
      {
        problem: "lambda:CreateFunction rejetait l'image Docker",
        cause: "Docker build récent génère par défaut un manifeste OCI avec attestations de provenance/SBOM, que Lambda ne supporte pas.",
        fix: 'docker build --provenance=false --sbom=false pour revenir à un manifeste simple.',
      },
      {
        problem: 'prisma migrate deploy échouait avec Could not find Prisma Schema',
        cause: "Le Dockerfile ne copiait que dist/ et node_modules/.prisma dans l'image runtime, pas le dossier prisma/ lui-même.",
        fix: "Ajout de COPY --from=builder /app/prisma ./prisma dans le stage final du Dockerfile.",
      },
      {
        problem: "Descriptions de security group rejetées par l'API EC2",
        cause: "Les descriptions de aws_security_group doivent être en ASCII pur ; les règles ingress interdisent en plus l'apostrophe.",
        fix: 'Réécriture des descriptions sans accents, tirets cadratins ni apostrophes.',
      },
      {
        problem: 'aws logs get-log-events échouait sous Git Bash Windows',
        cause: "Git Bash convertit automatiquement les arguments commençant par / en chemins Windows avant de les passer à l'exe AWS CLI.",
        fix: 'Préfixer la commande avec MSYS_NO_PATHCONV=1.',
      },
    ],
  },
];
