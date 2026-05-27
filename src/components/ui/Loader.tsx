"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          document.body.style.overflow = "auto";
          setTimeout(onComplete, 1000);
        }, 800);
      }
      setProgress(current);
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Particles */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px] animate-pulse-slow" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B0A0A] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
          </div>

          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Morphing Camera Aperture / Logo concept */}
            <div className="w-32 h-32 relative mb-12 flex items-center justify-center">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-32 bg-gradient-to-b from-[#D4AF37] to-transparent origin-center"
                  style={{ rotate: i * 60 }}
                  animate={{ 
                    rotate: [i * 60, i * 60 + 180],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
              <div className="absolute w-24 h-24 rounded-full border border-[#D4AF37]/50 border-t-[#D4AF37] animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute font-cinzel text-3xl text-[#D4AF37]">KP</div>
            </div>

            <div className="font-space text-sm tracking-[0.5em] text-gray-400 mb-4 uppercase">
              Initializing Universe
            </div>

            <div className="font-playfair text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
              {progress}%
            </div>
            
            {/* Progress line */}
            <div className="w-64 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
