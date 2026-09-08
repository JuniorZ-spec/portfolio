import type { Metadata } from 'next';
import SkillsContent from './SkillsContent';

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'Technical skills of ZINZINDOHOUE Olivier Junior: languages, frameworks, databases, cloud & DevOps, monitoring.',
};

export default function SkillsPage() {
  return <SkillsContent />;
}
