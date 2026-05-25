import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionWrapper({ id, title, subtitle, accent = '❋', children, noPad = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section id={id} style={{ padding: noPad ? 0 : '4rem 1rem', position: 'relative', zIndex: 1 }}>
      <motion.div
        ref={ref}
        className="section-canvas"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {title && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-title-sub">{subtitle}</p>}
            <div className="title-divider">
              <span>{accent}</span>
            </div>
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
