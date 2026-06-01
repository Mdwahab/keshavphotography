"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        // 100% Sequence
        setTimeout(() => {
          setFlashActive(true);
          
          setTimeout(() => {
            setFlashActive(false);
            setIsZooming(true);
            
            if (lensRef.current) {
               gsap.to(lensRef.current, {
                 scale: 25,
                 opacity: 0,
                 duration: 0.6,
                 ease: "power2.in",
                 onComplete: () => {
                   setIsVisible(false);
                   document.body.style.overflow = "auto";
                   onComplete();
                 }
               });
            }
          }, 150); // Flash duration max 150ms
        }, 100);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[var(--background)] flex items-center justify-center overflow-hidden"
        >
          {/* Flash Overlay - GPU Accelerated Opacity */}
          <div 
             className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity ease-out ${flashActive ? 'opacity-100 duration-50' : 'opacity-0 duration-200'}`}
             style={{ mixBlendMode: 'screen', willChange: 'opacity' }}
          />

          {/* 2D CSS DSLR Lens Container */}
          <div ref={lensRef} className="relative z-10 flex flex-col items-center justify-center w-full h-full" style={{ willChange: 'transform, opacity' }}>
            
            <motion.div 
              className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border-[10px] border-[#111] bg-[var(--card-bg)] flex items-center justify-center overflow-hidden"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ willChange: 'transform' }}
            >
              {/* Gold Ring Edge */}
              <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/80" />
              
              {/* Inner Lens Barrels */}
              <div className="absolute inset-[15px] rounded-full border-[8px] border-[#1a1a1a]" />
              <div className="absolute inset-[30px] rounded-full border-[2px] border-gray-700" />
              
              {/* Aperture Blades */}
              <div className="absolute inset-[40px] rounded-full flex items-center justify-center bg-[var(--background)]">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[120%] h-[1px] bg-gray-800 origin-center"
                    style={{ rotate: i * 45, willChange: 'transform' }}
                  >
                    <motion.div 
                      className="w-1/2 h-full bg-gray-600"
                      animate={{ 
                        scaleX: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Glass Reflection (Optimized) */}
              <div className="absolute inset-[40px] rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent border border-[var(--border-color)]" />
              <div className="absolute top-[25%] left-[25%] w-[30%] h-[30%] bg-white/10 rounded-full blur-[8px]" />
              <div className="absolute bottom-[30%] right-[30%] w-[15%] h-[15%] bg-[#D4AF37]/10 rounded-full blur-[10px]" />
            </motion.div>

            {/* Typography Overlay */}
            <motion.div 
              className="absolute z-20 flex flex-col items-center pointer-events-none"
              animate={{ opacity: isZooming || flashActive ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: 'opacity' }}
            >
              <h1 className="font-playfair text-5xl md:text-7xl text-[#D4AF37] mb-4 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] italic font-bold">
                KP
              </h1>
              <div className="font-space text-[10px] tracking-[0.5em] text-[#D4AF37] mb-2 uppercase text-center bg-[var(--overlay-bg)] px-4 py-1 rounded-full backdrop-blur-sm border border-[#D4AF37]/20">
                Autofocusing
              </div>
              <div className="font-playfair text-6xl md:text-8xl text-[var(--foreground)] font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {progress}%
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
