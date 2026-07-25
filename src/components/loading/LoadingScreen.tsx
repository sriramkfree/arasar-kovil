'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg-deep)' }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-radial-gold opacity-40" />

          {/* Om Symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-8"
          >
            <div className="text-7xl md:text-8xl glow-text" style={{ color: 'var(--gold-300)' }}>
              ॐ
            </div>
            <div
              className="absolute inset-0 animate-pulse-gold rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,168,71,0.2) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(2)',
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase mb-8"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)' }}
          >
            Arasar Kovil
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 200 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="relative h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(212,168,71,0.1)' }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(to right, var(--gold-500), var(--gold-300))',
                boxShadow: '0 0 10px rgba(212,168,71,0.5)',
              }}
            />
          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: 'var(--gold-300)' }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) - 500,
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) - 400,
                opacity: 0,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
