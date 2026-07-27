'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from '@/lib/gsapConfig';
import { Sparkles, Music, Star, Clock, Info, Shirt, X, BookOpen, ChevronRight, Crown, Sun, ShieldCheck, Volume2, Square } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  sparkles: <Sparkles size={28} />,
  music: <Music size={28} />,
  star: <Star size={28} />,
};

interface DetailedDeityInfo {
  title: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; };
  subtitle: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; };
  image: string;
  history: { en: string[]; ta: string[]; hi?: string[]; te?: string[]; kn?: string[]; ru?: string[]; };
  significance: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; };
  bestTime: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; };
  badge: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; };
}

import deityHistoriesData from '@/data/deityHistories.json';

const deityHistories: Record<string, DetailedDeityInfo> = deityHistoriesData as Record<string, DetailedDeityInfo>;

export default function AboutSection() {
  const { t, td, temple, lang } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [selectedDeity, setSelectedDeity] = useState<DetailedDeityInfo | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [showVenusAnimation, setShowVenusAnimation] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.about-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 10 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const toggleTTS = () => {
    if (isPlayingTTS) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingTTS(false);
      return;
    }
    
    if (!selectedDeity) return;

    // Build history text
    const paragraphs = (selectedDeity.history as any)[lang] || selectedDeity.history.en;
    const historyText = paragraphs.join('. ');
    
    // Play using our new Edge TTS API
    const url = `/api/tts?lang=${lang}&text=${encodeURIComponent(historyText)}`;
    
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setIsPlayingTTS(false);
      audioRef.current.onerror = () => setIsPlayingTTS(false);
    } else {
      audioRef.current.src = url;
    }
    
    audioRef.current.play().catch(console.error);
    setIsPlayingTTS(true);
  };

  const closeModal = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayingTTS(false);
    setShowVenusAnimation(false);
    setSelectedDeity(null);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding bg-radial-gold w-full flex flex-col items-center"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="heading-display text-4xl sm:text-5xl md:text-6xl mb-4 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="heading-accent">{t('about.title')}</span>
          </h2>
          <p className="text-center text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
            {t('about.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Main Temple Description */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-center max-w-4xl mx-auto mb-20 leading-relaxed font-light text-amber-100/90"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {td(temple.temple.description)}
        </motion.p>

        {/* Unique Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 w-full justify-center">
          {temple.uniqueFeatures.map((feature, i) => (
            <div key={i} className="about-card liquid-glass rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center shadow-2xl">
              <div
                className="w-16 h-16 mb-6 rounded-[1.5rem] flex items-center justify-center shadow-lg border border-amber-400/40 text-amber-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(229,184,58,0.25), rgba(229,184,58,0.05))',
                }}
              >
                {iconMap[feature.icon] || <Star size={28} />}
              </div>
              <h3
                className="text-xl font-bold mb-4 text-center text-gradient-gold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {td(feature.title)}
              </h3>
              <p className="text-base leading-relaxed text-center text-gray-300">
                {td(feature.description)}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Clickable Deities Grid */}
        <div className="w-full mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-extrabold text-amber-300 bg-amber-500/15 border border-amber-400/40">
            <Sparkles size={14} />
            <span>Click Any Deity to Open Liquid Glass History Story</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full justify-center">
          {temple.deities.map((deity, i) => {
            const deityKey = deity.name.en.includes('Mahalakshmi')
              ? 'Sundara Mahalakshmi'
              : deity.name.en.includes('Varadharajar')
              ? 'Kamala Varadharajar Perumal'
              : 'Akshaya Ganapathi';

            return (
              <motion.div
                key={i}
                className="about-card liquid-glass overflow-hidden group flex flex-col text-center cursor-pointer border border-amber-500/30 shadow-2xl relative z-10"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDeity(deityHistories[deityKey])}
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={deity.image}
                    alt={deity.name.en}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(8,8,12,0.95) 0%, rgba(8,8,12,0.3) 50%, transparent 100%)',
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-amber-500/30 backdrop-blur-xl border border-amber-400/50 rounded-full px-3 py-1 text-[11px] font-bold text-amber-200 flex items-center gap-1.5 shadow-lg">
                    <BookOpen size={13} />
                    <span>View Lore</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col items-center text-center flex-1 justify-between">
                  <div>
                    <h3
                      className="text-xl font-bold mb-3 text-center text-gradient-gold"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {td(deity.name)}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-center text-gray-300">
                      {td(deity.description)}
                    </p>
                  </div>

                  <div className="mt-5 text-xs font-bold text-amber-400 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>Explore Sacred Story</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Visitor Guide Grid */}
        <div className="flex justify-center w-full max-w-md mx-auto">

          {/* Visitor Guide */}
          <div className="about-card liquid-glass p-10 flex flex-col items-center text-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-amber-400/30 text-amber-300"
              style={{ background: 'rgba(229,184,58,0.15)' }}
            >
              <Shirt size={24} />
            </div>
            <h3
              className="text-xl font-bold mb-4 text-center text-gradient-gold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('about.visitorsTitle')}
            </h3>
            <p className="text-xs sm:text-sm mb-6 leading-relaxed text-center text-gray-300">
              {td(temple.dressCode)}
            </p>
            <div className="w-full space-y-2.5 max-w-md text-center">
              {temple.visitorInstructions.map((instr, i) => (
                <div key={i} className="text-xs sm:text-sm flex items-center justify-center gap-2 text-center text-gray-300">
                  <span className="text-amber-400 font-bold">❖</span>
                  <span>{td(instr)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* APPLE VISION PRO LIQUID GLASS DEITY MODAL */}
      <AnimatePresence>
        {selectedDeity && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Ambient Backdrop Blur */}
            <div className="fixed inset-0 bg-black/85 backdrop-blur-3xl" />

            <motion.div
              className="relative liquid-glass-modal max-w-3xl w-full p-6 sm:p-10 my-8 shadow-2xl text-center z-10 border border-amber-400/50 flex flex-col items-center"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-5 right-5 p-3 rounded-full text-white bg-white/10 hover:bg-amber-500/20 border border-white/20 hover:border-amber-400 transition-all cursor-pointer shadow-lg"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Full Deity Portrait Showcase & Interactive Venus Animation */}
              <div 
                className={`relative w-full h-80 rounded-2xl overflow-hidden mb-6 border-2 border-amber-400/40 shadow-2xl ${selectedDeity.title.en.includes('Mahalakshmi') ? 'cursor-pointer' : ''}`}
                onClick={() => {
                  if (selectedDeity.title.en.includes('Mahalakshmi')) {
                    setShowVenusAnimation(true);
                    if (!isPlayingTTS) toggleTTS();
                  }
                }}
              >
                <Image
                  src={selectedDeity.image}
                  alt={selectedDeity.title.en}
                  fill
                  className="object-cover object-top"
                  quality={95}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />

                {/* Venus Interactive Overlay */}
                <AnimatePresence>
                  {showVenusAnimation && selectedDeity.title.en.includes('Mahalakshmi') && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center z-20 border-t border-amber-400/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVenusAnimation(false);
                      }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(245,158,11,0.6)]"
                        initial={{ scale: 0.5, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      >
                        <Sparkles className="text-amber-300" size={20} />
                      </motion.div>
                      <h4 className="text-xl font-extrabold text-amber-300 mb-2 font-display">Six Sacred Toes</h4>
                      <p className="text-xs sm:text-sm text-gray-200">
                        The ultimate symbol of Goddess Mahalakshmi's cosmic sovereignty over Shukra (Venus). Touching her sacred feet brings profound wealth, beauty, and cosmic alignment.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Venus Hint Badge (Only for Lakshmi if animation not shown) */}
                {!showVenusAnimation && selectedDeity.title.en.includes('Mahalakshmi') && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/50 pointer-events-none shadow-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                  >
                    <span className="text-[10px] uppercase font-bold text-amber-300 flex items-center gap-2">
                      Tap Image to Reveal Six-Toes Cosmic Truth <Sparkles size={12} />
                    </span>
                  </motion.div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 bg-amber-500/80 backdrop-blur-md border border-amber-300/60 rounded-full px-3.5 py-1 text-xs font-extrabold text-black shadow-lg flex items-center gap-1.5">
                  <Crown size={14} />
                  <span>{td(selectedDeity.badge)}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-3xl glow-text text-amber-300 block mb-1">ॐ</span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-amber-100 drop-shadow-md" style={{ fontFamily: 'var(--font-display)' }}>
                    {td(selectedDeity.title)}
                  </h3>
                  <p className="text-sm sm:text-base text-amber-300 font-semibold mt-1">
                    {td(selectedDeity.subtitle)}
                  </p>
                </div>
              </div>

              {/* Modal History Content */}
              <div className="space-y-5 text-left max-h-[50vh] overflow-y-auto pr-2 w-full">
                {/* Significance Card */}
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-start gap-3">
                  <ShieldCheck size={22} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-amber-300 mb-1">
                      ✦ Divine Significance
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-100 font-medium leading-relaxed">
                      {td(selectedDeity.significance)}
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-amber-400 flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>📜 Sacred Puranic History & 6-Toed Lore</span>
                    </h4>
                    <button
                      onClick={toggleTTS}
                      className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${isPlayingTTS ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-black/50 text-amber-400 border-amber-500/50 hover:bg-amber-500/20'}`}
                    >
                      {isPlayingTTS ? (
                        <>
                          <Square size={14} fill="currentColor" />
                          <span>Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={14} />
                          <span>Play Audio History</span>
                        </>
                      )}
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {((selectedDeity.history as any)[lang] || selectedDeity.history.en).map((paragraph: string, idx: number) => (
                      <li key={idx} className="text-base sm:text-lg text-gray-200 leading-relaxed flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold mt-1 text-xl">❖</span>
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Time Banner */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                    <Sun size={16} className="text-amber-400" />
                    <span>Auspicious Time for Worship:</span>
                  </span>
                  <span className="text-xs font-extrabold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                    {td(selectedDeity.bestTime)}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
