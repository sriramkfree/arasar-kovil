'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Play, ExternalLink, Youtube } from 'lucide-react';
import Image from 'next/image';

export default function VideoSection() {
  const { t, td, temple } = useLanguage();
  const rawUrl = temple.video.youtubeUrl || 'https://youtu.be/2Tc6Y8otMJ0';

  // Extract YouTube video ID cleanly
  const getYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/
    );
    return match ? match[1] : '2Tc6Y8otMJ0';
  };

  const videoId = getYouTubeId(rawUrl);
  const directYoutubeLink = rawUrl.startsWith('http') ? rawUrl : `https://youtu.be/${rawUrl}`;

  return (
    <section
      id="video"
      className="relative section-padding"
      style={{ background: 'var(--bg-elevated)' }}
    >
      <div className="absolute inset-0 bg-mesh" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('video.title')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('video.subtitle')}</p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30"
          style={{
            boxShadow: '0 0 80px rgba(212,168,71,0.15), 0 20px 60px rgba(0,0,0,0.8)',
          }}
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
              title={td(temple.video.title)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Direct Watch Button & Description */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            {td(temple.video.description)}
          </p>

          <a
            href={directYoutubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-amber-200 bg-amber-500/15 border border-amber-400/40 hover:bg-amber-500/30 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <Youtube size={18} className="text-red-500" />
            <span>Watch Directly on YouTube</span>
            <ExternalLink size={14} className="text-amber-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
