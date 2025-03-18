"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const HoverEffect = ({
  items,
  className,
  onMouseEnter,
  onClick,
  activeItem,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
  onMouseEnter?: (idx: number) => void;
  onClick?: (idx: number) => void;
  activeItem?: number;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative group block p-1"
          onMouseEnter={() => {
            setHoveredIndex(idx);
            if (onMouseEnter) onMouseEnter(idx);
          }}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onClick && onClick(idx)}
        >
          <AnimatePresence>
            {(hoveredIndex === idx || activeItem === idx) && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-zinc-800/[0.8] block rounded-lg"
                layoutId="activeTab"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              "relative z-10 text-center py-3 px-2 text-sm font-medium transition-colors duration-200 rounded-md cursor-pointer",
              activeItem === idx 
                ? "text-white" 
                : hoveredIndex === idx 
                  ? "text-white" 
                  : "text-zinc-400"
            )}
          >
            <span>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};