"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Camera, ArrowRight } from "lucide-react";
import Image from "next/image";
import CinematicMap from "@/components/ui/CinematicMap";

export default function Contact() {
  return (
    <main className="bg-[var(--background)] min-h-screen pt-32 pb-20 overflow-hidden text-[var(--foreground)] relative">
      {/* Background Cinematic Elements */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#3B0A0A]/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="font-cinzel text-5xl md:text-7xl mb-4">Connect With <span className="text-gradient-gold">Us</span></h1>
          <p className="font-poppins text-[var(--muted-text)] max-w-lg mx-auto">Let&apos;s create something timeless together.</p>
        </motion.div>

        {/* ---------------- MOBILE ONLY LAYOUT (PHONES) ---------------- */}
        <div className="block md:hidden mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Side-by-Side Profile Card */}
            <div className="glass-panel p-5 rounded-2xl relative overflow-hidden border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.05)] mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[40px] pointer-events-none" />
              <div className="flex gap-5 items-center relative z-10">
                 <div className="w-[90px] shrink-0 relative">
                   <div className="aspect-[4/5] relative rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_10px_rgba(212,175,55,0.15)]">
                     <Image src={encodeURI("/photos/about us/keshav.png")} alt="Keshav - Founder and Lead Wedding Photographer at Keshav Photography" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale" />
                   </div>
                 </div>
                 <div className="flex flex-col justify-center pt-1">
                   <h3 className="font-cinzel text-xl text-[#D4AF37] mb-0.5 leading-tight">Keshav</h3>
                   <p className="font-space text-[0.55rem] tracking-widest uppercase text-[var(--muted-text)] mb-3">Chief Storyteller</p>
                   <div className="flex flex-col gap-1.5 font-poppins text-xs text-white/90">
                     <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80" />
                       <span>16+ Years Experience</span>
                     </div>
                     <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80" />
                       <span>1000+ Weddings</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden mb-6">
              <div className="flex flex-col gap-6 relative z-10">
                <a href="tel:+918886644868" className="flex items-center gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Phone className="text-[var(--muted-text)] group-hover:text-[#D4AF37] transition-colors" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-space text-[0.6rem] tracking-widest text-[var(--muted-text)] uppercase mb-0.5">Call Us</p>
                    <p className="font-poppins text-sm text-[var(--foreground)] leading-snug">+91 88866 44868 <br/> +91 97036 44868</p>
                  </div>
                </a>

                <a href="mailto:keshavphotography0101@gmail.com" className="flex items-center gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Mail className="text-[var(--muted-text)] group-hover:text-[#D4AF37] transition-colors" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-space text-[0.6rem] tracking-widest text-[var(--muted-text)] uppercase mb-0.5">Email</p>
                    <p className="font-poppins text-[0.75rem] text-[var(--foreground)] break-all">keshavphotography0101@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                    <MapPin className="text-[var(--muted-text)] group-hover:text-[#D4AF37] transition-colors" size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-space text-[0.6rem] tracking-widest text-[var(--muted-text)] uppercase mb-0.5">Studio Address</p>
                    <p className="font-poppins text-[0.75rem] text-[var(--foreground)] leading-relaxed">
                      Narasimharao Pet,<br/>Eluru, Andhra Pradesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Action Grid */}
            <div className="grid grid-cols-2 gap-3">
              <a href="https://wa.me/918886644868" target="_blank" rel="noreferrer" className="glass-panel p-4 flex flex-col items-center justify-center gap-3 rounded-2xl relative overflow-hidden bg-[#25D366]/5 border-[#25D366]/20 hover:border-[#25D366]/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center relative">
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30" />
                  <Phone size={18} className="text-[#25D366] relative z-10" />
                </div>
                <span className="font-space text-[0.6rem] tracking-widest uppercase text-white/90">WhatsApp</span>
              </a>
              
              <a href="https://www.instagram.com/keshav_fotographie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="glass-panel p-4 flex flex-col items-center justify-center gap-3 rounded-2xl relative overflow-hidden bg-[#E1306C]/5 border-[#E1306C]/20 hover:border-[#E1306C]/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                  <Camera size={18} className="text-[#E1306C]" />
                </div>
                <span className="font-space text-[0.6rem] tracking-widest uppercase text-white/90">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ---------------- TABLET & DESKTOP LAYOUT (UNCHANGED) ---------------- */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* Photographer Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-full border border-[var(--border-color)] group">
              <Image 
                src={encodeURI("/photos/about us/keshav.png")}
                alt="Keshav - Chief Wedding Photographer at Keshav Photography"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--overlay-bg-heavy)] to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="font-cinzel text-3xl text-[#D4AF37] mb-1">Keshav</h3>
                <p className="font-space text-xs tracking-[0.2em] uppercase text-[var(--muted-text)]">Chief Storyteller</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8"
          >
            <div className="glass-panel p-8 md:p-10 rounded-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 to-[#D4AF37]/5 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
              <h2 className="font-cinzel text-2xl text-[var(--foreground)] mb-8 relative z-10">Direct Inquiries</h2>
              
              <div className="flex flex-col gap-8 relative z-10">
                <a href="tel:+918886644868" className="flex items-center gap-6 group/item magnetic-item">
                  <div className="w-12 h-12 shrink-0 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover/item:border-[#D4AF37] transition-colors">
                    <Phone className="text-[var(--muted-text)] group-hover/item:text-[#D4AF37] transition-colors" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-1">Call Us</p>
                    <p className="font-poppins text-lg text-[var(--foreground)]">+91 88866 44868 <br/> +91 97036 44868</p>
                  </div>
                </a>

                <a href="mailto:keshavphotography0101@gmail.com" className="flex items-center gap-6 group/item magnetic-item">
                  <div className="w-12 h-12 shrink-0 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover/item:border-[#D4AF37] transition-colors">
                    <Mail className="text-[var(--muted-text)] group-hover/item:text-[#D4AF37] transition-colors" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-1">Email</p>
                    <p className="font-poppins text-lg text-[var(--foreground)] break-all">keshavphotography0101@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group/item">
                  <div className="w-12 h-12 shrink-0 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover/item:border-[#D4AF37] transition-colors">
                    <MapPin className="text-[var(--muted-text)] group-hover/item:text-[#D4AF37] transition-colors" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-1">Visit</p>
                    <p className="font-poppins text-lg text-[var(--foreground)] leading-relaxed">
                      Narasimharao Pet,<br/>Eluru, Andhra Pradesh,<br/>India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a href="https://wa.me/918886644868" target="_blank" rel="noreferrer" className="glass-panel p-6 flex flex-col items-center justify-center gap-4 group magnetic-item relative overflow-hidden">
                <div className="absolute inset-0 bg-[#25D366]/5 transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center relative">
                  <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30" />
                  <Phone size={24} className="text-[#25D366] relative z-10" />
                </div>
                <span className="font-space text-xs tracking-widest uppercase text-[var(--foreground)] relative z-10">WhatsApp</span>
              </a>
              
              <a href="https://www.instagram.com/keshav_fotographie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="glass-panel p-6 flex flex-col items-center justify-center gap-4 group magnetic-item relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/5 via-[#e6683c]/5 to-[#bc1888]/5 transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                <div className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:border-[#E1306C] transition-colors">
                  <Camera size={24} className="text-[var(--muted-text)] group-hover:text-[#E1306C] transition-colors" />
                </div>
                <span className="font-space text-xs tracking-widest uppercase text-[var(--foreground)] relative z-10">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Cinematic Map */}
        <div className="mt-16 mb-16">
          <div className="text-center mb-10">
            <h2 className="font-cinzel text-5xl text-[var(--foreground)] mb-4">Find Us</h2>
            <p className="font-space text-sm tracking-[0.2em] uppercase text-[#D4AF37]">Where Stories Begin.</p>
          </div>
          <CinematicMap />
        </div>
      </div>
    </main>
  );
}
