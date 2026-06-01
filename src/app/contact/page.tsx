"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Camera, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 overflow-hidden text-white relative">
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
          <p className="font-poppins text-gray-400 max-w-lg mx-auto">Let's create something timeless together.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* Photographer Profile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-full border border-white/10 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/photos/haldi/Kalyan Sarika  Haldi @kalyan_gandham.jpg"
                alt="Keshav - Chief Photographer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-10 left-0 right-0 text-center">
                <h3 className="font-cinzel text-3xl text-[#D4AF37] mb-1">Keshav</h3>
                <p className="font-space text-xs tracking-[0.2em] uppercase text-gray-300">Chief Storyteller</p>
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
              <h2 className="font-cinzel text-2xl text-white mb-8 relative z-10">Direct Inquiries</h2>
              
              <div className="space-y-6 relative z-10">
                <a href="tel:+918886644868" className="flex items-center gap-6 group/item magnetic-item">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/item:border-[#D4AF37] transition-colors">
                    <Phone className="text-gray-400 group-hover/item:text-[#D4AF37] transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-space text-xs tracking-widest text-gray-500 uppercase mb-1">Call Us</p>
                    <p className="font-poppins text-lg text-white">+91 88866 44868 <br/> +91 97036 44868</p>
                  </div>
                </a>

                <a href="mailto:keshavphotography0101@gmail.com" className="flex items-center gap-6 group/item magnetic-item">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/item:border-[#D4AF37] transition-colors">
                    <Mail className="text-gray-400 group-hover/item:text-[#D4AF37] transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-space text-xs tracking-widest text-gray-500 uppercase mb-1">Email</p>
                    <p className="font-poppins text-lg text-white">keshavphotography0101@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-6 group/item">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover/item:border-[#D4AF37] transition-colors">
                    <MapPin className="text-gray-400 group-hover/item:text-[#D4AF37] transition-colors" size={20} />
                  </div>
                  <div>
                    <p className="font-space text-xs tracking-widest text-gray-500 uppercase mb-1">Visit</p>
                    <p className="font-poppins text-white leading-relaxed">
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
                <span className="font-space text-xs tracking-widest uppercase text-white relative z-10">WhatsApp</span>
              </a>
              
              <a href="https://www.instagram.com/keshav_fotographie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="glass-panel p-6 flex flex-col items-center justify-center gap-4 group magnetic-item relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/5 via-[#e6683c]/5 to-[#bc1888]/5 transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E1306C] transition-colors">
                  <Camera size={24} className="text-gray-400 group-hover:text-[#E1306C] transition-colors" />
                </div>
                <span className="font-space text-xs tracking-widest uppercase text-white relative z-10">Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Map Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full h-96 relative rounded-sm overflow-hidden border border-white/10 group"
        >
          {/* We use an image as a stylized map placeholder for cinematic feel, or a styled iframe */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/photos/Reception/Chandu ❤️ Vasudha (1).jpg" 
            alt="Map Location"
            className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-1000 pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center backdrop-blur-sm border border-[#D4AF37] relative">
              <span className="absolute inset-0 rounded-full animate-pulse-slow bg-[#D4AF37]/30" />
              <MapPin size={24} className="text-[#D4AF37] relative z-10" />
            </div>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/1VKSb1bJSWsuVmrx6"
            target="_blank" 
            rel="noreferrer"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 glass-panel border border-[#D4AF37]/50 text-[#D4AF37] font-space text-xs tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2 magnetic-item"
          >
            Get Directions <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
