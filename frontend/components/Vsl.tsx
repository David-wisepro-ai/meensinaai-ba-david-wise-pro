import { BRAND } from '../lib/brand';

// Slot de VSL — placeholder até o David gravar o vídeo.
// Quando o vídeo existir, trocar o bloco interno por <video> ou <iframe>
// (ex.: YouTube/Vimeo/Mux) mantendo o mesmo aspect-ratio 16/9.
export default function Vsl({ titulo, legenda }: { titulo: string; legenda?: string }) {
  return (
    <div
      style={{
        aspectRatio: '16 / 9',
        background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyLight} 100%)`,
        color: BRAND.gold,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        border: `2px solid ${BRAND.gold}`,
        margin: '28px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* VSL: David grava depois — substituir este bloco pelo player do vídeo (YouTube/Vimeo/Mux). */}
      <div style={{ textAlign: 'center', padding: 24 }}>
        <div
          aria-hidden
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: `2px solid ${BRAND.gold}`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 26, marginLeft: 6 }}>&#9654;</span>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800 }}>{titulo}</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6, maxWidth: 360 }}>
          {legenda ?? 'O vídeo de apresentação do David entra aqui em breve.'}
        </div>
      </div>
    </div>
  );
}
