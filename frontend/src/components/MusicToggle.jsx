import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

/**
 * MusicToggle — floating bottom-right music player card.
 * Exposes { toggle, playing, error } via ref so Navbar can also trigger it.
 * Fails gracefully: if the MP3 is missing/errors, shows "Música no disponible"
 * without throwing console errors (onError suppresses them at the element level).
 */
const MusicToggle = forwardRef(function MusicToggle({ settings }, ref) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggle = async () => {
    if (!audioRef.current || error) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.volume = settings.musicVolume ?? 0.3;
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay blocked or file missing — fail silently
      setError(true);
      setPlaying(false);
    }
  };

  useImperativeHandle(ref, () => ({ toggle, playing, error }));

  if (!visible) return null;

  return (
    <>
      {/* Hidden audio element — onError suppresses network error from console display */}
      <audio
        ref={audioRef}
        src={resolveMediaUrl(settings.musicUrl)}
        onError={() => setError(true)}
        preload="none"
      />

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.55, ease: 'easeOut' }}
        style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 200 }}
      >
        <div className="music-card">
          {/* Dismiss */}
          <button
            aria-label="Cerrar reproductor"
            onClick={() => { audioRef.current?.pause(); setPlaying(false); setVisible(false); }}
            style={{
              position: 'absolute', top: '-6px', right: '-6px',
              width: 20, height: 20,
              border: 'none', borderRadius: '50%',
              background: 'var(--rose-soft)',
              color: 'var(--burgundy)',
              fontSize: '0.6rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}
          >
            ✕
          </button>

          {/* Music note icon */}
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: error
              ? 'rgba(200,200,200,0.2)'
              : 'linear-gradient(135deg, var(--rose-blush), var(--rose-soft))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
            border: '1px solid rgba(201,168,76,0.2)',
          }}>
            {error ? '🚫' : (playing ? '🎵' : '🎶')}
          </div>

          {/* Label + controls */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--text-dark)',
              fontStyle: 'italic',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '0.1rem',
            }}>
              Madrecita querida
            </p>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>
              {error ? 'Música no disponible' : (playing ? 'Reproduciendo…' : 'Pausado')}
            </p>
          </div>

          {/* Play/pause button */}
          <AnimatePresence mode="wait">
            <motion.button
              id="music-play-pause-btn"
              key={playing ? 'pause' : 'play'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={toggle}
              disabled={error}
              aria-label={playing ? 'Pausar música' : 'Reproducir música'}
              style={{
                width: 34, height: 34, borderRadius: '50%',
                border: 'none',
                background: error
                  ? 'rgba(200,200,200,0.3)'
                  : 'linear-gradient(135deg, var(--rose-deep), var(--burgundy))',
                color: '#fff',
                fontSize: '0.8rem',
                cursor: error ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: error ? 'none' : '0 2px 10px rgba(125,34,53,0.3)',
              }}
            >
              {playing ? '⏸' : '▶'}
            </motion.button>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
});

export default MusicToggle;
