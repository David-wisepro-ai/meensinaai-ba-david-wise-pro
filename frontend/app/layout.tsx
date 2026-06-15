import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { BRAND } from '../lib/brand';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Wise Pro Academy | Curso Preparatorio para Project Manager nos EUA',
  description:
    'Treinamento online e ao vivo para brasileiros que querem sair da execucao pesada da obra e se tornar Project Manager valorizado na construcao civil dos EUA. Aulas ao vivo, gravacoes disponiveis e cronograma pratico.',
};

// Estilos globais: marquee, reset e tipografia arredondada (Poppins).
const globalCss = `
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0}
  @keyframes wpa-marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes wpa-pulse{0%,100%{opacity:1}50%{opacity:.35}}
  .wpa-marquee-track{display:inline-flex;white-space:nowrap;animation:wpa-marquee 28s linear infinite}
  .wpa-dot-pulse{animation:wpa-pulse 1.4s ease-in-out infinite}
  a{transition:opacity .15s ease, transform .15s ease}
  .wpa-btn:hover{opacity:.92;transform:translateY(-1px)}
  details summary{cursor:pointer;list-style:none}
  details summary::-webkit-details-marker{display:none}
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'var(--font-poppins), system-ui, -apple-system, sans-serif',
          color: BRAND.navy,
          background: '#fff',
        }}
      >
        {children}
      </body>
    </html>
  );
}
