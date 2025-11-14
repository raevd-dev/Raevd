'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export function LandingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // 3D rotation effect on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const landingPages = [
    {
      title: 'StellarTech AI',
      description: 'Futuristic AI platform landing page',
      color: 'from-cyan-500 to-blue-500',
      tags: ['AI', 'SaaS', 'B2B'],
    },
    {
      title: 'CosmicFit',
      description: 'Fitness app with immersive experience',
      color: 'from-purple-500 to-pink-500',
      tags: ['Fitness', 'Mobile', 'Consumer'],
    },
    {
      title: 'NebulaCommerce',
      description: 'E-commerce platform redesign',
      color: 'from-orange-500 to-red-500',
      tags: ['E-commerce', 'Retail', 'Web3'],
    },
    {
      title: 'OrbitFinance',
      description: 'Banking dashboard interface',
      color: 'from-green-500 to-emerald-500',
      tags: ['FinTech', 'Dashboard', 'Enterprise'],
    },
    {
      title: 'VoidGaming',
      description: 'Gaming tournament platform',
      color: 'from-indigo-500 to-purple-500',
      tags: ['Gaming', 'Community', 'Events'],
    },
    {
      title: 'AstroEdu',
      description: 'Educational platform for creators',
      color: 'from-yellow-500 to-orange-500',
      tags: ['Education', 'Content', 'Learning'],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="landing-planet"
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-cyan-950/20 to-black" />

      {/* Animated nebula with scroll parallax */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          y: useTransform(scrollYProgress, [0, 1], [0, 200]),
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        style={{ rotateX, scale, opacity, transformPerspective: 1200 }}
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/30">
              <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-cyan-300 uppercase tracking-wider">Landing Planet</span>
            </div>
          </div>
          <h2 className="text-6xl mb-6 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Worlds We've Created
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Each landing page is a portal to a unique digital universe
          </p>
        </motion.div>

        {/* Landing pages grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landingPages.map((landing, index) => (
            <motion.div
              key={landing.title}
              initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                z: 50,
                transition: { duration: 0.3 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="group cursor-pointer"
            >
              {/* Holographic window */}
              <div className="relative h-full">
                {/* Card glow */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${landing.color} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                />

                {/* Card */}
                <div className="relative h-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                  {/* Preview area */}
                  <div className="relative h-48 bg-linear-to-br from-white/5 to-white/0 flex items-center justify-center overflow-hidden">
                    {/* Animated grid background */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Mockup glow */}
                    <div
                      className={`w-32 h-32 bg-linear-to-br ${landing.color} rounded-lg opacity-60 blur-2xl`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-white/60" />
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 text-white">
                        <span>View Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl mb-2 text-white">{landing.title}</h3>
                    <p className="text-white/60 mb-4">{landing.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {landing.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Holographic scanline */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent pointer-events-none"
                    animate={{ y: ['-100%', '200%'] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: index * 0.3,
                    }}
                  />

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${landing.color} opacity-20 blur-2xl`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="group px-8 py-4 rounded-full bg-linear-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 text-white hover:border-cyan-400 transition-all">
            <span className="flex items-center gap-2">
              <span>Explore Full Portfolio</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
