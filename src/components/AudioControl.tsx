'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioControl() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    // Note: In a real implementation, you would add ambient space audio here
    // For now, this is just a UI element
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.button
        onClick={toggleAudio}
        className="relative p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl"
          animate={{
            opacity: isMuted ? 0 : [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Icon */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isMuted ? (
              <motion.div
                key="muted"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <VolumeX className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </motion.div>
            ) : (
              <motion.div
                key="unmuted"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-white/80 whitespace-nowrap">
            {isMuted ? 'Enable ambient sound' : 'Disable ambient sound'}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
