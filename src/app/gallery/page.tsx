"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const categories = ["All", "Weddings", "Engagement", "Haldi", "Reception", "Pre Weddings", "Maternity Shoots", "Baby Shoots", "Shoots", "Ceremonies", "Birthdays"];

const images = [
  { id: 1, category: "Weddings", src: encodeURI("/photos/Weddings/Bride Sparsha (1).jpg") },
  { id: 2, category: "Weddings", src: encodeURI("/photos/Weddings/Bride Sparsha (2).jpg") },
  { id: 3, category: "Weddings", src: encodeURI("/photos/Weddings/సూత్ర ధారణ.jpg") },
  { id: 4, category: "Engagement", src: encodeURI("/photos/engagement/Bhavya 💖 Karthik (1).jpg") },
  { id: 5, category: "Engagement", src: encodeURI("/photos/engagement/Bhavya 💖 Karthik.jpg") },
  { id: 6, category: "Engagement", src: encodeURI("/photos/engagement/Big Vows ❤️.jpg") },
  { id: 7, category: "Engagement", src: encodeURI("/photos/engagement/Congratulations on the engagement of Yogitha and Lohith! Its a wonderful occasion filled with l.jpg") },
  { id: 8, category: "Haldi", src: encodeURI("/photos/haldi/Kalyan Sarika  Haldi @kalyan_gandham.jpg") },
  { id: 9, category: "Haldi", src: encodeURI("/photos/haldi/Vintage soul ..............Shot by -- @swathi_photography ( kpteam ).jpg") },
  { id: 10, category: "Reception", src: encodeURI("/photos/Reception/Chandu ❤️ Vasudha (1).jpg") },
  { id: 11, category: "Reception", src: encodeURI("/photos/Reception/Chandu ❤️ Vasudha.jpg") },
  { id: 12, category: "Baby Shoots", src: encodeURI("/photos/Baby Shoots/ButtaBomma (1).jpg") },
  { id: 13, category: "Baby Shoots", src: encodeURI("/photos/Baby Shoots/ButtaBomma.jpg") },
  { id: 131, category: "Baby Shoots", src: encodeURI("/photos/Baby Shoots/babyshoots1.jpg") },
  { id: 132, category: "Baby Shoots", src: encodeURI("/photos/Baby Shoots/babyshoots2.jpg") },
  { id: 133, category: "Baby Shoots", src: encodeURI("/photos/Baby Shoots/babyshoots3.jpg") },
  { id: 14, category: "Pre Weddings", src: encodeURI("/photos/Pre Weddings/perwedding1.jpg") },
  { id: 15, category: "Pre Weddings", src: encodeURI("/photos/Pre Weddings/perwedding2.jpg") },
  { id: 16, category: "Shoots", src: encodeURI("/photos/shoots/shoots.jpg") },
  { id: 161, category: "Shoots", src: encodeURI("/photos/shoots/shoots1.jpg") },
  { id: 162, category: "Shoots", src: encodeURI("/photos/shoots/shoots2.jpg") },
  { id: 163, category: "Shoots", src: encodeURI("/photos/shoots/shoots3.jpg") },
  { id: 164, category: "Shoots", src: encodeURI("/photos/shoots/shoots4.jpg") },
  { id: 165, category: "Shoots", src: encodeURI("/photos/shoots/shoots5.jpg") },
  { id: 166, category: "Shoots", src: encodeURI("/photos/shoots/shoots6.jpg") },
  { id: 17, category: "Ceremonies", src: encodeURI("/photos/ceremonies/Family portraits (1).jpg") },
  { id: 171, category: "Ceremonies", src: encodeURI("/photos/ceremonies/Family portraits.jpg") },
  { id: 172, category: "Ceremonies", src: encodeURI("/photos/ceremonies/h.jpg") },
  { id: 18, category: "Birthdays", src: encodeURI("/photos/Birthdays/Screenshot 2026-06-01 114211.png") },
  { id: 19, category: "Birthdays", src: encodeURI("/photos/Birthdays/Screenshot 2026-06-01 114231.png") },
  { id: 20, category: "Birthdays", src: encodeURI("/photos/Birthdays/Screenshot 2026-06-01 114249.png") },
  { id: 21, category: "Birthdays", src: encodeURI("/photos/Birthdays/Screenshot 2026-06-01 114307.png") },
  { id: 22, category: "Birthdays", src: encodeURI("/photos/Birthdays/Screenshot 2026-06-01 114324.png") },
  { id: 23, category: "Maternity Shoots", src: encodeURI("/photos/Maternity Shoot/619265833_18091615709060376_4948422069590568797_n.jpg") },
  { id: 24, category: "Maternity Shoots", src: encodeURI("/photos/Maternity Shoot/622496044_18091910290953095_8340231542531770894_n.jpg") },
  { id: 25, category: "Maternity Shoots", src: encodeURI("/photos/Maternity Shoot/622682885_18097112557734211_4456094619096742153_n.jpg") },
  { id: 26, category: "Maternity Shoots", src: encodeURI("/photos/Maternity Shoot/🤰🏻 (1).jpg") },
  { id: 27, category: "Maternity Shoots", src: encodeURI("/photos/Maternity Shoot/🤰🏻.jpg") }
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
