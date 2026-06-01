import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const InstagramIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const YoutubeIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-32 pb-12 overflow-hidden border-t border-white/5">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="font-great-vibes text-5xl text-gradient-gold mb-2 pr-4 inline-block pt-2">KP&nbsp;</h2>
            <p className="font-cinzel text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6">Photography</p>
            <p className="font-poppins text-sm text-gray-400 leading-relaxed max-w-xs">
              Capturing Emotions Forever. A luxury cinematic universe preserving your most precious memories in art.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel text-xl text-white mb-6">Explore</h3>
            <ul className="space-y-4 font-poppins text-sm text-gray-400">
              <li><Link href="/gallery" className="hover:text-[#D4AF37] transition-colors">The Gallery</Link></li>
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
                <span>keshavphotography0101@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-cinzel text-xl text-white mb-6">Connect</h3>
            <div className="flex gap-4">
              {/* Instagram */}
              <div className="magnetic-item">
                <a href="https://www.instagram.com/keshav_fotographie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group">
                  <InstagramIcon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
              <div className="magnetic-item">
                <a href="https://www.youtube.com/@Keshav_Photography/featured" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group">
                  <YoutubeIcon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
              {/* WhatsApp Pulse Orb */}
              <div className="magnetic-item">
                <a href="https://wa.me/918886644868" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all relative group">
                  <span className="absolute inset-0 rounded-full animate-pulse-slow bg-[#D4AF37]/20"></span>
                  <WhatsAppIcon size={20} className="group-hover:scale-110 transition-transform relative z-10" />
                </a>
              </div>
              {/* Normal Call */}
              <div className="magnetic-item">
                <a href="tel:+918886644868" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all group">
                  <Phone size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            <p className="mt-6 font-poppins text-xs text-gray-500">
              Mon–Sat: 10 AM – 7 PM<br />Sunday Closed
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-poppins text-xs text-gray-500">
            © 2026 KP Photography. All Rights Reserved.
          </p>
          <p className="font-poppins text-xs text-gray-500">
            Designed & Developed by <span className="text-[#D4AF37]">Sadhiq Mohammad</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
