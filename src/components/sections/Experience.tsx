'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, ChevronRight, ChevronDown } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

export function Experience() {
  const { experience } = portfolioData;
  const validExperiences = experience.filter(exp => !exp.id.includes('placeholder'));
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Close expanded card when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setExpandedId(null);
    if (expandedId) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [expandedId]);

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the experiences that have shaped my career
          </p>
        </RevealOnScroll>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent md:-translate-x-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {validExperiences.map((exp, index) => (
              <RevealOnScroll
                key={exp.id}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'right' : 'left'}
              >
                <div
                  className={cn(
                    'relative grid md:grid-cols-2 gap-8 md:gap-16',
                    index % 2 === 0 ? 'md:text-right' : ''
                  )}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 md:left-1/2 top-0 md:-translate-x-1/2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-4 h-4 rounded-full bg-accent border-4 border-background shadow-lg shadow-accent/50"
                    />
                  </div>

                  {/* Content - Alternating sides on desktop */}
                  <div
                    className={cn(
                      'pl-8 md:pl-0',
                      index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
                    )}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="relative p-6 rounded-2xl glass-card gradient-border cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(expandedId === exp.id ? null : exp.id);
                      }}
                    >
                      <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={64}
                        inactiveZone={0.01}
                        borderWidth={2}
                      />
                      {/* Header */}
                      <div className={cn('flex items-start gap-4', index % 2 === 0 ? 'md:flex-row-reverse' : '')}>

                        {/* Company Logo */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center overflow-hidden">
                          {exp.logo ? (
                            <img
                              src={exp.logo}
                              alt={exp.company + ' logo'}
                              className="object-contain w-10 h-10"
                              loading="lazy"
                            />
                          ) : (
                            <Briefcase size={24} className="text-accent" />
                          )}
                        </div>
                        
                        <div className={cn('flex-1', index % 2 === 0 ? 'md:text-right' : '')}>
                          <h3 className="text-lg font-semibold">{exp.position}</h3>
                          <p className="text-accent font-medium">{exp.company}</p>
                        </div>

                        {/* Expand/Collapse Icon */}
                        <motion.div
                          animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={20} className="text-accent" />
                        </motion.div>
                      </div>

                      {/* Meta - Always Visible */}
                      <div className={cn(
                        'flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground',
                        index % 2 === 0 ? 'md:justify-end' : ''
                      )}>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
                          {exp.type}
                        </span>
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {expandedId === exp.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            {/* Description */}
                            <p className="mt-4 text-sm text-muted-foreground">
                              {exp.description}
                            </p>

                            {/* Highlights */}
                            <ul className={cn('mt-4 space-y-2', index % 2 === 0 ? 'md:text-left' : '')}>
                              {exp.highlights.map((highlight, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <ChevronRight size={14} className="flex-shrink-0 mt-1 text-accent" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>

                            {/* Technologies */}
                            <div className={cn('flex flex-wrap gap-2 mt-4', index % 2 === 0 ? 'md:justify-end' : '')}>
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Link */}
                            {exp.url && (
                              <a
                                href={exp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                  'inline-flex items-center gap-1 mt-4 text-sm text-accent hover:underline z-20 relative',
                                  index % 2 === 0 ? 'md:justify-end md:ml-auto' : ''
                                )}
                                style={{ zIndex: 20, position: 'relative' }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Visit Company</span>
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Empty column for alternating layout */}
                  <div className="hidden md:block" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
