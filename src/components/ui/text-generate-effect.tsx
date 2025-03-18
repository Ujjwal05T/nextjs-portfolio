"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function TypewriterEffect({
  words,
  className = "",
  cursorClassName = "",
}: {
  words: string;
  className?: string;
  cursorClassName?: string;
}) {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const index = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typeText = () => {
      if (index.current < words.length) {
        setText(words.substring(0, index.current + 1));
        index.current += 1;
        timeoutRef.current = setTimeout(typeText, 30); // Speed of typing
      } else {
        // Animation completed
        setTimeout(() => {
          setShowCursor(false);
        }, 1500);
      }
    };

    timeoutRef.current = setTimeout(typeText, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [words]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`inline-block relative ${className}`}
    >
      {text}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className={`inline-block ml-0.5 w-0.5 h-5 bg-white ${cursorClassName}`}
        ></motion.span>
      )}
    </motion.div>
  );
}