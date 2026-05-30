"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// High-quality synthesized cinematic audio hook using HTML5 Web Audio API
function useCinematicAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn("AudioContext init failed", e);
    }
  };

  const playSound = (type: 'loading_motor' | 'shutter_enter') => {
    if (!audioCtxRef.current) return;
    const audioCtx = audioCtxRef.current;
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'loading_motor') {
        // Continuous lens zooming/motor sound while loading at 100% volume
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.5);
        gain.gain.setValueAtTime(1.0, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.5);
      } else if (type === 'shutter_enter') {
        // Massive shutter sound when entering website
        const bufferSize = audioCtx.sampleRate * 0.2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(1.0, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start();
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(1.0, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      console.log("Audio play failed.");
    }
  };

  return { initAudio, playSound };
}

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  
  const lensRef = useRef<HTMLDivElement>(null);
  const { initAudio, playSound } = useCinematicAudio();

  const handleStart = () => {
    initAudio();
    setHasStarted(true);
  };

  useEffect(() => {
    if (!hasStarted) return;
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 4) + 2;
      
      if (current % 10 === 0 || current % 15 === 0) {
        playSound('loading_motor');
      }

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          setFlashActive(true);
          playSound('shutter_enter'); 
          
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
          }, 150); 
        }, 100);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
        >
          {!hasStarted ? (
            <div 
              className="absolute inset-0 z-[200] flex flex-col items-center justify-center cursor-pointer"
              onClick={handleStart}
            >
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="font-space text-xs tracking-[0.4em] text-[#D4AF37] uppercase"
              >
                Click anywhere to begin
              </motion.div>
            </div>
          ) : (
            <>
              {/* Flash Overlay */}
              <div 
                 className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity ease-out ${flashActive ? 'opacity-100 duration-50' : 'opacity-0 duration-200'}`}
                 style={{ mixBlendMode: 'screen', willChange: 'opacity' }}
              />

              {/* High-Performance CSS DSLR Lens */}
              <div ref={lensRef} className="relative z-10 flex flex-col items-center justify-center w-full h-full" style={{ willChange: 'transform, opacity' }}>
                <motion.div 
                  className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full border-[10px] border-[#111] bg-[#0a0a0a] flex items-center justify-center overflow-hidden"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/80" />
                  <div className="absolute inset-[15px] rounded-full border-[8px] border-[#1a1a1a]" />
                  <div className="absolute inset-[30px] rounded-full border-[2px] border-gray-700" />
                  
                  {/* Aperture Blades */}
                  <div className="absolute inset-[40px] rounded-full flex items-center justify-center bg-[#050505]">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-[120%] h-[1px] bg-gray-800 origin-center"
                        style={{ rotate: i * 45, willChange: 'transform' }}
                      >
                        <motion.div 
                          className="w-1/2 h-full bg-gray-600"
                          animate={{ scaleX: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Lightweight Glass Reflection */}
                  <div className="absolute inset-[40px] rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent border border-white/10" />
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
                  <div className="font-space text-[10px] tracking-[0.5em] text-[#D4AF37] mb-2 uppercase text-center bg-black/60 px-4 py-1 rounded-full">
                    Autofocusing
                  </div>
                  <div className="font-playfair text-6xl md:text-8xl text-white font-light drop-shadow-xl">
                    {progress}%
                  </div>
                </motion.div>

              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
