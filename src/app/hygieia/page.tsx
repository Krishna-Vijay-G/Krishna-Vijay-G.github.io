'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SettingsPanel } from '@/components/layout';
import { 
  Heart, 
  Droplets, 
  Microscope, 
  Ribbon,
  Shield,
  MessageCircle,
  Link2,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Layers,
  Database,
  Lock,
  Cpu,
  Monitor,
  Server,
  Palette
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Model data
const models = [
  { name: 'Heart Risk', icon: Heart, accuracy: '99.4%', color: 'from-red-500 to-red-600', params: '18 clinical parameters' },
  { name: 'Diabetes Risk', icon: Droplets, accuracy: '98.1%', color: 'from-orange-500 to-orange-600', params: 'Symptom-based analysis' },
  { name: 'Skin Diagnosis', icon: Microscope, accuracy: '96.8%', color: 'from-teal-500 to-teal-600', params: 'AI image analysis' },
  { name: 'Breast Cancer', icon: Ribbon, accuracy: '81.3%', color: 'from-pink-500 to-pink-600', params: '10 risk factors' },
  { name: 'Breast Tissue', icon: Ribbon, accuracy: '97.2%', color: 'from-purple-500 to-purple-600', params: '30 FNA measurements' },
];

// Features data
const features = [
  { title: '5 AI Models', description: 'Specialized diagnostic and predictive models', icon: Cpu },
  { title: '96%+ Accuracy', description: 'Clinical-grade machine learning predictions', icon: CheckCircle },
  { title: 'Blockchain Verified', description: 'Every analysis cryptographically secured', icon: Link2 },
  { title: 'AI Health Assistant', description: 'Dr. Hygieia - Context-aware medical guidance', icon: MessageCircle },
  { title: 'Dark/Light Mode', description: 'Beautiful, accessible interface', icon: Palette },
  { title: 'Responsive Design', description: 'Seamless experience across all devices', icon: Monitor },
];

// Tech stack
const frontendTech = ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'TanStack Query', 'Zustand'];
const backendTech = ['Flask', 'SQLAlchemy', 'JWT', 'scikit-learn', 'TensorFlow', 'Google Derm Foundation'];

// Security layers
const securityLayers = [
  { title: 'Authentication', items: ['JWT Token-based auth', 'Bcrypt password hashing', 'Session management'] },
  { title: 'Authorization', items: ['Role-based access control', 'Admin/User separation', 'Resource ownership validation'] },
  { title: 'Data Protection', items: ['Input validation & sanitization', 'SQL injection prevention', 'XSS protection'] },
  { title: 'Blockchain', items: ['SHA-256 cryptographic hashing', 'Immutable audit trail', 'Chain integrity validation'] },
];

// Screenshots
const screenshots = [
  { 
    id: 'hero',
    src: '/hygieia/Hero-compressed.png', 
    alt: 'Hero Section', 
    title: 'Landing Page',
    description: 'A welcoming, professional landing page that introduces users to Hygieia\'s capabilities with dynamic gradient backgrounds, clear value proposition, and quick access cards to all 5 diagnostic services.'
  },
  { 
    id: 'dashboard',
    src: '/hygieia/Dashboard-compressed.png', 
    alt: 'Dashboard', 
    title: 'User Dashboard',
    description: 'Personalized dashboard providing quick access to all features, recent analyses, statistics, and activity timeline. Includes analysis quick cards for Heart Risk, Diabetes Risk, Skin Diagnosis, Breast Cancer Risk, and Breast Tissue Diagnosis.'
  },
  { 
    id: 'analysis',
    src: '/hygieia/Analysis-compressed.png', 
    alt: 'Analysis Interface', 
    title: 'Analysis Interface',
    description: 'Intuitive analysis forms with dynamic, context-aware input fields, real-time validation, helper text for medical parameters, image upload capability, and progress indicators during processing.'
  },
  { 
    id: 'chat',
    src: '/hygieia/Chat-compressed.png', 
    alt: 'Dr. Hygieia Chat', 
    title: 'AI Health Assistant - Dr. Hygieia',
    description: 'Context-aware AI assistant that knows your analysis history, supports multiple concurrent conversations with streaming responses, session management, and direct integration with specific analysis results.'
  },
  { 
    id: 'blockchain',
    src: '/hygieia/Block-compressed.png', 
    alt: 'Blockchain Verification', 
    title: 'Blockchain Verification',
    description: 'Immutable record verification system with cryptographic hashing (SHA-256), complete audit trail, tamper detection, chain validation, and admin dashboard for complete oversight.'
  },
  { 
    id: 'auth',
    src: '/hygieia/RegLog-compressed.png', 
    alt: 'Authentication', 
    title: 'User Authentication',
    description: 'Secure, elegant authentication experience with clean minimal design, form validation, JWT authentication, remember me option, password strength indicator, and professional healthcare imagery.'
  },
];

export default function HygieiaPage() {

  return (
    <div className="min-h-screen">
      <SettingsPanel />
      {/* Mesh gradient background */}
      <div className="mesh-gradient" />
      
      {/* Back to Portfolio */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium hover:bg-accent/20 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 pointer-events-none" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Image
              src="/hygieia/logo.svg"
              alt="Hygieia Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">AI-Powered Healthcare</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="text-gradient">HYGIEIA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-4"
          >
            AI-Powered Medical Diagnostic Platform
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-8"
          >
            Revolutionizing Healthcare Through Intelligent Technology
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
              96%+ Average Accuracy
            </span>
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
              5 AI Models
            </span>
            <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
              Blockchain Verified
            </span>
            <span className="px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium">
              Dr. Hygieia AI Assistant
            </span>
          </motion.div>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <Image
              src="/hygieia/Cover-compressed.png"
              alt="Hygieia Platform Cover"
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              AI Models <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Five specialized machine learning models providing clinical-grade diagnostic predictions
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                variants={fadeInUp}
                className="relative p-6 rounded-2xl glass-card overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center mb-4`}>
                    <model.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gradient">{model.accuracy}</span>
                    <span className="text-sm text-muted-foreground">accuracy</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{model.params}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Model Performance Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 overflow-x-auto"
          >
            <table className="w-full rounded-xl overflow-hidden glass-card">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Model</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Accuracy</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">ROC-AUC</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Samples</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Architecture</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="px-6 py-4 flex items-center gap-2"><Heart size={16} className="text-red-500" /> Heart Risk</td>
                  <td className="px-6 py-4 font-semibold text-green-400">99.4%</td>
                  <td className="px-6 py-4">99.9%</td>
                  <td className="px-6 py-4">303</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Stacking Ensemble</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="px-6 py-4 flex items-center gap-2"><Droplets size={16} className="text-orange-500" /> Diabetes Risk</td>
                  <td className="px-6 py-4 font-semibold text-green-400">98.1%</td>
                  <td className="px-6 py-4">99.6%</td>
                  <td className="px-6 py-4">520</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Random Forest + XGBoost</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="px-6 py-4 flex items-center gap-2"><Microscope size={16} className="text-teal-500" /> Skin Diagnosis</td>
                  <td className="px-6 py-4 font-semibold text-green-400">96.8%</td>
                  <td className="px-6 py-4">99.3%</td>
                  <td className="px-6 py-4">10,015</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">CNN + Derm Foundation</td>
                </tr>
                <tr className="border-b border-border/50 hover:bg-muted/50">
                  <td className="px-6 py-4 flex items-center gap-2"><Ribbon size={16} className="text-pink-500" /> Breast Risk</td>
                  <td className="px-6 py-4 font-semibold text-yellow-400">81.3%</td>
                  <td className="px-6 py-4">86.2%</td>
                  <td className="px-6 py-4">251,661</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Voting Ensemble</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 flex items-center gap-2"><Ribbon size={16} className="text-purple-500" /> Breast Diagnosis</td>
                  <td className="px-6 py-4 font-semibold text-green-400">97.2%</td>
                  <td className="px-6 py-4">99.7%</td>
                  <td className="px-6 py-4">569</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Stacking Ensemble</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Interface <span className="text-gradient">Showcase</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A beautiful, professional interface designed for healthcare trust and accessibility
            </p>
          </motion.div>

          {/* Showcase: alternating left-right, bigger images, hover popup */}
          <div className="relative w-full mx-auto">
            <div className="space-y-20">
              {screenshots.map((screenshot, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={screenshot.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="relative"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                      {/* Image - Alternates left/right */}
                      <div
                        className={`relative ${isLeft ? 'order-1' : 'order-2'}`}
                      >
                        {/* Bigger image container with zoom effect */}
                        <motion.div
                          className="relative overflow-hidden rounded-xl cursor-pointer group"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative w-full h-[50vh] md:h-[70vh] rounded-xl overflow-hidden bg-muted/50">
                            <Image
                              src={screenshot.src}
                              alt={screenshot.alt}
                              fill
                              className="object-contain w-full h-full p-6"
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Content - Alternates right/left */}
                      <div className={`${isLeft ? 'order-2' : 'order-1'}`}>
                        <h3 className="text-2xl md:text-3xl font-semibold mb-3">{screenshot.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{screenshot.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Technical <span className="text-gradient">Architecture</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern technologies for performance, scalability, and security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Frontend */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Monitor size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Frontend</h3>
                  <p className="text-sm text-muted-foreground">Next.js 14</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {frontendTech.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl glass-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                  <Server size={24} className="text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Backend</h3>
                  <p className="text-sm text-muted-foreground">Flask</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {backendTech.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-400 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Security <span className="text-gradient">Features</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multi-layer security architecture ensuring data protection and integrity
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {securityLayers.map((layer, index) => (
              <motion.div
                key={layer.title}
                variants={fadeInUp}
                className="p-6 rounded-2xl glass-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Lock size={20} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Layer {index + 1}: {layer.title}</h3>
                </div>
                <ul className="space-y-2">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skin Diagnosis Pipeline */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
              Skin Diagnosis <span className="text-gradient">Pipeline</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced AI image analysis powered by Google Derm Foundation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl glass-card"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Pipeline Steps */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Input Image</h4>
                    <p className="text-sm text-muted-foreground">Upload skin lesion image</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Google Derm Foundation Model</h4>
                    <p className="text-sm text-muted-foreground">Pre-trained on clinical images</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Feature Extraction</h4>
                    <p className="text-sm text-muted-foreground">6,144-dim Embeddings + 80 Engineered Features</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 font-bold">4</div>
                  <div>
                    <h4 className="font-semibold">Voting Ensemble</h4>
                    <p className="text-sm text-muted-foreground">XGBoost + Random Forest + Gradient Boosting + Extra Trees</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold">5</div>
                  <div>
                    <h4 className="font-semibold">7-Class Output</h4>
                    <p className="text-sm text-muted-foreground">Skin condition classification with confidence</p>
                  </div>
                </div>
              </div>

              {/* Detectable Conditions */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-4">Detectable Conditions</h4>
                <div className="space-y-2">
                  {[
                    'Actinic Keratoses',
                    'Basal Cell Carcinoma ⚠️',
                    'Benign Keratosis',
                    'Dermatofibroma',
                    'Melanoma ⚠️',
                    'Melanocytic Nevus',
                    'Vascular Lesions'
                  ].map((condition, i) => (
                    <div key={condition} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className={condition.includes('⚠️') ? 'text-yellow-400' : ''}>{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding border-t border-border">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/hygieia/logo.svg"
              alt="Hygieia Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-2xl font-display font-bold mb-2">HYGIEIA</h3>
            <p className="text-muted-foreground mb-6">
              Empowering Health Through Intelligent Technology
            </p>
            <div className="flex justify-center gap-3 mb-8">
              <span className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs">Made with ❤️</span>
              <span className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">Powered by AI</span>
              <span className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs">Healthcare First</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Hygieia. All rights reserved.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 mt-6 text-accent hover:text-accent-light transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Krishna Vijay G&apos;s Portfolio
            </Link>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
