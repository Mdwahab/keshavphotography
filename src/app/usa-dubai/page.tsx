"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type GalleryImage = {
  id: string;
  imageUrl: string;
  country: string;
};

type CountryStats = {
  name: string;
  count: number;
  coverImage: string;
};

export default function InternationalDirectory() {
  const [countries, setCountries] = useState<CountryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/images?category=${encodeURIComponent("International Shoots")}`);
        const data: GalleryImage[] = await res.json();
        
        if (Array.isArray(data)) {
          // Group by country
          const grouped = data.reduce((acc, img) => {
            const countryName = img.country || "USA"; // Fallback to USA just in case
            if (!acc[countryName]) {
              acc[countryName] = { name: countryName, count: 0, coverImage: img.imageUrl };
            }
            acc[countryName].count += 1;
            return acc;
          }, {} as Record<string, CountryStats>);
          
          setCountries(Object.values(grouped));
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
      <section className="container mx-auto px-6 md:px-12 mb-12 md:mb-20 text-center relative z-10 pt-8">
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
          Select a destination to explore the gallery.
        </motion.p>
      </section>

      {/* Directory Grid */}
      <section className="container mx-auto px-6 md:px-12 relative z-10 min-h-[50vh]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin"></div>
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center font-space text-[var(--muted-text)] uppercase tracking-widest mt-20">
            No destinations available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {countries.map((country, idx) => (
              <Link key={country.name} href={`/usa-dubai/${encodeURIComponent(country.name.toLowerCase())}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-colors duration-500 bg-[var(--overlay-bg)]"
                >
                  <Image 
                    src={country.coverImage} 
                    alt={country.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-cinzel text-2xl text-white mb-2 tracking-wide group-hover:text-[#D4AF37] transition-colors">{country.name}</h3>
                    <p className="font-space text-[10px] tracking-[0.2em] text-[#D4AF37] uppercase">
                      {country.count} {country.count === 1 ? 'Photo' : 'Photos'}
                    </p>
                    <div className="w-0 h-[1px] bg-[#D4AF37] mt-4 group-hover:w-12 transition-all duration-500 ease-out" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
