import type { Metadata } from 'next';
import CaseStudiesContent from './CaseStudiesContent';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Detailed DevOps project case studies by ZINZINDOHOUE Olivier Junior.',
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
