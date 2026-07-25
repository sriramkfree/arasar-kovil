'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Menu, X, Globe, Sparkles, Sun, Moon } from 'lucide-react';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'history', href: '#history' },
  { key: 'gallery', href: '#gallery' },
  { key: 'video', href: '#video' },
  { key: 'contact', href: '#contact' },
  { key: 'reviews', href: '#reviews' },
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 flex justify-center items-center w-full"
      >
        <div
          className={`w-full max-w-6xl mx-auto rounded-2xl px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? 'glass shadow-2xl border-amber-500/30 backdrop-blur-2xl bg-black/80'
              : 'glass-subtle bg-black/60 border-white/10'
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform">
              <span className="text-xl glow-text">ॐ</span>
            </div>
            <div className="flex flex-col text-left">
              <span
                className="text-base sm:text-lg font-bold tracking-wide leading-none"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                Arasar Kovil
              </span>
              <span className="text-[10px] text-amber-400/80 font-medium tracking-wider uppercase mt-0.5">
                Sundara Mahalakshmi
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:text-amber-400 py-2"
                style={{
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Theme Toggle (Light / Dark mode) */}
            <button
              onClick={() => {
                const nextTheme = theme === 'dark' ? 'light' : 'dark';
                setTheme(nextTheme);
                document.documentElement.setAttribute('data-theme', nextTheme);
              }}
              className="btn-glass !p-2.5 !text-xs font-bold flex items-center justify-center border-amber-500/30 bg-white/5 hover:bg-amber-500/10 active:scale-95 transition-all text-amber-300 rounded-xl"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language toggle (Tamil / English) */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="btn-glass !px-3.5 !py-2.5 !text-xs sm:!text-sm font-bold flex items-center gap-2 border-amber-500/30 bg-white/5 hover:bg-amber-500/10 active:scale-95 transition-all"
              aria-label="Change Language"
            >
              <Globe size={16} className="text-amber-400" />
              <span className="text-amber-300 font-sans">{lang === 'en' ? 'தமிழ்' : 'ENGLISH'}</span>
            </button>

            {/* Mobile menu toggle button (Larger Touch Target) */}
            <button
              className="lg:hidden p-3 rounded-xl glass text-white hover:text-amber-400 active:scale-95 transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="relative mt-24 mx-4 glass-card p-6 border-amber-500/30 shadow-2xl flex flex-col text-center"
              initial={{ y: -20, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -20, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.key}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="text-base font-semibold py-3.5 px-4 rounded-xl hover:bg-amber-500/10 hover:text-amber-400 transition-all text-center"
                    style={{
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {t(`nav.${link.key}`)}
                  </motion.a>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-amber-500/20 flex flex-col gap-3">
                <a
                  href="#donation"
                  onClick={(e) => handleClick(e, '#donation')}
                  className="btn-gold w-full py-3 text-center justify-center font-bold text-sm"
                >
                  <Sparkles size={16} />
                  <span>{t('nav.donate')}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
