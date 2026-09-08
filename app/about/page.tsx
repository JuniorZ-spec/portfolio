import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About ZINZINDOHOUE Olivier Junior — background, technical philosophy and professional experience.',
};

export default function AboutPage() {
  return <AboutContent />;
}
