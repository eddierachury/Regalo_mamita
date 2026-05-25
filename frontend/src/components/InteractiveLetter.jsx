import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveLetter({ letter }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1.3fr',
      gap: '2.5rem',
      alignItems: 'flex-start',
    }}
      className="letter-grid"
    >
      {/* Left: envelope / decoration */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        {/* Envelope illustration */}
        <motion.div
          animate={open ? { rotateX: -20, y: -10 } : { rotateX: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%', maxWidth: 260,
            background: 'linear-gradient(145deg, #f7e9cc 0%, #faeeda 100%)',
            borderRadius: '0.75rem',
            border: '2px solid rgba(201,168,76,0.35)',
            boxShadow: 'var(--shadow-md)',
            padding: '2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Envelope flap */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 0,
            borderLeft: '130px solid transparent',
            borderRight: '130px solid transparent',
            borderTop: '70px solid rgba(201,168,76,0.22)',
          }} />

          {/* Gift / heart icon */}
          <div style={{ fontSize: '4rem', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
            🎁
          </div>

          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{ fontSize: '2rem', color: 'var(--rose-deep)' }}
          >
            ❤️
          </motion.div>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.9rem',
            color: 'var(--text-mid)',
            textAlign: 'center',
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}>
            {letter.intro || 'Para la mujer que pintó mi mundo de colores'}
          </p>

          {/* Decorative flowers */}
          <div style={{
            position: 'absolute', bottom: '0.5rem', right: '0.75rem',
            fontSize: '1.5rem', opacity: 0.3,
          }}>
            🌸🌺
          </div>
        </motion.div>

        {/* Open/close button */}
        <motion.button
          id="letter-toggle-btn"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(o => !o)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            fontWeight: 700,
            padding: '0.8rem 1.8rem',
            borderRadius: '50rem',
            background: open
              ? 'linear-gradient(135deg, var(--text-mid), var(--burgundy))'
              : 'linear-gradient(135deg, var(--rose-deep), var(--burgundy))',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(125,34,53,0.3)',
          }}
        >
          <span>{open ? '💌' : '💌'}</span>
          {open ? 'Cerrar carta' : (letter.buttonText || 'Te amo, mamí ❤')}
        </motion.button>
      </div>

      {/* Right: letter paper */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          color: 'var(--text-dark)',
          marginBottom: '0.25rem',
        }}>
          {letter.title || 'Carta'}
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-light)',
          fontStyle: 'italic',
          marginBottom: '1.25rem',
        }}>
          Para la mujer que pintó mi mundo de colores
        </p>

        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="letter-content"
              initial={{ opacity: 0, y: 20, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top center' }}
            >
              <div className="parchment" style={{ padding: '2rem 2rem 2rem 3rem' }}>
                {letter.paragraphs?.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    style={{
                      marginBottom: '1rem',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.95rem',
                      color: 'var(--text-dark)',
                      lineHeight: 1.9,
                    }}
                  >
                    {para}
                  </motion.p>
                ))}

                {letter.signature && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (letter.paragraphs?.length || 0) * 0.12 + 0.2 }}
                    style={{
                      marginTop: '1.5rem',
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--burgundy)',
                    }}
                  >
                    {letter.signature}
                  </motion.p>
                )}

                {/* Wax seal accent */}
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  fontSize: '1.5rem',
                  opacity: 0.5,
                }}>
                  🌹
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                padding: '2.5rem',
                background: 'rgba(245,223,165,0.12)',
                borderRadius: '0.75rem',
                border: '1px dashed rgba(201,168,76,0.35)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💌</div>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--text-light)',
                fontSize: '0.95rem',
              }}>
                Haz clic en el botón para leer la carta…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .letter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
