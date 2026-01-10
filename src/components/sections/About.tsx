'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, GraduationCap, Award, Languages, Calendar } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll, StaggerContainer, staggerItem } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

const languageTexts: Record<string, { native: string; translation: string }> = {
  Tamil: {
    native: 'என் நெஞ்சில் குடியிருக்கும்...',
    translation: 'If you like this, we can be friends.😎'
  },
  Kannada: {
    native: 'ಮಾತನಾಡುವುದು ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು ಮಾತ್ರ.',
    translation: 'I can only Listen and Speak.😅'
  },
  English: {
    native: "Isn't it obvious? I speak English.",
    translation: 'Professional working proficiency in English.☺️'
  },
  Japanese: {
    native: '飛ばねぇ豚は、ただの豚だ。',
    translation: 'I used to watch with my eyes; now I watch with my mind. [JLPT-N3]😇'
  }
};

export function About() {
  const { basics, education, certifications, languages, interests } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [displayedTranslation, setDisplayedTranslation] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTypingTranslation, setIsTypingTranslation] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const currentLang = languages[currentIndex];
  const currentTexts = languageTexts[currentLang.name];

  useEffect(() => {
    if (!currentTexts) return;

    const nativeText = currentTexts.native;
    const translationText = currentTexts.translation;
    let currentCharIndex = 0;
    setDisplayedText('');
    setDisplayedTranslation('');
    setIsTyping(true);
    setIsTypingTranslation(false);
    setShowTranslation(false);
    setIsExiting(false);

    // Phase 1: Type out native text
    const typeInterval = setInterval(() => {
      if (currentCharIndex < nativeText.length) {
        setDisplayedText(nativeText.slice(0, currentCharIndex + 1));
        currentCharIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setShowTranslation(true);

        // Phase 2: Type out translation
        let transCharIndex = 0;
        setIsTypingTranslation(true);
        const typeTransInterval = setInterval(() => {
          if (transCharIndex < translationText.length) {
            setDisplayedTranslation(translationText.slice(0, transCharIndex + 1));
            transCharIndex++;
          } else {
            clearInterval(typeTransInterval);
            setIsTypingTranslation(false);

            // Phase 3: After showing both for 3 seconds, start exiting
            setTimeout(() => {
              setIsExiting(true);

              // Phase 4: Reverse type translation first
              let reverseTransIndex = translationText.length;
              const reverseTransInterval = setInterval(() => {
                if (reverseTransIndex > 0) {
                  reverseTransIndex--;
                  setDisplayedTranslation(translationText.slice(0, reverseTransIndex));
                } else {
                  clearInterval(reverseTransInterval);
                  setShowTranslation(false);

                  // Phase 5: Then reverse type native text
                  let reverseCharIndex = nativeText.length;
                  const reverseInterval = setInterval(() => {
                    if (reverseCharIndex > 0) {
                      reverseCharIndex--;
                      setDisplayedText(nativeText.slice(0, reverseCharIndex));
                    } else {
                      clearInterval(reverseInterval);
                      setIsExiting(false);
                      // Add 1 second delay before starting next language
                      setTimeout(() => {
                        setCurrentIndex((prev) => (prev + 1) % languages.length);
                      }, 1000);
                    }
                  }, 80);

                  return () => clearInterval(reverseInterval);
                }
              }, 80);

              return () => clearInterval(reverseTransInterval);
            }, 3000);
          }
        }, 80);

        return () => clearInterval(typeTransInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [currentIndex, languages.length, currentTexts]);

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, education, and what drives me
          </p>
        </RevealOnScroll>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* Bio Card - Large */}
          <RevealOnScroll className="col-span-4 lg:col-span-2 row-span-2">
            <motion.div
              whileHover={{ y: -5 }}
              className="relative h-full p-6 lg:p-8 rounded-2xl glass-card gradient-border"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <User size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Who I Am</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {basics.bio}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/50">
                  <span className="text-2xl font-bold text-accent">2+</span>
                  <p className="text-sm text-muted-foreground">Years Learning</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <span className="text-2xl font-bold text-accent">{certifications.length}+</span>
                  <p className="text-sm text-muted-foreground">Certifications</p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Education Card */}
          <RevealOnScroll className="col-span-4 lg:col-span-2 row-span-2" delay={0.1}>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative h-full p-6 lg:p-8 rounded-2xl glass-card gradient-border"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <GraduationCap size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              <div className="space-y-4">
                {education.slice(0, 3).map((edu, index) => (
                  <div
                    key={edu.id}
                    className={cn(
                      'relative pl-4 border-l-2',
                      index === 0 ? 'border-accent' : 'border-border'
                    )}
                  >
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-accent" />
                    <h4 className="font-medium text-sm">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      <span className="text-accent font-medium">{edu.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Interests Card */}
          <RevealOnScroll className="col-span-4 lg:col-span-2" delay={0.2}>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative h-full p-6 rounded-2xl glass-card gradient-border"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Award size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest.id}
                    className="px-3 py-1.5 text-sm rounded-lg bg-accent/10 text-accent border border-accent/20"
                  >
                    {interest.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </RevealOnScroll>

          {/* Languages Card */}
          <RevealOnScroll className="col-span-4 lg:col-span-2" delay={0.3}>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative h-full p-6 rounded-2xl glass-card gradient-border"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Languages size={20} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold">Languages</h3>
              </div>
              
              {/* Typewriter Display */}
              <div className="space-y-4 mb-6 min-h-[120px] flex flex-col justify-center">
                <div className="min-h-[60px] flex items-center justify-center">
                  <h4 className="text-2xl font-bold text-center">
                    {displayedText}
                    {!showTranslation && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-0.5 h-6 bg-accent ml-1 align-middle"
                      />
                    )}
                  </h4>
                </div>
                
                <div className="min-h-[40px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {showTranslation && currentTexts && (
                      <motion.p
                        key={`trans-${currentIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-muted-foreground text-center"
                      >
                        {displayedTranslation}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-0.5 h-4 bg-accent ml-1 align-middle"
                        />
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Language Buttons */}
              <div className="flex flex-wrap gap-2 justify-center select-none">
                {languages.map((lang, index) => (
                  <span
                    key={lang.id}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-default ${
                      index === currentIndex
                        ? 'text-accent bg-accent/10 border border-accent/20'
                        : 'text-muted-foreground bg-muted/50'
                    }`}
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
