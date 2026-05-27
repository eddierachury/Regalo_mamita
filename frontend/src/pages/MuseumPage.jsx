import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMuseum } from '../api/museumApi';
import Navbar from '../components/Layout/Navbar';
import SectionWrapper from '../components/Layout/SectionWrapper';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import Gallery from '../components/Gallery';
import ManimVideo from '../components/ManimVideo';
import InteractiveLetter from '../components/InteractiveLetter';
import FinalMessage from '../components/FinalMessage';
import MusicToggle from '../components/MusicToggle';

/* ─── Fallback data (matches API field names exactly) ─── */
const FALLBACK = {
  profile: {
    pageTitle: 'Museo de Mamá',
    birthdayMessage: '¡Feliz cumpleaños, Mamá! Gracias por ser la luz y la inspiración de mi vida. Que este nuevo año te traiga tanta felicidad como la que tú me das todos los días.',
    startButtonText: 'Ver recuerdos',
    heroImage: '/static/images/Imagen1.png',
    heroImageAlt: 'Mamá',
  },
  timeline: [],
  gallery: [],
  letter: {
    title: 'Carta',
    intro: 'Para la mujer que pintó mi mundo de colores',
    buttonText: 'Te amo, mamí ❤',
    paragraphs: [],
    signature: '',
  },
  settings: {
    musicEnabled: true,
    musicUrl: '/static/music/madrecita-querida.mp3',
    musicVolume: 0.3,
    videoTitle: 'La ecuación de mamá',
    videoDescription: '',
    videoUrl: '/static/videos/ecuacion_mama.mp4',
    videoPlaceholderMessage: 'Muy pronto aquí estará una animación especial creada con amor para ti.',
    finalTitle: 'Gracias por ser mi mamá',
    finalMessage: 'Feliz es el mejor final mensaje mi mamá.',
    confettiEnabled: true,
    confettiButtonText: 'Celebrar tu vida',
  },
};

export default function MuseumPage() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  // Music toggle ref for navbar integration
  const musicRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);

  useEffect(() => {
    fetchMuseum()
      .then(res => {
        // Deep merge: use API values, fall back to FALLBACK for missing fields
        setData({
          profile:  { ...FALLBACK.profile,  ...res.profile },
          timeline: Array.isArray(res.timeline) && res.timeline.length > 0 ? res.timeline : FALLBACK.timeline,
          gallery:  Array.isArray(res.gallery)  && res.gallery.length > 0  ? res.gallery  : FALLBACK.gallery,
          letter:   { ...FALLBACK.letter,   ...res.letter },
          settings: { ...FALLBACK.settings, ...res.settings },
        });
      })
      .catch((err) => {
        console.warn('Museo API no disponible, usando datos de respaldo:', err.message);
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleMusicToggle = () => {
    if (musicRef.current) {
      musicRef.current.toggle();
      // Read back the actual state after toggle
      // Use a microtask so the ref state has updated
      setTimeout(() => {
        if (musicRef.current) {
          setMusicPlaying(musicRef.current.playing);
          setMusicError(musicRef.current.error);
        }
      }, 100);
    }
  };

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '1.5rem',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
          style={{
            width: 52, height: 52,
            border: '4px solid var(--rose-blush)',
            borderTop: '4px solid var(--rose-deep)',
            borderRadius: '50%',
          }}
        />
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          color: 'var(--text-mid)',
          fontSize: '1.05rem',
        }}>
          Cargando recuerdos con amor… 🌸
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* ── Navbar ── */}
      <Navbar
        onMusicToggle={data.settings.musicEnabled ? handleMusicToggle : null}
        musicPlaying={musicPlaying}
        musicError={musicError}
      />

      {/* ── Fallback notice ── */}
      {usingFallback && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(245,223,165,0.25)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-mid)',
            maxWidth: 600,
            margin: '0.75rem auto',
            fontStyle: 'italic',
          }}
        >
          🌸 Mostrando contenido de respaldo — el servidor no está disponible.
        </motion.div>
      )}

      {/* ── Hero (full-width, no SectionWrapper) ── */}
      <Hero profile={data.profile} />

      {/* ── Timeline ── */}
      <SectionWrapper
        id="timeline"
        title="Una historia llena de amor"
        subtitle="Cada momento contigo es un tesoro"
        accent="💕"
      >
        <Timeline items={data.timeline} />
      </SectionWrapper>

      {/* ── Gallery ── */}
      <SectionWrapper
        id="gallery"
        title="Galería de momentos"
        subtitle="Fotografías que guardan toda la ternura del mundo"
        accent="🌸"
      >
        <Gallery items={data.gallery} />
      </SectionWrapper>

      {/* ── Video ── */}
      <SectionWrapper
        id="video"
        title={data.settings.videoTitle || 'La ecuación de mamá'}
        subtitle={data.settings.videoDescription || 'Hay cosas que no se pueden explicar solo con palabras…'}
        accent="✨"
      >
        <ManimVideo settings={data.settings} />
      </SectionWrapper>

      {/* ── Letter ── */}
      <SectionWrapper
        id="letter"
        title={data.letter.title || 'Carta'}
        subtitle={data.letter.intro || 'Para la mujer que pintó mi mundo de colores'}
        accent="💌"
      >
        <InteractiveLetter letter={data.letter} />
      </SectionWrapper>

      {/* ── Final celebration ── */}
      <SectionWrapper
        id="final"
        title={data.settings.finalTitle || 'Gracias por ser mi mamá'}
        accent="🎉"
      >
        <FinalMessage settings={data.settings} />
      </SectionWrapper>

      {/* ── Footer ── */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: 'var(--text-light)',
        fontSize: '0.85rem',
      }}>
        Hecho con todo el amor del mundo para mamá 💕
      </footer>

      {/* ── Music Toggle (fixed overlay) ── */}
      {data.settings.musicEnabled && (
        <MusicToggle
          ref={musicRef}
          settings={data.settings}
        />
      )}
    </div>
  );
}
