'use client';

import { useEffect, useRef } from 'react';

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;

    const stars: {
      x: number;
      y: number;
      initialY: number;
      radius: number;
      opacity: number;
      speed: number;
      parallaxSpeed: number;
    }[] = [];
    const starCount = 600;

    // Create stars with parallax layers
    for (let i = 0; i < starCount; i++) {
      const y = Math.random() * canvas.height;
      stars.push({
        x: Math.random() * canvas.width,
        y,
        initialY: y,
        radius: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        parallaxSpeed: Math.random() * 0.5 + 0.1, // Different layers move at different speeds
      });
    }

    let animationFrame: number;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        // Calculate parallax offset based on scroll
        const parallaxOffset = scrollY * star.parallaxSpeed;
        const yPos = star.initialY + parallaxOffset * 0.3;

        // Add some horizontal drift for depth effect
        const drift = Math.sin(Date.now() * 0.0001 * star.speed) * 2;

        ctx.beginPath();
        ctx.arc(star.x + drift, yPos, star.radius, 0, Math.PI * 2);

        // Vary opacity based on depth (parallax speed)
        const depthOpacity = star.opacity * (0.3 + star.parallaxSpeed * 0.7);
        ctx.fillStyle = `rgba(255, 255, 255, ${depthOpacity})`;
        ctx.fill();

        // Enhanced twinkle effect
        star.opacity += star.speed;
        if (star.opacity >= 1 || star.opacity <= 0.1) {
          star.speed = -star.speed;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 min-h-screen"
    />
  );
}
