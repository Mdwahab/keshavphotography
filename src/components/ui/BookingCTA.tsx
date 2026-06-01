"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

const PARTICLES = [
  { size: 4.2, left: "15%", top: "25%", opacity: 0.15, duration: 6.5, xOffset: -5 },
  { size: 3.5, left: "85%", top: "15%", opacity: 0.25, duration: 8.2, xOffset: 8 },
  { size: 5.1, left: "45%", top: "75%", opacity: 0.2, duration: 5.5, xOffset: -8 },
  { size: 2.8, left: "75%", top: "85%", opacity: 0.3, duration: 7.0, xOffset: 5 },
  { size: 4.8, left: "10%", top: "65%", opacity: 0.12, duration: 9.1, xOffset: -10 },
  { size: 3.2, left: "90%", top: "50%", opacity: 0.22, duration: 6.8, xOffset: 6 },
];

export default function BookingCTA() {
  return (
    <section className="relative w-full py-[50px] md:py-32 bg-[var(--background)] overflow-hidden border-t border-[var(--border-subtle)]">
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 blur-[100px] pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4AF37]"
            style={{
              width: p.size + "px",
              height: p.size + "px",
              left: p.left,
              top: p.top,
              opacity: p.opacity,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, p.xOffset, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-panel rounded-lg p-8 md:p-16 text-center border border-[var(--border-color)] relative overflow-hidden group">
            {/* Inner Light Sweep Hover Effect */}
            <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000" />
            
            <div className="relative inline-block mb-10">
              {/* Luxury glow behind heading */}
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-[50px] rounded-full scale-150" />
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-[var(--foreground)] relative z-10"
              >
                Ready To Capture Your Wedding?
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-poppins text-sm md:text-base text-[var(--muted-text)] mb-14 max-w-3xl mx-auto leading-relaxed"
            >
              From sacred rituals and heartfelt family moments to grand celebrations, we preserve every emotion of your Hindu wedding with timeless photography and cinematic storytelling.
              <br /><br />
              Every tradition, blessing, smile, and memory is captured beautifully so your wedding story can be cherished for generations.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center"
            >
              {/* Primary Google Form Button */}
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSfD-8C1uEQwyhrr0u-Fazq4uxoVgEgTXkdEZu5GBdC40aRaOQ/viewform?usp=header" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary !flex items-center justify-center gap-4 px-10 py-5 w-full sm:w-fit mx-auto font-poppins text-sm md:text-base tracking-widest uppercase transition-all duration-500 rounded-sm relative overflow-hidden group/btn magnetic-item"
              >
                {/* Continuous Gold Shimmer Animation */}
                <motion.div 
                  className="absolute top-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
                <span className="relative z-10 font-medium whitespace-nowrap">Tell Us About Your Wedding</span>
                <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-2 transition-transform duration-300 flex-shrink-0" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
