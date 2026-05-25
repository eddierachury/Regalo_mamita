import ConfettiButton from './ConfettiButton';
import { motion } from 'framer-motion';

// Floating heart positions
const HEARTS = [
  { x: '5%',  y: '20%', size: '1.8rem', delay: 0 },
  { x: '88%', y: '15%', size: '1.2rem', delay: 0.8 },
  { x: '15%', y: '70%', size: '2.2rem', delay: 1.4 },
  { x: '75%', y: '65%', size: '1.5rem', delay: 0.4 },
  { x: '50%', y: '10%', size: '1rem',   delay: 1.1 },
  { x: '92%', y: '80%', size: '1.8rem', delay: 0.6 },
  { x: '30%', y: '85%', size: '1.3rem', delay: 1.8 },
  { x: '60%', y: '75%', size: '0.9rem', delay: 0.2 },
];

export default function FinalMessage({ settings }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Floating hearts background */}
      {HEARTS.map((h, i) => (
        <div
          key={i}
          className="float-heart"
          style={{
            position: 'absolute',
            left: h.x, top: h.y,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            pointerEvents: 'none',
            opacity: 0.4,
            userSelect: 'none',
          }}
        >
          ❤
        </div>
      ))}

      {/* Sparkles */}
      {[
        { left: '10%', top: '50%', delay: '0.3s' },
        { left: '85%', top: '40%', delay: '1.2s' },
        { left: '45%', top: '5%',  delay: '0.7s' },
      ].map((s, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            position: 'absolute',
            left: s.left, top: s.top,
            fontSize: '1.2rem',
            animationDelay: s.delay,
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        >
          ✨
        </div>
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontSize: '3rem', marginBottom: '1rem' }}
        >
          🌸
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--text-dark)',
            marginBottom: '0.75rem',
          }}
        >
          {settings.finalTitle || 'Gracias por ser mi mamá'}
        </motion.h2>

        {settings.finalMessage && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontSize: '1rem',
              color: 'var(--text-mid)',
              lineHeight: 1.75,
              maxWidth: '540px',
              margin: '0 auto 2rem',
            }}
          >
            {settings.finalMessage}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <ConfettiButton
            text={settings.confettiButtonText || 'Celebrar tu vida'}
            enabled={settings.confettiEnabled !== false}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            marginTop: '2rem',
            fontSize: '0.88rem',
            color: 'var(--text-light)',
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
          }}
        >
          Hecho con todo el amor del mundo 💕
        </motion.p>
      </div>
    </div>
  );
}
