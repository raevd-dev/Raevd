'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function GalaxyOpening() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide the opening animation after completion
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 1200);

    // Prevent scrolling during animation
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          {/* Spiral galaxy background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Multiple spiral arms */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${
                    ['#06b6d4', '#a855f7', '#ec4899', '#f59e0b'][i % 4]
                  }40, transparent)`,
                  transformOrigin: '0% 50%',
                }}
                initial={{
                  rotate: (i * 360) / 8,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  rotate: [(i * 360) / 8, (i * 360) / 8 + 180],
                  scale: [0, 3],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'easeOut',
                  times: [0, 0.5, 1],
                }}
              />
            ))}

            {/* Particle burst */}
            {[...Array(100)].map((_, i) => {
              const angle = (i / 100) * Math.PI * 2;
              const distance = 50 + Math.random() * 50;
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full"
                  style={{
                    background: ['#06b6d4', '#a855f7', '#ec4899', '#f59e0b'][
                      i % 4
                    ],
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.cos(angle) * distance * 10,
                    y: Math.sin(angle) * distance * 10,
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.2 + Math.random() * 0.3,
                    ease: 'easeOut',
                  }}
                />
              );
            })}

            {/* Central glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 4], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <div className="w-[600px] h-[600px] rounded-full bg-linear-radial from-white via-cyan-400 to-transparent blur-3xl" />
            </motion.div>

            {/* Rotating energy rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  borderColor:
                    ['#06b6d4', '#a855f7', '#ec4899'][i] + '40',
                }}
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 2],
                  rotate: [0, i % 2 === 0 ? 360 : -360],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Logo/Text reveal */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: 'spring',
              stiffness: 120,
            }}
          >
            <motion.h1
              className="text-9xl tracking-[0.3em] select-none"
              style={{
                fontWeight: 900,
                background:
                  'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                textShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.8)',
                  '0 0 40px rgba(168, 85, 247, 0.8)',
                  '0 0 60px rgba(236, 72, 153, 0.8)',
                  '0 0 40px rgba(168, 85, 247, 0.8)',
                  '0 0 20px rgba(6, 182, 212, 0.8)',
                ],
              }}
              transition={{
                duration: 1.2,
                repeat: 0,
                ease: 'easeInOut',
              }}
            >
              RAEVD
            </motion.h1>
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-white/60 tracking-widest text-sm">
                INITIALIZING UNIVERSE
              </span>
              <motion.div
                className="w-2 h-2 rounded-full bg-purple-400"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
