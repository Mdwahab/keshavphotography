"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import CameraLens3D from "../3d/CameraLens3D";
import { useCinematicAudio } from "@/hooks/useCinematicAudio";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [flashActive, setFlashActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const audio = useCinematicAudio();

  const handleStart = () => {
    audio.initAudio();
    setHasStarted(true);
    audio.playAmbientHum();
  };

  useEffect(() => {
    if (!hasStarted) return;
    
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      // Non-linear progress simulation
      current += Math.random() > 0.5 ? Math.floor(Math.random() * 5) : 0;
      
      if (current === 20 || current === 21) audio.playMotorFocus();
      if (current === 50 || current === 51) audio.playClick();
      if (current === 80 || current === 81) audio.playFocusLock();

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Completion Animation Sequence
        audio.playShutter();
        
        setTimeout(() => {
          setFlashActive(true);
          audio.playFlashBoom();
          audio.playZoomWhoosh();
          
          // GSAP Aggressive Zoom
          if (containerRef.current) {
             gsap.to(containerRef.current, {
               scale: 10,
               opacity: 0,
               duration: 1.5,
               ease: "power4.in",
               onComplete: () => {
                 setIsVisible(false);
                 document.body.style.overflow = "auto";
                 setTimeout(onComplete, 500);
               }
             });
          }
        }, 300); // Slight delay after shutter click for the flash
      } else {
        setProgress(current);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [hasStarted, onComplete, audio]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Flash Bloom Overlay */}
          <div 
             className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-300 ease-out ${flashActive ? 'opacity-100' : 'opacity-0'}`}
             style={{ mixBlendMode: 'screen' }}
          />

          {!hasStarted ? (
            <motion.div 
               className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
               onClick={handleStart}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1 }}
            >
               <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center mb-6 relative overflow-hidden group-hover:bg-[#D4AF37]/10 transition-colors">
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#D4AF37]/30" />
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
               </div>
               <span className="font-space tracking-[0.4em] uppercase text-[#D4AF37] text-sm group-hover:scale-105 transition-transform">
                 Tap to Enter
               </span>
            </motion.div>
          ) : (
            <>
              {/* 3D Lens Background Component */}
              <CameraLens3D progress={progress} />

              <motion.div 
                className="relative z-10 flex flex-col items-center mt-[40vh]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <div className="font-space text-xs tracking-[0.5em] text-[#D4AF37] mb-2 uppercase">
                  Initializing Memories
                </div>
                <div className="font-poppins text-[10px] tracking-widest text-gray-500 uppercase mb-8">
                  Preparing Cinematic Experience
                </div>

                <div className="font-playfair text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                  {progress}%
                </div>
                
                {/* Gold Loading Bar */}
                <div className="w-48 h-[2px] bg-white/10 mt-8 relative overflow-hidden rounded-full">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
