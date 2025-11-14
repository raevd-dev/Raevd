// @ts-nocheck - React Three Fiber extends JSX types but TypeScript doesn't always recognize them
'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Stars, Float, Html, OrbitControls } from '@react-three/drei';
import {
  CanvasTexture,
  RepeatWrapping,
  Group,
  Mesh,
  Points,
  BackSide,
  AdditiveBlending,
  DoubleSide
} from 'three';

// Create enhanced procedural planet texture with more detail
function createPlanetTexture(color: string, type: 'rocky' | 'gas' | 'ice' = 'rocky') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Base color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1024, 1024);

  // Add surface details based on type
  if (type === 'gas') {
    // Gas giant bands
    for (let y = 0; y < 1024; y += 40) {
      const bandHeight = 20 + Math.random() * 30;
      const opacity = 0.1 + Math.random() * 0.2;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(0, y, 1024, bandHeight);

      // Add turbulence to bands
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * 1024;
        const yPos = y + Math.random() * bandHeight;
        const size = Math.random() * 20;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        ctx.beginPath();
        ctx.ellipse(x, yPos, size * 2, size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (type === 'ice') {
    // Ice planet - add cracks and ice crystals
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 4;
      const opacity = Math.random() * 0.6;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(x, y, size, size);
    }

    // Add cracks
    for (let i = 0; i < 50; i++) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      ctx.beginPath();
      ctx.moveTo(Math.random() * 1024, Math.random() * 1024);
      for (let j = 0; j < 5; j++) {
        ctx.lineTo(Math.random() * 1024, Math.random() * 1024);
      }
      ctx.stroke();
    }
  } else {
    // Rocky planet - craters and surface details
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const radius = 10 + Math.random() * 50;

      // Crater
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add surface noise
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const size = Math.random() * 2;
      const brightness = Math.random() > 0.5 ? 255 : 0;
      const opacity = Math.random() * 0.3;
      ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${opacity})`;
      ctx.fillRect(x, y, size, size);
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

// Create cloud layer for gas planets
function createCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, 1024, 1024);

  // Add wispy clouds
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const width = 50 + Math.random() * 150;
    const height = 10 + Math.random() * 30;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, width);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(x - width/2, y - height/2, width, height);
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  return texture;
}

// Enhanced bump map with more detail
function createBumpMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 1024, 1024);

  // Add detailed noise
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const size = Math.random() * 3;
    const brightness = Math.floor(Math.random() * 128) + 64;
    ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  return new CanvasTexture(canvas);
}

interface OrbitingPlanetProps {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  speed: number;
  offset: number;
  type: 'rocky' | 'gas' | 'ice';
  isActive: boolean;
  onClick: () => void;
  hasRing?: boolean;
  url?: string;
}

function OrbitingPlanet({
  name,
  color,
  size,
  orbitRadius,
  speed,
  offset,
  type,
  isActive,
  onClick,
  hasRing,
  url
}: OrbitingPlanetProps) {
  // Determine cursor style based on planet configuration
  const cursorStyle = isActive && url ? 'pointer' : isActive ? 'not-allowed' : 'default';
  const groupRef = useRef<Group>(null);
  const planetRef = useRef<Mesh>(null);
  const cloudRef = useRef<Mesh>(null);
  const atmosphereRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const orbitParticlesRef = useRef<Points>(null);
  const [hovered, setHovered] = useState(false);

  const texture = useMemo(() => createPlanetTexture(color, type), [color, type]);
  const bumpMap = useMemo(() => createBumpMap(), []);
  const cloudTexture = useMemo(() => type === 'gas' ? createCloudTexture() : null, [type]);

  // Create particle trail around planet
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      const angle = (i / 50) * Math.PI * 2;
      const radius = size * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [size]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed + offset;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003;
      planetRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.004;
    }
    if (atmosphereRef.current && isActive) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      atmosphereRef.current.scale.setScalar(size * 1.25 * pulse);
      const material = atmosphereRef.current.material;
      if (material && 'opacity' in material) {
        material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      glowRef.current.scale.setScalar(size * 1.7 * pulse);
    }
    if (orbitParticlesRef.current) {
      orbitParticlesRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isActive && url) {
      window.location.href = url;
    } else if (isActive) {
      onClick();
    }
  };

  return (
    <group ref={groupRef}>
      <group position={[orbitRadius, 0, 0]}>
        {/* Outer glow - visible for ALL planets */}
        <mesh
          ref={glowRef}
          scale={size * 1.7}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            // Update canvas cursor style
            const canvasElement = document.querySelector('canvas');
            if (canvasElement) {
              canvasElement.style.cursor = cursorStyle;
            }
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            // Reset canvas cursor
            const canvasElement = document.querySelector('canvas');
            if (canvasElement) {
              canvasElement.style.cursor = 'grab';
            }
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.3 : 0.15}
            side={BackSide}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Atmospheric layer - visible for ALL planets */}
        <mesh
          ref={atmosphereRef}
          scale={size * 1.25}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            // Update canvas cursor style
            const canvasElement = document.querySelector('canvas');
            if (canvasElement) {
              canvasElement.style.cursor = cursorStyle;
            }
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            // Reset canvas cursor
            const canvasElement = document.querySelector('canvas');
            if (canvasElement) {
              canvasElement.style.cursor = 'grab';
            }
          }}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isActive ? 0.35 : 0.2}
            side={BackSide}
            blending={AdditiveBlending}
          />
        </mesh>

        {/* Particle ring around planet */}
        {isActive && (
          <points ref={orbitParticlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={particlePositions.length / 3}
                array={particlePositions}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.05}
              color={color}
              transparent
              opacity={0.6}
              sizeAttenuation
              blending={AdditiveBlending}
            />
          </points>
        )}

        {/* Planet body with enhanced materials */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh
            ref={planetRef}
            scale={hovered ? size * 1.2 : size}
            onClick={handleClick}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
              // Update canvas cursor style
              const event = e as unknown as { target: HTMLElement };
              const canvasElement = document.querySelector('canvas');
              if (canvasElement) {
                canvasElement.style.cursor = cursorStyle;
              }
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHovered(false);
              // Reset canvas cursor
              const canvasElement = document.querySelector('canvas');
              if (canvasElement) {
                canvasElement.style.cursor = 'grab';
              }
            }}
          >
            <sphereGeometry args={[1, 128, 128]} />
            <meshStandardMaterial
              map={texture}
              bumpMap={bumpMap}
              bumpScale={type === 'rocky' ? 0.08 : 0.03}
              color={isActive ? '#ffffff' : '#888888'}
              emissive={color}
              emissiveIntensity={isActive ? 0.5 : 0.2}
              roughness={type === 'ice' ? 0.2 : type === 'gas' ? 0.6 : 0.9}
              metalness={type === 'ice' ? 0.5 : 0.1}
              opacity={isActive ? 1 : 0.7}
              transparent={!isActive}
              envMapIntensity={1.2}
            />
          </mesh>

          {/* Cloud layer for gas planets - visible for ALL gas planets */}
          {type === 'gas' && cloudTexture && (
            <mesh ref={cloudRef} scale={size * 1.01}>
              <sphereGeometry args={[1, 64, 64]} />
              <meshStandardMaterial
                map={cloudTexture}
                transparent
                opacity={isActive ? 0.5 : 0.3}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>
          )}

          {/* Ring for gas giants - enhanced and ALWAYS visible */}
          {hasRing && (
            <>
              <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                <ringGeometry args={[size * 1.4, size * 2.0, 128]} />
                <meshStandardMaterial
                  color={isActive ? color : '#777777'}
                  transparent
                  opacity={isActive ? 0.75 : 0.5}
                  side={DoubleSide}
                  emissive={color}
                  emissiveIntensity={isActive ? 0.4 : 0.15}
                  roughness={0.7}
                />
              </mesh>
              {/* Ring glow - always visible */}
              <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                <ringGeometry args={[size * 1.35, size * 2.05, 128]} />
                <meshBasicMaterial
                  color={color}
                  transparent
                  opacity={isActive ? 0.25 : 0.12}
                  side={DoubleSide}
                  blending={AdditiveBlending}
                />
              </mesh>
            </>
          )}

          {/* Enhanced Label with MASSIVE, ultra-clear visibility */}
          <Html
            distanceFactor={5}
            position={[0, size * 2.5, 0]}
            center
            style={{ pointerEvents: 'none' }}
          >
            <div className="flex flex-col items-center gap-3">
              {/* Planet name with MASSIVE sizing */}
              <div
                className={`px-8 py-4 rounded-2xl backdrop-blur-xl border-4 transition-all shadow-2xl ${
                  isActive
                    ? 'bg-black/90 border-white/50'
                    : 'bg-black/70 border-white/25'
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 0 40px ${color}80, 0 0 80px ${color}40, 0 12px 30px rgba(0,0,0,0.8)`
                    : '0 12px 30px rgba(0,0,0,0.7)',
                  fontWeight: 900,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: hovered && isActive ? '60px' : '50px',
                  minWidth: '260px',
                  transition: 'all 0.3s ease',
                  transform: hovered && isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="rounded-full animate-pulse"
                    style={{
                      width: hovered && isActive ? '16px' : '12px',
                      height: hovered && isActive ? '16px' : '12px',
                      backgroundColor: isActive ? color : '#666',
                      boxShadow: isActive ? `0 0 20px ${color}, 0 0 40px ${color}80` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <span style={{
                    color: isActive ? '#ffffff' : '#aaaaaa',
                    textShadow: isActive
                      ? `0 0 30px ${color}cc, 0 0 60px ${color}66, 0 2px 8px rgba(0,0,0,0.8)`
                      : '0 2px 8px rgba(0,0,0,0.8)',
                    WebkitTextStroke: isActive ? '0.5px rgba(255,255,255,0.3)' : 'none',
                  }}>
                    {name}
                  </span>
                </div>
              </div>

              {/* Status badge - larger */}
              {!isActive && (
                <div
                  className="px-5 py-2.5 rounded-full bg-black/70 border-2 border-white/20 text-white/60 backdrop-blur-lg"
                  style={{
                    fontSize: '15px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  COMING SOON
                </div>
              )}

              {isActive && hovered && (
                <div
                  className="px-6 py-3 rounded-xl backdrop-blur-xl animate-pulse"
                  style={{
                    backgroundColor: `${color}40`,
                    borderColor: `${color}`,
                    borderWidth: '3px',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    boxShadow: `0 0 30px ${color}80, 0 0 60px ${color}40`,
                    textShadow: `0 0 15px ${color}, 0 2px 4px rgba(0,0,0,0.8)`,
                  }}
                >
                  {url ? '► CLICK TO VISIT' : '► CLICK TO EXPLORE'}
                </div>
              )}
            </div>
          </Html>
        </Float>

        {/* Point lights for ALL planets - brighter for active */}
        <pointLight
          color={color}
          intensity={isActive ? 2.5 : 0.8}
          distance={isActive ? 10 : 6}
          decay={2}
        />
        {isActive && (
          <pointLight color={color} intensity={1.5} distance={15} decay={2} />
        )}
      </group>
    </group>
  );
}

function OrbitRings() {
  const rings = [
    { radius: 8, color: '#06b6d4', opacity: 0.2 },
    { radius: 12, color: '#a855f7', opacity: 0.18 },
    { radius: 16, color: '#ec4899', opacity: 0.15 },
  ];

  return (
    <>
      {rings.map((ring, i) => (
        <group key={i}>
          {/* Main orbit ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[ring.radius - 0.03, ring.radius + 0.03, 256]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.opacity}
              side={DoubleSide}
            />
          </mesh>
          {/* Glow ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[ring.radius - 0.1, ring.radius + 0.1, 256]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.opacity * 0.3}
              side={DoubleSide}
              blending={AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      const radius = 5 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;

      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlePositions.length / 3}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={AdditiveBlending}
      />
    </points>
  );
}

function CentralCore() {
  const coreRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const pulseRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(pulse);
    }
    if (pulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      pulseRef.current.scale.setScalar(pulse);
      pulseRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {/* Outer glow layers */}
      <mesh ref={pulseRef} scale={4}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          transparent
          opacity={0.05}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh ref={glowRef} scale={3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.15}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>

      <mesh scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
          side={BackSide}
          blending={AdditiveBlending}
        />
      </mesh>

      {/* Core sphere */}
      <mesh ref={coreRef} scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Core lights */}
      <pointLight color="#ffffff" intensity={4} distance={30} />
      <pointLight color="#06b6d4" intensity={3} distance={20} />
      <pointLight color="#a855f7" intensity={2} distance={25} />
    </group>
  );
}

interface InteractiveSolarSystemProps {
  onPlanetClick: (planetId: string) => void;
}

export function InteractiveSolarSystem({ onPlanetClick }: InteractiveSolarSystemProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const planets = [
    {
      id: 'landing',
      name: 'LANDING',
      color: '#06b6d4',
      size: 1.0,
      orbitRadius: 8,
      speed: 0.2,
      offset: 0,
      type: 'ice' as const,
      isActive: true,
      url: 'https://landing.raevd.com',
    },
    {
      id: 'team',
      name: 'TEAM',
      color: '#a855f7',
      size: 1.1,
      orbitRadius: 12,
      speed: 0.15,
      offset: Math.PI / 3,
      type: 'gas' as const,
      isActive: true,
      hasRing: true,
      url: 'https://me.raevd.com',
    },
    {
      id: 'services',
      name: 'SERVICES',
      color: '#ec4899',
      size: 0.9,
      orbitRadius: 12,
      speed: 0.15,
      offset: Math.PI,
      type: 'rocky' as const,
      isActive: false,
    },
    {
      id: 'portfolio',
      name: 'PORTFOLIO',
      color: '#8b5cf6',
      size: 0.95,
      orbitRadius: 16,
      speed: 0.1,
      offset: Math.PI / 2,
      type: 'gas' as const,
      isActive: false,
      hasRing: true,
    },
    {
      id: 'lab',
      name: 'LAB',
      color: '#10b981',
      size: 0.85,
      orbitRadius: 16,
      speed: 0.1,
      offset: Math.PI * 1.3,
      type: 'ice' as const,
      isActive: false,
    },
    {
      id: 'contact',
      name: 'CONTACT',
      color: '#f59e0b',
      size: 0.9,
      orbitRadius: 8,
      speed: 0.2,
      offset: Math.PI * 1.5,
      type: 'rocky' as const,
      isActive: false,
    },
  ];

  return (
    <div className="absolute inset-0 w-full h-full z-0">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 pointer-events-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <div className="text-cyan-400 text-sm tracking-widest animate-pulse">
              LOADING UNIVERSE...
            </div>
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 15, 25], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'grab' }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />

        {/* Stars with enhanced settings */}
        <Stars
          radius={100}
          depth={50}
          count={7000}
          factor={5}
          saturation={0}
          fade
        />

        {/* Central core */}
        <CentralCore />

        {/* Orbit rings */}
        <OrbitRings />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Orbiting planets */}
        {planets.map((planet) => (
          <OrbitingPlanet
            key={planet.id}
            {...planet}
            onClick={() => onPlanetClick(planet.id)}
          />
        ))}

        {/* Orbit controls for interaction - disabled mouse rotation to allow planet clicks */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
          enableDamping={false}
        />
      </Canvas>
    </div>
  );
}
