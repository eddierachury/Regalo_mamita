import { motion } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Timeline({ items = [] }) {
  if (!items.length) {
    return (
      <p style={{ textAlign: 'center', color: 'var(--text-light)', fontStyle: 'italic' }}>
        Los recuerdos se están cargando con amor… 🌸
      </p>
    );
  }

  return (
    <div style={{ position: 'relative', padding: '1rem 0 2rem' }}>
      {/* Central vertical line — desktop only */}
      <div className="timeline-line" style={{ display: 'block' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={item.id || i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 40px 1fr',
                alignItems: 'center',
                gap: '1rem',
              }}
              className="timeline-row"
            >
              {/* Left slot */}
              {isLeft ? (
                <TimelineCard item={item} align="right" />
              ) : (
                <div />
              )}

              {/* Center dot */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="timeline-dot" />
              </div>

              {/* Right slot */}
              {!isLeft ? (
                <TimelineCard item={item} align="left" />
              ) : (
                <div />
              )}
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-row {
            grid-template-columns: 40px 1fr !important;
          }
          .timeline-row > div:first-child:empty,
          .timeline-row > div:last-child:empty { display: none; }
          .timeline-row > div.tl-card-left,
          .timeline-row > div.tl-card-right {
            grid-column: 2 !important;
          }
        }
      `}</style>
    </div>
  );
}

function TimelineCard({ item, align }) {
  return (
    <div
      className={align === 'right' ? 'tl-card-left' : 'tl-card-right'}
      style={{ textAlign: align === 'right' ? 'right' : 'left' }}
    >
      <div
        className="polaroid"
        style={{
          display: 'inline-block',
          maxWidth: '100%',
          width: '100%',
          transform: align === 'right' ? 'rotate(-1.2deg)' : 'rotate(1.2deg)',
          textAlign: 'left',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
        onMouseLeave={e => {
          e.currentTarget.style.transform = align === 'right' ? 'rotate(-1.2deg)' : 'rotate(1.2deg)';
        }}
      >
        {/* Date chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          background: 'linear-gradient(135deg, var(--rose-deep), var(--burgundy))',
          color: '#fff',
          fontSize: '0.72rem',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          padding: '0.2rem 0.6rem',
          borderRadius: '50rem',
          marginBottom: '0.5rem',
          letterSpacing: '0.04em',
        }}>
          📅 {item.date}
        </div>

        {item.image && (
          <img
            src={resolveMediaUrl(item.image)}
            alt={item.imageAlt || item.title}
            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px' }}
          />
        )}

        <div style={{ padding: '0.6rem 0.2rem 0' }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-dark)',
            marginBottom: '0.35rem',
          }}>
            {item.title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: 1.55 }}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
