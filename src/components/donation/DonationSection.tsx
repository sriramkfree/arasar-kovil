'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Copy, Check, Heart, Sparkles, Utensils, Flame, Wrench, Flower2, Lightbulb, Landmark, QrCode } from 'lucide-react';
import QRCode from 'qrcode';
import Image from 'next/image';

interface PurposeOption {
  key: string;
  icon: React.ReactNode;
  defaultAmount: number;
}

const purposes: PurposeOption[] = [
  { key: 'annadhanam', icon: <Utensils size={20} />, defaultAmount: 501 },
  { key: 'pooja', icon: <Flame size={20} />, defaultAmount: 1008 },
  { key: 'renovation', icon: <Wrench size={20} />, defaultAmount: 5001 },
  { key: 'flowers', icon: <Flower2 size={20} />, defaultAmount: 501 },
  { key: 'deepam', icon: <Lightbulb size={20} />, defaultAmount: 251 },
  { key: 'general', icon: <Landmark size={20} />, defaultAmount: 1008 },
];

const presetAmounts = [108, 501, 1008, 5001];

export default function DonationSection() {
  const { t, td, temple } = useLanguage();
  const [selectedPurpose, setSelectedPurpose] = useState<string>('annadhanam');
  const [selectedAmount, setSelectedAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  const amountToUse = isCustom ? (parseInt(customAmount, 10) || 0) : selectedAmount;
  const upiId = temple.donation.upiId || 'sriram28@fam';
  const purposeTitle = t(`donation.purposes.${selectedPurpose}`);
  
  // Dynamic UPI URI string for mobile payment apps (Google Pay, PhonePe, Paytm, BHIM)
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('Arasar Kovil Temple')}&tn=${encodeURIComponent(purposeTitle)}&am=${amountToUse > 0 ? amountToUse : ''}&cu=INR`;

  // Generate real QR code image whenever amount or purpose changes
  useEffect(() => {
    async function generateQR() {
      try {
        const url = await QRCode.toDataURL(upiUri, {
          width: 300,
          margin: 1,
          color: {
            dark: '#111118',
            light: '#F5F0E8',
          },
        });
        setQrCodeDataUrl(url);
      } catch (err) {
        console.error('QR Generation failed:', err);
      }
    }
    generateQR();
  }, [upiUri]);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setShowThankYou(true);
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setShowThankYou(false), 4000);
  };

  return (
    <section id="donation" className="relative section-padding bg-radial-gold w-full flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Header */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('donation.title')}</span>
          </h2>
          <p className="text-center text-sm sm:text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {t('donation.subtitle')}
          </p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* 1. Purpose Selection Grid */}
        <div className="mb-10 text-center w-full max-w-4xl">
          <h3
            className="text-xs font-bold uppercase tracking-widest mb-6 text-center text-amber-400"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('donation.selectPurpose')}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 w-full">
            {purposes.map((p) => {
              const isSelected = selectedPurpose === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => {
                    setSelectedPurpose(p.key);
                    setSelectedAmount(p.defaultAmount);
                    setIsCustom(false);
                  }}
                  className={`glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-[var(--gold-300)] scale-[1.03] bg-amber-500/15 border-amber-400' : 'hover:bg-white/5'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{
                      background: isSelected ? 'rgba(212,168,71,0.3)' : 'rgba(255,255,255,0.05)',
                      color: isSelected ? 'var(--gold-100)' : 'var(--text-secondary)',
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="text-xs font-semibold leading-snug"
                    style={{
                      color: isSelected ? 'var(--gold-100)' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {t(`donation.purposes.${p.key}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Amount Selection & Real QR Code Card */}
        <motion.div
          className="glass-card p-8 sm:p-10 md:p-12 text-center max-w-2xl w-full mx-auto shadow-2xl border border-amber-500/30 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* Om Icon */}
          <div className="text-4xl mb-4 glow-text text-center text-amber-300">ॐ</div>

          <div className="mb-6 text-center">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2 text-amber-300"
              style={{
                background: 'rgba(212,168,71,0.15)',
                border: '1px solid rgba(212,168,71,0.3)',
              }}
            >
              {purposeTitle}
            </span>
            <p className="text-xs text-center mt-1 text-gray-300 max-w-md mx-auto">
              {td(temple.donation.description)}
            </p>
          </div>

          {/* Amount Chips */}
          <div className="mb-8 w-full">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-amber-300 text-center">
              {t('donation.selectAmount')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              {presetAmounts.map((amt) => {
                const isSelected = !isCustom && selectedAmount === amt;
                return (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setIsCustom(false);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-[var(--gold-300)] text-black shadow-lg scale-105'
                        : 'glass text-[var(--text-secondary)] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    ₹{amt}
                  </button>
                );
              })}

              <button
                onClick={() => setIsCustom(true)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 ${
                  isCustom
                    ? 'bg-[var(--gold-300)] text-black shadow-lg scale-105'
                    : 'glass text-[var(--text-secondary)] hover:text-white hover:bg-white/10'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom Amount Input */}
            {isCustom && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="max-w-xs mx-auto mt-3"
              >
                <input
                  type="number"
                  placeholder={t('donation.customAmount')}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-center text-sm font-semibold bg-white/5 border border-amber-500/30 text-white focus:outline-none focus:border-amber-400"
                />
              </motion.div>
            )}
          </div>

          {/* REAL DYNAMIC QR CODE DISPLAY */}
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <motion.div
              className="p-4 rounded-2xl bg-amber-100 border-2 border-amber-400/50 shadow-2xl flex flex-col items-center justify-center relative group cursor-pointer"
              whileHover={{ scale: 1.04 }}
            >
              {qrCodeDataUrl ? (
                <Image
                  src={qrCodeDataUrl}
                  alt={`UPI QR Code for ${upiId}`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center">
                  <QrCode size={48} className="text-amber-600 animate-spin" />
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold text-gray-900 tracking-wide uppercase block">
                  Scan with PhonePe / GPay / Paytm
                </span>
                <span className="text-xs font-extrabold text-amber-800 block">
                  ₹{amountToUse > 0 ? amountToUse : 'Choice'} • {upiId}
                </span>
              </div>
            </motion.div>

            {/* UPI ID Box */}
            <div className="w-full max-w-sm">
              <p className="text-xs uppercase tracking-wider mb-2 text-center text-amber-400 font-bold">
                Official Temple UPI ID
              </p>

              <div
                className="flex items-center justify-between gap-2 py-3 px-4 rounded-xl"
                style={{
                  background: 'rgba(212,168,71,0.08)',
                  border: '1px solid rgba(212,168,71,0.3)',
                }}
              >
                <span className="text-sm font-mono font-bold truncate text-left text-amber-200">
                  {upiId}
                </span>

                <button
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                  style={{
                    background: copied ? 'rgba(16,185,129,0.25)' : 'rgba(212,168,71,0.25)',
                    color: copied ? 'var(--temple-green)' : 'var(--gold-100)',
                  }}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check size={14} /> {t('donation.copied')}
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> {t('donation.copy')}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 1-Tap Pay Button */}
            <a
              href={upiUri}
              className="btn-gold w-full max-w-sm py-3.5 text-center flex items-center justify-center gap-2 shadow-xl text-base"
            >
              <Sparkles size={18} />
              <span>{t('donation.payViaApp')} (₹{amountToUse > 0 ? amountToUse : ''})</span>
            </a>
          </div>

          {/* Thank You Notification */}
          <AnimatePresence>
            {showThankYou && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 w-full max-w-sm mx-auto"
              >
                <Heart size={18} style={{ color: 'var(--saffron)' }} fill="currentColor" />
                <span className="text-xs sm:text-sm font-bold text-amber-200">
                  {t('donation.thankYou')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
