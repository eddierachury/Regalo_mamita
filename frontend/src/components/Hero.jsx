import { motion } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

export default function Hero({ profile }) {
  const handleScroll = (e) => {
    e.preventDefault();
    const el = document.querySelector('#timeline');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: 'min(90vh, 700px)',
        background: 'linear-gradient(135deg, var(--burgundy-dark) 0%, var(--burgundy) 45%, var(--rose-deep) 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Bokeh orbs */}
      {[
        { size: 320, top: '-80px',  left: '-60px',  color: 'rgba(245,223,165,0.15)' },
        { size: 220, bottom: '-60px', right: '10%',  color: 'rgba(242,196,196,0.20)' },
        { size: 160, top: '30%',    right: '-40px',  color: 'rgba(212,116,122,0.18)' },
        { size: 100, top: '15%',    left: '40%',     color: 'rgba(255,255,255,0.07)' },
      ].map((orb, i) => (
        <div
          key={i}
          className="bokeh-circle"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            background: orb.color,
          }}
        />
      ))}

      {/* Floating decorative text */}
      <div style={{
        position: 'absolute', top: '1.5rem', right: '2rem',
        fontFamily: 'var(--font-serif)', fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em',
        fontStyle: 'italic', userSelect: 'none',
      }}>
        con amor ✦
      </div>

      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}
        className="hero-grid"
      >
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Subtitle badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'rgba(245,223,165,0.18)',
              border: '1px solid rgba(245,223,165,0.35)',
              borderRadius: '50rem',
              padding: '0.3rem 0.9rem',
              marginBottom: '1.2rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              color: 'var(--gold-light)',
              letterSpacing: '0.06em',
              fontWeight: 700,
            }}
          >
            <span>🌸</span> Para mamita
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1.25rem',
            }}
          >
            {profile.pageTitle || 'Museo de Mamá'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.75,
              marginBottom: '2rem',
              maxWidth: '420px',
            }}
          >
            {profile.birthdayMessage}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            <a
              href="#timeline"
              id="hero-cta-btn"
              onClick={handleScroll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 700,
                padding: '0.9rem 2rem',
                borderRadius: '50rem',
                background: 'rgba(255,255,255,0.15)',
                border: '2px solid rgba(255,255,255,0.5)',
                color: '#fff',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                transition: 'background 0.25s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.28)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>💝</span>
              {profile.startButtonText || 'Ver recuerdos'}
            </a>
          </motion.div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div style={{
            position: 'relative',
            display: 'inline-block',
          }}>
            {/* Decorative ring */}
            <div style={{
              position: 'absolute', inset: '-12px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, rgba(245,223,165,0.4), rgba(242,196,196,0.4), rgba(212,116,122,0.4), rgba(245,223,165,0.4))',
              animation: 'spin 12s linear infinite',
            }} />
            {/* Second ring */}
            <div style={{
              position: 'absolute', inset: '-4px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
            }} />
            <img
              src={resolveMediaUrl(profile.heroImage)}
              alt={profile.heroImageAlt || 'Mamá'}
              style={{
                width: 'clamp(220px, 35vw, 380px)',
                height: 'clamp(220px, 35vw, 380px)',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center top',
                border: '4px solid rgba(255,255,255,0.4)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                display: 'block',
                position: 'relative',
                zIndex: 1,
              }}
            />
            {/* Heart badge */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{
                position: 'absolute', bottom: '10%', right: '-10px',
                background: 'var(--rose-deep)',
                borderRadius: '50%',
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem',
                boxShadow: '0 4px 16px rgba(125,34,53,0.4)',
                border: '3px solid #fff',
                zIndex: 2,
              }}
            >
              ❤️
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '60px', overflow: 'hidden',
      }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}>
          <path d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z"
            fill="rgb(246,234,234)" opacity="0.3" />
          <path d="M0,60 C360,15 1080,15 1440,60 L1440,60 L0,60 Z"
            fill="rgb(249,232,232)" />
        </svg>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 700px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:last-child { order: -1; }
        }
      `}</style>
    </section>
  );
}
