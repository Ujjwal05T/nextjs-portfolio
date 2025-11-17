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
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#22d3ee", // cyan-light
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence>
        {snippets.map((snippet) => (
          <motion.div
            key={snippet.id}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.5, 0.5, 0],
              y: [0, -150, -150, -300],
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
              filter: "blur(1.5px)",
            }}
            className="font-mono text-sm sm:text-base font-medium select-none"
          >
            <span
              style={{
                color: snippet.color,
                textShadow: `0 0 8px ${snippet.color}60, 0 0 4px ${snippet.color}40`,
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
