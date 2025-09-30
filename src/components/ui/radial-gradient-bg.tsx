"use client";

import { useEffect, useRef } from "react";

interface RadialGradientBgProps {
  centerColor?: string;
  edgeColor?: string;
  className?: string;
}

export function RadialGradientBg({
  className = ''
}: RadialGradientBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate random aura balls
    const auraBalls = Array.from({ length: 8 }, () => ({
      x: Math.random() * 100, // percentage
      y: Math.random() * 100,
      size: 200 + Math.random() * 300, // radius in pixels
      color: Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.15)' : 'rgba(34, 211, 238, 0.12)',
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.02,
    }));

    let animationId: number;

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw aura balls
      auraBalls.forEach((ball) => {
        // Update position
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Bounce off edges
        if (ball.x < -10 || ball.x > 110) ball.speedX *= -1;
        if (ball.y < -10 || ball.y > 110) ball.speedY *= -1;

        // Convert percentage to pixels
        const x = (ball.x / 100) * canvas.width;
        const y = (ball.y / 100) * canvas.height;

        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, ball.size);
        gradient.addColorStop(0, ball.color);
        gradient.addColorStop(0.5, ball.color.replace(/[\d.]+\)/, '0.05)'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - ball.size, y - ball.size, ball.size * 2, ball.size * 2);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className={`fixed inset-0 ${className}`}>
      {/* Base dark background */}
      <div className="absolute inset-0 bg-black" />

      {/* Animated aura balls canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
        }}
      />
    </div>
  );
}