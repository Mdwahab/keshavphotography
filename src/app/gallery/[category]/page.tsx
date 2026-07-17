"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { categorySlugs } from "@/lib/constants";
import Image from "next/image";

type GalleryImage = {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
};

export default function CategoryGallery() {
  const params = useParams();
  const router = useRouter();
  const slug = params.category as string;
  
  const dbCategory = categorySlugs[slug] || slug;
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    setDisplayedImages(images.slice(0, itemsPerPage));
    setPage(1);
  }, [images]);

  const loadMore = () => {
    const nextIdx = page * itemsPerPage;
    setDisplayedImages(prev => [...prev, ...images.slice(nextIdx, nextIdx + itemsPerPage)]);
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/images?category=${encodeURIComponent(dbCategory)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setImages([]);
          console.error("API returned error:", data);
        }
      } catch (err) {
        console.error("Failed to load images", err);
      } finally {
        setLoading(false);
      }
    };
    if (dbCategory) {
      fetchImages();
    }
  }, [dbCategory]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedIndex]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <main className="bg-[var(--background)] min-h-screen pt-24 pb-20 overflow-hidden text-[var(--foreground)]">
      {/* Header */}
      <section className="container mx-auto px-4 md:px-8 mb-8 md:mb-12 relative z-10">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[var(--muted-text)] hover:text-[#D4AF37] font-space text-[10px] md:text-xs tracking-widest uppercase transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-cinzel text-3xl md:text-5xl text-[var(--foreground)] leading-tight"
            >
              {dbCategory} <span className="text-gradient-gold block sm:inline">Collection</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-space text-[10px] md:text-xs tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-4 py-2 rounded-full inline-block w-fit"
          >
            {loading ? "Loading..." : `${images.length} Photos`}
          </motion.div>
        </div>
      </section>

      {/* Masonry Layout */}
      <section className="container mx-auto px-4 md:px-8 relative z-10 min-h-[50vh]">
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6">
            {[...Array(12)].map((_, i) => {
              // Predefined deterministic heights to avoid SSR hydration mismatch
              const heights = [250, 320, 280, 350, 220, 380, 260, 310, 290, 340, 240, 360];
              return (
                <div 
                  key={i} 
                  className="w-full bg-white/5 animate-pulse rounded-[14px] border border-white/5"
                  style={{ height: `${heights[i % heights.length]}px` }}
                />
              );
            })}
          </div>
        ) : images.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center mt-20 p-8 glass-panel border border-[var(--border-color)] rounded-[14px] text-center"
          >
            <h2 className="font-cinzel text-2xl md:text-3xl text-[var(--muted-text)] mb-4">Gallery Coming Soon</h2>
            <p className="font-poppins text-xs md:text-sm text-[var(--muted-text)] opacity-70">We are currently curating breathtaking moments for this collection.</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6"
          >
            <AnimatePresence>
              {displayedImages.map((img, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: (idx % 10) * 0.05 }}
                  key={img.id}
                  className="relative overflow-hidden rounded-[14px] cursor-pointer group break-inside-avoid shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-[0.98]"
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image 
                    src={img.imageUrl} 
                    alt={`${img.title} - Keshav Photography ${dbCategory} Collection`}
                    width={800}
                    height={1000}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-10 h-10 md:w-16 h-10 md:h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center backdrop-blur-md bg-black/40 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      <span className="font-space text-[8px] md:text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && displayedImages.length < images.length && (
          <div className="flex justify-center mt-12 mb-8 relative z-20">
            <button 
              onClick={loadMore}
              className="px-8 py-3 border border-[#D4AF37]/50 text-[#D4AF37] font-space text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 rounded-full"
            >
              Load More Photos
            </button>
          </div>
        )}
      </section>

      {/* Advanced Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex items-center justify-center select-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-[110] bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
              <div className="font-space text-[10px] md:text-sm tracking-widest text-white/70">
                {selectedIndex + 1} <span className="text-[#D4AF37]">/</span> {images.length}
              </div>
              <button 
                className="text-white hover:text-[#D4AF37] transition-colors p-2 bg-black/50 rounded-full pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              >
                <X size={24} className="md:w-8 md:h-8" />
              </button>
            </div>

            {/* Previous Arrow (Desktop) */}
            {selectedIndex > 0 && (
              <button 
                className="hidden md:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white bg-black/40 hover:bg-black/80 p-4 rounded-full transition-all hover:scale-110 border border-white/10"
                onClick={handlePrev}
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Next Arrow (Desktop) */}
            {selectedIndex < images.length - 1 && (
              <button 
                className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white bg-black/40 hover:bg-black/80 p-4 rounded-full transition-all hover:scale-110 border border-white/10"
                onClick={handleNext}
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Image Container */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              src={images[selectedIndex].imageUrl}
              alt={`${images[selectedIndex].title} - Keshav Photography ${dbCategory} Collection`}
              className="max-w-full max-h-[100vh] md:max-h-[90vh] object-contain cursor-grab active:cursor-grabbing shadow-[0_0_50px_rgba(212,175,55,0.05)]"
              onClick={(e) => e.stopPropagation()}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeThreshold = 50;
                if (offset.x < -swipeThreshold) {
                  handleNext();
                } else if (offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
