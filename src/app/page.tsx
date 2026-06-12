"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, X, Eye, ThumbsUp, Calendar } from "lucide-react";
import { getBackgroundImages } from "./actions";

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
  { name: "Wedding", image: encodeURI("/photos/Weddings/Bride Sparsha (1).jpg") },
  { name: "Ceremonies", image: encodeURI("/photos/ceremonies/ceremonirs.jpeg") },
  { name: "Birthday", image: encodeURI("/photos/Birthdays/Birthday.jpeg") },
  { name: "Engagement", image: encodeURI("/photos/engagement/Big Vows ❤️.jpg") },
  { name: "Haldi", image: encodeURI("/photos/haldi/Kalyan Sarika  Haldi @kalyan_gandham.jpg") },
  { name: "Reception", image: encodeURI("/photos/Reception/Reception.jpeg") },
  { name: "Pre Wedding", image: encodeURI("/photos/Pre Weddings/Pre wedding.jpeg") },
  { name: "Baby", image: encodeURI("/photos/Baby Shoots/Baby shoot.jpeg") },
  { name: "Maternity", image: encodeURI("/photos/Maternity Shoots/meternity.jpeg") }
];

const cinematicVideos = [
  { id: "gm26cEnjVqM", title: "Eternal Vows", description: "A beautiful cinematic journey of love and commitment.", views: "142K", likes: "8.4K", date: "Jun 2026", duration: "4:12" },
  { id: "W2OUt-nRhY4", title: "The Grand Celebration", description: "Experiencing the magic of a timeless celebration.", views: "89K", likes: "5.1K", date: "May 2026", duration: "5:30" },
  { id: "Bmc8xDWUKGw", title: "Moments of Joy", description: "Capturing the purest emotions and untold stories.", views: "210K", likes: "12K", date: "Apr 2026", duration: "3:45" },
  { id: "wE0aYgtSy90", title: "A Love Story", description: "Two souls, one beautiful destination.", views: "65K", likes: "3.2K", date: "Mar 2026", duration: "6:15" },
  { id: "nHmXnY7teoQ", title: "The Haldi Ceremony", description: "Vibrant colors and unforgettable traditions.", views: "110K", likes: "6.7K", date: "Feb 2026", duration: "2:50" },
  { id: "gm26cEnjVqM", title: "A Magical Evening", description: "The grand reception filled with love and laughter.", views: "175K", likes: "9.8K", date: "Jan 2026", duration: "4:40" }
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
    // Randomize initial slides on client load just in case fetch is slow
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlides([...initialSlides].sort(() => Math.random() - 0.5));
    
    // Dynamically fetch all images from the background folder
    async function fetchDynamicBackgrounds() {
      const dynamicImages = await getBackgroundImages();
      if (dynamicImages.length > 0) {
        // Randomize order
        const shuffled = dynamicImages.sort(() => Math.random() - 0.5);
        setSlides(shuffled.map((img, idx) => ({ 
          id: idx + 1, 
          image: img, 
          title: "Keshav Photography" 
        })));
      }
    }
    fetchDynamicBackgrounds();
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Changed to 6 seconds as requested
    return () => clearInterval(interval);
  }, [loading, slides.length]);

  // Disable page scroll when video modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeVideo]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <main className="relative bg-[var(--background)] overflow-hidden" ref={containerRef}>
      
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-between overflow-hidden">
        {/* Sunlight Rays Overlay (Light Mode Only) */}
        <div className="sunlight-overlay absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 mix-blend-screen">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-gradient-to-br from-white/10 via-[#D4AF37]/5 to-transparent rotate-12 blur-[80px]" />
          <div className="absolute top-[-10%] right-[-20%] w-[50%] h-[120%] bg-gradient-to-bl from-white/5 via-transparent to-transparent -rotate-12 blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[60%] bg-gradient-to-t from-[#D4AF37]/10 to-transparent blur-[60px]" />
        </div>

        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1.05 : 1,
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" } 
            }}
          >
            <div className="absolute inset-0 bg-[var(--overlay-bg)] z-10 transition-colors duration-1000" />
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
            className="font-space text-xs text-[var(--muted-text)] uppercase mb-4"
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
            <div className="relative overflow-hidden px-6 md:px-0">
               {/* Shine Effect */}
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "200%" }}
                 transition={{ duration: 2, delay: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
                 className="absolute inset-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
               />
               <motion.div 
                 initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                 animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                 transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                 className="relative z-0 py-4 pr-8 inline-block"
               >
                 <Image 
                   src="/logo/Layer 0.png" 
                   alt="Keshav Photography" 
                   width={300} 
                   height={150} 
                   className="object-contain w-[clamp(100px,15vw,200px)] h-auto filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                 />
               </motion.div>
            </div>

            {/* "Photography" */}
            <motion.h2 
              initial={{ opacity: 0, y: 10, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.8em" }}
              transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
              className="font-cinzel text-sm md:text-lg lg:text-xl text-[var(--foreground)] font-light uppercase mt-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ml-4"
            >
              Photography
            </motion.h2>

               {/* Golden Particles Background / Light Mode Bokeh */}
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
                        className="bokeh-particle absolute rounded-full left-1/2 top-1/2"
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
              <button className="btn-primary px-8 py-4 font-poppins text-sm tracking-widest uppercase transition-all duration-500 rounded-sm relative overflow-hidden">
                <span className="relative z-10">Explore Gallery</span>
              </button>
            </Link>
            <Link href="/booking" className="magnetic-item group">
              <button className="btn-secondary px-8 py-4 border font-poppins text-sm tracking-widest uppercase transition-all duration-500 rounded-sm relative overflow-hidden">
                <span className="relative z-10">Book Experience</span>
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
          <span className="font-space text-xs tracking-widest uppercase text-[var(--muted-text)] mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      {/* IMMERSIVE CATEGORY PORTALS */}
      <section className="relative w-full pt-[60px] pb-[50px] md:py-32 px-6 md:px-12 bg-[var(--background)]">
        <div className="container mx-auto">
          <div className="mb-10 md:mb-20 text-center">
            <h2 className="font-cinzel text-4xl md:text-6xl text-[var(--foreground)] mb-4">Enter Our Worlds</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto opacity-50" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-16">
            {portals.map((portal, idx) => {
              const slug = portal.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <motion.div
                  key={portal.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: (idx % 2) * 0.2 }}
                  onClick={() => window.location.href = `/gallery/${slug}`}
                  className={`group relative aspect-[4/5] md:aspect-auto md:h-[70vh] overflow-hidden rounded-2xl md:rounded-sm cursor-pointer magnetic-item w-full active:scale-[0.98] md:active:scale-100 transition-transform duration-300 ${idx === portals.length - 1 && portals.length % 2 !== 0 ? "col-span-2 aspect-[2/1] sm:aspect-[4/5] md:aspect-auto md:col-span-2" : ""}`}
                >
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-[var(--overlay-bg)] group-hover:bg-black/10 transition-colors duration-700 z-10" />
                  {/* Dark gradient for text readability at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80 md:opacity-60 transition-opacity duration-700" />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 border border-[var(--border-color)] group-hover:border-[#D4AF37]/50 transition-colors duration-700 z-20 pointer-events-none rounded-2xl md:rounded-sm" />
                  
                  {/* Image */}
                  <img 
                    src={portal.image} 
                    alt={portal.name}
                    className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />

                  {/* Text Content - Premium Bottom Left Glass Label */}
                  <div className="absolute inset-0 z-30 flex flex-col justify-end p-2 sm:p-4 md:p-8">
                    <div className="glass-panel backdrop-blur-md bg-black/40 border border-[#D4AF37]/30 group-hover:border-[#D4AF37] p-3 sm:p-5 md:p-8 rounded-xl inline-flex flex-col items-start transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-all duration-500 w-[95%] md:w-fit max-w-sm group-hover:bg-black/60 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                      <h3 className="font-cinzel text-sm sm:text-2xl md:text-4xl text-white opacity-90 group-hover:opacity-100 transition-opacity duration-700 text-left mb-1 sm:mb-3 leading-tight group-hover:text-[#D4AF37]">
                        {portal.name}
                      </h3>
                      <div className="opacity-80 group-hover:opacity-100 flex items-center gap-1 sm:gap-3">
                        <span className="font-poppins text-[0.55rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] md:tracking-widest text-[#D4AF37] uppercase">Discover<span className="hidden sm:inline"> Collection</span></span>
                        <ArrowRight className="text-[#D4AF37] group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300 w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CINEMATIC VIDEOS SECTION */}
      <section className="relative w-full py-[50px] md:py-32 px-6 md:px-12 bg-[var(--background)] border-t border-[var(--border-subtle)]">
        <div className="container mx-auto">
          <div className="mb-10 md:mb-12 flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-16 h-[2px] bg-[#D4AF37] mb-8 opacity-70 origin-center" 
            />
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-[var(--foreground)] mb-8 tracking-wider uppercase"
            >
              Our Cinematic Films
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center gap-6 mb-8 px-4"
            >
              <p className="font-playfair text-xl md:text-2xl lg:text-3xl text-[#D4AF37] italic opacity-90 leading-relaxed max-w-2xl">
                &quot;Every love story deserves to be felt, <br className="hidden sm:block" />not just remembered.&quot;
              </p>
              <p className="text-[var(--muted-text)] font-poppins text-sm md:text-base tracking-wide max-w-xl leading-loose">
                Experience weddings through emotion, movement, music, and timeless storytelling.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a 
                href="https://www.youtube.com/@Keshav_Photography/featured" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-4 px-8 py-4 border border-[#D4AF37]/50 text-[#D4AF37] font-poppins text-xs md:text-sm tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm group relative overflow-hidden shadow-[0_0_0_rgba(212,175,55,0.0)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)]"
              >
                <YoutubeIcon size={16} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10 font-medium">Explore Our Films</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {cinematicVideos.map((video, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                onClick={() => setActiveVideo(video.id)}
                className="group relative cursor-pointer magnetic-item rounded-[14px] overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 bg-[var(--card-bg)] shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex flex-col active:scale-[1.03]"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video overflow-hidden shrink-0 rounded-t-[14px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80" />
                  <img 
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} 
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/80 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500 transform group-hover:scale-110 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <Play className="text-white group-hover:text-black ml-0.5 md:ml-1 w-4 h-4 md:w-6 md:h-6" fill="currentColor" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-1 right-1 md:bottom-3 md:right-3 z-20 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded text-[8px] md:text-[10px] font-space tracking-wider text-white border border-white/10">
                    {video.duration}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-2.5 md:p-5 lg:p-6 relative z-30 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cinzel text-xs md:text-lg lg:text-xl text-[var(--foreground)] mb-1 md:mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <p className="hidden md:block font-poppins text-xs sm:text-sm text-[var(--muted-text)] line-clamp-2 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>
                  
                  {/* Stats Row */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-auto pt-1.5 md:pt-4 border-t border-[var(--border-color)] gap-1 md:gap-0">
                    <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-xs font-poppins text-[var(--muted-text)]">
                      <span className="flex items-center gap-1 md:gap-1.5"><Eye size={10} className="text-[#D4AF37]/70 md:w-[14px] md:h-[14px]" /> {video.views}</span>
                      <span className="flex items-center gap-1 md:gap-1.5"><ThumbsUp size={10} className="text-[#D4AF37]/70 md:w-[14px] md:h-[14px]" /> {video.likes}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 text-[10px] md:text-xs font-space tracking-wider text-[var(--muted-text)]">
                      <Calendar size={12} className="text-[#D4AF37]/70" />
                      {video.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Teaser */}
      <section className="relative w-full py-[50px] md:py-40 bg-[var(--background)] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--border-subtle)] to-[var(--background)]" />
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="container mx-auto text-center px-6 relative z-10"
         >
            <p className="font-playfair text-3xl md:text-5xl lg:text-7xl leading-tight text-[var(--foreground)] mb-12 max-w-5xl mx-auto">
               &quot;We don&apos;t just take photographs. We freeze time, capture souls, and turn fleeting emotions into <span className="text-[#D4AF37] italic">eternal masterpieces</span>.&quot;
            </p>
            <Link href="/about" className="magnetic-item">
              <span className="font-space text-sm tracking-[0.3em] text-[var(--muted-text)] hover:text-[#D4AF37] uppercase transition-colors border-b border-gray-400 hover:border-[#D4AF37] pb-2">
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveVideo(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-[#D4AF37] hover:text-white transition-colors z-[110] magnetic-item p-2"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-[95vw] max-w-[900px] aspect-video bg-black rounded-[16px] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.3)] border border-[#D4AF37]/30"
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
                className="w-full h-full rounded-[16px]"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
    </>
  );
}
