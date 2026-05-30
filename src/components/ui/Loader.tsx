"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// High-quality cinematic audio hook using HTML5 Audio for realism
function useCinematicAudio() {
  const playSound = (type: 'focus' | 'shutter' | 'zoom') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'focus') {
        // High-tech subtle beep
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'shutter') {
        // Mechanical snap (white noise burst)
        const bufferSize = audioCtx.sampleRate * 0.1;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start();
        
        // Low thump
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'zoom') {
        // Deep cinematic bass sweep / whoosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 2.0);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.0);
        osc.start();
        osc.stop(audioCtx.currentTime + 2.0);
        
        // Add filtered noise for the "air" whoosh
        const bufferSize = audioCtx.sampleRate * 2.0;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(100, audioCtx.currentTime);
        noiseFilter.frequency.exponentialRampToValueAtTime(3000, audioCtx.currentTime + 1.0);
        noiseFilter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 2.0);
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0, audioCtx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 1.0);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 2.0);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start();
      }
    } catch (e) {
      console.log("Audio play failed, likely due to autoplay policies.");
    }
  };

  return { playSound };
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const lensRef = useRef<HTMLDivElement>(null);
  
  const { playSound } = useCinematicAudio();

  // We auto-start the loader but use a click to enable audio on modern browsers if needed.
  // To keep it seamless, we try to play sounds during progress.

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 1;
      
      if (current === 20 || current === 60) playSound('focus');

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        // Trigger completion sequence
        playSound('shutter');
        
        setTimeout(() => {
          setIsZooming(true);
          playSound('zoom');
          
          if (lensRef.current) {
             gsap.to(lensRef.current, {
               scale: 30, // Massive zoom through the lens aperture
               opacity: 0,
               duration: 1.5,
               ease: "power4.inOut",
               onComplete: () => {
                 setIsVisible(false);
                 document.body.style.overflow = "auto";
                 setTimeout(onComplete, 200);
               }
             });
          }
        }, 500);
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
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          {/* Flash Bloom Overlay during zoom */}
          <div 
             className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-700 ease-in ${isZooming ? 'opacity-100' : 'opacity-0'}`}
             style={{ mixBlendMode: 'screen' }}
          />

          {/* Cinematic Lens Container */}
          <div ref={lensRef} className="relative flex flex-col items-center justify-center w-full h-full">
            
            {/* The Lens Graphic (Stylized CSS) */}
            <motion.div 
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-white/10 shadow-[0_0_80px_rgba(212,175,55,0.1)] flex items-center justify-center overflow-hidden bg-black"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer Ring Gold Glow */}
              <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/30" />
              <div className="absolute inset-2 rounded-full border border-[#D4AF37]/50 border-t-[#D4AF37] animate-[spin_4s_linear_infinite]" />
              
              {/* Aperture Blades */}
              <div className="absolute inset-4 rounded-full flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[150%] h-[2px] bg-[#1a1a1a] origin-center"
                    style={{ rotate: i * 45 }}
                  >
                    <motion.div 
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-[#D4AF37]"
                      animate={{ 
                        opacity: [0.3, 0.8, 0.3],
                        scaleX: [1, 1.5, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Inner Glass Element */}
              <motion.div 
                className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-black via-[#D4AF37]/10 to-transparent backdrop-blur-md shadow-inner flex items-center justify-center"
                animate={{
                  scale: isZooming ? 5 : [1, 1.05, 1]
                }}
                transition={{ duration: isZooming ? 1.5 : 4, repeat: isZooming ? 0 : Infinity }}
              >
                {/* Lens Flare Reflection */}
                <div className="absolute top-[20%] left-[20%] w-[20%] h-[20%] bg-white/20 rounded-full blur-md" />
                <div className="absolute bottom-[30%] right-[30%] w-[10%] h-[10%] bg-[#D4AF37]/30 rounded-full blur-sm" />
              </motion.div>

            </motion.div>

            {/* Typography Overlay */}
            <motion.div 
              className="absolute z-20 flex flex-col items-center"
              animate={{ opacity: isZooming ? 0 : 1, scale: isZooming ? 2 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-cinzel text-2xl md:text-4xl text-[#D4AF37] mb-2 tracking-widest drop-shadow-lg">
                KESHAV PHOTOGRAPHY
              </h1>
              <div className="font-space text-[10px] tracking-[0.5em] text-gray-400 mb-8 uppercase">
                Cinematic Universe
              </div>

              <div className="font-playfair text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white drop-shadow-2xl">
                {progress}%
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
