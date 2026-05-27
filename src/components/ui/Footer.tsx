import Link from "next/link";
import { MapPin, Phone, Mail, Camera, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="font-cinzel text-3xl text-gradient-gold mb-4">KESHAV</h2>
            <p className="font-space text-xs tracking-widest uppercase text-gray-400 mb-6">Photography</p>
            <p className="font-poppins text-sm text-gray-400 leading-relaxed max-w-xs">
              Capturing Emotions Forever. A luxury cinematic universe preserving your most precious memories in art.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel text-xl text-white mb-6">Explore</h3>
            <ul className="space-y-4 font-poppins text-sm text-gray-400">
              <li><Link href="/gallery" className="hover:text-[#D4AF37] transition-colors">The Gallery</Link></li>
              <li><Link href="/events" className="hover:text-[#D4AF37] transition-colors">Memory Capsules</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">Our Philosophy</Link></li>
              <li><Link href="/booking" className="hover:text-[#D4AF37] transition-colors">Book Experience</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-cinzel text-xl text-white mb-6">Reach Us</h3>
            <ul className="space-y-4 font-poppins text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span>Narasimharao Pet,<br />Eluru, Andhra Pradesh,<br />India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <span>+91 8886644868 <br /> +91 9703644868</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <span>hello@keshavphotography.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-cinzel text-xl text-white mb-6">Connect</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com/keshavphotography" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all magnetic-item group">
                <Camera size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all magnetic-item group">
                <Globe size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              {/* WhatsApp Pulse Orb */}
              <a href="https://wa.me/918886644868" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all magnetic-item relative group">
                <span className="absolute inset-0 rounded-full animate-pulse-slow bg-[#D4AF37]/20"></span>
                <Phone size={20} className="group-hover:scale-110 transition-transform relative z-10" />
              </a>
            </div>
            <p className="mt-6 font-poppins text-xs text-gray-500">
              Mon–Sat: 10 AM – 7 PM<br />Sunday Closed
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-poppins text-xs text-gray-500">
            © 2026 Keshav Photography. All Rights Reserved.
          </p>
          <p className="font-poppins text-xs text-gray-500">
            Designed & Developed by <span className="text-[#D4AF37]">Sadhiq Mohammad</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
