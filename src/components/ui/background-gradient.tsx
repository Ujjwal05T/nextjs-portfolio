"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 0",
    },
    hover: {
      backgroundPosition: animate ? ["0 0", "100% 100%"] : "0 0",
      transition: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 2,
      },
    },
  };

  return (
    <div className={cn("relative p-[1px] overflow-hidden", containerClassName)}>
      <motion.div
      //   variants={variants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "absolute inset-0 z-10 bg-gradient-to-r from-zinc-400/50 via-zinc-600/50 to-zinc-400/50",
          "bg-[size:200%_200%]",
          className
        )}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
};