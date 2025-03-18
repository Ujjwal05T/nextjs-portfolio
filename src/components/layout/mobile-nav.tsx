"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FaHome, FaUser, FaCode, FaEnvelope } from "react-icons/fa";

const navItems = [
  { name: "Home", link: "/", icon: <FaHome className="w-5 h-5" /> },
  { name: "About", link: "/about", icon: <FaUser className="w-5 h-5" /> },
  { name: "Projects", link: "/projects", icon: <FaCode className="w-5 h-5" /> },
  { name: "Contact", link: "/contact", icon: <FaEnvelope className="w-5 h-5" /> },
];

export default function MobileNav() {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <div className="flex justify-around items-center py-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.link}
          onClick={() => setActiveItem(item.name)}
          className={cn(
            "flex flex-col items-center py-2 px-4 relative",
            activeItem === item.name ? "text-white" : "text-zinc-500"
          )}
        >
          {activeItem === item.name && (
            <motion.span
              layoutId="mobile-pill"
              className="absolute inset-0 bg-zinc-800 rounded-lg -z-10"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </Link>
      ))}
    </div>
  );
}