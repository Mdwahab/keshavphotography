"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-16 h-16 ${className}`}>
      {/* Outer Golden Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-[1px] border-[#D4AF37]/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner Glowing Ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-[2px] border-t-[#D4AF37] border-r-[#FBF5B7] border-b-transparent border-l-transparent shadow-[0_0_15px_rgba(212,175,55,0.5)]"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      {/* Core Lens Morph */}
      <motion.div
        className="w-4 h-4 bg-[#D4AF37] shadow-[0_0_20px_#D4AF37]"
        animate={{
          borderRadius: ["50%", "30%", "40%", "50%"],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
