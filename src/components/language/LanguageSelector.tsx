'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';

export default function LanguageSelector() {
  const { setLang, hasChosenLanguage, t } = useLanguage();

  if (hasChosenLanguage) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center"
        style={{ background: 'var(--bg-deep)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="absolute inset-0 bg-mesh" />

        {/* Content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-8 px-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Om */}
          <div className="text-5xl glow-text" style={{ color: 'var(--gold-300)' }}>ॐ</div>

          {/* Title */}
          <div className="text-center">
            <h1
              className="heading-display text-3xl md:text-4xl mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="heading-accent">Choose Language</span>
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              மொழியைத் தேர்ந்தெடுக்கவும்
            </p>
          </div>

          {/* Language buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLang('ta')}
              className="glass-card px-10 py-6 cursor-pointer flex items-center gap-4 min-w-[220px] justify-center"
            >
              <span className="text-3xl">🇮🇳</span>
              <div className="text-left">
                <div className="font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-tamil)' }}>
                  தமிழ்
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tamil</div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLang('en')}
              className="glass-card px-10 py-6 cursor-pointer flex items-center gap-4 min-w-[220px] justify-center"
            >
              <span className="text-3xl">🇬🇧</span>
              <div className="text-left">
                <div className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  English
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>ஆங்கிலம்</div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Floating petals */}
        <div className="petal petal-1" />
        <div className="petal petal-2" />
        <div className="petal petal-3" />
      </motion.div>
    </AnimatePresence>
  );
}
