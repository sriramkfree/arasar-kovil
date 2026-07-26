'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Phone, MessageCircle, Mail, MapPin, Navigation, Map } from 'lucide-react';

export default function ContactSection() {
  const { t, td, temple } = useLanguage();

  const contactCards = [
    ...temple.contact.priests.map((priest) => ({
      icon: <Phone size={20} />,
      title: td(priest.name),
      subtitle: td(priest.role),
      value: priest.phone,
      href: `tel:${priest.phone.replace(/\s/g, '')}`,
      color: 'var(--gold-300)',
    })),
    {
      icon: <MessageCircle size={20} />,
      title: t('contact.whatsapp'),
      subtitle: '',
      value: temple.contact.whatsapp,
      href: `https://wa.me/${temple.contact.whatsapp.replace(/[\s+]/g, '')}`,
      color: '#25D366',
    },
    {
      icon: <Mail size={20} />,
      title: t('contact.email'),
      subtitle: '',
      value: temple.contact.email,
      href: `mailto:${temple.contact.email}`,
      color: 'var(--gold-300)',
    },
  ];

  return (
    <section
      id="contact"
      className="relative section-padding"
      style={{ background: 'var(--bg-elevated)' }}
    >
      <div className="absolute inset-0 bg-mesh" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-display text-3xl md:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="heading-accent">{t('contact.title')}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('contact.subtitle')}</p>
          <div className="section-divider mt-6 mx-auto" />
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto gap-6 mb-12 justify-center w-full">
          {contactCards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="glass-card p-6 block text-center flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${card.color}15`,
                  color: card.color,
                }}
              >
                {card.icon}
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>
                  {card.subtitle}
                </p>
              )}
              <p className="text-base font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {card.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Address + Map */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Address Card */}
          <motion.div
            className="glass-card p-8 flex flex-col items-center text-center justify-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-3 mb-6">
              <MapPin size={24} style={{ color: 'var(--gold-300)' }} />
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
              >
                {t('contact.address')}
              </h3>
            </div>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              {td(temple.contact.address)}
            </p>

            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                {t('contact.distanceTitle')}
              </p>
              <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
                {td(temple.location.distance)}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                {t('contact.nearbyTitle')}
              </p>
              <ul className="space-y-2 flex flex-col items-center">
                {temple.location.nearbyAttractions.map((place, i) => (
                  <li key={i} className="text-base flex items-center justify-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <Map size={14} style={{ color: 'var(--gold-300)' }} />
                    {td(place)}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={temple.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex"
            >
              <Navigation size={16} />
              {t('contact.getDirections')}
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            className="glass-card overflow-hidden"
            style={{ minHeight: '400px' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5!2d79.95!3d12.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f40b77a3ce91%3A0x6d77e3a5bb97d9b1!2sArasar%20Koil!5e0!3m2!1sen!2sin!4v1690000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Arasar Kovil Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
