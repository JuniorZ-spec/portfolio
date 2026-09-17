import { PROJECTS } from '@/lib/projects';
import ProjectDetail from './ProjectDetail';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return null;
  return <ProjectDetail project={project} />;
}
