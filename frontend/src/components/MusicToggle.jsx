import { useRef, useState, useCallback, useImperativeHandle, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resolveMediaUrl } from '../api/museumApi';

/**
 * Safely encode a media URL that may contain spaces, accents, commas,
 * parentheses, and other special characters in the filename portion.
 * We only encode the last path segment (the filename) to avoid
 * double-encoding the rest of the path.
 */
function safeMediaUrl(rawUrl) {
  if (!rawUrl) return '';
  const resolved = resolveMediaUrl(rawUrl);
  try {
    const url = new URL(resolved);
    // Decode first to avoid double-encoding, then re-encode properly
    const segments = url.pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    segments[segments.length - 1] = encodeURIComponent(decodeURIComponent(lastSegment));
    url.pathname = segments.join('/');
    return url.toString();
  } catch {
    // If URL parsing fails (relative path), encode the filename manually
    const parts = resolved.split('/');
    const filename = parts.pop();
    return parts.join('/') + '/' + encodeURIComponent(filename);
  }
}

/**
 * MusicToggle — floating bottom-right music player card with playlist support.
 * Exposes { toggle, playing, error } via ref so Navbar can also trigger it.
 * Fails gracefully: if an MP3 is missing/errors, shows "Música no disponible"
 * and allows skipping to the next track.
 */
const MusicToggle = forwardRef(function MusicToggle({ settings }, ref) {
  // Build playlist from settings
  const playlist = (settings.musicPlaylist && settings.musicPlaylist.length > 0)
    ? settings.musicPlaylist
    : settings.musicUrl
      ? [{ id: 0, title: 'Música', artist: '', url: settings.musicUrl }]
      : [];

  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(true);

  const currentSong = playlist[currentIndex] || null;

  // When currentIndex changes, update the audio source
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const src = safeMediaUrl(currentSong.url);
    audioRef.current.src = src;
    audioRef.current.load();
    setError(false);
    // If we were playing, start the new track
    if (playing) {
      audioRef.current.volume = settings.musicVolume ?? 0.3;
      audioRef.current.play().catch(() => {
        setError(true);
        setPlaying(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const toggle = useCallback(async () => {
    if (!audioRef.current || playlist.length === 0) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        if (error) {
          // Try reloading current track
          audioRef.current.src = safeMediaUrl(currentSong?.url);
          audioRef.current.load();
          setError(false);
        }
        audioRef.current.volume = settings.musicVolume ?? 0.3;
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setError(true);
      setPlaying(false);
    }
  }, [playing, error, currentSong, settings.musicVolume, playlist.length]);

  const playNext = useCallback(() => {
    if (playlist.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const playPrev = useCallback(() => {
    if (playlist.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  // Auto-advance when song ends
  const handleEnded = useCallback(() => {
    if (playlist.length > 1) {
      setCurrentIndex(prev => (prev + 1) % playlist.length);
    } else {
      setPlaying(false);
    }
  }, [playlist.length]);

  // Handle audio errors gracefully
  const handleError = useCallback(() => {
    setError(true);
  }, []);

  useImperativeHandle(ref, () => ({ toggle, playing, error }), [toggle, playing, error]);

  if (!visible || playlist.length === 0) return null;

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong ? safeMediaUrl(currentSong.url) : undefined}
        onError={handleError}
        onEnded={handleEnded}
        preload="none"
      />

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.55, ease: 'easeOut' }}
        style={{ position: 'fixed', bottom: '1.25rem', right: '1.25rem', zIndex: 200 }}
      >
        <div className="music-card music-card-playlist">
          {/* Dismiss */}
          <button
            aria-label="Cerrar reproductor"
            onClick={() => { audioRef.current?.pause(); setPlaying(false); setVisible(false); }}
            className="music-dismiss-btn"
          >
            ✕
          </button>

          {/* Music note icon */}
          <div className={`music-icon-circle ${error ? 'music-icon-error' : ''}`}>
            {error ? '🚫' : (playing ? '🎵' : '🎶')}
          </div>

          {/* Song info + controls */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            {/* Song title */}
            <p className="music-song-title">
              {error ? 'Música no disponible' : (currentSong?.title || 'Sin título')}
            </p>
            {/* Artist */}
            <p className="music-song-artist">
              {error
                ? 'Intenta la siguiente canción'
                : (currentSong?.artist || (playing ? 'Reproduciendo…' : 'Pausado'))
              }
            </p>
            {/* Transport controls */}
            <div className="music-transport">
              {/* Previous */}
              {playlist.length > 1 && (
                <button
                  aria-label="Canción anterior"
                  onClick={playPrev}
                  className="music-transport-btn"
                >
                  ⏮
                </button>
              )}

              {/* Play/Pause */}
              <AnimatePresence mode="wait">
                <motion.button
                  id="music-play-pause-btn"
                  key={playing ? 'pause' : 'play'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={toggle}
                  aria-label={playing ? 'Pausar música' : 'Reproducir música'}
                  className={`music-play-btn ${error ? 'music-play-btn-disabled' : ''}`}
                >
                  {playing ? '⏸' : '▶'}
                </motion.button>
              </AnimatePresence>

              {/* Next */}
              {playlist.length > 1 && (
                <button
                  aria-label="Siguiente canción"
                  onClick={playNext}
                  className="music-transport-btn"
                >
                  ⏭
                </button>
              )}
            </div>
          </div>

          {/* Track counter */}
          {playlist.length > 1 && (
            <span className="music-track-counter">
              {currentIndex + 1}/{playlist.length}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
});

export default MusicToggle;
