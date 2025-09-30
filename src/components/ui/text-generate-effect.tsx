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
        timeoutRef.current = setTimeout(typeText, 50); // Speed of typing
      } else {
        // Animation completed - fade out cursor
        setTimeout(() => {
          setShowCursor(false);
        }, 800);
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
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: showCursor ? [0, 1, 0] : 0 }}
        transition={{
          repeat: showCursor ? Infinity : 0,
          duration: 0.8,
          ...(showCursor ? {} : { duration: 0.5 })
        }}
        className={`inline-block ml-0.5 w-0.5 h-5 bg-white ${cursorClassName}`}
      ></motion.span>
    </motion.div>
  );
}