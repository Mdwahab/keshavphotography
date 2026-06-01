"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";
import { motion, animate, useInView } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Eluru coordinates
const ELURU_COORDS: [number, number] = [81.0264, 16.7118];
// India coordinates
const INDIA_COORDS: [number, number] = [78.9629, 20.5937];
// Initial wide view coords
const START_COORDS: [number, number] = [0, 20];

export default function CinematicMap() {
  const [position, setPosition] = useState({ coordinates: START_COORDS, zoom: 1 });
  const [showCard, setShowCard] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const showCardRef = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    const duration = 6000; // 6 seconds

    const updateAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let latest = Math.min(elapsed / duration, 1);

      // easeInOut calculation
      const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      latest = easeInOut(latest);

      let zoom = 1;
      let coords: [number, number] = START_COORDS;

      if (latest < 0.3) {
        // 0 to 0.3: Pan and zoom to India
        const progress = latest / 0.3;
        const eased = progress * progress * (3 - 2 * progress);
        zoom = 1 + (eased * 3);
        coords = [
          START_COORDS[0] + (INDIA_COORDS[0] - START_COORDS[0]) * eased,
          START_COORDS[1] + (INDIA_COORDS[1] - START_COORDS[1]) * eased
        ];
      } else if (latest < 0.4) {
        // Pause slightly at India
        zoom = 4;
        coords = INDIA_COORDS;
      } else if (latest < 0.9) {
        // 0.4 to 0.9: Dive into Eluru
        const progress = (latest - 0.4) / 0.5;
        const eased = progress * progress * (3 - 2 * progress);
        zoom = 4 + (eased * 46); // Zoom to 50x
        coords = [
          INDIA_COORDS[0] + (ELURU_COORDS[0] - INDIA_COORDS[0]) * eased,
          INDIA_COORDS[1] + (ELURU_COORDS[1] - INDIA_COORDS[1]) * eased
        ];
      } else {
        // 0.9 to 1.0: Hold Eluru and show card
        zoom = 50;
        coords = ELURU_COORDS;
        if (!showCardRef.current) {
          showCardRef.current = true;
          setShowCard(true);
        }
      }

      // Prevent React from getting overwhelmed with redundant state updates
      setPosition(prev => {
        if (
          Math.abs(prev.zoom - zoom) < 0.001 &&
          Math.abs(prev.coordinates[0] - coords[0]) < 0.001 &&
          Math.abs(prev.coordinates[1] - coords[1]) < 0.001
        ) {
          return prev;
        }
        return { coordinates: coords, zoom };
      });

      if (latest < 1) {
        animationFrameId = requestAnimationFrame(updateAnimation);
      }
    };

    // Start animation after a short delay to ensure mount is completely stable
    const timeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(updateAnimation);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="flex flex-col md:block relative w-full max-w-sm mx-auto md:max-w-none group bg-white/5 backdrop-blur-md md:bg-transparent md:backdrop-blur-none rounded-2xl md:rounded-none overflow-hidden md:overflow-visible border border-[#D4AF37]/20 md:border-transparent shadow-[0_0_20px_rgba(212,175,55,0.05)] md:shadow-none">
      
      {/* Map Container */}
      <div className="relative w-full h-[220px] md:h-[600px] bg-[#050505] md:bg-[var(--background)] overflow-hidden md:rounded-sm border-b border-[#D4AF37]/20 md:border md:border-[var(--border-color)]">
        {/* Cinematic Lighting/Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000" style={{ opacity: showCard ? 1 : 0.5 }} />

        {/* Interactive Map */}
        <ComposableMap
          projectionConfig={{ 
            scale: 140 * position.zoom,
            center: position.coordinates as [number, number]
          }}
          width={800}
          height={600}
          style={{ width: "100%", height: "100%", outline: "none" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0a0a0a"
                  stroke="#333333"
                  strokeWidth={0.2 / Math.max(1, position.zoom * 0.5)} // Keep stroke thin when zoomed
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#1a1a1a", outline: "none", transition: "all 250ms" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Location Marker */}
          <Marker coordinates={ELURU_COORDS}>
            <motion.g 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: showCard ? 1 : 0, opacity: showCard ? 1 : 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {/* Outer pulsing ring */}
              <circle cx="0" cy="-6" r={4 / Math.max(1, position.zoom * 0.2)} fill="rgba(212, 175, 55, 0.4)" className="animate-ping" />
              {/* The Pin */}
              <path
                d="M0 -15C2.5 -15 4 -12 4 -10a4 4 0 0 1-8 0c0-2 1.5-5 4-5z"
                fill="#D4AF37"
                transform={`scale(${1.5 / Math.max(1, position.zoom * 0.2)})`}
              />
              <circle cx="0" cy="-10" r={1.5 / Math.max(1, position.zoom * 0.2)} fill="#050505" transform={`scale(${1.5 / Math.max(1, position.zoom * 0.2)})`} />
            </motion.g>
          </Marker>
        </ComposableMap>
      </div>

      {/* Floating Luxury Card Over Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: showCard ? 1 : 0, scale: showCard ? 1 : 0.95 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 p-6 md:p-8 w-full md:max-w-sm mx-auto md:glass-panel md:border md:border-[#D4AF37]/30 pointer-events-auto z-10"
      >
        <div className="hidden md:block absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50" />
        
        <div className="text-center">
          <h3 className="font-cinzel text-2xl text-[#D4AF37] mb-3">Keshav Photography</h3>
          <p className="font-space text-[var(--muted-text)] text-xs tracking-wider mb-6 leading-loose">
            Narasimharao Pet<br/>
            Eluru, Andhra Pradesh<br/>
            India
          </p>
          
          <div className="space-y-2 mb-8">
            <p className="font-space text-[10px] tracking-widest text-[var(--muted-text)]">P: +91 8886644868</p>
            <p className="font-space text-[10px] tracking-widest text-[var(--muted-text)]">P: +91 9703644868</p>
          </div>

          <a 
            href="https://maps.app.goo.gl/1VKSb1bJSWsuVmrx6"
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#D4AF37]/10 md:bg-transparent border border-[#D4AF37]/30 md:border-[#D4AF37]/50 rounded-lg md:rounded-none text-[#D4AF37] font-space text-xs tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 magnetic-item"
          >
            Get Directions <ArrowRight size={14} className="ml-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
