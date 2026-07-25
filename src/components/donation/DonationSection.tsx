'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Heart, Sparkles, Utensils, Flame, Wrench, Flower2, Lightbulb, Landmark, PhoneCall } from 'lucide-react';

interface PurposeOption {
  key: string;
  icon: React.ReactNode;
}

const sacredSevas: PurposeOption[] = [
  { key: 'annadhanam', icon: <Utensils size={22} /> },
  { key: 'pooja', icon: <Flame size={22} /> },
  { key: 'renovation', icon: <Wrench size={22} /> },
  { key: 'flowers', icon: <Flower2 size={22} /> },
  { key: 'deepam', icon: <Lightbulb size={22} /> },
  { key: 'general', icon: <Landmark size={22} /> },
];

export default function DonationSection() {
  const { t, td, temple } = useLanguage();

  return (
    <section id="donation" className="relative section-padding bg-radial-gold w-full flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">Divine Sevas & Temple Offerings</span>
          </h2>
          <p className="text-center text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Support sacred daily poojas, Sukra Hora Thirumanjanam, and Annadhanam at Arasar Kovil.
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Sacred Sevas Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full max-w-5xl mb-12">
          {sacredSevas.map((p) => (
            <div
              key={p.key}
              className="liquid-glass p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-amber-500/20"
            >
              <div
                className="w-12 h-14 rounded-xl flex items-center justify-center mb-3 text-amber-300"
                style={{ background: 'rgba(229,184,58,0.15)' }}
              >
                {p.icon}
              </div>
              <span
                className="text-xs font-bold leading-tight text-amber-200"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {t(`donation.purposes.${p.key}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Sacred Offering Information Banner (No Payment/QR System) */}
        <motion.div
          className="liquid-glass-modal p-8 sm:p-12 text-center max-w-2xl w-full mx-auto shadow-2xl border border-amber-400/40 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="text-4xl mb-4 glow-text text-center text-amber-300">ॐ</div>

          <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            In-Person & Priest Directed Offerings
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto mb-8 leading-relaxed">
            All sacred poojas, flower offerings, oil lamps (*deepam*), and *Annadhanam* contributions are accepted directly at the temple sanctum. Please contact the presiding temple priest before your visit.
          </p>

          <a
            href="tel:+919698510956"
            className="btn-gold py-3.5 px-8 text-center flex items-center justify-center gap-2.5 shadow-xl text-sm font-bold"
          >
            <PhoneCall size={18} />
            <span>Contact Priest Kannan Bhattacharyar (+91 96985 10956)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
