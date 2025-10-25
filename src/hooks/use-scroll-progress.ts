"use client";

import { useEffect, useState, useRef } from 'react';

interface LenisInstance {
  scroll: number;
  on: (event: string, handler: () => void) => void;
  off: (event: string, handler: () => void) => void;
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafIdRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    let lenis: LenisInstance | null = null;

    // Try to get Lenis instance from window
    if (typeof window !== 'undefined') {
      const windowLenis = (window as unknown as { lenis?: LenisInstance }).lenis;
      lenis = windowLenis || null;
    }

    const updateProgress = () => {
      if (typeof window !== 'undefined') {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const currentScroll = lenis ? lenis.scroll : window.scrollY;
          const progress = (currentScroll / totalHeight) * 100;
          setScrollProgress(Math.min(Math.max(progress, 0), 100));
        }
      }
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        rafIdRef.current = requestAnimationFrame(updateProgress);
        tickingRef.current = true;
      }
    };

    // Initial update
    updateProgress();

    // Use Lenis scroll event if available
    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else if (typeof window !== 'undefined') {
      // Fallback to native scroll
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenis) {
        lenis.off('scroll', handleScroll);
      } else if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return scrollProgress;
}