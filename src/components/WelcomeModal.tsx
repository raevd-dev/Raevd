'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';

export function WelcomeModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem('raevd-welcome-seen');

    if (!hasSeenModal) {
      // Show modal after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('raevd-welcome-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-2xl w-full bg-linear-to-br from-black/90 via-purple-950/30 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl shadow-cyan-500/20"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
              >
                <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-cyan-500 to-purple-500 mb-6"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-4xl md:text-5xl mb-4 bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to Raevd
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-white/70 text-lg md:text-xl mb-8 max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Embark on a journey through our solar system. Each planet represents
                  a unique experience waiting to be discovered.
                </motion.p>

                {/* Features */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-cyan-400 mb-2">🌍</div>
                    <div className="text-sm text-white/80">Interactive Planets</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-purple-400 mb-2">✨</div>
                    <div className="text-sm text-white/80">3D Experience</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-pink-400 mb-2">🚀</div>
                    <div className="text-sm text-white/80">Explore & Discover</div>
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleClose}
                  className="px-8 py-4 rounded-full bg-linear-to-r from-cyan-500 to-purple-500 text-white relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 tracking-wide">Begin Exploration</span>

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.button>

                {/* Hint */}
                <motion.p
                  className="text-white/40 text-sm mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Tip: Click and drag to explore the 3D solar system
                </motion.p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
