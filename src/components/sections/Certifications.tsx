'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export function Certifications() {
  const { certifications } = portfolioData;
  const validCertifications = certifications.filter(cert => !cert.id.includes('placeholder'));
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (certId: string) => {
    setImageErrors(prev => new Set(prev).add(certId));
  };

  return (
    <section id="certifications" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Certifications</span> & Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and courses that validate my expertise
          </p>
        </RevealOnScroll>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {validCertifications.map((cert, index) => (
            <RevealOnScroll key={cert.id} delay={index * 0.1}>
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
                
                {/* Icon */}
                <div className="relative mb-4">
                  {cert.badge && !imageErrors.has(cert.id) ? (
                    <div className="h-12 flex items-center justify-start overflow-hidden">
                      <img
                        src={cert.badge}
                        alt={cert.name}
                        className="h-full w-auto object-contain"
                        onError={() => handleImageError(cert.id)}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Award size={24} className="text-accent" />
                    </div>
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <CheckCircle size={12} className="text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  {cert.name}
                </h3>
                <p className="text-sm text-accent mb-2">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar size={12} />
                  {cert.date}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {cert.description}
                </p>

                {/* Verify Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline z-20 relative"
                    style={{ zIndex: 20, position: 'relative' }}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
