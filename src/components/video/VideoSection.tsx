'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Play } from 'lucide-react';
import Image from 'next/image';

export default function VideoSection() {
  const { t, td, temple } = useLanguage();
  const hasVideo = temple.video.youtubeUrl && temple.video.youtubeUrl.length > 0;

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = hasVideo ? getYouTubeId(temple.video.youtubeUrl) : null;

  return (
    <section
      id="video"
      className="relative section-padding"
      style={{ background: 'var(--bg-elevated)' }}
    >
      <div className="absolute inset-0 bg-mesh" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('video.title')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('video.subtitle')}</p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            boxShadow: '0 0 80px rgba(212,168,71,0.08), 0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(212,168,71,0.15)',
          }}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Cinema frame glow */}
          <div
            className="absolute -inset-[1px] rounded-2xl md:rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,71,0.2), transparent 30%, transparent 70%, rgba(212,168,71,0.2))',
            }}
          />

          {videoId ? (
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
                title={td(temple.video.title)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            /* Placeholder */
            <div
              className="relative w-full flex flex-col items-center justify-center"
              style={{ paddingTop: '56.25%' }}
            >
              <div className="absolute inset-0">
                <Image
                  src="/images/temple-evening.png"
                  alt="Video placeholder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(10,10,15,0.6), rgba(10,10,15,0.8))',
                  }}
                />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-pulse-gold"
                  style={{
                    background: 'rgba(212,168,71,0.15)',
                    border: '2px solid rgba(212,168,71,0.3)',
                  }}
                >
                  <Play size={32} fill="currentColor" style={{ color: 'var(--gold-300)' }} />
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t('video.placeholder')}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-center text-sm mt-8"
          style={{ color: 'var(--text-muted)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {td(temple.video.description)}
        </motion.p>
      </div>
    </section>
  );
}
