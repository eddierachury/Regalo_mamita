import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const WARM_COLORS = ['#b84e5a', '#c9a84c', '#f2c4c4', '#7d2235', '#f5dfa5', '#d4747a', '#fff0e0'];

export default function ConfettiButton({ text = 'Celebrar tu vida', enabled = true }) {
  if (!enabled) return null;

  const fire = () => {
    // Left burst
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.75 },
      colors: WARM_COLORS,
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });
    // Right burst
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.75 },
      colors: WARM_COLORS,
      shapes: ['circle', 'square'],
      scalar: 1.1,
    });
    // Center hearts-like burst
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: WARM_COLORS,
        scalar: 0.8,
      });
    }, 200);
  };

  return (
    <motion.button
      id="confetti-celebrate-btn"
      whileHover={{ scale: 1.05, boxShadow: '0 12px 36px rgba(125,34,53,0.45)' }}
      whileTap={{ scale: 0.96 }}
      onClick={fire}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-sans)',
        fontSize: '1.1rem',
        fontWeight: 700,
        padding: '1rem 2.4rem',
        borderRadius: '50rem',
        background: 'linear-gradient(135deg, var(--burgundy), var(--rose-deep) 60%, var(--gold-dark))',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 6px 24px rgba(125,34,53,0.35)',
        letterSpacing: '0.02em',
      }}
    >
      <span style={{ fontSize: '1.3rem' }}>🎉</span>
      {text}
      <span style={{ fontSize: '1.3rem' }}>✨</span>
    </motion.button>
  );
}
