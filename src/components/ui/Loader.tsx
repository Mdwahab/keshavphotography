"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// High-quality cinematic audio hook using HTML5 Audio for realism
function useCinematicAudio() {
  const playSound = (type: 'focus' | 'shutter' | 'zoom' | 'lens_turn') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'focus') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'lens_turn') {
        // Mechanical clicking for lens turning
        for (let j = 0; j < 4; j++) {
          const oscTime = audioCtx.currentTime + (j * 0.06);
          const clickOsc = audioCtx.createOscillator();
          const clickGain = audioCtx.createGain();
          clickOsc.type = 'square';
          clickOsc.frequency.setValueAtTime(600, oscTime);
          clickOsc.frequency.exponentialRampToValueAtTime(100, oscTime + 0.02);
          clickGain.gain.setValueAtTime(0.05, oscTime);
          clickGain.gain.exponentialRampToValueAtTime(0.01, oscTime + 0.02);
          clickOsc.connect(clickGain);
          clickGain.connect(audioCtx.destination);
          clickOsc.start(oscTime);
          clickOsc.stop(oscTime + 0.02);
        }
      } else if (type === 'shutter') {
        // Mechanical snap
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
        noiseGain.gain.setValueAtTime(0.8, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start();
        
        // Low thump
        osc.type = 'square';
        osc.frequency.setValueAtTime(100, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'zoom') {
        // Deep cinematic bass sweep / whoosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 1.5);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(1.5, audioCtx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.5);
        
        // Whoosh noise
        const bufferSize = audioCtx.sampleRate * 1.5;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.setValueAtTime(100, audioCtx.currentTime);
        noiseFilter.frequency.exponentialRampToValueAtTime(4000, audioCtx.currentTime + 0.5);
        noiseFilter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 1.5);
        
        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0, audioCtx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.5);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
        
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noise.start();
      }
    } catch (e) {
      console.log("Audio play failed.");
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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    document.body.style.overflow = "hidden";
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 3) + 1;
      
      // Play lens turn sound frequently while loading
      if (current % 12 === 0) playSound('lens_turn');
      // Play focus lock sometimes
      if (current === 40 || current === 80) playSound('focus');

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        
        setTimeout(() => {
          setIsZooming(true);
          // Play shutter exactly when zoomed
          playSound('shutter');
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
        }, 500); // Small pause at 100%
      } else {
        setProgress(current);
      }
    }, 50);

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
          {/* Background Ambient Particles */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             {windowSize.width > 0 && [...Array(30)].map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-40"
                 initial={{ 
                   x: Math.random() * windowSize.width, 
                   y: Math.random() * windowSize.height,
                   scale: Math.random() * 2 
                 }}
                 animate={{ 
                   y: [null, Math.random() * -300],
                   opacity: [0, 0.6, 0]
                 }}
                 transition={{ 
                   duration: Math.random() * 5 + 5, 
                   repeat: Infinity, 
                   ease: "linear",
                   delay: Math.random() * 2
                 }}
               />
             ))}
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/10 blur-[150px] rounded-full animate-pulse-slow" />
             <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3B0A0A]/20 blur-[200px] rounded-full animate-pulse-slow" />
          </div>

          {/* Flash Bloom Overlay during zoom */}
          <div 
             className={`absolute inset-0 z-50 bg-white pointer-events-none transition-opacity duration-[1000ms] ease-in ${isZooming ? 'opacity-100' : 'opacity-0'}`}
             style={{ mixBlendMode: 'screen' }}
          />

          {/* Cinematic Lens Container */}
          <div ref={lensRef} className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            
            {/* The Lens Graphic */}
            <motion.div 
              className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-white/10 shadow-[0_0_100px_rgba(212,175,55,0.15)] flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-md"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-[6px] border-[#D4AF37]/30" />
              <div className="absolute inset-2 rounded-full border-2 border-[#D4AF37]/50 border-t-[#D4AF37] animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-white/20 border-b-white/50 animate-[spin_5s_linear_infinite_reverse]" />
              
              {/* Aperture Blades */}
              <div className="absolute inset-8 rounded-full flex items-center justify-center">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[150%] h-[2px] bg-[#1a1a1a] origin-center"
                    style={{ rotate: i * 45 }}
                  >
                    <motion.div 
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-[#D4AF37]"
                      animate={{ 
                        opacity: [0.3, 0.9, 0.3],
                        scaleX: [1, 1.3, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: i * 0.15
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Inner Glass Element */}
              <motion.div 
                className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-black/80 via-[#D4AF37]/20 to-transparent backdrop-blur-xl shadow-[inset_0_0_50px_rgba(0,0,0,1)] flex items-center justify-center border border-white/5"
                animate={{
                  scale: isZooming ? 5 : [1, 1.05, 1]
                }}
                transition={{ duration: isZooming ? 1.5 : 4, repeat: isZooming ? 0 : Infinity }}
              >
                <div className="absolute top-[20%] left-[20%] w-[25%] h-[25%] bg-white/30 rounded-full blur-md" />
                <div className="absolute bottom-[30%] right-[30%] w-[15%] h-[15%] bg-[#D4AF37]/40 rounded-full blur-md" />
              </motion.div>
            </motion.div>

            {/* Typography Overlay */}
            <motion.div 
              className="absolute z-20 flex flex-col items-center"
              animate={{ opacity: isZooming ? 0 : 1, scale: isZooming ? 2 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-playfair text-6xl md:text-8xl text-[#D4AF37] mb-2 drop-shadow-2xl italic font-bold">
                KP
              </h1>
              <div className="font-space text-[10px] tracking-[0.5em] text-gray-400 mb-8 uppercase text-center max-w-[200px]">
                Cinematic Universe
              </div>

              <div className="font-playfair text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white drop-shadow-2xl font-light">
                {progress}%
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
