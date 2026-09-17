import { ARTICLES } from '@/lib/articles';
import ArticleDetail from './ArticleDetail';

export function generateStaticParams() {
  return ARTICLES.filter((a) => a.status === 'published').map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return null;
  return <ArticleDetail article={article} />;
}
