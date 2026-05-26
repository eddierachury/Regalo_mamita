import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

export default function Gallery({ items = [] }) {
  const [selected, setSelected] = useState(null);

  // Keyboard close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setSelected(null);
  }, []);

  // Body scroll lock + keyboard listener
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
      <div className="gallery-grid">
        {items.map((item, i) => (
          <motion.button
            key={item.id || i}
            id={`gallery-card-${item.id || i}`}
            initial={{ opacity: 0, scale: 0.88, rotate: tilts[i % tilts.length] * 0.5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: tilts[i % tilts.length] }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
            whileHover={{
              scale: 1.04,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.25 },
            }}
            onClick={() => setSelected(item)}
            className="gallery-card-btn"
          >
            <div className="polaroid" style={{ transformOrigin: 'center center', height: '100%' }}>
              <div style={{
                width: '100%',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                borderRadius: '2px',
                background: '#fff8ef',
              }}>
                <img
                  src={resolveMediaUrl(item.image)}
                  alt={item.imageAlt || item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </div>
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
              <div style={{
                position: 'absolute', top: '6px', right: '6px',
                fontSize: '0.7rem', opacity: 0.5,
              }}>❤</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox — Portal renders directly into document.body, escaping SectionWrapper stacking context */}
      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              key="lightbox-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                background: 'rgba(30, 8, 15, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 24 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 16 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                onClick={e => e.stopPropagation()}
                className="lightbox-modal"
              >
                {/* Close button — always visible top-right */}
                <button
                  id="lightbox-close-btn"
                  onClick={() => setSelected(null)}
                  aria-label="Cerrar"
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: 'var(--rose-blush, #f9e8e8)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--burgundy, #7d2235)',
                    fontWeight: 700,
                    zIndex: 10,
                    transition: 'background 0.2s, transform 0.15s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--rose-soft, #f2c4c4)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--rose-blush, #f9e8e8)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  ✕
                </button>

                {/* Image frame — contain to show full photo uncropped */}
                <div style={{
                  background: '#fff8ef',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(201,168,76,0.18)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}>
                  <img
                    src={resolveMediaUrl(selected.image)}
                    alt={selected.imageAlt || selected.title}
                    className="lightbox-image"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                </div>

                {/* Title and description */}
                <div style={{ padding: '0 0.5rem 0.5rem' }}>
                  <h3 style={{
                    fontFamily: "var(--font-serif, 'Playfair Display', serif)",
                    fontSize: '1.3rem',
                    color: 'var(--text-dark, #3d1a24)',
                    marginBottom: '0.5rem',
                  }}>
                    {selected.title}
                  </h3>
                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-mid, #6b3040)',
                    lineHeight: 1.7,
                    fontFamily: "var(--font-sans, 'Lato', sans-serif)",
                  }}>
                    {selected.description}
                  </p>
                  <div style={{
                    marginTop: '0.75rem',
                    fontSize: '1.1rem',
                    textAlign: 'center',
                    color: 'var(--rose-mid, #d4747a)',
                  }}>
                    ❤ ❤ ❤
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          padding: 0.5rem;
        }
        .gallery-card-btn {
          all: unset;
          cursor: pointer;
          display: block;
          position: relative;
        }

        /* ── Lightbox modal card ── */
        .lightbox-modal {
          background: #fff;
          border-radius: 1.25rem;
          padding: 1.25rem;
          max-width: 600px;
          width: 90vw;
          max-height: 88vh;
          overflow-y: auto;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
          position: relative;
        }
        .lightbox-image {
          max-height: 60vh;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 1100px) {
          .gallery-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 800px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
          .lightbox-modal {
            width: 96vw;
            max-height: 92vh;
            padding: 1rem;
            border-radius: 1rem;
          }
          .lightbox-image {
            max-height: 50vh;
          }
        }
        @media (max-width: 500px) {
          .gallery-grid { grid-template-columns: 1fr; gap: 1.25rem; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </>
  );
}
