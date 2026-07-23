"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type GalleryImage = {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
};

export default function UsaDubaiGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/images?category=${encodeURIComponent("International Shoots")}`);
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
    fetchImages();
  }, []);

  return (
    <main className="bg-[var(--background)] min-h-screen pt-32 pb-20 overflow-hidden text-[var(--foreground)]">
      {/* Header */}
      <section className="container mx-auto px-6 md:px-12 mb-8 md:mb-16 text-center relative z-10 pt-8">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-4xl md:text-6xl mb-4 md:mb-6 uppercase"
        >
          <span className="text-gradient-gold">INTERNATIONAL</span> SHOOTS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-space tracking-widest text-xs md:text-sm text-[var(--muted-text)] max-w-2xl mx-auto uppercase"
        >
          Capturing beautiful stories across international destinations.
        </motion.p>
      </section>

      {/* Masonry Layout */}
      <section className="container mx-auto px-4 md:px-8 relative z-10 min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center font-space text-[var(--muted-text)] uppercase tracking-widest mt-20">
            No images in this collection yet.
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-6 space-y-3 md:space-y-6"
          >
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  key={img.id}
                  className="relative overflow-hidden rounded-md md:rounded-sm cursor-pointer group break-inside-avoid shadow-[0_4px_20px_rgba(0,0,0,0.5)] md:shadow-none transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  onClick={() => setSelectedImage(img.imageUrl)}
                >
                  <div className="absolute inset-0 bg-[var(--overlay-bg)] group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={img.imageUrl} 
                    alt={`${img.title} - Keshav Photography International Shoots`}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop";
                    }}
                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover UI */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center backdrop-blur-sm bg-black/20">
                      <span className="font-space text-[0.4rem] md:text-[0.5rem] tracking-[0.2em] text-[#D4AF37] uppercase">View</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 md:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-[#D4AF37] transition-colors z-[110] p-2 bg-black/50 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} className="md:w-8 md:h-8" />
            </button>
            <motion.img
              layoutId={`image-${selectedImage}`}
              src={selectedImage}
              alt="Fullscreen view"
              className="max-w-full max-h-[100vh] md:max-h-[90vh] object-contain rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.4}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeThreshold = 50;
                if (Math.abs(offset.y) > swipeThreshold || Math.abs(offset.x) > swipeThreshold) {
                  setSelectedImage(null);
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
