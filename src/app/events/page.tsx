"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const events = [
  { id: 1, title: "The Royal Union", date: "Oct 12, 2025", location: "Udaipur Palace", image: "/photos/Weddings/Bride Sparsha (2).jpg", desc: "A grand celebration of love amidst the heritage of Rajasthan." },
  { id: 2, title: "Whispers of the Ocean", date: "Nov 05, 2025", location: "Maldives", image: "/photos/Weddings/సూత్ర ధారణ.jpg", desc: "An intimate beachside vow exchange under the stars." },
  { id: 3, title: "Golden Hour Symphony", date: "Dec 20, 2025", location: "Tuscany", image: "/photos/Engagement/Bhavya 💖 Karthik (1).jpg", desc: "Sun-kissed vineyards witnessed the beginning of forever." },
  { id: 4, title: "Neon Nights", date: "Jan 14, 2026", location: "Mumbai", image: "/photos/Engagement/Congratulations on the engagement of Yogitha and Lohith! Its a wonderful occasion filled with l.jpg", desc: "A high-energy, vibrant sangeet filled with cinematic lights." },
  { id: 5, title: "Sacred Threads", date: "Feb 02, 2026", location: "Varanasi", image: "/photos/haldi/Vintage soul ..............Shot by -- @swathi_photography ( kpteam ).jpg", desc: "Traditional rituals captured in their raw, emotional essence." },
  { id: 6, title: "The Secret Garden", date: "Mar 15, 2026", location: "Kashmir", image: "/photos/Reception/Chandu ❤️ Vasudha.jpg", desc: "A floral paradise setting for a mystical pre-wedding shoot." },
  { id: 7, title: "Midnight Vows", date: "Apr 10, 2026", location: "Dubai", image: "/photos/Pre Weddings/perwedding2.jpg", desc: "Luxurious city lights framing a passionate desert celebration." },
  { id: 8, title: "Ethereal Echoes", date: "May 22, 2026", location: "Bali", image: "/photos/Baby Shoots/ButtaBomma 💫 (1).jpg", desc: "Spiritual calm and wild jungle romance entwined." },
  { id: 9, title: "Vintage Romance", date: "Jun 08, 2026", location: "Goa", image: "/photos/Shoots/Queen👑 pose..... @slaghini............... %23gitam %23vizag %23freshers %23b5 %23clientdaires %23potrait %23c.jpg", desc: "A Portuguese villa hosted this intimate, classic celebration." },
  { id: 10, title: "A Symphony of Souls", date: "Jul 17, 2026", location: "Kerala", image: "/photos/Ceremonies/Family portraits 📸 (1).jpg", desc: "Backwaters mirroring the serene bond of two hearts." }
];

export default function Events() {
  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 overflow-hidden text-white">
      <section className="container mx-auto px-6 md:px-12 mb-20 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl mb-4">
            Memory <span className="text-gradient-gold">Capsules</span>
          </h1>
          <p className="font-poppins text-gray-400 max-w-2xl mx-auto tracking-wide">
            Dive into the cinematic archives of our most unforgettable celebrations.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 md:gap-y-32">
          {events.map((event, index) => (
            <MemoryCapsule key={event.id} event={event} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

function MemoryCapsule({ event, index }: { event: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`group relative magnetic-item w-full ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#111]">
        {/* Dynamic Hover Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-[#D4AF37]/20 mix-blend-overlay z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <motion.img 
          style={{ y }}
          src={event.image}
          alt={event.title}
          className="absolute inset-0 w-full h-[120%] object-cover object-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-30 flex flex-col justify-end p-8 md:p-12">
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
            <span className="inline-block px-3 py-1 border border-[#D4AF37]/50 text-[#D4AF37] font-space text-[0.6rem] tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
              {event.date}
            </span>
            <h3 className="font-cinzel text-3xl md:text-5xl text-white mb-2 leading-tight drop-shadow-lg">
              {event.title}
            </h3>
            <div className="h-0 overflow-hidden group-hover:h-20 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
              <p className="font-poppins text-sm text-gray-300 mt-4 leading-relaxed">
                {event.desc}
              </p>
              <p className="font-space text-xs text-[#D4AF37] mt-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#D4AF37]" /> {event.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
