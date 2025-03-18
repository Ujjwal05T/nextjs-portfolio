"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const beams = Array.from({ length: 5 }, (_, i) => (
    <motion.div
      key={i}
      initial={{
        opacity: 0.2,
        x: mousePosition.x || 0,
        y: mousePosition.y || 0,
        scale: 0.5,
      }}
      animate={{
        x: mousePosition.x || 0,
        y: mousePosition.y || 0,
        opacity: 0.3,
        scale: 2,
      }}
      transition={{
        duration: 1.5,
        ease: "backOut",
      }}
      className={cn(
        "absolute left-0 top-0 h-[40vh] w-[40vw] bg-gradient-to-br from-blue-600 to-purple-600 blur-[80px] rounded-full opacity-30",
        i % 2 === 0 && "bg-gradient-to-r from-indigo-600 to-blue-600",
        className
      )}
      style={{
        filter: "blur(70px)",
      }}
    />
  ));

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex items-center justify-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
      style={{
        pointerEvents: "none",
      }}
    >
      {beams}
    </div>
  );
};