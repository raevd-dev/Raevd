'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const [particles, setParticles] = useState<Array<{
    left: string;
    top: string;
    duration: number;
    delay: number;
  }>>([]);

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const currentYear = new Date().getFullYear();

  // Generate consistent particle positions only on client to avoid hydration mismatch
  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, (_, i) => {
      // Use index to create deterministic but varied positions
      const seed = i * 137.508; // Golden angle for good distribution
      return {
        left: ((seed % 97) + 2).toFixed(4),
        top: (((seed * 1.618) % 97) + 2).toFixed(4),
        duration: 3 + ((i % 3) * 0.7),
        delay: (i % 5) * 0.4,
      };
    });
    setParticles(generatedParticles);
  }, []);

  return (
    <footer className="relative py-24 px-6 overflow-hidden" style={{ scrollSnapAlign: 'start' }}>
      {/* Animated nebula background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-purple-900/20 via-cyan-900/10 to-transparent"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Floating particles */}
      {particles.length > 0 && (
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-6 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Explore More Worlds Soon
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">
              The Raevd universe is expanding. New planets, new experiences, infinite possibilities.
            </p>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="#contact"
              className="inline-block px-10 py-5 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 text-white relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>Start Your Journey</span>
              </span>
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative mb-12">
          <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <motion.div
            className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ width: '30%' }}
          />
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl tracking-widest bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              RAEVD
            </h3>
            <p className="text-white/40 text-sm mt-1">Crafting digital universes</p>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Raevd Studio. All rights reserved.
          </motion.div>
        </div>

        {/* Constellation decoration */}
        <svg className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
          <motion.circle
            cx="50"
            cy="50"
            r="2"
            fill="white"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="120"
            cy="80"
            r="2"
            fill="white"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="180"
            cy="120"
            r="2"
            fill="white"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <line x1="50" y1="50" x2="120" y2="80" stroke="white" strokeWidth="0.5" />
          <line x1="120" y1="80" x2="180" y2="120" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>
    </footer>
  );
}
