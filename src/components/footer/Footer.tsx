'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Heart } from 'lucide-react';

export default function Footer() {
  const { t, td, temple } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.history'), href: '#history' },
    { label: t('nav.gallery'), href: '#gallery' },
    { label: t('nav.contact'), href: '#contact' },
    { label: t('nav.reviews'), href: '#reviews' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative" style={{ background: 'var(--bg-deep)' }}>
      {/* Blessing Banner */}
      <motion.div
        className="relative py-16 md:py-24 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-radial-gold opacity-50" />
        <div className="absolute inset-0 bg-mesh" />

        <motion.div
          className="relative max-w-3xl mx-auto px-6"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="text-5xl mb-6 glow-text animate-pulse-gold" style={{ color: 'var(--gold-300)' }}>
            ॐ
          </div>
          <p
            className="text-base md:text-lg leading-relaxed italic"
            style={{ color: 'var(--gold-100)', fontFamily: 'var(--font-display)' }}
          >
            {td(temple.blessing)}
          </p>
        </motion.div>

        {/* Floating petals */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="petal petal-1" />
          <div className="petal petal-2" />
          <div className="petal petal-3" />
          <div className="petal petal-4" />
          <div className="petal petal-5" />
        </div>
      </motion.div>

      {/* Footer Content */}
      <div
        className="border-t px-6 py-12"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-10">
          {/* Temple Info */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl" style={{ color: 'var(--gold-300)' }}>ॐ</span>
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                Arasar Kovil
              </h3>
            </div>
            <p className="text-base leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              {td(temple.temple.subtitle)}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3
              className="text-base font-bold uppercase tracking-wider mb-5 text-gradient-gold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3 flex flex-col items-center">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="text-sm transition-colors hover:opacity-100"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-300)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center text-center">
            <h4
              className="text-base font-bold uppercase tracking-wider mb-2 text-gradient-gold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('footer.contactUs')}
            </h4>
            <p className="text-base font-semibold" style={{ color: 'var(--text-muted)' }}>
              {temple.contact.priests[0]?.phone}
            </p>
          </div>

          {/* Legal / Bottom */}
          <div className="flex flex-col items-center mt-6 pt-6 border-t border-white/10 w-full max-w-lg mx-auto text-center">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              © {year} Arasar Kovil. {t('footer.allRightsReserved')}
            </p>
            <p className="text-xs mt-2 flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
              Made with <Heart size={12} className="text-red-500 animate-pulse" /> for Goddess Mahalakshmi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
