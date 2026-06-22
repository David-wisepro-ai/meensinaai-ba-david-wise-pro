'use client';

import { useState } from 'react';
import { BRAND } from '../lib/brand';
import AulaVideo from './AulaVideo';

// ============================================================================
// "MINHAS AULAS" — vitrine estilo Netflix (carrossel horizontal de aulas).
// Cada portal (Project Manager / Construtor) tem 8 SLOTS FIXOS de aula.
//
// >>> PARA O DAVID / ZUCK EDITAREM <<<
// Basta preencher o array de config (PM_AULAS / CONSTRUTOR_AULAS abaixo):
//   - titulo:     nome da aula (ex.: "Aula 1 — Leitura de planta")
//   - descricao:  1-2 linhas que aparecem ao abrir a aula
//   - videoUrl:   link do video. Aceita YouTube OU Panda Video:
//                   YouTube: cole o link normal (youtube.com/watch?v=... ou youtu.be/...)
//                   Panda:   cole a URL de embed (player-vz-XXXX.tv.pandavideo.com.br/embed/?v=UUID)
//                 Deixe VAZIO ('') enquanto o video nao subiu: o card abre o
//                 player com um placeholder "Vídeo em breve" (nada quebra).
// Mantenha 8 itens em cada lista (8 slots fixos). E so trocar o texto e a URL.
// ============================================================================

export type Aula = {
  titulo: string;
  descricao: string;
  videoUrl: string; // '' = video em breve. Aceita link do YouTube ou do Panda Video.
  capaUrl?: string; // imagem de capa do card (opcional). Ex.: '/capa-pm-aula1.jpg'
};

// --- Portal PROJECT MANAGER — 8 aulas -------------------------------------
export const PM_AULAS: Aula[] = [
  // Aula 1: video do David (Google Drive). Titulo/descricao provisorios ate o David enviar os finais.
  { titulo: 'Funções do Project Manager e Mentalidade Profissional', descricao: 'Descrição da aula em breve.', videoUrl: 'https://drive.google.com/file/d/1UNT-zcMKM40a13CM6ms6KapL3PXYHIGH/view', capaUrl: '/capa-pm-aula1.jpg' },
  { titulo: 'Aula 2 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 3 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 4 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 5 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 6 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 7 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 8 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
];

// --- Portal CONSTRUTOR — 8 aulas ------------------------------------------
export const CONSTRUTOR_AULAS: Aula[] = [
  { titulo: 'Aula 1 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 2 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 3 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 4 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 5 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 6 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 7 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
  { titulo: 'Aula 8 — título em breve', descricao: 'Descrição da aula em breve.', videoUrl: '' },
];

export default function PortalLessons({
  aulas,
  titulo = 'Minhas aulas',
}: {
  aulas: Aula[];
  titulo?: string;
}) {
  const [aberta, setAberta] = useState<number | null>(null);

  return (
    <section style={{ marginBottom: 28 }}>
      <h2 style={{ color: BRAND.navy, fontSize: 22, margin: '4px 0 14px' }}>{titulo}</h2>

      {/* Carrossel horizontal estilo Netflix: scroll-x com snap. */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          overflowX: 'auto',
          paddingBottom: 12,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {aulas.map((aula, i) => {
          const numero = i + 1;
          const disponivel = aula.videoUrl.trim().length > 0;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setAberta(i)}
              style={{
                flex: '0 0 auto',
                width: 230,
                scrollSnapAlign: 'start',
                textAlign: 'left',
                cursor: 'pointer',
                border: 'none',
                padding: 0,
                background: 'transparent',
                borderRadius: 14,
              }}
              aria-label={`Abrir ${aula.titulo}`}
            >
              {/* Arte navy + dourado (thumbnail-placeholder). */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '56.25%',
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${BRAND.navy} 0%, ${BRAND.navyLight} 100%)`,
                  border: `1px solid ${BRAND.gold}`,
                }}
              >
                {/* Capa da aula (se houver) cobre o card; senao fica so a arte navy+dourado. */}
                {aula.capaUrl && (
                  <img
                    src={aula.capaUrl}
                    alt={aula.titulo}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 14,
                  }}
                >
                  {aula.capaUrl ? (
                    <span aria-hidden />
                  ) : (
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1,
                        color: BRAND.navy,
                        background: BRAND.gold,
                        borderRadius: 999,
                        padding: '3px 10px',
                      }}
                    >
                      AULA {numero}
                    </span>
                  )}
                  <div
                    style={{
                      alignSelf: 'flex-end',
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: BRAND.gold,
                      color: BRAND.navy,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      fontWeight: 800,
                    }}
                  >
                    &#9654;
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ color: BRAND.navy, fontWeight: 700, fontSize: 14, lineHeight: 1.3 }}>
                  {aula.titulo}
                </div>
                <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
                  {disponivel ? 'Assistir' : 'Vídeo em breve'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal do player ao clicar numa aula. */}
      {aberta != null && (
        <AulaModal aula={aulas[aberta]} numero={aberta + 1} onFechar={() => setAberta(null)} />
      )}
    </section>
  );
}

function AulaModal({ aula, numero, onFechar }: { aula: Aula; numero: number; onFechar: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onFechar}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(7, 16, 36, 0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          maxWidth: 820,
          width: '100%',
          padding: 20,
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, color: BRAND.gold }}>
              AULA {numero}
            </div>
            <h3 style={{ color: BRAND.navy, margin: '4px 0 0', fontSize: 20 }}>{aula.titulo}</h3>
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            style={{
              border: `1.5px solid ${BRAND.navy}`,
              background: '#fff',
              color: BRAND.navy,
              borderRadius: 8,
              padding: '6px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Fechar
          </button>
        </div>

        <div style={{ marginTop: 14 }}>
          <AulaVideo url={aula.videoUrl || undefined} titulo={aula.titulo} />
        </div>

        {aula.descricao && (
          <p style={{ color: BRAND.navy, opacity: 0.85, fontSize: 14, marginTop: 14, marginBottom: 0 }}>
            {aula.descricao}
          </p>
        )}
      </div>
    </div>
  );
}
