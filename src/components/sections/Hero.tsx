'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import { ArrowDown, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import { FaDiscord, FaTelegram } from 'react-icons/fa6';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';

const socialIcons: Record<string, React.ReactNode> = {
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  google: <SiGoogle size={20} />,
  instagram: <FaInstagram size={20} />,
  discord: <FaDiscord size={20} />,
  telegram: <FaTelegram size={20} />,
};

export function Hero() {
  const { basics, socialLinks } = portfolioData;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-32 pb-24 md:pb-16"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-accent/20 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-accent/20 blur-[100px]"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <RevealOnScroll delay={1.0}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-sm font-medium text-accent">
                  {basics.availability}
                </span>
              </motion.div>
            </RevealOnScroll>

            {/* Name */}
            <RevealOnScroll delay={0.8}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight mb-4">
                <span className="block text-foreground">Hi, I&apos;m</span>
                <span className="text-gradient">{basics.name}</span>
              </h1>
            </RevealOnScroll>

            {/* Headline */}
            <RevealOnScroll delay={1.1}>
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light mb-6">
                {basics.headline}
              </p>
            </RevealOnScroll>

            {/* Tagline */}
            <RevealOnScroll delay={1.2}>
              <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 mb-8 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles size={18} className="text-accent" />
                {basics.tagline}
              </p>
            </RevealOnScroll>

            {/* Location */}
            <RevealOnScroll delay={1.25}>
              <p className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground mb-8">
                <MapPin size={16} className="text-accent" />
                {basics.location.city}, {basics.location.country}
              </p>
            </RevealOnScroll>

            {/* CTA Buttons */}
            <RevealOnScroll delay={1.3}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all hover:shadow-lg hover:shadow-accent/25"
                >
                  View My Work
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-medium rounded-xl hover:bg-muted/80 transition-all border border-border"
                >
                  Get In Touch
                </a>
              </div>
            </RevealOnScroll>

            {/* Social Links */}
            <RevealOnScroll delay={1.4}>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-16 md:mb-0">
                {socialLinks.slice(0, 4).map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {socialIcons[social.icon] || <Github size={20} />}
                  </motion.a>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <RevealOnScroll delay={0} direction="left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0, duration: 0.5 }}
                className="relative"
              >
                {/* Decorative rings */}
                <div className="absolute inset-0 -m-4 rounded-full border-2 border-dashed border-accent/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-0 -m-8 rounded-full border border-accent/10" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-accent/20 blur-3xl" />
                
                {/* Image container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-accent/30 bg-gradient-to-br from-accent/20 to-transparent">
                  <Image
                    src={basics.profilePicture}
                    alt={basics.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 px-4 py-2 glass rounded-xl"
                >
                  <span className="text-sm font-medium">🎨 UI/UX</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 glass rounded-xl"
                >
                  <span className="text-sm font-medium">💻 Developer</span>
                </motion.div>
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
