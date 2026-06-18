import { BRAND } from '../lib/brand';

// Player do Panda Video. Passe `embedUrl` = a URL de embed do Panda
// (ex: https://player-vz-XXXX.tv.pandavideo.com.br/embed/?v=UUID-DO-VIDEO).
// Sem URL, mostra um placeholder elegante até o David subir o vídeo no Panda Video.
export default function PandaVideo({
  embedUrl,
  titulo = 'Vídeo',
}: {
  embedUrl?: string;
  titulo?: string;
}) {
  const wrap: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    borderRadius: 14,
    overflow: 'hidden',
    border: `1px solid ${BRAND.gold}`,
    background: BRAND.navy,
  };

  if (!embedUrl) {
    return (
      <div style={wrap} aria-label={`${titulo} (vídeo em breve)`}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            color: '#fff',
            textAlign: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: '50%',
              background: BRAND.gold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: BRAND.navy,
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            &#9654;
          </div>
          <strong style={{ fontSize: 16 }}>{titulo}</strong>
          <span style={{ opacity: 0.72, fontSize: 13 }}>Vídeo em breve (Panda Video)</span>
        </div>
      </div>
    );
  }

  return (
    <div style={wrap}>
      <iframe
        src={embedUrl}
        title={titulo}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
