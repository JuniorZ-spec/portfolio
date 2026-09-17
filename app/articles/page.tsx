import type { Metadata } from 'next';
import ArticlesContent from './ArticlesContent';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Technical articles by ZINZINDOHOUE Olivier Junior — real infrastructure builds, documented phase by phase.',
};

export default function ArticlesPage() {
  return <ArticlesContent />;
}
