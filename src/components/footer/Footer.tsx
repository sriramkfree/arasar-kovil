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
    { label: t('nav.donate'), href: '#donation' },
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
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Temple Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl" style={{ color: 'var(--gold-300)' }}>ॐ</span>
              <h3
                className="text-base font-semibold"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                Arasar Kovil
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {td(temple.temple.subtitle)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
            >
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
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

          {/* Visiting Hours */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
            >
              {t('footer.visitingHours')}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-muted)' }}>{t('about.morning')}</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {temple.timings.morning.open} — {temple.timings.morning.close}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-muted)' }}>{t('about.evening')}</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {temple.timings.evening.open} — {temple.timings.evening.close}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h4
                className="text-sm font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
              >
                {t('footer.contactUs')}
              </h4>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {temple.contact.priests[0]?.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="max-w-6xl mx-auto mt-12 pt-6 border-t text-center"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          <p className="text-xs flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
            © {year} {t('footer.copyright')} Made with{' '}
            <Heart size={10} fill="currentColor" style={{ color: 'var(--saffron)' }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
