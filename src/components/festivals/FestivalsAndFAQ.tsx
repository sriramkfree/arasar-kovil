'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Calendar, ChevronDown, Flame } from 'lucide-react';

export default function FestivalsAndFAQ() {
  const { t, td, temple } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="relative section-padding" style={{ background: 'var(--bg-elevated)' }}>
      <div className="absolute inset-0 bg-mesh" />

      <div className="relative max-w-5xl mx-auto">
        {/* Festivals Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('festivals.title')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('festivals.subtitle')}</p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {temple.festivals.map((festival, i) => (
            <motion.div
              key={i}
              className="glass-card p-6 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,107,53,0.1)',
                  color: 'var(--saffron)',
                }}
              >
                <Flame size={20} />
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-1"
                  style={{ color: 'var(--gold-100)', fontFamily: 'var(--font-display)' }}
                >
                  {td(festival.name)}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {td(festival.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Poojas Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-2xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('poojas.title')}</span>
          </h2>
          <div className="section-divider mt-4 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Daily Poojas */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-base font-semibold mb-4 flex items-center gap-2"
              style={{ color: 'var(--gold-100)', fontFamily: 'var(--font-display)' }}
            >
              <Calendar size={18} style={{ color: 'var(--gold-300)' }} />
              {t('poojas.daily')}
            </h3>
            <div className="space-y-3">
              {temple.poojas.daily.map((pooja, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {td(pooja.name)}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--gold-100)' }}>
                    {pooja.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Special Poojas */}
          <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-base font-semibold mb-4 flex items-center gap-2"
              style={{ color: 'var(--gold-100)', fontFamily: 'var(--font-display)' }}
            >
              <Flame size={18} style={{ color: 'var(--saffron)' }} />
              {t('poojas.special')}
            </h3>
            <div className="space-y-3">
              {temple.poojas.special.map((pooja, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {td(pooja.name)}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--gold-100)' }}>
                    {typeof pooja.time === 'string' ? pooja.time : td(pooja.time)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Temple Tradition */}
        <motion.div
          className="glass-card p-6 mb-20 text-center max-w-2xl mx-auto glow-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--gold-300)' }}>
            {t('poojas.tradition')}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {td(temple.poojas.tradition)}
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-2xl md:text-4xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('faq.title')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('faq.subtitle')}</p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {temple.faq.map((item, i) => (
            <motion.div
              key={i}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span
                  className="text-sm font-medium pr-4"
                  style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  {td(item.q)}
                </span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} style={{ color: 'var(--gold-300)' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {td(item.a)}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
