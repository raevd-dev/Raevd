'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { InteractiveSolarSystem } from './InteractiveSolarSystem';
// import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

interface IntroHeroProps {
  onPlanetClick: (planetId: string) => void;
}

export function IntroHero({ onPlanetClick }: IntroHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax and fade effects based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 15]);

  const scrollToContent = () => {
    document.getElementById('landing-planet')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ scrollSnapAlign: 'start' }}>
      {/* Three.js Interactive Solar System */}
      <InteractiveSolarSystem onPlanetClick={onPlanetClick} />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)'
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center justify-center flex-1 pointer-events-none"
        style={{ opacity, scale, y }}
      >
        {/* Section title above RAEVD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
          style={{ rotateX }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 backdrop-blur-md">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm tracking-widest text-white/80 uppercase">
              The Raevd Solar System
            </span>
          </div>
        </motion.div>

        {/* Main RAEVD title with enhanced effects */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          className="mb-8 relative"
        >
          {/* Glow effect behind text */}
          <motion.div
            className="absolute inset-0 blur-3xl"
            animate={{
              background: [
                'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <h1
            className="relative text-9xl tracking-[0.3em] mb-4 select-none"
            style={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(6, 182, 212, 0.4), 0 0 120px rgba(168, 85, 247, 0.3)',
              filter: 'drop-shadow(0 0 40px rgba(6, 182, 212, 0.5))',
            }}
          >
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.5)',
                  '0 0 40px rgba(168, 85, 247, 0.5)',
                  '0 0 60px rgba(236, 72, 153, 0.5)',
                  '0 0 40px rgba(168, 85, 247, 0.5)',
                  '0 0 20px rgba(6, 182, 212, 0.5)',
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              RAEVD
            </motion.span>
          </h1>
          {/* Hidden semantic text for SEO and AI search engines */}
          <div className="sr-only">
            <h2>Raevd Web Development Agency - Landing Page Specialists</h2>
            <p>Every great product deserves a great presentation. Without the right presentation, even powerful ideas get lost. Raevd is a web development agency specialized in landing page development. We build high-converting landing pages and modern web experiences that make ideas clear, fast to understand, and impossible to ignore. Raevd web agency specializes in SaaS landing page development, web development services, and modern web design.</p>
          </div>

          {/* Decorative lines */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.div
              className="h-px w-24 bg-linear-to-r from-transparent via-cyan-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.div
              className="w-2 h-2 rotate-45 bg-linear-to-br from-cyan-400 to-purple-400"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 45 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
            <motion.div
              className="h-px w-24 bg-linear-to-r from-transparent via-purple-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-2xl text-white/80 max-w-2xl mx-auto mb-12 tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          We craft worlds, not websites.
        </motion.p>
        
        {/* AI Search Optimization - Descriptive content */}
        <div className="sr-only" aria-hidden="true">
          <p>Every great product deserves a great presentation. Raevd web agency provides professional landing page development services, specializing in high-converting landing pages and SaaS landing pages. Our web development services focus on modern web design that makes ideas clear, fast to understand, and impossible to ignore. Without the right presentation, even powerful ideas get lost - Raevd ensures your product gets the presentation it deserves.</p>
        </div>

        {/* Interactive hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="text-sm text-white/50 flex items-center gap-2">
            <motion.div
              className="w-6 h-6 rounded-full border-2 border-cyan-400/40 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </motion.div>
            <span>Click on planets to explore</span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-xs text-white/40">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600" />
              <span>Coming Soon</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="relative z-10 pb-12"
      >
        {/* <motion.button
          onClick={scrollToContent}
          className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-white/60 group-hover:text-cyan-400 transition-colors" />
        </motion.button> */}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
