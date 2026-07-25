'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Star, ExternalLink, PenSquare, X, CheckCircle2 } from 'lucide-react';
import { gsap } from '@/lib/gsapConfig';

interface ReviewItem {
  author: string;
  rating: number;
  text: { en: string; ta: string } | string;
  date: string;
}

function StarRating({
  rating,
  interactive = false,
  onRate,
}: {
  rating: number;
  interactive?: boolean;
  onRate?: (r: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1 items-center justify-center">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const active = (hoverRating || rating) >= starIndex;
        return (
          <button
            key={starIndex}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRate && onRate(starIndex)}
            onMouseEnter={() => interactive && setHoverRating(starIndex)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? 'cursor-pointer p-1 transition-transform hover:scale-125' : 'cursor-default'}`}
          >
            <Star
              size={interactive ? 24 : 16}
              className={active ? 'star-filled' : 'star-empty'}
              fill={active ? 'currentColor' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function ReviewsSection() {
  const { t, td, temple } = useLanguage();
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Local state for all reviews (sample + user submitted)
  const [reviewList, setReviewList] = useState<ReviewItem[]>(temple.reviews.sampleReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.reviews-track', {
        xPercent: -50,
        ease: 'none',
        duration: Math.max(25, reviewList.length * 5),
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, [reviewList]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    const newReview: ReviewItem = {
      author: formName.trim(),
      rating: formRating,
      text: formText.trim(),
      date: new Date().toISOString().split('T')[0],
    };

    setReviewList([newReview, ...reviewList]);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setFormName('');
      setFormRating(5);
      setFormText('');
    }, 2000);
  };

  const duplicated = [...reviewList, ...reviewList]; // Double for continuous loop

  return (
    <section id="reviews" className="relative section-padding bg-radial-gold overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('reviews.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            {t('reviews.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Rating Stats */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center">
            <div
              className="text-6xl font-bold mb-2 glow-text text-center"
              style={{ color: 'var(--gold-300)', fontFamily: 'var(--font-display)' }}
            >
              {temple.reviews.averageRating}
            </div>
            <StarRating rating={Math.round(temple.reviews.averageRating)} />
            <p className="text-xs sm:text-sm mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
              {t('reviews.basedOn')} {reviewList.length + 337} {t('reviews.reviewsText')}
            </p>
          </div>

          {/* Rating bars */}
          <div className="space-y-2 w-64">
            {[5, 4, 3, 2, 1].map((stars) => {
              const percentage = stars === 5 ? 75 : stars === 4 ? 17 : stars === 3 ? 5 : stars === 2 ? 2 : 1;
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs w-3" style={{ color: 'var(--text-muted)' }}>{stars}</span>
                  <Star size={10} className="star-filled" fill="currentColor" />
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--gold-300)', width: `${percentage}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + (5 - stars) * 0.1 }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: 'var(--text-muted)' }}>{percentage}%</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scrolling Reviews Marquee */}
      <div ref={marqueeRef} className="relative overflow-hidden py-4">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
        />

        <div className="reviews-track flex gap-4" style={{ width: 'fit-content' }}>
          {duplicated.map((review, i) => (
            <div
              key={i}
              className="glass-card p-6 w-[300px] sm:w-[360px] shrink-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,168,71,0.25), rgba(212,168,71,0.08))',
                        color: 'var(--gold-300)',
                        border: '1px solid rgba(212,168,71,0.3)',
                      }}
                    >
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {review.author}
                      </p>
                      <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {td(review.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write & External Review Buttons */}
      <div className="max-w-6xl mx-auto mt-12 text-center flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-gold flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <PenSquare size={16} />
          <span>{t('reviews.writeReview')}</span>
        </button>

        <a
          href={temple.reviews.googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glass flex items-center gap-2"
        >
          <ExternalLink size={16} />
          <span>Google Reviews</span>
        </a>
      </div>

      {/* Interactive Modal for Writing a Review */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="relative glass-card p-6 sm:p-8 max-w-lg w-full z-10 shadow-2xl rounded-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </button>

              <div className="text-center mb-6">
                <div className="text-3xl mb-2 glow-text" style={{ color: 'var(--gold-300)' }}>ॐ</div>
                <h3
                  className="text-xl font-semibold mb-1"
                  style={{ color: 'var(--gold-100)', fontFamily: 'var(--font-display)' }}
                >
                  {t('reviews.modalTitle')}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {t('reviews.modalSubtitle')}
                </p>
              </div>

              {submitted ? (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-3">
                  <CheckCircle2 size={48} className="text-emerald-400 animate-bounce" />
                  <p className="text-sm font-semibold text-emerald-300">
                    {t('reviews.thankYou')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-1 text-left" style={{ color: 'var(--text-secondary)' }}>
                      {t('reviews.yourName')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anantharaman S."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-2 text-center" style={{ color: 'var(--text-secondary)' }}>
                      {t('reviews.yourRating')}
                    </label>
                    <StarRating interactive rating={formRating} onRate={setFormRating} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider mb-1 text-left" style={{ color: 'var(--text-secondary)' }}>
                      {t('reviews.yourReview')}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your spiritual darshan experience..."
                      value={formText}
                      onChange={(e) => setFormText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/5 border border-amber-500/20 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-3 text-center justify-center font-semibold cursor-pointer mt-2"
                  >
                    {t('reviews.submitBtn')}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
