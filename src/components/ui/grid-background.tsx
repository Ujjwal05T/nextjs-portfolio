"use client";

import { useEffect, useRef } from "react";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className = "" }: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Dot grid configuration
    const dotSpacing = 40;
    const dotRadius = 1.5;
    let frame = 0;

    // Draw animated dot grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          // Calculate distance from center for radial fade
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

          // Radial fade effect (stronger in center, fade to edges)
          const fadeStrength = 1 - (distance / maxDistance) * 0.7;

          // Subtle wave animation
          const wave = Math.sin((x + y + frame) * 0.01) * 0.3 + 0.7;

          // Calculate opacity with cosmic color tint
          const baseOpacity = fadeStrength * wave * 0.15;

          // Alternate between purple and cyan dots for visual interest
          const isPurple = (Math.floor(x / dotSpacing) + Math.floor(y / dotSpacing)) % 2 === 0;

          if (isPurple) {
            ctx.fillStyle = `rgba(168, 85, 247, ${baseOpacity})`;
          } else {
            ctx.fillStyle = `rgba(6, 182, 212, ${baseOpacity * 0.8})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw some larger accent dots that pulse
      const accentDots = 5;
      for (let i = 0; i < accentDots; i++) {
        const angle = (i / accentDots) * Math.PI * 2 + frame * 0.005;
        const radius = Math.min(canvas.width, canvas.height) * 0.3;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        const pulse = Math.sin(frame * 0.02 + i) * 0.5 + 0.5;
        const accentOpacity = pulse * 0.2;

        // Gradient for accent dots
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
        gradient.addColorStop(0, `rgba(168, 85, 247, ${accentOpacity})`);
        gradient.addColorStop(0.5, `rgba(6, 182, 212, ${accentOpacity * 0.5})`);
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
      }

      frame++;
      requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <>
      {/* Radial gradient spotlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Animated dot grid canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-0 ${className}`}
        style={{ opacity: 1 }}
      />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
    </>
  );
}
