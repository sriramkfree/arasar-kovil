'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './en.json';
import ta from './ta.json';
import hi from './hi.json';
import te from './te.json';
import kn from './kn.json';
import ru from './ru.json';
import templeData from '@/data/temple.json';

type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ru';

type NestedStrings = { [key: string]: string | NestedStrings };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  td: (obj: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; } | string) => string;
  hasChosenLanguage: boolean;
  setHasChosenLanguage: (v: boolean) => void;
  temple: typeof templeData;
}

const translations: Record<Language, NestedStrings> = { en, ta, hi, te, kn, ru };

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: NestedStrings, path: string): string {
  const keys = path.split('.');
  let current: NestedStrings | string = obj;
  for (const key of keys) {
    if (typeof current === 'string') return path;
    current = current[key];
    if (current === undefined) return path;
  }
  return typeof current === 'string' ? current : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [hasChosenLanguage, setHasChosenLanguage] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('arasar-kovil-lang') as Language | null;
    const hasChosen = localStorage.getItem('arasar-kovil-lang-chosen');
    if (saved) {
      setLangState(saved);
    }
    if (!hasChosen) {
      setHasChosenLanguage(false);
    }
  }, []);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('arasar-kovil-lang', newLang);
    localStorage.setItem('arasar-kovil-lang-chosen', 'true');
    setHasChosenLanguage(true);
  }, []);

  const t = useCallback((key: string): string => {
    return getNestedValue(translations[lang], key);
  }, [lang]);

  // Translate dynamic data objects that have { en, ta, ... } shape
  const td = useCallback((obj: { en: string; ta: string; hi?: string; te?: string; kn?: string; ru?: string; } | string): string => {
    if (typeof obj === 'string') return obj;
    return (obj as any)[lang] || obj.en;
  }, [lang]);

  if (!mounted) {
    return <div style={{ background: '#0A0A0F', minHeight: '100vh' }} />;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, td, hasChosenLanguage, setHasChosenLanguage, temple: templeData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
