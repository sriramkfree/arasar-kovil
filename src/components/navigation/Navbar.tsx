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
  const { t, lang, setHasChosenLanguage } = useLanguage();
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
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full flex items-center justify-between px-6 py-3.5 transition-all duration-300"
        style={{
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(18, 18, 26, 0.8) 0%, rgba(10, 10, 15, 0.9) 100%)'
            : 'rgba(10, 10, 15, 0.6)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          border: '1px solid rgba(229, 184, 58, 0.25)',
          boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(229, 184, 58, 0.1)' : 'none'
        }}
      >
        <div className="w-full flex items-center justify-between relative">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer relative z-10"
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

          {/* Desktop Links - Absolutely Centered */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 z-0">
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
          <div className="flex items-center gap-2.5 sm:gap-3.5 relative z-10">
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

            {/* Language toggle (Opens Selector Modal) */}
            <button
              onClick={() => setHasChosenLanguage(false)}
              className="btn-glass !px-3.5 !py-2.5 !text-xs sm:!text-sm font-bold flex items-center gap-2 border-amber-500/30 bg-white/5 hover:bg-amber-500/10 active:scale-95 transition-all"
              aria-label="Change Language"
            >
              <Globe size={16} className="text-amber-400" />
              <span className="text-amber-300 font-sans uppercase">
                {lang === 'ta' ? 'தமிழ்' : lang === 'hi' ? 'हिंदी' : lang === 'te' ? 'తెలుగు' : lang === 'kn' ? 'ಕನ್ನಡ' : lang === 'ru' ? 'Русский' : 'ENGLISH'}
              </span>
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

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
