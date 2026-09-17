const ICON_MAP: [RegExp, string][] = [
  [/terraform/i, 'terraform'],
  [/argocd/i, 'argo'],
  [/kubernetes|k3s|eks|k8s/i, 'kubernetes'],
  [/github actions/i, 'githubactions'],
  [/prometheus/i, 'prometheus'],
  [/grafana/i, 'grafana'],
  [/docker/i, 'docker'],
  [/postgres/i, 'postgresql'],
  [/redis/i, 'redis'],
  [/mysql/i, 'mysql'],
  [/mongo/i, 'mongodb'],
  [/vercel/i, 'vercel'],
  [/render/i, 'render'],
  [/next\.?js/i, 'nextdotjs'],
  [/react/i, 'react'],
  [/nginx/i, 'nginx'],
  [/keycloak/i, 'keycloak'],
  [/kafka/i, 'apachekafka'],
  [/jenkins/i, 'jenkins'],
  [/aws|ec2|ecr|alb|rds|iam|irsa|secrets manager|asg|pod identity/i, 'amazonaws'],
  [/azure/i, 'microsoftazure'],
  [/vagrant/i, 'vagrant'],
  [/ansible/i, 'ansible'],
  [/gemini/i, 'googlegemini'],
  [/elasticsearch|kibana|elk/i, 'elastic'],
  [/flask/i, 'flask'],
];

export function getNodeIcon(label: string): string | null {
  for (const [pattern, slug] of ICON_MAP) {
    if (pattern.test(label)) return slug;
  }
  return null;
}
