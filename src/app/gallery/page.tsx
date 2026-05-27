"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = ["All", "Weddings", "Shoots", "Ceremonies", "Birthdays"];

const images = [
  { id: 1, category: "Weddings", src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, category: "Shoots", src: "https://images.unsplash.com/photo-1554046920-90dc5f3acb71?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, category: "Ceremonies", src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, category: "Birthdays", src: "https://images.unsplash.com/photo-1530103862676-de8892bf309c?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, category: "Weddings", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, category: "Shoots", src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop" },
  { id: 7, category: "Ceremonies", src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop" },
  { id: 8, category: "Birthdays", src: "https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1200&auto=format&fit=crop" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = activeCategory === "All" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 overflow-hidden text-white">
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
          className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-space text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-2 border-b-2 ${
                activeCategory === cat 
                  ? "border-[#D4AF37] text-[#D4AF37]" 
                  : "border-transparent text-gray-500 hover:text-white hover:border-gray-500"
              } magnetic-item`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Masonry Layout */}
      <section className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                key={img.id}
                className="relative overflow-hidden rounded-sm cursor-pointer group break-inside-avoid magnetic-item"
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <motion.img 
                  layoutId={`image-${img.src}`}
                  src={img.src} 
                  alt={img.category}
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
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-[#D4AF37] transition-colors z-[110] magnetic-item"
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
