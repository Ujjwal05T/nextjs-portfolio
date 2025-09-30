"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with faster, snappier settings
    const lenis = new Lenis({
      duration: 0.7, // Reduced from 1.0 for faster scrolling (sweet spot between smooth and responsive)
      easing: (t) => {
        // Custom easing: quick start with smooth finish
        // Feels more responsive than easeOutExpo
        return t < 0.5
          ? 4 * t * t * t // Ease in cubic for quick acceleration
          : 1 - Math.pow(-2 * t + 2, 3) / 2; // Ease out cubic for smooth stop
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.8, // Increased from 1 for much more responsive wheel scrolling
      touchMultiplier: 2, // Keep mobile scrolling responsive
      infinite: false,
      syncTouch: true, // Better sync for touch devices
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for programmatic scrolling
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return <>{children}</>;
}