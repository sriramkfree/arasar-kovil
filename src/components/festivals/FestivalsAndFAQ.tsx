'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { ChevronDown, Calendar } from 'lucide-react';

export default function FestivalsAndFAQ() {
  const { t, td, temple } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="festivals" className="relative section-padding bg-radial-gold w-full flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        {/* Festivals Section Header */}
        <motion.div
          className="text-center mb-12 flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4 text-center w-full" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent text-center block w-full">{t('festivals.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base w-full" style={{ color: 'var(--text-secondary)' }}>
            {t('festivals.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Festivals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 w-full justify-center justify-items-center">
          {temple.festivals.map((fest, i) => (
            <motion.div
              key={i}
              className="liquid-glass p-6 text-center flex flex-col items-center justify-between border border-amber-500/20 shadow-xl w-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex flex-col items-center justify-center text-center w-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-amber-300 mx-auto"
                  style={{ background: 'rgba(229,184,58,0.15)' }}
                >
                  <Calendar size={22} />
                </div>
                <h3
                  className="text-lg font-extrabold mb-2 text-center text-amber-200 w-full"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {td(fest.name)}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-center text-gray-300 w-full">
                  {td(fest.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section Header */}
        <motion.div
          className="text-center mb-12 flex flex-col items-center justify-center w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4 text-center w-full" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent text-center block w-full">{t('faq.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base w-full" style={{ color: 'var(--text-secondary)' }}>
            {t('faq.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* FAQ Accordion List (100% Centered) */}
        <div className="w-full max-w-4xl mx-auto space-y-4 text-center flex flex-col items-center justify-center">
          {temple.faq.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <motion.div
                key={i}
                className={`liquid-glass overflow-hidden border transition-all duration-300 w-full ${
                  isOpen ? 'border-amber-400/60 bg-amber-500/10 shadow-2xl' : 'border-white/10 hover:border-amber-500/30'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <button
                  className="w-full px-6 py-6 sm:px-8 sm:py-7 flex items-center justify-between text-center cursor-pointer gap-4"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-center gap-3 text-center w-full">
                    <span className="text-amber-400 font-extrabold text-lg shrink-0">❖</span>
                    <span
                      className="text-base sm:text-lg md:text-xl font-extrabold leading-snug text-center text-amber-100 w-full"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {td(item.q)}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 p-2 rounded-full bg-white/5 border border-white/10 text-amber-300"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden w-full"
                    >
                      <div className="px-6 pb-7 sm:px-8 sm:pb-8 pt-2 text-center border-t border-amber-500/20 w-full">
                        <p className="text-sm sm:text-base leading-relaxed text-center text-gray-200 font-normal max-w-2xl mx-auto">
                          {td(item.a)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
