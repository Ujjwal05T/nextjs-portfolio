"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings for smooth performance
    const lenis = new Lenis({
      duration: 1.2, // Slightly longer for smoother feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for less aggressive scrolling
      touchMultiplier: 1.5, // Gentle touch scrolling
      infinite: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Optimized RAF loop with timestamp
    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    // Start RAF loop
    rafIdRef.current = requestAnimationFrame(raf);

    // Expose lenis instance globally
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    // Cleanup
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}