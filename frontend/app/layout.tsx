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
  @keyframes wpa-glow{0%,100%{box-shadow:0 8px 28px rgba(201,162,39,0.30)}50%{box-shadow:0 8px 40px rgba(201,162,39,0.55)}}
  @keyframes wpa-reveal{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  .wpa-marquee-track{display:inline-flex;white-space:nowrap;animation:wpa-marquee 28s linear infinite}
  .wpa-dot-pulse{animation:wpa-pulse 1.4s ease-in-out infinite}
  a{transition:opacity .15s ease, transform .15s ease}
  .wpa-btn:hover{opacity:.94;transform:translateY(-1px)}
  details summary{cursor:pointer;list-style:none}
  details summary::-webkit-details-marker{display:none}
  /* DARK PREMIUM helpers */
  .wpa-gold-cta{transition:transform .18s ease, box-shadow .18s ease, filter .18s ease}
  .wpa-gold-cta:hover{transform:translateY(-2px);filter:brightness(1.05);box-shadow:0 14px 40px rgba(201,162,39,0.45)}
  .wpa-ghost-cta{transition:transform .18s ease, background .18s ease, border-color .18s ease}
  .wpa-ghost-cta:hover{transform:translateY(-2px);background:rgba(255,255,255,0.06);border-color:rgba(201,162,39,0.7)}
  .wpa-card{transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease}
  .wpa-card:hover{transform:translateY(-4px) scale(1.012);border-color:rgba(201,162,39,0.6);box-shadow:0 22px 60px rgba(0,0,0,0.55)}
  .wpa-reveal{animation:wpa-reveal .6s ease both}
  details.wpa-faq[open] summary span.wpa-faq-plus{transform:rotate(45deg)}

  /* ====================== RESPONSIVIDADE ====================== */
  /* impede scroll horizontal e estouro de largura no mobile */
  html,body{max-width:100%;overflow-x:hidden}
  img{max-width:100%}

  /* grid genérico que vira 1 coluna no mobile */
  @media (max-width:820px){
    .wpa-hero-grid{grid-template-columns:1fr !important;gap:34px !important}
  }

  /* ---- HEADER (menu mobile / hamburger) ---- */
  /* o nav desktop e o CTA do header somem no mobile; o botão hamburger aparece */
  .wpa-nav-desktop{display:flex}
  .wpa-header-cta{display:inline-block}
  .wpa-burger{display:none}
  @media (max-width:860px){
    .wpa-nav-desktop{display:none !important}
    .wpa-header-cta{display:none !important}
    .wpa-burger{display:inline-flex !important}
    .wpa-header-bar{padding:11px 16px !important}
    .wpa-logo-img{height:44px !important}
  }

  /* ---- HERO ---- */
  @media (max-width:820px){
    .wpa-hero-section{padding:46px 16px 54px !important}
    .wpa-hero-photo{max-width:380px;margin-left:auto;margin-right:auto;width:100%}
  }
  @media (max-width:560px){
    .wpa-hero-section{padding:38px 16px 46px !important}
    .wpa-hero-ctas{flex-direction:column !important;align-items:stretch !important}
    .wpa-hero-ctas > a{width:100% !important}
    .wpa-hero-social{justify-content:center !important;text-align:center}
  }

  /* ---- CTAs full-width no celular (genérico) ---- */
  @media (max-width:560px){
    .wpa-cta-stack{flex-direction:column !important;align-items:stretch !important}
    .wpa-cta-stack > a{width:100% !important}
  }

  /* ---- STATBAND: 4 -> 2x2 -> some divisória vertical no mobile ---- */
  @media (max-width:760px){
    .wpa-statband{grid-template-columns:1fr 1fr !important;gap:8px}
    .wpa-statband > div{border-left:none !important}
  }
  @media (max-width:380px){
    .wpa-statband{grid-template-columns:1fr !important}
  }

  /* ---- container padding reduzido no mobile ---- */
  @media (max-width:560px){
    .wpa-wrap{padding-left:16px !important;padding-right:16px !important}
    .wpa-section{padding-top:52px !important;padding-bottom:52px !important}
    .wpa-section-tight{padding-top:14px !important;padding-bottom:52px !important}
  }

  /* ---- grids que colapsam pra 1 coluna no mobile ---- */
  @media (max-width:680px){
    .wpa-grid-1col{grid-template-columns:1fr !important}
  }

  /* ---- cards/painéis com padding menor no mobile ---- */
  @media (max-width:560px){
    .wpa-pad-card{padding:24px 20px !important}
    .wpa-pad-panel{padding:30px 22px !important;border-radius:20px !important}
  }

  /* ---- FOOTER: colunas empilham e centralizam no mobile ---- */
  @media (max-width:560px){
    .wpa-footer-grid{grid-template-columns:1fr !important;gap:26px !important;text-align:center}
    .wpa-footer-grid a{justify-content:center}
  }

  /* ---- WhatsApp float: compacto no mobile (vira pílula menor) ---- */
  @media (max-width:560px){
    .wpa-wa-float{right:14px !important;bottom:14px !important;padding:12px 16px !important;font-size:14px !important}
    .wpa-wa-label{display:none}
  }

  /* ---- LANDING: hero e seções com menos padding no mobile ---- */
  @media (max-width:560px){
    .wpa-landing-hero{padding:40px 0 44px !important}
    .wpa-landing-section{padding:44px 0 !important}
    .wpa-upsell-row{flex-direction:column !important;align-items:stretch !important;text-align:center}
    .wpa-upsell-row a{text-align:center}
  }

  /* ---- PORTAL: padding lateral menor no mobile ---- */
  @media (max-width:560px){
    .wpa-portal-main{padding:16px !important}
  }

  /* drawer mobile do menu */
  body.wpa-menu-open{overflow:hidden}
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
