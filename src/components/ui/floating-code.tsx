"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeSnippet {
  id: number;
  code: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

const codeSnippets = [
  // HTML/JSX
  "<div>",
  "</div>",
  "</>",
  "{...}",
  "className=",

  // JavaScript/TypeScript
  "const",
  "let",
  "=>",
  "async",
  "await",
  "return",
  "function",
  "import",
  "export",

  // React/Next.js
  "useState",
  "useEffect",
  "props",
  "onClick",

  // Java
  "public",
  "static",
  "void main",
  "class",
  "extends",

  // CSS
  "flex",
  "grid",
  ":hover",

  // General programming
  "if",
  "else",
  "for",
  "while",
  "try",
  "catch",
];

const colors = [
  "rgba(168, 85, 247, 0.4)", // purple
  "rgba(6, 182, 212, 0.4)",  // cyan
  "rgba(245, 158, 11, 0.3)", // amber
  "rgba(139, 92, 246, 0.35)", // violet
  "rgba(34, 211, 238, 0.35)", // cyan-light
];

export function FloatingCode() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);

  useEffect(() => {
    // Generate random positioned code snippets
    const generateSnippets = () => {
      const newSnippets: CodeSnippet[] = [];
      const count = 25; // Number of floating code snippets

      for (let i = 0; i < count; i++) {
        newSnippets.push({
          id: i,
          code: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          x: Math.random() * 100, // Random x position (%)
          y: Math.random() * 100, // Random y position (%)
          delay: Math.random() * 5, // Random delay
          duration: 15 + Math.random() * 10, // Random duration (15-25s)
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setSnippets(newSnippets);
    };

    generateSnippets();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      <AnimatePresence>
        {snippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.6, 0.6, 0],
              y: [0, -100, -100, -200],
              x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30, Math.random() * 80 - 40],
              rotate: [0, Math.random() * 10 - 5, Math.random() * 15 - 7.5, Math.random() * 20 - 10],
            }}
            transition={{
              duration: snippet.duration,
              delay: snippet.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              left: `${snippet.x}%`,
              top: `${snippet.y}%`,
            }}
            className="font-mono text-xs sm:text-sm select-none"
          >
            <span
              style={{
                color: snippet.color,
                textShadow: `0 0 10px ${snippet.color}`,
              }}
            >
              {snippet.code}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
