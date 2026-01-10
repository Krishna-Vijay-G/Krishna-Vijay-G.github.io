'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export function Contact() {
  const { basics, socialLinks } = portfolioData;
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/submit-google-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        console.error('Submit error', json);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  // Direct Google Form submit (for static hosts like GitHub Pages)
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const submittedRef = useRef(false);
  const GOOGLE_FORM_ACTION = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION || '';
  const USE_GOOGLE_FORM_DIRECT = process.env.NEXT_PUBLIC_GOOGLE_FORM_DIRECT === 'true' && !!GOOGLE_FORM_ACTION;

  const handleDirectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Do not prevent default — allow the browser to submit the form to Google Forms.
    // Mark that we submitted so iframe onLoad can detect completion.
    setStatus('sending');
    submittedRef.current = true;
  };

  const handleIframeLoad = () => {
    if (submittedRef.current) {
      submittedRef.current = false;
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding bg-muted/30 overflow-x-hidden">
      <div className="container-custom px-4 sm:px-6 max-w-full overflow-hidden">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you!
          </p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <RevealOnScroll direction="right">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Let&apos;s connect</h3>
                <p className="text-muted-foreground">
                  I&apos;m currently looking for new opportunities and my inbox is always open.
                  Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4 max-w-full">
                <motion.a
                  href={`mailto:${basics.email}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass-card hover:border-accent/50 transition-colors overflow-hidden"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <Mail size={18} className="text-accent sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm sm:text-base truncate">{basics.email}</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-accent flex-shrink-0" />
                </motion.a>

                <motion.a
                  href={`tel:${basics.phone}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass-card hover:border-accent/50 transition-colors overflow-hidden"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <Phone size={18} className="text-accent sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-sm sm:text-base truncate">{basics.phone}</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-accent flex-shrink-0" />
                </motion.a>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl glass-card overflow-hidden"
                >
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10 flex-shrink-0">
                    <MapPin size={18} className="text-accent sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-sm sm:text-base truncate">{basics.location.city}, {basics.location.country}</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Find me on</p>
                <div className="flex gap-3">
                  {socialLinks.slice(0, 4).map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3 }}
                      className="p-3 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                      aria-label={social.name}
                    >
                      {social.icon === 'linkedin' && <FaLinkedin size={20} />}
                      {social.icon === 'github' && <FaGithub size={20} />}
                      {social.icon === 'google' && <SiGoogle size={20} />}
                      {social.icon === 'instagram' && <FaInstagram size={20} />}
                      {!['linkedin', 'github', 'google', 'instagram'].includes(social.icon) && <Mail size={20} />}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Contact Form */}
          <RevealOnScroll direction="left" delay={0.2}>
            <form
              {...(USE_GOOGLE_FORM_DIRECT
                ? {
                    action: GOOGLE_FORM_ACTION,
                    method: 'POST' as const,
                    target: 'hidden_iframe',
                    onSubmit: handleDirectSubmit,
                  }
                : {
                    onSubmit: handleSubmit,
                  })}
              className="relative p-4 sm:p-8 rounded-2xl glass-card gradient-border w-full max-w-full"
            >
              {USE_GOOGLE_FORM_DIRECT && (
                <>
                  {/* invisible iframe to avoid redirect on static hosts */}
                  <iframe
                    name="hidden_iframe"
                    ref={iframeRef}
                    style={{ display: 'none' }}
                    onLoad={handleIframeLoad}
                    title="hidden-form-target"
                  />
                  {/* hidden Google Form entry fields (map your entry.* ids) */}
                  <input type="hidden" name="entry.1444212408" value={formState.name} />
                  <input type="hidden" name="entry.12430413" value={formState.email} />
                  <input type="hidden" name="entry.1777991339" value={formState.subject} />
                  <input type="hidden" name="entry.445717152" value={formState.message} />
                </>
              )}
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={18} />
                    Error. Try Again
                  </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
