import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'DevOps and full-stack projects by ZINZINDOHOUE Olivier Junior: Kubernetes, GitOps, AWS, microservices.',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
