'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { gsap } from '@/lib/gsapConfig';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  { src: '/images/temple-gopuram.png', label: { en: 'Authentic Restored Vimana Shrines', ta: 'புனரமைக்கப்பட்ட திருப்பணி கோவில்கள்' }, category: 'architecture' },
  { src: '/images/temple-ancient.png', label: { en: 'Pre-Restoration Chola Stone Sanctum', ta: 'பண்டைய சோழ கல்வெட்டு கோவில்' }, category: 'architecture' },
  { src: '/images/goddess-lakshmi.png', label: { en: 'Goddess Sundara Mahalakshmi (6-Toes)', ta: 'சுந்தர மகாலட்சுமி (6 விரல்கள்)' }, category: 'deity' },
  { src: '/images/deity-vishnu.png', label: { en: 'Lord Kamala Varadharajar', ta: 'கமல வரதராஜர் பெருமாள்' }, category: 'deity' },
  { src: '/images/temple-entrance.png', label: { en: 'Temple Sanctum Entrance', ta: 'கோவில் நுழைவாயில்' }, category: 'architecture' },
  { src: '/images/oil-lamps.png', label: { en: 'Sacred Oil Lamps (Deepam)', ta: 'புனித எண்ணெய் விளக்குகள்' }, category: 'atmosphere' },
  { src: '/images/temple-bells.png', label: { en: 'Traditional Brass Temple Bells', ta: 'கோவில் பித்தளை மணிகள்' }, category: 'architecture' },
  { src: '/images/flowers-offering.png', label: { en: 'Fresh Lotus Flower Offerings', ta: 'தாமரை மலர் காணிக்கை' }, category: 'atmosphere' },
  { src: '/images/temple-festival.png', label: { en: 'Grand Temple Festival', ta: 'கோவில் பெருவிழா' }, category: 'festival' },
  { src: '/images/temple-evening.png', label: { en: 'Twilight Evening Lighting', ta: 'மாலை நேர தீப ஒளி' }, category: 'atmosphere' },
  { src: '/images/musical-pillars.png', label: { en: 'Ancient Musical Stone Pillars', ta: 'இசை கல் தூண்கள்' }, category: 'architecture' },
  { src: '/images/incense-smoke.png', label: { en: 'Volumetric Incense Smoke', ta: 'புனித தூப புகை' }, category: 'atmosphere' },
];

export default function GallerySection() {
  const { t, td } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: (i % 3) * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative section-padding bg-radial-gold w-full flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('gallery.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            {t('gallery.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Responsive Centered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto justify-center justify-items-center">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              className="gallery-item relative w-full aspect-[4/5] rounded-2xl overflow-hidden glass-card group cursor-pointer border border-amber-500/20 shadow-xl"
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedImage(i)}
            >
              <Image
                src={img.src}
                alt={img.label.en}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 100%)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-3">
                  <ZoomIn size={24} className="text-amber-300 animate-pulse-gold" />
                </div>
                <span
                  className="text-base font-semibold text-center text-amber-200"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {td(img.label)}
                </span>
                <span className="text-xs text-amber-400/80 mt-1 uppercase tracking-widest font-medium">
                  {img.category}
                </span>
              </div>

              {/* Bottom gradient caption */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-center transition-opacity duration-300 group-hover:opacity-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 100%)',
                }}
              >
                <span className="text-xs font-semibold tracking-wide text-amber-100/90 text-center block">
                  {td(img.label)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
            />
            <motion.div
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].label.en}
                  fill
                  className="object-contain"
                  quality={95}
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-amber-200" style={{ fontFamily: 'var(--font-display)' }}>
                  {td(galleryImages[selectedImage].label)}
                </h3>
              </div>

              <button
                className="absolute -top-12 right-0 w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:text-amber-400 cursor-pointer"
                onClick={() => setSelectedImage(null)}
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
