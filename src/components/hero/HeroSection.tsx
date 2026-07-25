'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function HeroSection() {
  const { t, td, temple } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fogOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Golden light rays effect
      gsap.fromTo(
        '.hero-light-ray',
        { opacity: 0, scaleY: 0 },
        {
          opacity: 0.3,
          scaleY: 1,
          duration: 2,
          delay: 0.5,
          ease: 'power2.out',
          stagger: 0.2,
        }
      );

      // Title animation
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-tagline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.4, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[120vh] overflow-hidden"
      id="hero"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
      >
        <Image
          src="/images/hero-temple.png"
          alt="Arasar Kovil Sacred Gopuram Temple emerging from golden fog"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={95}
        />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.1) 30%, rgba(6,6,8,0.6) 70%, rgba(10,10,15,1) 100%)',
        }}
      />

      {/* Fog overlay */}
      <motion.div
        ref={fogRef}
        className="absolute inset-0"
        style={{
          opacity: fogOpacity,
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(212,168,71,0.15) 0%, rgba(10,10,15,0.8) 60%)',
        }}
      />

      {/* Golden light rays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="hero-light-ray absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: '0',
              width: '2px',
              height: '100%',
              background: `linear-gradient(to bottom, rgba(212,168,71,${0.1 + i * 0.02}), transparent 70%)`,
              transform: `rotate(${-5 + i * 2.5}deg)`,
              transformOrigin: 'top center',
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Floating petals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="petal petal-1" />
        <div className="petal petal-2" />
        <div className="petal petal-3" />
        <div className="petal petal-4" />
        <div className="petal petal-5" />
      </div>

      {/* Main content */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 z-20 pointer-events-none">
        <motion.div
          ref={contentRef}
          className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pointer-events-auto"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Om Symbol */}
          <motion.div
            className="hero-title mb-6 flex justify-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <span
              className="text-5xl md:text-6xl glow-text text-center"
              style={{ color: 'var(--gold-300)' }}
            >
              ॐ
            </span>
          </motion.div>

          {/* Temple Name */}
          <h1 className="hero-title heading-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl w-full max-w-3xl mx-auto mb-4 text-center leading-tight flex flex-col items-center justify-center break-words">
            <span className="heading-accent text-center block w-full">{td(temple.temple.name)}</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-subtitle text-base sm:text-xl lg:text-2xl mb-6 text-center max-w-2xl mx-auto"
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
            }}
          >
            {td(temple.temple.subtitle)}
          </p>

          {/* Decorative divider */}
          <div className="hero-subtitle section-divider mb-6 mx-auto" />

          {/* Tagline */}
          <p
            className="hero-tagline text-xs sm:text-sm md:text-base max-w-xl text-center mx-auto tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            {td(temple.temple.tagline)}
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('hero.scroll')}
        </span>
        <ChevronDown size={16} style={{ color: 'var(--gold-300)' }} />
      </motion.div>
    </section>
  );
}
