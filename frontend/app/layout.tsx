import type { ReactNode } from 'react';
import { BRAND } from '../lib/brand';

export const metadata = {
  title: 'Wise Pro Academy — Licenca de Construtor (CSL) em Massachusetts',
  description: 'Prepare-se pra tirar sua Construction Supervisor License (CSL) em Massachusetts. Portal de simulados, curso presencial e mentoria pratica. Em portugues, pra brasileiros nos EUA.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', color: BRAND.navy, background: BRAND.cream }}>
        {children}
      </body>
    </html>
  );
}
