"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

function Counter({ from = 0, to, duration = 2.5, suffix = "" }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <main className="bg-[var(--background)] min-h-screen pt-32 pb-0 md:pb-20 overflow-hidden text-[var(--foreground)]" ref={containerRef}>
      
      {/* Header Section */}
      <section className="container mx-auto px-6 md:px-12 mb-16 md:mb-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6">
            My <span className="text-gradient-gold">Journey</span>
          </h1>
          <p className="font-playfair text-xl md:text-2xl text-[#D4AF37] italic max-w-2xl mx-auto tracking-wide">
            16+ Years of Capturing Timeless Memories
          </p>
        </motion.div>
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Founder Section & Story */}
      <section className="container mx-auto px-6 md:px-12 mb-8 md:mb-32 relative z-10">
        
        {/* ---------------- MOBILE LAYOUT (PHONES ONLY) ---------------- */}
        <div className="block md:hidden">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.05)]"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[50px] pointer-events-none" />
            
            <div className="flex gap-4 items-start relative z-10">
               {/* Left: Portrait */}
               <div className="w-[100px] shrink-0 relative">
                 <div className="aspect-[3/4] relative rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={encodeURI("/photos/about us/keshav.png")} alt="Keshav - Founder" className="absolute inset-0 w-full h-full object-cover grayscale" />
                 </div>
               </div>
               
               {/* Right: Info */}
               <div className="flex flex-col justify-center pt-1">
                 <h3 className="font-cinzel text-lg text-[#D4AF37] mb-1 leading-tight">Keshav</h3>
                 <p className="font-space text-[0.6rem] tracking-widest uppercase text-[var(--muted-text)] mb-3">Founder</p>
                 <div className="flex flex-col gap-1.5 font-poppins text-xs text-white/80">
                   <div className="flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                     <span>16+ Years Exp.</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                     <span>1000+ Weddings</span>
                   </div>
                 </div>
               </div>
            </div>
            
            {/* Short Intro */}
            <div className="mt-6 font-poppins text-sm text-[var(--muted-text)] leading-relaxed text-left relative z-10">
              <p>My journey began over 16 years ago, driven by a deep passion for capturing moments that truly matter. What started as a simple curiosity gradually evolved into a lifelong commitment to storytelling.</p>
            </div>
            
            {/* Expanded Content */}
            <motion.div 
               initial={false}
               animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
               className="overflow-hidden relative z-10"
            >
               <div className="pt-4 mt-4 border-t border-white/10 space-y-4 font-poppins text-sm text-[var(--muted-text)] leading-relaxed text-left">
                 <p>My professional career officially began in 2010, and since then, I have had the privilege of documenting more than 1,000 weddings across diverse cultures, traditions, and celebrations.</p>
                 <p>Through countless weddings, I have come to understand that a wedding is never just a single day. It is a beautiful story of love, family, emotions, and traditions that become cherished memories for generations.</p>
                 <p>Today, my work reflects not only technical expertise but also a deep understanding of emotions, human connections, and visual storytelling.</p>
                 <p className="font-playfair text-lg italic text-[#D4AF37] mt-6 text-center border-l-2 border-[#D4AF37] pl-4 py-1">
                   &quot;For me, wedding photography is more than a profession—it is a lifelong journey of capturing love, one frame at a time.&quot;
                 </p>
               </div>
            </motion.div>
            
            {/* Read More Button */}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 w-full relative z-10 text-center font-space text-[0.65rem] tracking-widest text-[#D4AF37] uppercase flex justify-center items-center gap-2 py-3 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg transition-colors border border-[#D4AF37]/20"
            >
              {isExpanded ? "Show Less" : "Read Full Story"}
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </motion.div>
        </div>

        {/* ---------------- DESKTOP & TABLET LAYOUT (UNCHANGED) ---------------- */}
        <div className="hidden md:flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Portrait Side */}
          <div className="w-full lg:w-5/12 relative">
            <motion.div 
              style={{ y: y1 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#D4AF37]/30 rounded-sm z-0" />
              <div className="absolute -inset-8 border border-[var(--border-subtle)] rounded-sm z-0" />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={encodeURI("/photos/about us/keshav.png")}
                alt="Keshav - Founder"
                className="absolute inset-0 w-full h-full object-cover rounded-sm z-10 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              
              {/* Floating Name Badge */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 md:-left-16 glass-panel p-6 z-20 magnetic-item"
              >
                <h3 className="font-cinzel text-2xl text-[#D4AF37] mb-1">Keshav</h3>
                <p className="font-space text-xs tracking-widest uppercase text-[var(--muted-text)]">Founder & Visionary</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Story Side */}
          <div className="w-full lg:w-7/12">
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="glass-panel p-8 md:p-12 relative overflow-hidden rounded-sm"
            >
              {/* Subtle inner glow for glassmorphism */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50" />
              
              <div className="space-y-6 font-poppins text-[var(--muted-text)] leading-relaxed text-sm md:text-base text-justify">
                <p>
                  My journey began over 16 years ago, driven by a deep passion for capturing moments that truly matter. What started as a simple curiosity behind the lens gradually evolved into a lifelong commitment to storytelling through photography.
                </p>
                <p>
                  My professional career officially began in 2010, and since then, I have had the privilege of documenting more than 1,000 weddings across diverse cultures, traditions, and celebrations. Over the years, this journey has provided me with extensive experience in every aspect of wedding photography—from candid moments and traditional rituals to cinematic storytelling, advanced editing, and complete event coverage.
                </p>
                <p>
                  Through countless weddings and celebrations, I have come to understand that a wedding is never just a single day. It is a beautiful story of love, family, emotions, and traditions that become cherished memories for generations. Every event has shaped my perspective, refined my skills, and strengthened my commitment to creating photographs that remain timeless and meaningful.
                </p>
                <p>
                  Today, with over 16 years of experience, my work reflects not only technical expertise but also a deep understanding of emotions, human connections, and visual storytelling. Every frame is captured with passion, precision, creativity, and the responsibility of preserving memories that will last a lifetime.
                </p>
                <p className="font-playfair text-xl italic text-[#D4AF37] mt-8 text-center md:text-left border-l-4 border-[#D4AF37] pl-6 py-2">
                  &quot;For me, wedding photography is more than a profession—it is a lifelong journey of capturing love, emotions, and unforgettable stories, one frame at a time.&quot;
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Counters Section */}
      <section className="container mx-auto px-6 md:px-12 mb-0 md:mb-32 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          
          {[
            { value: 16, suffix: "+", label: "Years of Experience" },
            { value: 1000, suffix: "+", label: "Weddings Captured" },
            { value: 2010, suffix: "", label: "Professional Journey Started", from: 2000 },
            { value: 100, suffix: "%", label: "Client Satisfaction" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center justify-center p-6 text-center group glass-panel hover:bg-white/5 transition-all duration-500 rounded-sm"
            >
              <h3 className="font-cinzel text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground)] to-[#D4AF37] mb-4 group-hover:scale-110 transition-transform duration-500">
                <Counter from={stat.from || 0} to={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="font-space text-xs md:text-sm tracking-widest text-[var(--muted-text)] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

    </main>
  );
}
