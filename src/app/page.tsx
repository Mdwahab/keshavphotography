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
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
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

        <motion.div 
          className="relative z-20 flex flex-col items-center text-center mt-20"
          style={{ y, opacity }}
        >
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-cinzel text-5xl md:text-8xl lg:text-[10rem] text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-wider mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            KESHAV
          </motion.h1>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-playfair text-2xl md:text-4xl text-[#D4AF37] italic mb-12"
          >
            Capturing Emotions Forever
          </motion.h2>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
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
