"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false); 

  useEffect(() => {
    // Set shouldAnimate to true only on the client
    setShouldAnimate(true);
    
    console.log("[Splash] Splash mounted");
    console.log("[Splash] Animation started");
    console.log("[Splash] Timer started (6000ms)");

    document.body.style.overflow = "hidden";
    
    // Temporarily disabled sessionStorage logic for testing
    // const hasPlayed = sessionStorage.getItem("kp_intro_played_v5");
    // if (hasPlayed) { ... }

    const timer = setTimeout(() => {
      console.log("[Splash] Timer completed. Splash fading out.");
      setIsVisible(false);
      document.body.style.overflow = "auto";
      
      // Wait for exit animation to complete before removing from DOM
      setTimeout(() => {
        console.log("[Splash] Splash removed. Homepage fading in.");
        onComplete();
      }, 800); 
    }, 6700);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            animate={{ x: "100%", opacity: [0, 0.4, 0.4, 0] }}
            transition={{ duration: 6, times: [0, 0.16, 0.83, 1], ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-[150vw] h-64 bg-[#D4AF37]/10 blur-[100px] pointer-events-none"
          />

          {/* Stage 3: Full-Height Cinematic Light Beam Sweep (Middle Layer) */}
          <motion.div 
            initial={{ left: "-50vw" }}
            animate={{ left: "150vw" }}
            transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }}
            className="absolute top-0 h-[100vh] w-[40vw] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent skew-x-[-25deg] pointer-events-none z-10"
            style={{ mixBlendMode: 'screen', filter: 'blur(8px)' }}
          />

          {/* Stage 1: Ambient Particles / Dust (Background Layer) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {[...Array(50)].map((_, i) => (
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
                  duration: Math.random() * 3 + 3,
                  delay: Math.random() * 1.0,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="absolute w-[2px] h-[2px] md:w-1 md:h-1 bg-[#D4AF37] rounded-full blur-[1px]"
              />
            ))}
          </div>

          {/* Stage 2-5: Logo Orchestration (Foreground Layer) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 1.15, 1.15], scale: [0.8, 1, 1.03, 1.15, 1.15] }}
            transition={{ duration: 4.9, delay: 1, times: [0, 0.2, 0.6, 0.96, 1], ease: "easeInOut" }}
            className="relative z-20 flex items-center justify-center overflow-visible px-8 py-4"
          >
            {/* Deep Expanding Gold Glow Behind Logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.8, 0.8, 1, 0], scale: [0.5, 1.2, 1.1, 1.4, 1.4] }}
              transition={{ duration: 4.9, delay: 1, times: [0, 0.2, 0.7, 0.96, 1], ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-[#D4AF37] rounded-full blur-[60px] md:blur-[80px] pointer-events-none z-0"
            />

            {/* The Logo */}
            <Image 
              src="/logo/Layer 0.png" 
              alt="Keshav Photography" 
              width={400} 
              height={200} 
              priority
              className="object-contain w-64 md:w-80 lg:w-96 h-auto relative z-10" 
            />

            {/* Stage 3: Intense Horizontal Lens Flare */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0, 1.5, 0] }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-[120%] h-[2px] bg-gradient-to-r from-transparent via-[#FFF3B0] to-transparent z-20 pointer-events-none"
              style={{ boxShadow: '0 0 15px 2px rgba(212,175,55,0.8)' }}
            />
            
            {/* Sparkles around the logo */}
            {[
              { top: "10%", left: "10%", delay: 2.1 },
              { top: "80%", left: "85%", delay: 2.4 },
              { top: "15%", left: "90%", delay: 3.0 },
              { top: "85%", left: "15%", delay: 2.5 },
              { top: "40%", left: "5%", delay: 2.8 },
              { top: "50%", left: "95%", delay: 3.5 },
              { top: "20%", left: "40%", delay: 3.8 },
              { top: "70%", left: "60%", delay: 4.1 }
            ].map((sparkle, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], rotate: 180 }}
                transition={{ duration: 1.5, delay: sparkle.delay, ease: "easeInOut" }}
                className="absolute w-4 h-4 md:w-6 md:h-6 z-30"
                style={{ top: sparkle.top, left: sparkle.left }}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#FFF3B0" className="drop-shadow-[0_0_5px_rgba(212,175,55,1)]"/>
                </svg>
              </motion.div>
            ))}
          </motion.div>

          {/* Stage 6: Cinematic Camera Flash Ending */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, delay: 5.9, times: [0, 0.14, 0.57, 1], ease: "easeOut" }}
            className="fixed inset-0 w-[100vw] h-[100vh] bg-white pointer-events-none"
            style={{ zIndex: 999999 }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}
