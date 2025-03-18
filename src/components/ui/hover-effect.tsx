"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image?: string;
    tags?: string[];
    icons?: React.ReactNode[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item.link}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-zinc-800/[0.8] block rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardImage src={item.image} />
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-zinc-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.icons && (
                <div className="flex gap-2 mt-3">
                  {item.icons.map((icon, index) => (
                    <span key={index} className="text-xl text-zinc-400">
                      {icon}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-700 bg-zinc-900/50 overflow-hidden relative z-10 h-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardImage = ({ src }: { src?: string }) => {
  if (!src) {
    return null;
  }
  
  return (
    <div className="relative w-full h-48">
      <Image
        src={src}
        alt="Project thumbnail"
        fill
        className="object-cover"
      />
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-xl font-semibold mb-1", className)}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={cn("text-sm text-zinc-400", className)}>
      {children}
    </p>
  );
};

export const CardContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("p-4", className)}>
      {children}
    </div>
  );
};