'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/i18n/LanguageContext';
import { Sparkles, Camera } from 'lucide-react';

const images = [
  {
    src: '/images/hero-temple.png',
    title: { en: 'The Majestic Gopuram', ta: 'கம்பீரமான கோபுரம்' },
    subtitle: { en: 'Standing tall as a beacon of devotion', ta: 'பக்தியின் அடையாளமாக உயர்ந்து நிற்கிறது' },
  },
  {
    src: '/images/temple-ancient.png',
    title: { en: 'Ancient Glory', ta: 'பண்டைய பெருமை' },
    subtitle: { en: 'Historical architecture frozen in time', ta: 'காலத்தால் உறைந்த வரலாற்று கட்டிடக்கலை' },
  },
  {
    src: '/images/temple-renovated.png',
    title: { en: 'Renovated Splendor', ta: 'புதுப்பிக்கப்பட்ட சிறப்பு' },
    subtitle: { en: 'Preserving the heritage for future generations', ta: 'எதிர்கால சந்ததியினருக்காக பாரம்பரியத்தை பாதுகாத்தல்' },
  },
  {
    src: '/images/temple-entrance.png',
    title: { en: 'The Sacred Entrance', ta: 'புனித நுழைவாயில்' },
    subtitle: { en: 'Gateway to divine blessings and peace', ta: 'தெய்வீக ஆசீர்வாதங்கள் மற்றும் அமைதிக்கான நுழைவாயில்' },
  }
];

export default function Gallery3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-1000">
        
        {/* Background ambient glow */}
        <div className="absolute inset-0 bg-radial-gold opacity-30" />
        <div className="absolute top-10 left-0 right-0 text-center z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-extrabold text-amber-300 bg-amber-500/15 border border-amber-400/40 backdrop-blur-md mt-10"
          >
            <Camera size={14} />
            <span>{lang === 'ta' ? 'அதிகாரப்பூர்வ காட்சிப் பயணம்' : 'Official Visual Journey'}</span>
            <Sparkles size={14} />
          </motion.div>
        </div>

        {images.map((img, i) => {
          // Calculate individual image scroll ranges based on index
          const start = i * 0.25;
          const end = start + 0.25;
          
          const opacity = useTransform(scrollYProgress, 
            [start, start + 0.05, end - 0.05, end], 
            [0, 1, 1, 0]
          );
          
          const scale = useTransform(scrollYProgress,
            [start, end],
            [0.8, 1.2]
          );
          
          const zIndex = images.length - i;

          return (
            <motion.div
              key={i}
              className="absolute inset-0 flex items-center justify-center p-4 sm:p-10"
              style={{ opacity, scale, zIndex }}
            >
              <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] group">
                <Image
                  src={img.src}
                  alt={img.title.en}
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-left">
                  <motion.h3 
                    className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-amber-200 mb-2 drop-shadow-2xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {lang === 'ta' ? img.title.ta : img.title.en}
                  </motion.h3>
                  <motion.p 
                    className="text-sm sm:text-lg text-gray-200 font-medium max-w-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {lang === 'ta' ? img.subtitle.ta : img.subtitle.en}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
