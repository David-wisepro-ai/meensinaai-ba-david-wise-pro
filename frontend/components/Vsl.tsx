import { BRAND } from '../lib/brand';

// Slot de VSL — placeholder até o David gravar o vídeo.
// Quando o vídeo existir, trocar o bloco interno por <video> ou <iframe>
// (ex.: YouTube/Vimeo/Mux) mantendo o mesmo aspect-ratio 16/9.
export default function Vsl({ titulo, legenda }: { titulo: string; legenda?: string }) {
  return (
    <div
      style={{
        aspectRatio: '16 / 9',
        background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.royal} 100%)`,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        border: `2px solid ${BRAND.gold}`,
        margin: '28px 0',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 760,
      }}
    >
      {/* VSL: David grava depois — substituir este bloco pelo player do vídeo (YouTube/Vimeo/Mux). */}
      <div style={{ textAlign: 'center', padding: 24 }}>
        <div
          aria-hidden
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: BRAND.gold,
            color: BRAND.navy,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 28, marginLeft: 6 }}>&#9654;</span>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800 }}>{titulo}</div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6, maxWidth: 360 }}>
          {legenda ?? 'O video de apresentacao do David entra aqui em breve.'}
        </div>
      </div>
    </div>
  );
}
