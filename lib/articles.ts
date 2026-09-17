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
          "L'objectif de ce projet n'a jamais été l'appli elle-même : c'est le prétexte pour construire une vraie plateforme cloud AWS réutilisable — VPC privé, EKS, GitOps, identités, observabilité — pensée pour fonctionner avec n'importe quelle autre application.",
        ],
      },
      {
        id: 'reseau',
        title: 'Réseau privé : VPC et EKS sans API publique',
        body: [
          'Le VPC est réparti sur 3 zones de disponibilité, avec des sous-réseaux publics (bastion, futur load balancer) et privés (nœuds EKS, jamais joignables directement depuis Internet).',
          "Le cluster EKS est configuré avec endpoint_public_access = false : son API n'est accessible que depuis l'intérieur du VPC. Seul un bastion, joint via AWS Systems Manager (SSM), peut lui parler — zéro clé SSH stockée nulle part.",
          "Une NAT Gateway unique (plutôt qu'une par zone) laisse les nœuds privés sortir vers Internet sans être eux-mêmes exposés — un choix d'économie assumé pour ce projet démo.",
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
          "La CD est gérée par ArgoCD en mode GitOps (auto-sync, self-heal) : une ApplicationSet génère les 7 Applications à partir d'un chart Helm générique. ArgoCD Image Updater ferme la boucle en mettant à jour automatiquement le tag d'image dès qu'une nouvelle image apparaît dans ECR — du commit au pod, sans commande manuelle.",
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
          "Comparaison directe des deux : IRSA utilise AWS_WEB_IDENTITY_TOKEN_FILE et un token monté sous eks.amazonaws.com ; Pod Identity utilise AWS_CONTAINER_CREDENTIALS_FULL_URI et un agent local — deux mécanismes réellement distincts, pas juste deux noms pour la même chose.",
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
        fix: "Ajout d'un addon aws-ebs-csi-driver avec un rôle IRSA dédié — le tout premier vrai usage d'IRSA du projet.",
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
        cause: "apply réconcilie tout l'état désiré du code — comme les ressources étaient toujours définies dans les fichiers .tf, elles ont été entièrement recréées.",
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
      "Partir d'une application forkée pour construire une vraie infra AWS, puis la réécrire pour la résilience — VPC 2 AZ, Auto Scaling Group, RDS Multi-AZ — avec un événement d'auto-scaling réellement observé, pas juste écrit dans le Terraform.",
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
          "Ce qui est à moi : l'infrastructure construite et itérée autour — Terraform (deux générations), un pipeline Jenkins CI/CD, et une réécriture pour la résilience qui migre une instance EC2 unique vers une architecture Multi-AZ, avec un événement d'auto-scaling réellement observé.",
        ],
      },
      {
        id: 'v1',
        title: 'v1 : une instance EC2 et Docker Compose',
        body: [
          "Premier jet : une instance EC2 (t3.small, Ubuntu, 30 Go gp3) provisionnée par Terraform, avec un script user_data qui installe Docker et le plugin Compose au premier démarrage — le docker-compose.yml existant tourne sans modification.",
          "Un security group n'ouvre que le nécessaire : SSH restreint à mon IP, ports d'observabilité (Grafana, Prometheus, Kafka UI, Keycloak) restreints à mon IP, seule l'API Gateway (9000) est publique. Secrets dans un fichier .env sur l'instance.",
          "Pipeline Jenkins : build des 7 services Maven, conteneurisation, push vers ECR privé, déploiement par SSH. Identifiants AWS et SSH tirés du credential store de Jenkins, jamais en dur dans le pipeline.",
        ],
      },
      {
        id: 'v2',
        title: "v2 : réécriture pour la résilience",
        body: [
          "Faiblesse réelle de la v1 : une seule instance fait tout, y compris MySQL en conteneur. Si elle tombe, l'appli et ses données tombent ensemble.",
          "terraform-v2/ remplace ça par : VPC dédié sur 2 zones de disponibilité, Auto Scaling Group de 2 instances derrière un Application Load Balancer, RDS MySQL Multi-AZ avec bascule automatique, secrets générés par Terraform et stockés dans AWS Secrets Manager (récupérés via le rôle IAM de l'instance au démarrage), et accès admin en SSM uniquement — plus aucun port SSH ouvert.",
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
          "La politique de scaling ciblant 50% de CPU s'est réellement déclenchée pendant le pic CPU du démarrage (pulls Docker + démarrage JVM) : la capacité désirée est passée de 2 à 3, puis revenue à 2 une fois le CPU stabilisé. Pas juste écrit dans le Terraform — observé en train de se produire.",
          "Limite connue, assumée plutôt que cachée : chaque instance de l'ASG fait tourner la stack entière (Kafka, Keycloak, InfluxDB, les 7 services) — seul MySQL a été réellement extrait vers un service managé. Centraliser Kafka et Keycloak correctement serait un travail à part, non fait ici.",
        ],
      },
      {
        id: 'discipline-cout',
        title: 'Discipline de coût',
        body: [
          "L'instance v1 est volontairement laissée arrêtée plutôt que de tourner en continu — provisionner à la demande, vérifier, démonter. La stack v2 suit le même principe : appliquée pour une fenêtre de vérification, puis détruite.",
          "Un choix de coût assumé plutôt que caché : c7i-flex.large a été utilisé pour l'ASG au lieu d'un t3.*, parce que t3.small (2 Go de RAM) subissait une vraie pression OOM avec la stack complète (perte de connexion à l'agent SSM), et t3.medium était rejeté par la restriction Free Tier de ce compte AWS.",
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
    ],
  },
  {
    slug: 'fina-tracker-cicd',
    status: 'roadmap',
    category: 'AWS · CI/CD',
    title: 'Fina Tracker : pipeline CI/CD en deux étapes vers ECR',
    description: 'IAM Role sans credentials stockés, HTTPS via Let\'s Encrypt, supervision Grafana — comment le pipeline pousse vers un registre privé puis déploie.',
    date: '',
    readTime: '',
    tags: ['AWS EC2', 'ECR', 'Grafana'],
  },
  {
    slug: 'ticket-bus-cicd',
    status: 'roadmap',
    category: 'Full-Stack · CI/CD',
    title: 'Ticket Bus : pipeline CI/CD multi-tenant',
    description: "Lint, TypeScript, audit sécurité, build Docker — le pipeline derrière une appli de réservation multi-compagnies.",
    date: '',
    readTime: '',
    tags: ['GitHub Actions', 'PostgreSQL', 'Redis'],
  },
  {
    slug: 'vagrant-ansible-labs',
    status: 'roadmap',
    category: 'Ansible · Vagrant',
    title: '5 labs Vagrant/Ansible : de la VM au CI/CD web',
    description: "Provisioning, rôles réutilisables, secrets chiffrés avec Ansible Vault, et Semaphore comme interface web pour Ansible.",
    date: '',
    readTime: '',
    tags: ['Vagrant', 'Ansible', 'Semaphore'],
  },
  {
    slug: 'gym-program-ci',
    status: 'roadmap',
    category: 'Full-Stack · CI/CD',
    title: 'Gym Program : CI en jobs parallèles et déploiement conditionnel',
    description: "Pourquoi le déploiement backend n'est déclenché qu'après le succès de la CI, et comment les migrations Prisma s'exécutent automatiquement.",
    date: '',
    readTime: '',
    tags: ['GitHub Actions', 'Prisma', 'Render'],
  },
];
