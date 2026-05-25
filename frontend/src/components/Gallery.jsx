import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

export default function Gallery({ items = [] }) {
  const [selected, setSelected] = useState(null);

  // Keyboard close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setSelected(null);
  }, []);

  useEffect(() => {
    if (selected) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected, handleKeyDown]);

  if (!items.length) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--text-light)', fontStyle: 'italic' }}>
        La galería se está preparando con cariño… 🌺
      </p>
    );
  }

  // Tilt angles for visual variety
  const tilts = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.2, -2, 1.5, -1, 2.5, -1.5, 1];

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '1.5rem',
        padding: '0.5rem',
      }}>
        {items.map((item, i) => (
          <motion.button
            key={item.id || i}
            id={`gallery-card-${item.id || i}`}
            initial={{ opacity: 0, scale: 0.88, rotate: tilts[i % tilts.length] * 0.5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: tilts[i % tilts.length] }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.25 },
            }}
            onClick={() => setSelected(item)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'block',
              position: 'relative',
            }}
          >
            <div className="polaroid" style={{ transformOrigin: 'center center' }}>
              <img
                src={resolveMediaUrl(item.image)}
                alt={item.imageAlt || item.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <div style={{
                paddingTop: '0.5rem',
                paddingBottom: '0.1rem',
                fontFamily: 'var(--font-serif)',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-dark)',
                textAlign: 'center',
                lineHeight: 1.3,
              }}>
                {item.title}
              </div>
              {/* Heart accent */}
              <div style={{
                position: 'absolute', top: '6px', right: '6px',
                fontSize: '0.7rem', opacity: 0.5,
              }}>❤</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: '1.25rem',
                padding: '1.25rem',
                maxWidth: '520px',
                width: '100%',
                boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
                position: 'relative',
                maxHeight: '90vh',
                overflow: 'auto',
              }}
            >
              {/* Close */}
              <button
                id="lightbox-close-btn"
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'var(--rose-blush)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36, height: 36,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--burgundy)',
                  fontWeight: 700,
                  zIndex: 10,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--rose-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--rose-blush)'}
              >
                ✕
              </button>

              {/* Polaroid frame */}
              <div className="polaroid" style={{ transform: 'none', marginBottom: '1rem' }}>
                <img
                  src={resolveMediaUrl(selected.image)}
                  alt={selected.imageAlt || selected.title}
                  style={{ width: '100%', maxHeight: '360px', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '0 0.5rem 0.5rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  color: 'var(--text-dark)',
                  marginBottom: '0.5rem',
                }}>
                  {selected.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                  {selected.description}
                </p>
                <div style={{
                  marginTop: '1rem',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  color: 'var(--rose-mid)',
                }}>
                  ❤ ❤ ❤
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
