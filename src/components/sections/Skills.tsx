'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Palette, Database, Wrench } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import { RevealOnScroll } from '@/components/ui/Animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
} from 'recharts';

const categoryIcons: Record<string, React.ReactNode> = {
  'Frontend Development': <Code size={20} />,
  'Programming Languages': <Code size={20} />,
  'UI/UX Design': <Palette size={20} />,
  'Data & AI': <Database size={20} />,
  'Tools & Platforms': <Wrench size={20} />,
};

// Chart type mapping for each category
const chartTypes: Record<string, 'horizontal-bar' | 'radar' | 'radial' | 'vertical-bar' | 'area'> = {
  'Frontend Development': 'horizontal-bar',
  'Programming Languages': 'radar',
  'UI/UX Design': 'radial',
  'Data & AI': 'vertical-bar',
  'Tools & Platforms': 'area',
};

export function Skills() {

  const { skills } = portfolioData;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);

  // Initialize scroll position to start
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee && marquee.scrollWidth > 0) {
      marquee.scrollLeft = 0;
    }
  }, []);

  // Auto-scroll effect with proper wrapping
  useEffect(() => {
    if (!autoScroll || isDragging) return;
    const marquee = marqueeRef.current;
    if (!marquee) return;
    
    let frame: number;
    const scroll = () => {
      const maxScroll = marquee.scrollWidth - marquee.clientWidth;
      const singleSetWidth = maxScroll / 2; // Width of one set of skills
      
      marquee.scrollLeft += 1;
      
      // Jump back seamlessly when reaching the second duplicate
      if (marquee.scrollLeft >= singleSetWidth) {
        marquee.scrollLeft = 0;
      }
      
      frame = requestAnimationFrame(scroll);
    };
    
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [autoScroll, isDragging]);

  // Drag handlers with seamless wrapping
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setAutoScroll(false);
    setStartX(e.clientX);
    setScrollLeft(marqueeRef.current?.scrollLeft || 0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !marqueeRef.current) return;
    
    const marquee = marqueeRef.current;
    const x = e.clientX;
    const walk = (x - startX) * 2;
    let newScroll = scrollLeft - walk;
    
    const maxScroll = marquee.scrollWidth - marquee.clientWidth;
    const oneThird = maxScroll / 3;
    const singleSetWidth = maxScroll / 2; // Width of one set of skills
    
    // Handle wrapping in both directions
    while (newScroll < 0) {
      newScroll += singleSetWidth;
    }
    while (newScroll > singleSetWidth) {
      newScroll -= singleSetWidth;
    }
    
    marquee.scrollLeft = newScroll;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoScroll(true), 500);
  };

  return (
    <section id="skills" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </RevealOnScroll>

        {/* Tech Stack Marquee */}
        <RevealOnScroll delay={0.1} className="mb-16">
          <div className="relative overflow-hidden py-4 marquee-container">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            {/* Marquee */}
            <div
              ref={marqueeRef}
              className="flex gap-4 shrink-0 overflow-x-auto scrollbar-hide cursor-grab px-2"
              style={{ userSelect: isDragging ? 'none' : 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {[...skills.techStack, ...skills.techStack, ...skills.techStack].map((tech, index) => (
                <div
                  key={`${tech}-${index}`}
                  className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-card border border-border whitespace-nowrap"
                >
                  <img
                    src={`/images/skills/${tech.replace(/\s|\+/g, '').toLowerCase()}.png`}
                    alt={`${tech} logo`}
                    className="w-5 h-5 object-contain"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories.map((category, categoryIndex) => (
            <RevealOnScroll key={category.name} delay={categoryIndex * 0.1}>
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
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10">
                    {categoryIcons[category.name] || <Code size={20} className="text-accent" />}
                  </div>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {chartTypes[category.name] === 'horizontal-bar' && (
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          delay={skillIndex * 0.1}
                        />
                      ))}
                    </div>
                  )}
                  
                  {chartTypes[category.name] === 'radar' && (
                    <RadarChartComponent skills={category.skills} />
                  )}
                  
                  {chartTypes[category.name] === 'radial' && (
                    <RadialBarChartComponent skills={category.skills} />
                  )}
                  
                  {chartTypes[category.name] === 'vertical-bar' && (
                    <VerticalBarChartComponent skills={category.skills} />
                  )}
                  
                  {chartTypes[category.name] === 'area' && (
                    <AreaChartComponent skills={category.skills} />
                  )}
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
        />
      </div>
    </div>
  );
}

// Radar Chart Component
interface ChartSkill {
  name: string;
  level: number;
  icon?: string;
}

function RadarChartComponent({ skills }: { skills: ChartSkill[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const clipId = `radar-clip-${Math.random().toString(36).slice(2, 9)}`;
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // measure container size for SVG mask
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);
    const rect = el.getBoundingClientRect();
    setSize({ w: rect.width, h: rect.height });
    return () => ro.disconnect();
  }, [containerRef.current]);
  
  const data = skills.map(skill => ({
    subject: skill.name,
    value: mounted ? skill.level : 0,
    fullMark: 100,
  }));

  return (
    <motion.div 
      ref={ref} 
      className="h-64 w-full"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {isInView && (
        <div ref={containerRef} className="relative w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid 
                stroke="var(--accent)" 
                strokeOpacity={0.2} 
                strokeWidth={1} 
              />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'var(--foreground)', fontSize: 11, fontWeight: 500 }}
                tickLine={{ stroke: 'var(--accent)', strokeOpacity: 0.3 }}
              />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                  axisLine={{ stroke: 'var(--accent)', strokeOpacity: 0.2 }}
                  tickFormatter={(value: number) => (value === 0 || value === 100 ? '' : value.toString())}
                />
              <Radar
                name="Level"
                dataKey="value"
                stroke="var(--accent)"
                fill="var(--accent)"
                fillOpacity={0.4}
                strokeWidth={2}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* Beacon waves masked to radar fill polygon */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${size?.w || 400} ${size?.h || 400}`} preserveAspectRatio="xMidYMid meet">
            {size && (() => {
              const { w, h } = size;
              const cx = w / 2;
              const cy = h / 2;
              const maxR = Math.min(w, h) * 0.4; // match radar available radius
              const n = data.length;
              const points = data.map((d, i) => {
                const angle = (2 * Math.PI * i) / n - Math.PI / 2;
                const r = (d.value / 100) * maxR;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ');

              return (
                <>
                  <defs>
                    <clipPath id={clipId}>
                      <polygon points={points} />
                    </clipPath>
                  </defs>

                  {[0,1,2].map((i) => (
                    <motion.circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={0}
                      fill="none"
                      stroke={`rgba(var(--accent-rgb), 0.9)`}
                      strokeWidth={2}
                      clipPath={`url(#${clipId})`}
                      initial={{ r: 0, opacity: 0.6 }}
                      animate={{ r: [0, maxR * 1.1], opacity: [0.6, 0] }}
                      transition={{ duration: 3, delay: i * 3, repeat: Infinity, ease: 'linear' }}
                    />
                  ))}
                </>
              );
            })()}
          </svg>
        </div>
      )}
    </motion.div>
  );
}

// Radial Bar Chart Component
function RadialBarChartComponent({ skills }: { skills: ChartSkill[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setMounted(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  // Use accent color with different opacities for different shades
  const getAccentShade = (index: number, total: number) => {
    // Create different opacity levels: 100%, 80%, 60%, 40%
    const opacities = [1, 0.8, 0.6, 0.4];
    return `rgba(var(--accent-rgb), ${opacities[index % opacities.length]})`;
  };
  
  const data = skills.map((skill, index) => ({
    name: skill.name,
    value: mounted ? skill.level : 0,
    fill: getAccentShade(index, skills.length),
  })).reverse(); // Reverse so largest is on outside

  const CustomRadialTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-accent rounded-lg px-3 py-2 shadow-xl">
          <p className="text-foreground font-semibold text-sm">{payload[0]?.payload?.name}</p>
          <p className="text-accent-light text-sm">Proficiency: {payload[0]?.value}%</p>
        </div>
      );
    }
    return null;
  };

  const ringThickness = 14;
  const ringGap = 4;
  const baseRadius = 20; // percentage

  return (
    <motion.div 
      ref={ref} 
      className="w-full flex flex-col"
      initial={{ opacity: 0, rotate: -90 }}
      animate={isInView ? { opacity: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {isInView && (
        <>
          <div className="relative w-full h-64 flex justify-center items-center">
            {data.map((entry, index) => {
              const innerRadius = baseRadius + index * (ringThickness + ringGap);
              const outerRadius = innerRadius + ringThickness;
              const clockwise = index % 2 === 0;
              const rotationDirection = clockwise ? 360 : -360;
              const rotationDuration = 14; // seconds; same speed for all rings
              return (
                <motion.div
                  key={entry.name}
                  className="absolute inset-0"
                  animate={{ rotate: rotationDirection }}
                  transition={{ duration: rotationDuration, repeat: Infinity, ease: 'linear' }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      data={[entry]}
                      startAngle={clockwise ? 90 : -270}
                      endAngle={clockwise ? -270 : 90}
                      innerRadius={`${innerRadius}%`}
                      outerRadius={`${outerRadius}%`}
                      cx="50%"
                      cy="50%"
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                      <RadialBar
                        background={{ fill: 'var(--muted)' }}
                        dataKey="value"
                        fill={entry.fill}
                        animationDuration={1500}
                        animationEasing="ease-out"
                        isAnimationActive
                        cornerRadius={10}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </motion.div>
              );
            })}
          </div>
          <motion.div 
            className="w-full grid grid-cols-2 gap-x-4 gap-y-2 text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {data.length > 0 && data.map((item) => (
              <div key={item.name} className="flex items-center gap-2 min-w-0">
                <div
                  className="w-3 h-3 rounded-full shadow-lg flex-shrink-0"
                  style={{ 
                    backgroundColor: item.fill,
                    boxShadow: `0 0 8px ${item.fill}`
                  }}
                />
                <span className="text-muted-foreground font-medium truncate">
                  {item.name} <span className="text-accent">({item.value}%)</span>
                </span>
              </div>
            ))}
            {data.length === 0 && <div className="col-span-2 text-muted-foreground">No skills data</div>}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

// Vertical Bar Chart Component
function VerticalBarChartComponent({ skills }: { skills: ChartSkill[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const data = skills.map(skill => ({
    name: skill.name.length > 10 ? skill.name.substring(0, 8) + '...' : skill.name,
    fullName: skill.name,
    value: skill.level,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-accent rounded-lg px-3 py-2 shadow-xl">
          <p className="text-foreground font-semibold text-sm">{payload[0]?.payload?.fullName}</p>
          <p className="text-accent-light text-sm">Proficiency: {payload[0]?.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      ref={ref} 
      className="h-64 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {isInView && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-light)" stopOpacity={1} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border)" 
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'var(--foreground)', fontSize: 10, fontWeight: 500 }}
              angle={-30}
              textAnchor="end"
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
              height={50}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'var(--muted)', opacity: 0.3 }} />
            <Bar 
              dataKey="value" 
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}

// Area Chart Component
function AreaChartComponent({ skills }: { skills: ChartSkill[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  const data = skills.map(skill => ({
    name: skill.name.length > 8 ? skill.name.substring(0, 6) + '...' : skill.name,
    fullName: skill.name,
    value: skill.level,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-accent rounded-lg px-3 py-2 shadow-xl">
          <p className="text-foreground font-semibold text-sm">{payload[0]?.payload?.fullName}</p>
          <p className="text-accent-light text-sm">Proficiency: {payload[0]?.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      ref={ref} 
      className="h-64 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {isInView && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 30 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.6} />
                <stop offset="50%" stopColor="var(--accent)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="var(--border)" 
              strokeOpacity={0.5}
              vertical={false}
            />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'var(--foreground)', fontSize: 10, fontWeight: 500 }}
              angle={-30}
              textAnchor="end"
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
              height={50}
            />
            <YAxis 
              domain={[0, 100]}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--accent)', strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#areaGradient)"
              animationDuration={1500}
              animationEasing="ease-out"
              dot={{ 
                fill: 'var(--accent)', 
                stroke: 'var(--card)', 
                strokeWidth: 2,
                r: 5
              }}
              activeDot={{ 
                fill: 'var(--accent-light)', 
                stroke: 'var(--card)', 
                strokeWidth: 2,
                r: 7,
                style: { filter: 'drop-shadow(0 0 8px var(--accent))' }
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
}
