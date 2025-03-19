"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function FloatingSocialBar() {
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/yourusername", label: "GitHub" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: <MdEmail />, url: "mailto:your.email@example.com", label: "Email" },
    { icon: <FaInstagram />, url: "https://instagram.com/yourusername", label: "Instagram" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-4 bottom-1/4 z-10 hidden md:flex flex-col gap-5"
    >
      {socialLinks.map((link, i) => (
        <motion.a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, y: -5 }}
          className="w-10 h-10 bg-zinc-900/80 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
          aria-label={link.label}
        >
          <span className="text-xl">{link.icon}</span>
        </motion.a>
      ))}
      <div className="w-px h-24 mx-auto bg-gradient-to-b from-zinc-500 to-transparent" />
    </motion.div>
  );
}