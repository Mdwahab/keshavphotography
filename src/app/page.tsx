"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  { id: 1, image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop", title: "Eternal" },
  { id: 2, image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop", title: "Moments" },
  { id: 3, image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2000&auto=format&fit=crop", title: "Forever" }
];

const portals = [
  { name: "Weddings", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop" },
  { name: "Shoots", image: "https://images.unsplash.com/photo-1554046920-90dc5f3acb71?q=80&w=1000&auto=format&fit=crop" },
  { name: "Ceremonies", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop" },
  { name: "Birthdays", image: "https://images.unsplash.com/photo-1530103862676-de8892bf309c?q=80&w=1000&auto=format&fit=crop" }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <main className="relative bg-[#050505] overflow-hidden" ref={containerRef}>
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Top Spacer for Flex Balance */}
        <div className="h-10 w-full" />

        <motion.div 
          className="relative z-20 flex flex-col items-center text-center mt-12 mb-12"
          style={{ y, opacity }}
        >


          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="font-space text-xs text-gray-400 uppercase mb-4"
          >
            Welcome To
          </motion.p>

          {/* Luxury Logo Wordmark Group */}
          <motion.div 
            className="relative flex flex-col items-center mb-12"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            {/* Signature "Keshav" */}
            <div className="relative overflow-hidden px-4">
               {/* Shine Effect */}
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "200%" }}
                 transition={{ duration: 2, delay: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
                 className="absolute inset-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
               />
               <motion.h1 
                 initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                 animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                 transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                 className="font-great-vibes text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] font-normal tracking-normal drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] relative z-0 py-4 pr-8 inline-block"
                 style={{ lineHeight: '1.4' }}
               >
                 KP&nbsp;
               </motion.h1>
            </div>

            {/* "Photography" */}
            <motion.h2 
              initial={{ opacity: 0, y: 10, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.8em" }}
              transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
              className="font-cinzel text-sm md:text-lg lg:text-xl text-white font-light uppercase mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ml-4"
            >
              Photography
            </motion.h2>

               {/* Golden Particles Background */}
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                  className="absolute inset-0 pointer-events-none -z-10"
               >
                  {[
                    { ix: -80, iy: -40, ax: -30, ay: -20, d: 2 },
                    { ix: 60, iy: 30, ax: 20, ay: 10, d: 3 },
                    { ix: -40, iy: 60, ax: -10, ay: 30, d: 2.5 },
                    { ix: 90, iy: -50, ax: 40, ay: -20, d: 4 },
                    { ix: 10, iy: -80, ax: 5, ay: -40, d: 3.5 },
                    { ix: -70, iy: 20, ax: -35, ay: 10, d: 2.8 }
                  ].map((p, i) => (
                     <motion.div 
                        key={i}
                        className="absolute w-1 h-1 bg-[#D4AF37] rounded-full blur-[1px] left-1/2 top-1/2"
                        initial={{ x: p.ix, y: p.iy, opacity: 0 }}
                        animate={{ x: p.ax, y: p.ay, opacity: [0, 0.8, 0] }}
                        transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
                     />
                  ))}
               </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3.5, ease: "easeOut" }}
            className="font-playfair text-lg md:text-2xl text-[#D4AF37]/80 italic"
          >
            Capturing Emotions Forever
          </motion.h3>

          {/* Discover Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 4.5, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row gap-6 z-30 relative"
          >
            <Link href="/gallery" className="magnetic-item group">
              <button className="px-8 py-4 bg-[#D4AF37] text-black font-poppins text-sm tracking-widest uppercase hover:bg-white transition-all duration-500 rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Explore Gallery
              </button>
            </Link>
            <Link href="/booking" className="magnetic-item group">
              <button className="px-8 py-4 border border-[#D4AF37] text-[#D4AF37] font-poppins text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm">
                Book Experience
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="relative z-20 flex flex-col items-center mb-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-space text-xs tracking-widest uppercase text-gray-400 mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      {/* IMMERSIVE CATEGORY PORTALS */}
      <section className="relative w-full py-32 px-4 md:px-12 bg-[#050505]">
        <div className="container mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-cinzel text-4xl md:text-6xl text-white mb-4">Enter Our Worlds</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto opacity-50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {portals.map((portal, idx) => (
              <motion.div
                key={portal.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative h-[60vh] overflow-hidden rounded-sm cursor-pointer magnetic-item w-full"
              >
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all duration-700 z-10" />
                {/* Glowing border effect */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-[#D4AF37]/50 transition-colors duration-700 z-20 pointer-events-none" />
                
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={portal.image} 
                  alt={portal.name}
                  className="absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                />

                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8">
                  <h3 className="font-cinzel text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:text-white transition-all duration-700 text-center mb-6">
                    {portal.name}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                    <span className="font-poppins text-sm tracking-widest text-[#D4AF37] uppercase">Discover</span>
                    <ArrowRight className="text-[#D4AF37]" size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Teaser */}
      <section className="relative w-full py-40 bg-[#050505] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#3B0A0A]/10 to-[#050505]" />
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="container mx-auto text-center px-4 relative z-10"
         >
            <p className="font-playfair text-3xl md:text-5xl lg:text-7xl leading-tight text-white mb-12 max-w-5xl mx-auto">
               "We don't just take photographs. We freeze time, capture souls, and turn fleeting emotions into <span className="text-[#D4AF37] italic">eternal masterpieces</span>."
            </p>
            <Link href="/about" className="magnetic-item">
              <span className="font-space text-sm tracking-[0.3em] text-gray-400 hover:text-[#D4AF37] uppercase transition-colors border-b border-gray-400 hover:border-[#D4AF37] pb-2">
                 Read Our Story
              </span>
            </Link>
         </motion.div>
      </section>

    </main>
    </>
  );
}
