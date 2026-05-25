import { useState } from 'react';
import { motion } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

const EQUATION_TERMS = [
  { label: 'Amor',      icon: '❤️' },
  { label: 'Paciencia', icon: '🕊️' },
  { label: 'Fortaleza', icon: '💪' },
  { label: 'Ternura',   icon: '🌸' },
  { label: 'Sacrificio', icon: '✨' },
];

export default function ManimVideo({ settings }) {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2.5rem',
      alignItems: 'center',
    }}
      className="video-grid"
    >
      {/* Left: video or placeholder */}
      <div>
        <div style={{
          borderRadius: '1rem',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--burgundy-dark) 0%, var(--burgundy) 100%)',
          position: 'relative',
          aspectRatio: '16/9',
          boxShadow: 'var(--shadow-lg)',
        }}>
          {videoOk ? (
            <video
              controls
              id="manim-video-player"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={() => setVideoOk(false)}
            >
              <source src={resolveMediaUrl(settings.videoUrl)} type="video/mp4" />
            </video>
          ) : (
            /* Graceful placeholder */
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
              position: 'absolute', inset: 0,
            }}>
              {/* Bokeh inside placeholder */}
              <div style={{
                position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: '1rem',
              }}>
                {[
                  { size: 120, top: '-20px', left: '-20px' },
                  { size: 80, bottom: '10px', right: '10px' },
                  { size: 60, top: '50%', left: '60%' },
                ].map((o, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: o.size, height: o.size,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    filter: 'blur(20px)',
                    top: o.top, bottom: o.bottom,
                    left: o.left, right: o.right,
                  }} />
                ))}
              </div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                style={{
                  width: 64, height: 64,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  position: 'relative', zIndex: 1,
                }}
              >
                ▶
              </motion.div>
              <p style={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                position: 'relative', zIndex: 1,
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
              }}>
                {settings.videoPlaceholderMessage || 'Muy pronto aquí estará una animación especial creada con amor para ti.'}
              </p>
            </div>
          )}
        </div>

        {settings.videoDescription && (
          <p style={{
            marginTop: '0.75rem',
            fontSize: '0.88rem',
            color: 'var(--text-light)',
            fontStyle: 'italic',
            textAlign: 'center',
          }}>
            {settings.videoDescription}
          </p>
        )}
      </div>

      {/* Right: equation */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          padding: '1.5rem',
          background: 'rgba(253,248,243,0.6)',
          borderRadius: '1rem',
          border: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {EQUATION_TERMS.map((term, i) => (
            <motion.div
              key={term.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                color: 'var(--text-dark)',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{term.icon}</span>
              {i > 0 && <span style={{ color: 'var(--gold-dark)', fontWeight: 700, fontSize: '1.1rem' }}>+</span>}
              <span style={{ fontWeight: 600 }}>{term.label}</span>
            </motion.div>
          ))}

          <div style={{
            borderTop: '2px solid var(--gold-light)',
            marginTop: '0.5rem',
            paddingTop: '0.65rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{ fontSize: '1.2rem' }}>✦</span>
            <span style={{
              color: 'var(--gold-dark)',
              fontWeight: 700,
              fontSize: '1.15rem',
              fontFamily: 'var(--font-sans)',
            }}>
              =
            </span>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: 'var(--burgundy)',
              fontStyle: 'italic',
            }}>
              Mamá 💕
            </span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 700px) {
          .video-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
