import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact ZINZINDOHOUE Olivier Junior — email, phone, LinkedIn, GitHub.',
};

export default function ContactPage() {
  return <ContactContent />;
}
