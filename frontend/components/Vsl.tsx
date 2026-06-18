import PandaVideo from './PandaVideo';

// Slot de VSL da página de vendas. Hoje é placeholder do Panda Video.
// Quando o David subir o vídeo no Panda, basta passar a prop `embedUrl`
// (ex.: https://player-vz-XXXX.tv.pandavideo.com.br/embed/?v=UUID).
// <!-- VSL: David grava depois -->
export default function Vsl({
  titulo,
  legenda,
  embedUrl,
}: {
  titulo: string;
  legenda?: string;
  embedUrl?: string;
}) {
  return (
    <div style={{ maxWidth: 820, margin: '28px auto' }}>
      <PandaVideo embedUrl={embedUrl} titulo={titulo} />
      {legenda && (
        <p
          style={{
            textAlign: 'center',
            fontSize: 13.5,
            opacity: 0.82,
            marginTop: 12,
            marginBottom: 0,
            lineHeight: 1.5,
          }}
        >
          {legenda}
        </p>
      )}
    </div>
  );
}
