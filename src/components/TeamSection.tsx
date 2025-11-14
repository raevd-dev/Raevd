'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { Rocket, Code, Palette, Zap } from 'lucide-react';
import { useRef } from 'react';

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // 3D transforms on scroll
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const team = [
    {
      name: 'Alex Nova',
      role: 'Creative Director',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      bio: 'Visionary architect of digital experiences',
    },
    {
      name: 'Sam Stellar',
      role: 'Lead Developer',
      icon: Code,
      color: 'from-cyan-500 to-blue-500',
      bio: 'Code wizard bringing designs to life',
    },
    {
      name: 'Jordan Orbit',
      role: 'UX Strategist',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bio: 'Crafting seamless user journeys',
    },
    {
      name: 'Riley Cosmos',
      role: 'Tech Lead',
      icon: Rocket,
      color: 'from-green-500 to-emerald-500',
      bio: 'Pioneering cutting-edge solutions',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="team-planet"
      className="relative min-h-screen py-24 px-6 overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-purple-950/30 to-black" />

      {/* Animated nebula with scroll parallax */}
      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl"
        style={{
          x: useTransform(scrollYProgress, [0, 1], [100, -100]),
          y: useTransform(scrollYProgress, [0, 1], [0, 150]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 180]),
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
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
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/30">
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-purple-300 uppercase tracking-wider">Team Planet</span>
            </div>
          </div>
          <h2 className="text-6xl mb-6 bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Meet the Crew
          </h2>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            The stellar minds navigating the Raevd universe
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50, rotateX: 30, z: -100 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 80,
                }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{
                  y: -20,
                  rotateX: -5,
                  z: 30,
                  transition: { duration: 0.3 },
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="group"
              >
                {/* Holographic card */}
                <div className="relative h-full">
                  {/* Card glow */}
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${member.color} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity duration-300`}
                  />

                  {/* Card content */}
                  <div className="relative h-full bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col items-center text-center overflow-hidden">
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${member.color} opacity-5`}
                        style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)',
                        }}
                      />
                    </div>

                    {/* Avatar */}
                    <div className="relative mb-6">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${member.color} rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity`}
                      />
                      <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="text-xl mb-2 text-white">{member.name}</h3>
                    <div
                      className={`inline-block px-3 py-1 rounded-full bg-linear-to-r ${member.color} bg-opacity-20 border border-white/20 mb-4`}
                    >
                      <span className="text-sm text-white/90">{member.role}</span>
                    </div>
                    <p className="text-white/60 text-sm">{member.bio}</p>

                    {/* Holographic scanline effect */}
                    <motion.div
                      className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent"
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-white/40 italic">
            Together, we navigate the cosmos of creativity
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
