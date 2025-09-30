"use client";

import { useEffect, useRef } from 'react';

interface AnimatedMeshGradientProps {
  colors?: string[];
  speed?: number;
  className?: string;
}

export function AnimatedMeshGradient({
  colors = [
    '#3b82f6', // blue-500
    '#8b5cf6', // purple-500
    '#ec4899', // pink-500
    '#06b6d4', // cyan-500
  ],
  speed = 0.0005,
  className = ''
}: AnimatedMeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size with proper DPI scaling
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create gradient mesh points with more strategic placement
    const gridSize = 5; // Increased for more complexity
    const points: { x: number; y: number; baseX: number; baseY: number; color: string; speed: number }[] = [];

    for (let i = 0; i <= gridSize; i++) {
      for (let j = 0; j <= gridSize; j++) {
        const x = (window.innerWidth / gridSize) * i;
        const y = (window.innerHeight / gridSize) * j;
        points.push({
          x,
          y,
          baseX: x,
          baseY: y,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: 0.8 + Math.random() * 0.4 // Varied speeds for organic movement
        });
      }
    }

    // Animation loop with improved rendering
    const animate = () => {
      if (!canvas || !ctx) return;

      timeRef.current += speed;
      const time = timeRef.current;

      // Clear with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark gradient base layer for depth
      const baseGradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      baseGradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      baseGradient.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Update point positions with varied sine waves
      points.forEach((point, index) => {
        const offsetX = Math.sin(time * 1.5 * point.speed + index * 0.8) * 120;
        const offsetY = Math.cos(time * 1.2 * point.speed + index * 0.6) * 120;
        point.x = point.baseX + offsetX;
        point.y = point.baseY + offsetY;
      });

      // Draw gradients with lighten blend mode for subtle colors
      ctx.globalCompositeOperation = 'lighten';

      points.forEach((point, index) => {
        // Create subtle, atmospheric gradients
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, window.innerWidth / 2
        );

        // Subtle opacity for dark, moody atmosphere
        const opacity = 0.12 + Math.sin(time * 2 + index * 0.5) * 0.04;

        gradient.addColorStop(0, `${point.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.5, `${point.color}${Math.floor(opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      });

      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        filter: 'blur(70px) saturate(1.1)', // Subtle blur and saturation
        opacity: 0.35, // Lower opacity for darker look
        mixBlendMode: 'normal',
      }}
    />
  );
}