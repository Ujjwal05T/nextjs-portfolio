"use client";

import { useEffect, useRef } from "react";

export function LightAura() {
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

    // Aura configuration
    interface Aura {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      speed: number;
      direction: number;
    }

    const auras: Aura[] = [];
    const auraCount = 8;

    // Generate random auras
    for (let i = 0; i < auraCount; i++) {
      auras.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 200,
        opacity: 0.05 + Math.random() * 0.1,
        speed: 0.2 + Math.random() * 0.3,
        direction: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;

    const drawAuras = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      auras.forEach((aura) => {
        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          aura.x,
          aura.y,
          0,
          aura.x,
          aura.y,
          aura.radius
        );

        // Light blue aura with pulsing effect
        const pulse = Math.sin(frame * 0.02) * 0.3 + 0.7;
        gradient.addColorStop(0, `rgba(34, 211, 238, ${aura.opacity * pulse})`);
        gradient.addColorStop(0.4, `rgba(6, 182, 212, ${aura.opacity * 0.6 * pulse})`);
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Move aura
        aura.x += Math.cos(aura.direction) * aura.speed;
        aura.y += Math.sin(aura.direction) * aura.speed;

        // Bounce off edges
        if (aura.x < 0 || aura.x > canvas.width) {
          aura.direction = Math.PI - aura.direction;
        }
        if (aura.y < 0 || aura.y > canvas.height) {
          aura.direction = -aura.direction;
        }

        // Keep in bounds
        aura.x = Math.max(0, Math.min(canvas.width, aura.x));
        aura.y = Math.max(0, Math.min(canvas.height, aura.y));
      });

      frame++;
      requestAnimationFrame(drawAuras);
    };

    drawAuras();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
