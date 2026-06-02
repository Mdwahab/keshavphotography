"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { categories as masterCategories } from "@/lib/constants";

const categories = ["All", ...masterCategories];

type GalleryImage = {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/images?category=${activeCategory}`);
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
  }, [activeCategory]);

  return (
    <main className="bg-[var(--background)] min-h-screen pt-32 pb-20 overflow-hidden text-[var(--foreground)]">
      {/* Header */}
      <section className="container mx-auto px-6 md:px-12 mb-16 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-5xl md:text-7xl mb-6"
        >
          The <span className="text-gradient-gold">Gallery</span>
        </motion.h1>
        
        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-x-visible justify-start md:justify-center gap-3 md:gap-8 mt-8 md:mt-12 px-4 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`snap-center whitespace-nowrap font-space uppercase transition-all duration-300 magnetic-item
                text-[0.65rem] md:text-xs tracking-widest md:tracking-[0.2em] 
                px-6 py-3 rounded-full md:px-0 md:py-0 md:rounded-none md:pb-2 md:border-b-2 
                ${idx === 0 ? 'ml-2 md:ml-0' : ''} ${idx === categories.length - 1 ? 'mr-6 md:mr-0' : ''}
                ${
                activeCategory === cat 
                  ? "bg-[#D4AF37] text-black md:bg-transparent md:border-b-[#D4AF37] md:text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] md:shadow-none" 
                  : "bg-white/5 backdrop-blur-md border border-white/10 text-[var(--muted-text)] md:bg-transparent md:border-transparent md:border-b-2 md:text-[var(--muted-text)] hover:text-[var(--foreground)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Masonry Layout */}
      <section className="container mx-auto px-6 md:px-8 relative z-10 min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center font-space text-[var(--muted-text)] uppercase tracking-widest mt-20">
            No images in this category yet.
          </div>
        ) : (
          <motion.div 
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
          >
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  key={img.id}
                  className="relative overflow-hidden rounded-sm cursor-pointer group break-inside-avoid magnetic-item"
                  onClick={() => setSelectedImage(img.imageUrl)}
                >
                  <div className="absolute inset-0 bg-[var(--overlay-bg)] group-hover:bg-transparent transition-colors duration-500 z-10" />
                  { }
                  <motion.img 
                    layoutId={`image-${img.imageUrl}`}
                    src={img.imageUrl} 
                    alt={img.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop";
                    }}
                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Hover UI */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-space text-[0.5rem] tracking-[0.2em] text-[#D4AF37] uppercase">View</span>
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
            className="fixed inset-0 z-[100] bg-[var(--overlay-bg-heavy)] backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-[var(--foreground)] hover:text-[#D4AF37] transition-colors z-[110] magnetic-item"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              layoutId={`image-${selectedImage}`}
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.1)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
