import type { ReactNode } from 'react';
import Script from 'next/script';
import { Poppins } from 'next/font/google';
import { BRAND } from '../lib/brand';

// IDs de rastreamento — todos via env var (David cola na Vercel). Vazio = no-op.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Wise Pro Academy | Curso Preparatório para Project Manager nos EUA',
  description:
    'Treinamento online e ao vivo para brasileiros que querem sair da execução pesada da obra e se tornar Project Manager valorizado na construção civil dos EUA. Aulas ao vivo, gravações disponíveis e cronograma prático.',
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

        {/* Google Tag Manager — só renderiza se NEXT_PUBLIC_GTM_ID existir */}
        {GTM_ID && (
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* Google Analytics 4 base (standalone) — só se NEXT_PUBLIC_GA_ID existir */}
        {GA_ID && (
          <>
            <Script
              id="ga4-lib"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="ga4-base" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        )}

        {/* Meta Pixel — só se NEXT_PUBLIC_META_PIXEL_ID existir. PageView automático. */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel-base" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
          </Script>
        )}
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: 'var(--font-poppins), system-ui, -apple-system, sans-serif',
          color: BRAND.navy,
          background: '#fff',
        }}
      >
        {/* GTM noscript (body) — só se o container existir */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Meta Pixel noscript fallback */}
        {META_PIXEL_ID && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}

        {children}
      </body>
    </html>
  );
}
