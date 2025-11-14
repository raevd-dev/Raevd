'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface NavigationDotsProps {
  sections: Array<{ id: string; name: string; color: string }>;
}

export function NavigationDots({ sections }: NavigationDotsProps) {
  const [activeSection, setActiveSection] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(index);
        }
      }
    });
  }, [sections]);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.div
      className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.5 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="relative group"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Dot */}
          <motion.div
            className="w-3 h-3 rounded-full border-2 transition-all"
            style={{
              borderColor: activeSection === index ? section.color : 'rgba(255,255,255,0.2)',
              backgroundColor: activeSection === index ? section.color : 'transparent',
            }}
            animate={{
              scale: activeSection === index ? 1 : 0.8,
            }}
          />

          {/* Glow effect */}
          {activeSection === index && (
            <motion.div
              className="absolute inset-0 rounded-full blur-md"
              style={{ backgroundColor: section.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 2 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Tooltip */}
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-white/80">
              {section.name}
            </div>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
