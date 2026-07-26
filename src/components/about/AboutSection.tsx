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
  title: { en: string; ta: string };
  subtitle: { en: string; ta: string };
  image: string;
  history: { en: string[]; ta: string[] };
  significance: { en: string; ta: string };
  bestTime: { en: string; ta: string };
  badge: { en: string; ta: string };
}

const deityHistories: Record<string, DetailedDeityInfo> = {
  'Sundara Mahalakshmi': {
    title: { en: 'Goddess Sundara Mahalakshmi', ta: 'சுந்தர மகாலட்சுமி தாயார்' },
    subtitle: { en: 'The Sacred Six-Toed Divine Sovereign of Shukra (Venus)', ta: 'ஆறு விரல்கள் கொண்ட சுக்கிர அதிபதி' },
    image: '/images/goddess-lakshmi.png',
    badge: { en: 'Unique 6-Toed Idol in the World', ta: 'உலகின் ஒரே 6 விரல் சிலை' },
    history: {
      en: [
        'Goddess Sundara Mahalakshmi at Arasar Kovil is world-renowned for her divine idol featuring SIX SACRED TOES on her right foot.',
        'In Vedic astrology (Jyotisha), the number SIX corresponds directly to Shukra (the planet Venus), which governs wealth, prosperity, vehicle ownership, artistic brilliance, and marital bliss.',
        'Because the Goddess possesses six toes, she is venerated as the Supreme Sovereign over Shukra. Lord Shukra himself visits this shrine every Friday during Sukra Hora (6:00 AM – 7:00 AM) to perform thirumanjanam and worship.',
        'She is celebrated as the primordial Moola Rupa (root source) from which all 64 forms of Goddess Lakshmi originate.'
      ],
      ta: [
        'அரசர் கோவிலில் எழுந்தருளியுள்ள சுந்தர மகாலட்சுமி தாயார் தனது வலது பாதத்தில் ஆறு புனித விரல்களைக் கொண்ட சிலையாக உலகப் புகழ்பெற்றவர்.',
        'வேத ஜோதிடத்தில், ஆறு என்ற எண் சுக்கிரன் (வெள்ளி கிரகத்துடன்) நேரடியாகத் தொடர்புடையது. இது செல்வம், ஆடை, ஆபரணம், வாகனம், கலைத் திறன் மற்றும் குடும்ப மகிழ்ச்சியைக் குறிக்கிறது.',
        'தேவி ஆறு விரல்களைக் கொண்டுள்ளதால், அவள் சுக்கிரனின் உன்னத அதிபதியாகக் கருதப்படுகிறாள். ஒவ்வொரு வெள்ளிக்கிழமையும் சுக்கிர ஹோரா நேரத்தில் (காலை 6:00 - 7:00) சுக்கிர பகவானே நேரில் வந்து தாயாருக்கு திருமஞ்சனம் செய்து வழிபடுகிறார்.',
        'லட்சுமி தேவியின் 64 வடிவங்களின் மூல ரூபமாக சுந்தர மகாலட்சுமி திகழ்கிறாள்.'
      ]
    },
    significance: {
      en: 'Premier Shukra Parihara Sthalam — Relief from Venus planetary afflictions, financial obstacles, and marriage delays.',
      ta: 'முதன்மை சுக்கிர பரிகார ஸ்தலம் — சுக்கிர தோஷங்கள், நிதித் தடைகள் மற்றும் திருமண தாமதங்கள் நிவர்த்தியாகும்.'
    },
    bestTime: {
      en: 'Fridays during Sukra Hora (6:00 AM — 7:00 AM)',
      ta: 'வெள்ளிக்கிழமை சுக்கிர ஹோரா நேரம் (காலை 6:00 — 7:00)'
    }
  },
  'Kamala Varadharajar Perumal': {
    title: { en: 'Lord Kamala Varadharajar Perumal', ta: 'கமல வரதராஜர் பெருமாள்' },
    subtitle: { en: 'The Presiding Deity Holding the Divine Lotus', ta: 'தாமரை ஏந்திய முதன்மை வரதராஜர்' },
    image: '/images/deity-vishnu.png',
    badge: { en: 'Ancient Chola Puranic Temple', ta: 'பண்டைய சோழ புராண கோவில்' },
    history: {
      en: [
        'Lord Kamala Varadharajar is the main presiding deity of Arasar Kovil, standing gracefully holding a divine pink lotus (Kamala) in his right hand.',
        'The legend pre-dates the famous Kanchipuram Varadaraja Perumal Temple. King Janaka (father of Goddess Sita) performed daily Vishnu worship at this spot on the banks of the Palar River.',
        'When King Janaka was once delayed due to royal duties, Lord Vishnu himself took the form of King Janaka and performed the daily pujas so the ritual continuity was never broken.',
        'Realizing the supreme grace of the Lord, King Janaka commissioned Vishwakarma (architect of the gods) to build this temple, naming it Arasar Kovil (The King’s Temple).'
      ],
      ta: [
        'கமல வரதராஜர் அரசர் கோவிலின் முதன்மை வரதராஜப் பெருமாளாவார். இவர் தனது திருக்கரத்தில் புனித தாமரை மலரை (கமலம்) ஏந்தி நிற்கும் அழகிய கோலத்தில் அருள்பாலிக்கிறார்.',
        'இந்த கோவில் காஞ்சிபுரம் வரதராஜ பெருமாள் கோவிலை விட பழமையானதாகக் கருதப்படுகிறது. ஜனக மகாராஜா பாலாற்றின் கரையில் தினமும் விஷ்ணுவை வழிபாட்டார்.',
        'ஒருமுறை அரச பணிகளால் ஜனக மகாராஜா தாமதமான போது, விஷ்ணு பகவானே ஜனகரின் வடிவில் வந்து தினசரி பூஜைகளைச் செய்து முடித்தார்.',
        'பகவானின் பெருங்கருணையை உணர்ந்த ஜனக மகாராஜா, தேவர்களின் சிற்பியான விஸ்வகர்மாவைக் கொண்டு இந்த கோவிலைக் கட்டி "அரசர் கோவில்" என்று பெயரிட்டார்.'
      ]
    },
    significance: {
      en: 'Grants boons of wisdom, protection, and liberation. It is tradition to worship Sundara Mahalakshmi first before entering Perumal’s sanctum.',
      ta: 'ஞானம், பாதுகாப்பு மற்றும் முக்தி வழங்கி வரங்களை அருள்கிறார். பெருமாள் சன்னதிக்கு செல்லும் முன் முதலில் சுந்தர மகாலட்சுமியை வழிபடுவது மரபாகும்.'
    },
    bestTime: {
      en: 'Saturdays, Ekadashi, and Chitra Pournami',
      ta: 'சனிக்கிழமை, ஏகாதசி மற்றும் சித்ரா பௌர்ணமி'
    }
  },
  'Akshaya Ganapathi': {
    title: { en: 'Akshaya Ganapathi', ta: 'அக்ஷய கணபதி' },
    subtitle: { en: 'The Lord of Inexhaustible Abundance', ta: 'முடிவில்லா செல்வத்தின் அதிபதி' },
    image: '/images/temple-entrance.png',
    badge: { en: 'Akshaya Patra Blessing Shrine', ta: 'அக்ஷய பாத்திர அருள் ஸ்தலம்' },
    history: {
      en: [
        'Akshaya Ganapathi is enshrined near the entrance mandapam of Arasar Kovil.',
        'According to temple lore, Lord Ganesha bestowed the sacred Akshaya Patra — the divine vessel of inexhaustible food and prosperity — upon Lord Hanuman at this very site.',
        'Worshipping Akshaya Ganapathi before starting any new business or spiritual endeavor guarantees zero obstacles and continuous abundance.'
      ],
      ta: [
        'அரசர் கோவிலின் நுழைவு மண்டபத்தின் அருகில் அக்ஷய கணபதி எழுந்தருளியுள்ளார்.',
        'கோவில் புராணத்தின் படி, கணபதி பகவான் அனுமனுக்கு முடிவில்லா உணவு மற்றும் செழிப்பின் பாத்திரமான "அக்ஷய பாத்திரத்தை" இந்த இடத்தில் தான் வழங்கினார்.',
        'புதிய தொழில் அல்லது காரியங்களைத் தொடங்கும் முன் அக்ஷய கணபதியை வழிபட்டால் தடைகள் நீங்கி தொடர் செழிப்பு உண்டாகும்.'
      ]
    },
    significance: {
      en: 'Remover of obstacles and granter of eternal prosperity on Akshaya Tritiya.',
      ta: 'தடைகளை நீக்கி அக்ஷய திருதியை நாளில் நிரந்தர செழிப்பை அருள்பவர்.'
    },
    bestTime: {
      en: 'Sankatahara Chaturthi & Akshaya Tritiya',
      ta: 'சங்கடஹர சதுர்த்தி & அக்ஷய திருதியை'
    }
  }
};

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
    const paragraphs = lang === 'ta' ? selectedDeity.history.ta : selectedDeity.history.en;
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
            className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="heading-accent">{t('about.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            {t('about.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Main Temple Description */}
        <motion.p
          className="text-base sm:text-lg text-center max-w-3xl mx-auto mb-20 leading-relaxed font-light text-amber-100/90"
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
            <div key={i} className="about-card liquid-glass p-10 text-center flex flex-col items-center justify-center">
              <div
                className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center shadow-lg border border-amber-400/40 text-amber-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(229,184,58,0.25), rgba(229,184,58,0.05))',
                }}
              >
                {iconMap[feature.icon] || <Star size={28} />}
              </div>
              <h3
                className="text-lg font-bold mb-3 text-center text-gradient-gold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {td(feature.title)}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-center text-gray-300">
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
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-100 drop-shadow-md" style={{ fontFamily: 'var(--font-display)' }}>
                    {td(selectedDeity.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1">
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
                    {(lang === 'ta' ? selectedDeity.history.ta : selectedDeity.history.en).map((paragraph, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-200 leading-relaxed flex items-start gap-2.5">
                        <span className="text-amber-400 font-bold mt-1 text-base">❖</span>
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
