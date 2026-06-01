"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { categorySlugs } from "@/lib/constants";

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
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/images?category=${encodeURIComponent(dbCategory)}`);
        const data = await res.json();
        setImages(data);
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

  return (
    <main className="bg-[var(--background)] min-h-screen pt-32 pb-20 overflow-hidden text-[var(--foreground)]">
      {/* Header */}
      <section className="container mx-auto px-6 md:px-12 mb-16 relative z-10">
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[var(--muted-text)] hover:text-[#D4AF37] font-space text-xs tracking-widest uppercase transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cinzel text-4xl md:text-6xl mb-6 text-[var(--foreground)]"
          >
            {dbCategory} <span className="text-gradient-gold">Collection</span>
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-[2px] bg-[#D4AF37] mx-auto opacity-50" 
          />
        </div>
      </section>

      {/* Masonry Layout */}
      <section className="container mx-auto px-6 md:px-8 relative z-10 min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : images.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col items-center justify-center mt-20"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-[var(--muted-text)] mb-4">Gallery Coming Soon</h2>
            <p className="font-poppins text-sm text-[var(--muted-text)] opacity-70">We are currently curating breathtaking moments for this collection.</p>
          </motion.div>
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img 
                    layoutId={`image-${img.imageUrl}`}
                    src={img.imageUrl} 
                    alt={img.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop";
                    }}
                    className="w-full h-auto object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
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
