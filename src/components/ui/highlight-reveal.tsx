"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function HighlightReveal({
  text,
  className = "",
  highlightColor = "rgba(255,255,255,0.1)",
}: {
  text: string;
  className?: string;
  highlightColor?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      {words.map((word, i) => (
        <div key={i} className="inline-block mr-1.5 relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={isVisible ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeInOut" }}
            className="absolute h-full top-0 left-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"
            style={{ backgroundColor: highlightColor }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 + 0.2 }}
            className="relative z-10"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}