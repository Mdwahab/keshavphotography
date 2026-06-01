"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about" },
  { name: "Booking", href: "/booking" },
  { name: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-4 glass shadow-lg" : "py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 group magnetic-item flex flex-col items-center transform scale-90 md:scale-100 origin-left">
            <span className="font-great-vibes text-3xl md:text-4xl text-gradient-gold pr-2 inline-block pt-2">
              KP&nbsp;
            </span>
            <span className="block font-cinzel text-[0.55rem] md:text-[0.55rem] tracking-[0.4em] uppercase text-[var(--muted-text)] group-hover:text-[var(--foreground)] transition-colors">
              Photography
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-poppins text-sm tracking-widest uppercase transition-all duration-300 relative group magnetic-item ${
                  pathname === link.href ? "text-[#D4AF37]" : "text-[var(--muted-text)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]"
                  />
                )}
              </Link>
            ))}
            
            <Link href="/booking" className="magnetic-item">
              <button className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-poppins text-sm tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm">
                Book Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 text-[var(--foreground)] magnetic-item transition-transform active:scale-90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 w-full h-full z-40 bg-[var(--background)] flex flex-col justify-center items-center border-l border-[var(--border-subtle)]"
          >
            {/* Animated Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none flex flex-col items-center">
              <span className="font-great-vibes text-8xl md:text-9xl text-[#D4AF37] pr-6 inline-block pt-4">
                KP&nbsp;
              </span>
              <span className="font-cinzel text-xl md:text-2xl tracking-[0.8em] text-[#D4AF37] uppercase mt-4">
                Photography
              </span>
            </div>

            <div className="flex flex-col space-y-6 text-center relative z-10 w-full px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-cinzel text-3xl tracking-widest py-2 border-b border-transparent ${
                      pathname === link.href ? "text-[#D4AF37] border-[var(--border-subtle)]" : "text-[var(--foreground)] hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
