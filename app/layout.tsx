import type { Metadata } from 'next';
import { JetBrains_Mono, Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageEffects from '@/components/PageEffects';
import FloatingButtons from '@/components/FloatingButtons';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mono',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'ZINZINDOHOUE Olivier Junior — Ingénieur DevOps Junior | Développeur Full-Stack',
    template: '%s — ZINZINDOHOUE Olivier Junior',
  },
  description:
    'Portfolio de ZINZINDOHOUE Olivier Junior — Ingénieur DevOps Junior & Développeur Full-Stack. Infrastructures cloud, Kubernetes, CI/CD, projets et contact.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="dark">
      <body className={`${poppins.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="bg-grid" aria-hidden="true"></div>
            <PageEffects />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingButtons />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
