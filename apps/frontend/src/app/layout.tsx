import type { Metadata } from 'next';
import { AppProviders } from '../providers/AppProviders';

export const metadata: Metadata = {
  title: 'Gym Platform',
  description: 'Acompanhe IMC dos alunos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
