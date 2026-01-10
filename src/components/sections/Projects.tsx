'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Tag, X, ZoomIn, ZoomOut } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '@/context/ThemeContext';

const categories = ['All', 'AI/ML', 'Design', 'Frontend', 'Backend'];

export function Projects() {
  const { projects } = portfolioData;
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [imagePopup, setImagePopup] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? projects.filter(p => !p.id.includes('placeholder'))
    : projects.filter(p => p.category === activeCategory && !p.id.includes('placeholder'));

  // Fetch markdown content when modal opens
  useEffect(() => {
    if (modalProject) {
      const mdFile = (modalProject as any).markdownFile;
      if (mdFile) {
        setLoading(true);
        fetch(mdFile)
          .then(res => res.text())
          .then(text => {
            setMarkdownContent(text);
            setLoading(false);
          })
          .catch(() => {
            setMarkdownContent('# No documentation available\n\nMarkdown file could not be loaded.');
            setLoading(false);
          });
      } else {
        // Generate basic markdown from project data
        setMarkdownContent(`# ${modalProject.title}\n\n${modalProject.longDescription || modalProject.description}\n\n## Tags\n${modalProject.tags.map(t => `- ${t}`).join('\n')}`);
      }
    } else {
      setMarkdownContent(null);
    }
  }, [modalProject]);

  // Reset zoom when image popup closes
  useEffect(() => {
    if (!imagePopup) {
      setZoom(1);
    }
  }, [imagePopup]);

  // Handle image click in markdown
  const handleImageClick = (src: string) => {
    setImagePopup(src);
  };

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work, from design case studies to full-stack applications
          </p>
        </RevealOnScroll>

        {/* Category Filter */}
        <RevealOnScroll delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {category}
            </button>
          ))}
        </RevealOnScroll>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => {
                    // If a dedicated site page exists for this project, navigate there.
                    if ((project as any).pageUrl) {
                      window.location.href = (project as any).pageUrl;
                      return;
                    }
                    // Otherwise open the markdown modal
                    setModalProject(project);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No projects found in this category.</p>
          </motion.div>
        )}

        {/* View All Button */}
        <RevealOnScroll delay={0.3} className="text-center mt-12">
          <a
            href="https://github.com/Krishna-Vijay-G"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-medium rounded-xl hover:bg-accent hover:text-white transition-all"
          >
            View All Projects on GitHub
            <ArrowRight size={18} className="text-accent group-hover:translate-x-1 transition-transform" />
          </a>
        </RevealOnScroll>

        {/* Markdown Popup Modal */}
        <AnimatePresence>
          {modalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={() => setModalProject(null)}
            >
              {/* Backdrop */}
              <div className={cn(
                "absolute inset-0 backdrop-blur-sm",
                isDark ? "bg-black/80" : "bg-black/40"
              )} />
              
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl"
                onClick={e => e.stopPropagation()}
                style={isDark ? {
                  background: 'linear-gradient(135deg, var(--background) 0%, rgba(var(--accent-rgb), 0.05) 100%)',
                  border: '2px solid rgba(255,255,255,0.04)'
                } : {
                  background: '#ffffff',
                  border: '2px solid rgba(15,23,42,0.12)',
                  ['--muted-foreground' as any]: 'rgba(15,23,42,0.85)',
                  ['--foreground' as any]: 'rgba(15,23,42,0.95)',
                  ['--muted' as any]: 'rgba(226,232,240,1)'
                }}
              >
                {/* Header */}
                <div 
                  className="sticky top-0 z-20 flex items-center justify-between p-4 backdrop-blur-md"
                  style={isDark ? {
                    background: 'rgba(var(--background-rgb), 0.95)',
                    borderBottom: '1px solid rgba(var(--accent-rgb), 0.3)'
                  } : {
                    background: '#ffffff',
                    borderBottom: '1px solid rgba(15,23,42,0.15)'
                  }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-accent truncate pr-4">
                    {modalProject.title}
                  </h3>
                  <button
                    className="flex-shrink-0 p-2 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-white transition-all"
                    onClick={() => setModalProject(null)}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Scrollable Markdown Content */}
                <div 
                  className="overflow-y-auto p-4 sm:p-6 markdown-content"
                  style={{ 
                    maxHeight: 'calc(90vh - 80px)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(var(--accent-rgb)) transparent'
                  }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full"
                      />
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl sm:text-3xl font-bold text-accent mb-4 mt-6 first:mt-0">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl sm:text-2xl font-semibold text-accent/90 mb-3 mt-6 border-b border-accent/20 pb-2">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg sm:text-xl font-semibold text-accent/80 mb-2 mt-4">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-base sm:text-lg font-medium text-foreground mb-2 mt-3">
                            {children}
                          </h4>
                        ),
                        p: ({ children }) => (
                          <p className="text-muted-foreground mb-4 leading-relaxed text-sm sm:text-base">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 space-y-1 text-muted-foreground text-sm sm:text-base">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 space-y-1 text-muted-foreground text-sm sm:text-base">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-muted-foreground">
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-accent">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic text-foreground/80">
                            {children}
                          </em>
                        ),
                        code: ({ className, children, ...props }) => {
                          const isInline = !className;
                          if (isInline) {
                            return (
                              <code className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-xs sm:text-sm font-mono">
                                {children}
                              </code>
                            );
                          }
                          return (
                            <code className={cn("block overflow-x-auto p-4 rounded-lg bg-muted/50 border border-accent/20 text-xs sm:text-sm font-mono mb-4", className)} {...props}>
                              {children}
                            </code>
                          );
                        },
                        pre: ({ children }) => (
                          <pre className="overflow-x-auto p-4 rounded-lg bg-muted/50 border border-accent/20 text-xs sm:text-sm font-mono mb-4">
                            {children}
                          </pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-accent pl-4 py-2 mb-4 bg-accent/5 rounded-r-lg">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a 
                            href={href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 underline underline-offset-2"
                          >
                            {children}
                          </a>
                        ),
                        img: ({ src, alt }) => (
                          <div 
                            className="relative my-4 cursor-pointer group"
                            onClick={() => src && handleImageClick(src)}
                          >
                            <img 
                              src={src} 
                              alt={alt || 'Image'} 
                              className="w-full max-w-full h-auto rounded-lg border border-accent/30 transition-transform group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
                              <ZoomIn className="text-white" size={32} />
                            </div>
                          </div>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto mb-4">
                            <table 
                              className="w-full border-collapse text-xs sm:text-sm"
                              style={isDark ? {
                                border: '1px solid rgba(var(--accent-rgb), 0.3)'
                              } : {
                                border: '1px solid rgba(148,163,184,0.3)'
                              }}
                            >
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead 
                            style={isDark ? {
                              background: 'rgba(var(--accent-rgb), 0.1)'
                            } : {
                              background: 'rgba(226,232,240,0.6)'
                            }}
                          >
                            {children}
                          </thead>
                        ),
                        th: ({ children }) => (
                          <th 
                            className="px-2 sm:px-4 py-2 text-left font-semibold"
                            style={isDark ? {
                              border: '1px solid rgba(var(--accent-rgb), 0.3)',
                              color: 'var(--accent)'
                            } : {
                              border: '1px solid rgba(148,163,184,0.3)',
                              color: 'rgba(15,23,42,0.95)'
                            }}
                          >
                            {children}
                          </th>
                        ),
                        td: ({ children }) => (
                          <td 
                            className="px-2 sm:px-4 py-2"
                            style={isDark ? {
                              border: '1px solid rgba(var(--accent-rgb), 0.3)',
                              color: 'var(--muted-foreground)'
                            } : {
                              border: '1px solid rgba(148,163,184,0.3)',
                              color: 'rgba(51,65,85,0.9)'
                            }}
                          >
                            {children}
                          </td>
                        ),
                        hr: () => (
                          <hr className="border-accent/30 my-6" />
                        ),
                      }}
                    >
                      {markdownContent || ''}
                    </ReactMarkdown>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Zoom Popup */}
        <AnimatePresence>
          {imagePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center"
              onClick={() => setImagePopup(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/90" />
              
              {/* Zoom Controls */}
              <div 
                className="absolute top-4 right-4 z-10 flex gap-2"
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="p-3 rounded-full bg-accent/20 hover:bg-accent text-white transition-all"
                  onClick={() => setZoom(z => Math.min(z + 0.5, 4))}
                  aria-label="Zoom in"
                >
                  <ZoomIn size={20} />
                </button>
                <button
                  className="p-3 rounded-full bg-accent/20 hover:bg-accent text-white transition-all"
                  onClick={() => setZoom(z => Math.max(z - 0.5, 0.5))}
                  aria-label="Zoom out"
                >
                  <ZoomOut size={20} />
                </button>
                <button
                  className="p-3 rounded-full bg-accent/20 hover:bg-accent text-white transition-all"
                  onClick={() => setImagePopup(null)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Zoom level indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-accent/20 text-white text-sm">
                {Math.round(zoom * 100)}%
              </div>

              {/* Image Container - No scroll, just zoom */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative z-10 flex items-center justify-center w-full h-full p-4 overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={imagePopup}
                  alt="Zoomed image"
                  className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
                  style={{ transform: `scale(${zoom})` }}
                  draggable={false}
                  onClick={() => setImagePopup(null)}
                />
              </motion.div>

              {/* Tap anywhere hint */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-white/50 text-xs sm:text-sm">
                Tap anywhere to close
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof portfolioData.projects[0];
  onClick?: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="relative h-full w-full max-w-full rounded-2xl overflow-hidden glass-card gradient-border"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
            <span className="text-6xl opacity-30">🚀</span>
          </div>
        )}
        
        {/* Overlay - Always visible with icons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start p-4">
          {/* Icons - Always visible in bottom left */}
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-accent/20 backdrop-blur-sm text-accent hover:bg-accent hover:text-white transition-colors"
                aria-label="View on GitHub"
                onClick={e => e.stopPropagation()}
              >
                <Github size={18} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-accent/20 backdrop-blur-sm text-accent hover:bg-accent hover:text-white transition-colors"
                aria-label="View live demo"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-accent/90 text-white text-xs font-medium rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-accent">{project.category}</span>
          <span className="text-xs text-muted-foreground">{project.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground"
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-md bg-muted text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
