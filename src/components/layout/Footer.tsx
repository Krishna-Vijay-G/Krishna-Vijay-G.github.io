'use client';

import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import portfolioData from '@/data/portfolio.json';

const socialIcons: Record<string, React.ReactNode> = {
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  instagram: <FaInstagram size={20} />,
  google: <SiGoogle size={20} />,
  discord: <FaDiscord size={20} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="#home" className="font-display text-2xl font-bold">
              <span className="text-gradient">{portfolioData.basics.name.split(' ')[0]}</span>
              <span className="text-foreground/80">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              {portfolioData.basics.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <a
              href={`mailto:${portfolioData.basics.email}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail size={16} />
              {portfolioData.basics.email}
            </a>
            <div className="flex gap-3 mt-4">
              {portfolioData.socialLinks.slice(0, 5).map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                  aria-label={social.name}
                >
                  {socialIcons[social.icon] || <Mail size={20} />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {portfolioData.basics.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart size={14} className="text-accent fill-accent" /> by
            <span className="font-display text-base font-bold tracking-tight ml-1">
              <span className="text-gradient">Krishna</span>
              <span className="text-foreground/80">.</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
