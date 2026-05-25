import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Inicio',      href: '#hero'     },
  { label: 'Recuerdos',   href: '#timeline' },
  { label: 'Galería',     href: '#gallery'  },
  { label: 'Vídeo',       href: '#video'    },
  { label: 'Carta',       href: '#letter'   },
  { label: 'Celebración', href: '#final'    },
];

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar({ onMusicToggle, musicPlaying, musicError }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLink = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(253,248,243,0.96)'
          : 'rgba(253,248,243,0.82)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(201,168,76,0.18)',
        boxShadow: scrolled ? '0 4px 24px rgba(125,34,53,0.10)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={e => handleLink(e, '#hero')}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            fontStyle: 'italic',
            color: 'var(--burgundy)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          💕 Museo de Mamá
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleLink(e, link.href)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--text-mid)',
                textDecoration: 'none',
                padding: '0.4rem 0.75rem',
                borderRadius: '50rem',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                e.target.style.color = 'var(--burgundy)';
                e.target.style.background = 'rgba(125,34,53,0.07)';
              }}
              onMouseLeave={e => {
                e.target.style.color = 'var(--text-mid)';
                e.target.style.background = 'transparent';
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Music toggle */}
          {onMusicToggle && (
            <button
              id="nav-music-toggle"
              onClick={onMusicToggle}
              disabled={musicError}
              style={{
                marginLeft: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '0.45rem 0.9rem',
                borderRadius: '50rem',
                border: '1px solid rgba(201,168,76,0.4)',
                background: musicError
                  ? 'rgba(200,200,200,0.2)'
                  : 'rgba(201,168,76,0.12)',
                color: musicError ? 'var(--text-light)' : 'var(--gold-dark)',
                cursor: musicError ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '1rem' }}>{musicError ? '🚫' : (musicPlaying ? '⏸' : '♪')}</span>
              <span>{musicError ? 'Sin música' : 'Activar música'}</span>
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Menú"
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--burgundy)',
            fontSize: '1.5rem',
          }}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(253,248,243,0.98)',
              borderTop: '1px solid rgba(237,224,208,0.6)',
            }}
          >
            <div style={{ padding: '0.75rem 1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => handleLink(e, link.href)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-mid)',
                    textDecoration: 'none',
                    padding: '0.6rem 0.5rem',
                    borderBottom: '1px solid rgba(237,224,208,0.5)',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
