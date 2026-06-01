"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import { ArrowRight, Play, X } from "lucide-react";

const YoutubeIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const initialSlides = [
  { id: 1, image: "/photos/background/Engagement%20Rings%20%F0%9F%92%8D.jpg", title: "Eternal" },
  { id: 2, image: "/photos/background/f.jpg", title: "Moments" },
  { id: 3, image: "/photos/background/h.jpg", title: "Forever" }
];

const portals = [
  { name: "Weddings", image: "/photos/Weddings/Bride Sparsha (1).jpg" },
  { name: "Shoots", image: "/photos/Shoots/Model ........%23fashionphotographyoftheday %23model📷 %23ｍodelshoot %23hot🔥 %23blues %23fashionblogger %23mo (1).jpg" },
  { name: "Ceremonies", image: "/photos/Ceremonies/Family portraits 📸.jpg" },
  { name: "Birthdays", image: "/photos/Birthdays/Screenshot 2026-06-01 114211.png" },
  { name: "Engagement", image: "/photos/Engagement/Big Vows ❤️.jpg" },
  { name: "Haldi", image: "/photos/haldi/Kalyan Sarika  Haldi @kalyan_gandham.jpg" },
  { name: "Reception", image: "/photos/Reception/Chandu ❤️ Vasudha (1).jpg" },
  { name: "Pre Weddings", image: "/photos/Pre Weddings/perwedding1.jpg" },
  { name: "Baby Shoots", image: "/photos/Baby Shoots/ButtaBomma 💫 (1).jpg" },
  { name: "Maternity Shoots", image: "/photos/Maternity Shoot/🤰🏻.jpg" }
];

const cinematicVideos = [
  { id: "gm26cEnjVqM", title: "Eternal Vows", description: "A beautiful cinematic journey of love and commitment." },
  { id: "W2OUt-nRhY4", title: "The Grand Celebration", description: "Experiencing the magic of a timeless celebration." },
  { id: "Bmc8xDWUKGw", title: "Moments of Joy", description: "Capturing the purest emotions and untold stories." },
  { id: "wE0aYgtSy90", title: "A Love Story", description: "Two souls, one beautiful destination." },
  { id: "wE0aYgtSy90", title: "The Haldi Ceremony", description: "Vibrant colors and unforgettable traditions." },
  { id: "nHmXnY7teoQ", title: "A Magical Evening", description: "The grand reception filled with love and laughter." }
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(initialSlides);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // Randomize slides on client load
    setSlides([...initialSlides].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Changed to 6 seconds as requested
    return () => clearInterval(interval);
  }, [loading, slides.length]);

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
                transition={{ duration: 0.8, delay: (idx % 2) * 0.2 }}
                className={`group relative h-[60vh] overflow-hidden rounded-sm cursor-pointer magnetic-item w-full ${idx === portals.length - 1 && portals.length % 2 !== 0 ? "md:col-span-2" : ""}`}
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

      {/* CINEMATIC VIDEOS SECTION */}
      <section className="relative w-full py-32 px-4 md:px-12 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="font-cinzel text-4xl md:text-6xl text-white mb-4"
              >
                Cinematic Videos
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-playfair text-xl text-[#D4AF37] italic"
              >
                Experience stories through motion.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <a href="https://www.youtube.com/@Keshav_Photography/featured" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-poppins text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm group magnetic-item">
                <YoutubeIcon size={18} />
                <span>View All Videos</span>
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cinematicVideos.map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                onClick={() => setActiveVideo(video.id)}
                className="group relative cursor-pointer magnetic-item rounded-sm overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-colors duration-500 bg-white/5"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500 transform group-hover:scale-110 shadow-lg">
                      <Play className="text-white group-hover:text-black ml-1" size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 relative z-30">
                  <h3 className="font-cinzel text-xl text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {video.title}
                  </h3>
                  <p className="font-poppins text-sm text-gray-400 line-clamp-2">
                    {video.description}
                  </p>
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

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-[#D4AF37] transition-colors z-[110] magnetic-item"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)] border border-[#D4AF37]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`} 
                title="YouTube cinematic video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
    </>
  );
}
