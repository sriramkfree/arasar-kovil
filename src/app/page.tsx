'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/i18n/LanguageContext';

// Dynamic imports for code splitting
const LoadingScreen = dynamic(() => import('@/components/loading/LoadingScreen'), { ssr: false });
const LanguageSelector = dynamic(() => import('@/components/language/LanguageSelector'), { ssr: false });
const Navbar = dynamic(() => import('@/components/navigation/Navbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/about/AboutSection'), { ssr: false });
const HistoryTimeline = dynamic(() => import('@/components/history/HistoryTimeline'), { ssr: false });
const Gallery3D = dynamic(() => import('@/components/gallery/Gallery3D'), { ssr: false });
const GallerySection = dynamic(() => import('@/components/gallery/GallerySection'), { ssr: false });
const VideoSection = dynamic(() => import('@/components/video/VideoSection'), { ssr: false });
const FestivalsAndFAQ = dynamic(() => import('@/components/festivals/FestivalsAndFAQ'), { ssr: false });
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), { ssr: false });
const ReviewsSection = dynamic(() => import('@/components/reviews/ReviewsSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/footer/Footer'), { ssr: false });

function TempleWebsite() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    let lenis: any;

    async function initLenis() {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    if (!isLoading) {
      initLenis();
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Language Selector (first visit) */}
      {!isLoading && <LanguageSelector />}

      {/* Main Content */}
      {!isLoading && (
        <main
          className="relative w-full flex flex-col items-center overflow-x-hidden text-center"
          style={{ background: 'var(--bg-primary)' }}
        >
          {/* Floating Navigation */}
          <Navbar />

          {/* Scroll Sections */}
          <HeroSection />
          <AboutSection />
          <HistoryTimeline />
          <Gallery3D />
          <GallerySection />
          <VideoSection />
          <FestivalsAndFAQ />
          <ContactSection />
          <ReviewsSection />
          <Footer />
        </main>
      )}
    </>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <TempleWebsite />
    </LanguageProvider>
  );
}
