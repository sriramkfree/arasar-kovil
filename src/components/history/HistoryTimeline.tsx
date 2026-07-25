'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from '@/lib/gsapConfig';

export default function HistoryTimeline() {
  const { t, td, temple } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the timeline line drawing
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      );

      // Animate each milestone
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Animate the dots
      gsap.utils.toArray<HTMLElement>('.timeline-dot').forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="history"
      className="relative section-padding w-full flex flex-col items-center"
      style={{ background: 'var(--bg-elevated)' }}
    >
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('history.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            {t('history.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Intro Legend Card */}
        <motion.div
          className="glass-card p-8 md:p-10 mb-16 text-center max-w-3xl mx-auto shadow-xl border border-amber-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="text-3xl mb-3 glow-text text-amber-300">ॐ</div>
          <p className="text-sm md:text-base leading-relaxed text-amber-100/90 font-light text-center">
            {td(temple.history.intro)}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="timeline-container relative w-full max-w-4xl mx-auto">
          {/* Central line */}
          <div
            className="timeline-line absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] origin-top"
            style={{
              background: 'linear-gradient(to bottom, var(--gold-300), var(--gold-600), transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16 w-full">
            {temple.history.timeline.map((item, i) => (
              <div
                key={i}
                className={`timeline-item relative flex items-center gap-6 md:gap-0 w-full ${
                  i % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Box */}
                <div className="flex-1 w-full text-center flex flex-col items-center justify-center">
                  <div className="glass-card p-6 md:p-8 rounded-2xl border border-amber-500/20 text-center flex flex-col items-center justify-center w-full max-w-lg mx-auto">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 text-amber-300 bg-amber-500/15 border border-amber-400/30 text-center">
                      {td(item.period)}
                    </span>
                    <h3
                      className="text-lg md:text-xl font-bold mb-3 text-amber-100 text-center w-full"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {td(item.era)}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-300 text-center w-full">
                      {td(item.description)}
                    </p>
                  </div>
                </div>

                {/* Central Glowing Dot */}
                <div
                  className="timeline-dot absolute left-6 md:left-1/2 w-5 h-5 rounded-full -translate-x-1/2 mt-0 z-10"
                  style={{
                    background: 'var(--gold-300)',
                    boxShadow: '0 0 15px rgba(212,168,71,0.8), 0 0 30px rgba(212,168,71,0.4)',
                    border: '2px solid #0A0A0F',
                  }}
                />

                {/* Desktop Spacer for Opposing Side */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
