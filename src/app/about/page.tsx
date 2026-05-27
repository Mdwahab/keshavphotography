"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 overflow-hidden text-white" ref={containerRef}>
      
      {/* Header Section */}
      <section className="container mx-auto px-6 md:px-12 mb-32 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl mb-6">
            The <span className="text-gradient-gold">Vision</span>
          </h1>
          <p className="font-poppins text-gray-400 max-w-2xl mx-auto tracking-wide leading-relaxed">
            Born from a desire to turn fleeting moments into timeless masterpieces, Keshav Photography transcends traditional imagery. We are architects of memory, crafting cinematic experiences that resonate through generations.
          </p>
        </motion.div>
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* Founder Section */}
      <section className="container mx-auto px-6 md:px-12 mb-40">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              style={{ y: y1 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[#D4AF37]/30 rounded-sm z-0" />
              <div className="absolute -inset-8 border border-white/5 rounded-sm z-0" />
              
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
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
                <p className="font-space text-xs tracking-widest uppercase text-gray-300">Founder & Visionary</p>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl italic text-white mb-8">
                "A photograph is not just seen; it is <span className="text-[#D4AF37]">felt</span>."
              </h2>
              <div className="space-y-6 font-poppins text-gray-400 leading-relaxed">
                <p>
                  Our journey began with a simple yet profound realization: the most beautiful moments in life are the ones we cannot hold on to. They slip through our fingers like sand, leaving only echoes in our minds.
                </p>
                <p>
                  At Keshav Photography, we don't capture faces; we capture souls. We seek the invisible thread of emotion that connects two people, the unspoken words in a glance, and the explosive joy of celebration.
                </p>
                <p>
                  Every click of the shutter is a promise to preserve a piece of time, immortalized with cinematic grandeur.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-6 md:px-12">
        <h2 className="font-cinzel text-3xl md:text-5xl text-center mb-24">The <span className="text-[#D4AF37]">Evolution</span></h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

          {[
            { year: "2018", title: "The Genesis", desc: "Started as a passion project in Eluru, capturing local stories with a borrowed camera." },
            { year: "2021", title: "The Cinematic Shift", desc: "Introduced movie-level production quality to weddings, transforming standard shoots into luxury experiences." },
            { year: "2024", title: "The Empire", desc: "Expanded across India, redefining the art of visual storytelling for high-end events." },
            { year: "2026", title: "Next Generation", desc: "Launching the digital universe, merging photography with immersive technology." }
          ].map((item, idx) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex items-center justify-between w-full mb-16 ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-[45%] flex flex-col items-center text-center p-6 glass-panel group hover:border-[#D4AF37]/40 transition-colors">
                <h4 className="font-cinzel text-xl text-[#D4AF37] mb-2 group-hover:scale-105 transition-transform">{item.title}</h4>
                <p className="font-poppins text-sm text-gray-400">{item.desc}</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#D4AF37] z-10 shadow-[0_0_10px_#D4AF37]" />
              <div className="w-[45%] flex justify-center">
                <span className="font-space text-4xl md:text-6xl font-bold text-white/5 opacity-50">{item.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  );
}
