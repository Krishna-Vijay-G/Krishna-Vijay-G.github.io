'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export function Volunteering() {
  const { volunteering } = portfolioData;
  const validVolunteering = volunteering.filter(vol => !vol.id.includes('placeholder'));
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (volId: string) => {
    setImageErrors(prev => new Set(prev).add(volId));
  };

  if (validVolunteering.length === 0) {
    return null;
  }

  return (
    <section id="volunteering" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            <span className="text-gradient">Volunteering</span> & Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contributing back to the community and making a positive impact
          </p>
        </RevealOnScroll>

        {/* Volunteering Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {validVolunteering.map((vol, index) => (
            <RevealOnScroll key={vol.id} delay={index * 0.1}>
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

                {/* Logo */}
                <div className="relative mb-4">
                  {vol.logo && !imageErrors.has(vol.id) ? (
                    <div className="h-12 flex items-center justify-start overflow-hidden">
                      <img
                        src={vol.logo}
                        alt={vol.organization}
                        className="h-full w-auto object-contain"
                        onError={() => handleImageError(vol.id)}
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Heart size={24} className="text-accent" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
                  {vol.role}
                </h3>
                <p className="text-sm text-accent mb-3">{vol.organization}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar size={12} />
                  {vol.startDate} {vol.endDate && vol.startDate !== vol.endDate ? `- ${vol.endDate}` : ''}
                </div>

                <p className="text-sm text-muted-foreground">
                  {vol.description}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
