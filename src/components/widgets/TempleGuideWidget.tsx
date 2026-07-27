'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/i18n/LanguageContext';
import { Sparkles, Music, BookOpen, Clock, Volume2, Square, ChevronLeft, HelpCircle } from 'lucide-react';
import Image from 'next/image';

interface WidgetTopic {
  id: string;
  icon: React.ReactNode;
  title: Record<string, string>;
  description: Record<string, string>;
}

export default function TempleGuideWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const topics: WidgetTopic[] = [
    {
      id: 'six_toes',
      icon: <Sparkles className="text-amber-300" size={20} />,
      title: {
        en: 'Sacred Six Toes',
        ta: 'புனித ஆறு விரல்கள்',
        hi: 'पवित्र छह उंगलियां',
        te: 'పవిత్రమైన ఆరు వేళ్లు',
        kn: 'ಪವಿತ್ರ ಆರು ಬೆರಳುಗಳು',
        ru: 'Священные шесть пальцев'
      },
      description: {
        en: 'The right foot of Goddess Sundara Mahalakshmi has 6 toes. In Vedic astrology, the number 6 is ruled by Shukra (Venus). Worshipping here mitigates Shukra dosha, bringing prosperity and marital happiness.',
        ta: 'சுந்தர மகாலட்சுமி தேவியின் வலது காலில் 6 விரல்கள் உள்ளன. ஜோதிடத்தில் 6 என்ற எண் சுக்கிரனைக் குறிக்கும். இங்கு வழிபடுவது சுக்கிர தோஷத்தை நீக்கி, செழிப்பைத் தரும்.',
        hi: 'देवी सुंदरा महालक्ष्मी के दाहिने पैर में 6 उंगलियां हैं। ज्योतिष में 6 संख्या शुक्र ग्रह की है। यहाँ पूजा करने से शुक्र दोष दूर होता है और समृद्धि आती है।',
        te: 'సుందర మహాలక్ష్మి కుడి పాదంలో 6 వేళ్లు ఉన్నాయి. జ్యోతిష్యంలో 6 సంఖ్య శుక్రుడిని సూచిస్తుంది. ఇక్కడ పూజించడం వల్ల శుక్ర దోషం తొలగి, శ్రేయస్సు కలుగుతుంది.',
        kn: 'ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿಯ ಬಲ ಪಾದದಲ್ಲಿ 6 ಬೆರಳುಗಳಿವೆ. ಜ್ಯೋತಿಷ್ಯದಲ್ಲಿ 6 ಸಂಖ್ಯೆ ಶುಕ್ರ ಗ್ರಹವನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಇಲ್ಲಿ ಪೂಜಿಸುವುದರಿಂದ ಶುಕ್ರ ದೋಷ ನಿವಾರಣೆಯಾಗಿ ಸಮೃದ್ಧಿ ಉಂಟಾಗುತ್ತದೆ.',
        ru: 'У богини Сундара Махалакшми 6 пальцев на правой ноге. В астрологии число 6 управляется Шукрой (Венерой). Поклонение здесь устраняет негативное влияние Венеры.'
      }
    },
    {
      id: 'musical_pillars',
      icon: <Music className="text-amber-300" size={20} />,
      title: {
        en: 'Musical Stone Pillars',
        ta: 'இசை கல் தூண்கள்',
        hi: 'संगीत के पत्थर के खंभे',
        te: 'సంగీత రాతి స్తంభాలు',
        kn: 'ಸಂಗೀತ ಕಲ್ಲಿನ ಸ್ತಂಭಗಳು',
        ru: 'Музыкальные колонны'
      },
      description: {
        en: 'The mandapam has columns carved from single stones that emit distinct musical notes when tapped. This showcases the structural and acoustical genius of ancient Dravidian architects.',
        ta: 'கோவில் மண்டபத்தில் உள்ள ஒற்றைக்கல் தூண்கள் தட்டும்போது இசை ஒலிகளை எழுப்புகின்றன. இது பண்டைய திராவிட சிற்பிகளின் ஒலி நுட்பத்திற்கு சான்றாகும்.',
        hi: 'मंदिर के मंडप में एक ही पत्थर से नक्काशीदार खंभे हैं जो थपथपाने पर संगीत के स्वर उत्पन्न करते हैं। यह प्राचीन द्रविड़ों की ध्वनिक प्रतिभा को दर्शाता है।',
        te: 'మండపంలోని ఏకశిలా స్తంభాలు తట్టినప్పుడు సంగీత స్వరాలను పలుకుతాయి. ఇది ప్రాచీన ద్రావిడ శిల్పుల శబ్ద నైపుణ్యానికి నిదర్శనం.',
        kn: 'ಮಂಟಪದಲ್ಲಿರುವ ಏಕಶಿಲಾ ಸ್ತಂಭಗಳು ತಟ್ಟಿದಾಗ ಸಂಗೀತದ ಸ್ವರಗಳನ್ನು ಹೊರಡಿಸುತ್ತವೆ. ಇದು ಪ್ರಾಚೀನ ದ್ರಾವಿಡ ವಾಸ್ತುಶಿಲ್ಪಿಗಳ ಶಬ್ದ ವಿಜ್ಞಾನದ ಪ್ರತಿಭೆಯನ್ನು ತೋರಿಸುತ್ತದೆ.',
        ru: 'Колонны в мандапаме вырезаны из цельных камней и издают музыкальные ноты при постукивании. Это шедевр акустики древних дравидов.'
      }
    },
    {
      id: 'king_janaka',
      icon: <BookOpen className="text-amber-300" size={20} />,
      title: {
        en: "King Janaka's Legend",
        ta: 'ஜனக மகாராஜாவின் புராணம்',
        hi: 'राजा जनक की कथा',
        te: 'జనక మహారాజు చరిత్ర',
        kn: 'ಜನಕ ಮಹಾರಾಜರ ಪುರಾಣ',
        ru: 'Легенда о царе Джанаке'
      },
      description: {
        en: 'King Janaka worshipped Lord Vishnu here daily. Once when the king was late, Lord Vishnu took his form and did the rituals himself. The divine architect Vishwakarma then built the temple.',
        ta: 'ஜனக மகாராஜா தினமும் இங்கு விஷ்ணுவை வழிபட்டார். ஒரு முறை மன்னர் வர தாமதமானபோது, பகவானே மன்னர் வடிவில் வந்து வழிபாட்டை நடத்தினார். பின்னர் விஸ்வகர்மா இக்கோவிலைக் கட்டினார்.',
        hi: 'राजा जनक यहाँ प्रतिदिन भगवान विष्णु की पूजा करते थे। एक बार जब राजा को देरी हुई, तो स्वयं भगवान विष्णु ने उनका रूप धारण कर अनुष्ठान किए। फिर विश्वकर्मा ने मंदिर का निर्माण किया।',
        te: 'జనక మహారాజు ప్రతిరోజూ ఇక్కడ విష్ణువును పూజించేవాడు. ఒకసారి రాజు ఆలస్యమైనప్పుడు, విష్ణువే రాజు రూపంలో వచ్చి పూజలు చేశాడు. ఆ తర్వాత విశ్వకర్మ ఈ ఆలయాన్ని నిర్మించాడు.',
        kn: 'ಜನಕ ಮಹಾರಾಜರು ಪ್ರತಿದಿನ ಇಲ್ಲಿ ವಿಷ್ಣುವನ್ನು ಪೂಜಿಸುತ್ತಿದ್ದರು. ಒಮ್ಮೆ ರಾಜನಿಗೆ ತಡವಾದಾಗ, ಸ್ವತಃ ವಿಷ್ಣು ರಾಜನ ರೂಪ ಧರಿಸಿ ಪೂಜೆ ಮಾಡಿದರು. ನಂತರ ವಿಶ್ವಕರ್ಮರು ಈ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದರು.',
        ru: 'Царь Джанака поклонялся здесь Господу Вишну ежедневно. Однажды, когда царь опаздывал, Господь сам совершил ритуал. Небесный архитектор Вишвакарма построил этот храм.'
      }
    },
    {
      id: 'parihara_guide',
      icon: <Clock className="text-amber-300" size={20} />,
      title: {
        en: 'Parihara Guide',
        ta: 'பரிகார வழிகாட்டி',
        hi: 'पूजा और परिहार गाइड',
        te: 'పరిహార దర్శన మార్గదర్శి',
        kn: 'ಪರಿಹಾರ ದರ್ಶನ ಮಾರ್ಗದರ್ಶಿ',
        ru: 'Руководство по пудже'
      },
      description: {
        en: 'The best time for remedy prayers is on Fridays during Sukra Hora (6:00 AM - 7:00 AM). Devotees should worship Goddess Sundara Mahalakshmi first, then Lord Kamala Varadharajar.',
        ta: 'பரிகார வழிபாட்டிற்கு வெள்ளிக்கிழமை காலை சுக்கிர ஹோரா (6:00 - 7:00 AM) உகந்த நேரம். முதலில் சுந்தர மகாலட்சுமியையும், பின்னர் கமல வரதராஜரையும் வழிபட வேண்டும்.',
        hi: 'शुक्र होरा (शुक्रवार सुबह 6:00 - 7:00 बजे) के दौरान पूजा करना सर्वोत्तम है। भक्तों को पहले देवी सुंदरा महालक्ष्मी और फिर भगवान कमल वरदराजर की पूजा करनी चाहिए।',
        te: 'శుక్ర హోరా (శుక్రవారం ఉయదం 6:00 - 7:00) సమయంలో పూజించడం శ్రేష్ఠం. భక్తులు ముందుగా సుందర మహాలక్ష్మిని, ఆపై కమల వరదరాజర్ ను దర్శించుకోవాలి.',
        kn: 'ಶುಕ್ರ ಹೋರಾ (ಶುಕ್ರವಾರ ಬೆಳಿಗ್ಗೆ 6:00 - 7:00) ಸಮಯದಲ್ಲಿ ಪೂಜಿಸುವುದು ಉತ್ತಮ. ಭಕ್ತರು ಮೊದಲು ಸುಂದರ ಮಹಾಲಕ್ಷ್ಮಿ ಹಾಗೂ ನಂತರ ಕಮಲ ವರದರಾಜರ್ ಪೂಜೆ ಮಾಡಬೇಕು.',
        ru: 'Лучшее время для молитв об исцелении — пятница во время Шукра Хора (6:00 - 7:00 утра). Преданные сначала поклоняются Сундаре Махалакшми.'
      }
    }
  ];

  const handleToggleTTS = (topicId: string, text: string) => {
    if (isPlayingTTS === topicId) {
      if (audioRef.current) audioRef.current.pause();
      setIsPlayingTTS(null);
      return;
    }

    if (audioRef.current) audioRef.current.pause();

    const url = `/api/tts?lang=${lang}&text=${encodeURIComponent(text)}`;
    audioRef.current = new Audio(url);
    audioRef.current.onended = () => setIsPlayingTTS(null);
    audioRef.current.onerror = () => setIsPlayingTTS(null);
    
    audioRef.current.play().catch(console.error);
    setIsPlayingTTS(topicId);
  };

  const getTranslated = (record: Record<string, string>) => {
    return record[lang] || record.en;
  };

  return (
    <>
      {/* Floating Tab Button */}
      <motion.button
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[99] flex items-center gap-2 bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-4.5 py-4.5 rounded-l-2xl border-l border-y border-amber-300/40 shadow-[0_0_35px_rgba(245,158,11,0.5)] cursor-pointer select-none"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <HelpCircle size={22} className="animate-pulse" />
        <span className="font-bold text-xs uppercase tracking-widest vertical-text hidden sm:inline">
          {lang === 'ta' ? 'அறிவியல்' : lang === 'hi' ? 'ज्ञान' : 'Secrets'}
        </span>
      </motion.button>

      {/* Slide-out wisdom tray */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              onClick={() => {
                if (audioRef.current) audioRef.current.pause();
                setIsPlayingTTS(null);
                setIsOpen(false);
              }}
            />

            {/* Tray Panel */}
            <motion.div
              className="relative w-full max-w-md h-full bg-[#08080C]/95 backdrop-blur-2xl border-l border-amber-400/30 p-6 flex flex-col justify-between overflow-y-auto select-none"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-5 mb-6">
                  <button
                    onClick={() => {
                      if (audioRef.current) audioRef.current.pause();
                      setIsPlayingTTS(null);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-200 transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                    <span>{lang === 'ta' ? 'மூடுக' : 'Close'}</span>
                  </button>
                  <div className="text-right">
                    <span className="text-xl glow-text text-amber-300 block">ॐ</span>
                    <h3 className="text-lg font-extrabold text-amber-100" style={{ fontFamily: 'var(--font-display)' }}>
                      {lang === 'ta' ? 'திருக்கோவில் இரகசியங்கள்' : lang === 'hi' ? 'मंदिर के रहस्य' : 'Temple Secrets'}
                    </h3>
                  </div>
                </div>

                {/* Topics Container */}
                <div className="space-y-4">
                  {topics.map((topic) => {
                    const isExpanded = activeTopic === topic.id;
                    const textContent = getTranslated(topic.description);

                    return (
                      <div
                        key={topic.id}
                        className={`liquid-glass p-5 transition-all duration-300 flex flex-col gap-3.5 border ${
                          isExpanded ? 'border-amber-400/50 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.15)]' : 'border-white/5 hover:border-amber-500/20'
                        }`}
                      >
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() => setActiveTopic(isExpanded ? null : topic.id)}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/25">
                              {topic.icon}
                            </div>
                            <h4 className="text-base font-extrabold text-amber-100" style={{ fontFamily: 'var(--font-display)' }}>
                              {getTranslated(topic.title)}
                            </h4>
                          </div>
                          <ChevronLeft
                            size={18}
                            className={`text-amber-400 transition-transform duration-300 ${
                              isExpanded ? 'rotate-270' : 'rotate-180'
                            }`}
                          />
                        </div>

                        {/* Expanded details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden flex flex-col gap-4"
                            >
                              <p className="text-sm text-gray-300 leading-relaxed font-body">
                                {textContent}
                              </p>
                              
                              <button
                                onClick={() => handleToggleTTS(topic.id, textContent)}
                                className={`flex items-center justify-center gap-2.5 py-3.5 px-4 w-full rounded-xl text-xs font-extrabold tracking-widest uppercase transition-all border ${
                                  isPlayingTTS === topic.id
                                    ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                                    : 'bg-black/50 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                                }`}
                              >
                                {isPlayingTTS === topic.id ? (
                                  <>
                                    <Square size={14} fill="currentColor" />
                                    <span>{lang === 'ta' ? 'ஒலியை நிறுத்து' : 'Stop Audio'}</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 size={14} />
                                    <span>{lang === 'ta' ? 'விளக்கத்தைக் கேள்' : lang === 'hi' ? 'ऑडियो गाइड सुनें' : 'Listen to Audio'}</span>
                                  </>
                                )}
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-8 text-center text-xs text-amber-500/40 uppercase tracking-widest border-t border-amber-500/10 pt-4 flex flex-col items-center gap-2">
                <span>ॐ Arasar Kovil Devasthanam ॐ</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
