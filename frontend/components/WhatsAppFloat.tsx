'use client';
import { BRAND, WHATSAPP_URL } from '../lib/brand';

// Botão flutuante fixo de WhatsApp (canto inferior direito).
// WHATSAPP: David troca o número em lib/brand.ts (WHATSAPP_URL).
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale no WhatsApp"
      className="wpa-btn"
      style={{
        position: 'fixed',
        right: 18,
        bottom: 18,
        zIndex: 60,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        background: BRAND.whatsapp,
        color: '#fff',
        fontWeight: 700,
        fontSize: 15,
        padding: '13px 18px',
        borderRadius: 999,
        textDecoration: 'none',
        boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
      }}
    >
      <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>&#9742;</span>
      Fale no WhatsApp
    </a>
  );
}
