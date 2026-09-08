import type { Metadata } from 'next';
import BlogContent from './BlogContent';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog by ZINZINDOHOUE Olivier Junior — upcoming articles on Kubernetes, GitOps and cloud.',
};

export default function BlogPage() {
  return <BlogContent />;
}
