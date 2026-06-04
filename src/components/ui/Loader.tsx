"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasPlayed = sessionStorage.getItem("kp_intro_played");
    
    if (hasPlayed) {
      // Skip intro immediately for returning users in same session
      setIsVisible(false);
      onComplete();
    } else {
      // Play intro
      setShouldAnimate(true);
      document.body.style.overflow = "hidden";
      sessionStorage.setItem("kp_intro_played", "true");
      
      // Sequence timing: 4 seconds total
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
        onComplete();
      }, 4000);
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "auto";
      };
    }
  }, [onComplete]);

  // Prevent server-side rendering mismatch or flashing
  if (!shouldAnimate) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Stage 1: Ambient Gold Light Sweep */}
          <motion.div 
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 0.4, 0] }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-[150vw] h-64 bg-[#D4AF37]/10 blur-[100px] pointer-events-none"
          />

          {/* Stage 1: Ambient Particles / Dust */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{ 
                  opacity: [0, Math.random() * 0.8 + 0.2, 0],
                  scale: [0, Math.random() * 1.5 + 0.5, 0],
                  y: `+=${Math.random() * -60 - 20}`
                }}
                transition={{ 
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute w-[2px] h-[2px] md:w-1 md:h-1 bg-[#D4AF37] rounded-full blur-[1px]"
              />
            ))}
          </div>

          {/* Stage 2 & 4: Logo Fade In, Scale, and Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ 
              opacity: [0, 1, 1, 1], 
              scale: [0.7, 1, 1.05, 1] 
            }}
            transition={{ 
              duration: 3.5, 
              times: [0, 0.3, 0.7, 0.85], 
              ease: "easeInOut" 
            }}
            className="relative z-10 flex items-center justify-center overflow-hidden px-8 py-4"
          >
            {/* The Logo */}
            <Image 
              src="/logo/Layer 0.png" 
              alt="Keshav Photography" 
              width={400} 
              height={200} 
              priority
              className="object-contain w-64 md:w-80 lg:w-96 h-auto filter drop-shadow-[0_0_25px_rgba(212,175,55,0.4)] relative z-10" 
            />

            {/* Stage 3: Shimmer Sweep across the logo */}
            <motion.div 
              initial={{ left: "-100%" }}
              animate={{ left: "200%" }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
              className="absolute top-0 w-[40%] h-full bg-gradient-to-r from-transparent via-[#FFF3B0]/60 to-transparent skew-x-[-25deg] pointer-events-none z-20"
              style={{ mixBlendMode: 'screen' }}
            />
            
            {/* Stage 3: Directed Sparkles around the logo */}
            {[
              { top: "10%", left: "10%", delay: 1.5 },
              { top: "80%", left: "85%", delay: 1.8 },
              { top: "15%", left: "90%", delay: 2.1 },
              { top: "85%", left: "15%", delay: 1.6 }
            ].map((sparkle, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
                transition={{ duration: 1, delay: sparkle.delay, ease: "easeInOut" }}
                className="absolute w-4 h-4 md:w-6 md:h-6 z-30"
                style={{ top: sparkle.top, left: sparkle.left }}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#FFF3B0" className="drop-shadow-[0_0_5px_rgba(212,175,55,1)]"/>
                </svg>
              </motion.div>
            ))}
          </motion.div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
