"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
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
          <Link href="/" className="relative z-50 group magnetic-item">
            <span className="font-cinzel text-2xl md:text-3xl font-bold tracking-widest text-gradient-gold">
              KESHAV
            </span>
            <span className="block font-space text-[0.6rem] tracking-[0.3em] uppercase text-gray-400 group-hover:text-white transition-colors">
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
                  pathname === link.href ? "text-[#D4AF37]" : "text-gray-300 hover:text-white"
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
            className="md:hidden relative z-50 text-white magnetic-item"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center items-center"
          >
            {/* Animated Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
              <span className="font-cinzel text-9xl tracking-widest text-[#D4AF37]">
                KP
              </span>
            </div>

            <div className="flex flex-col space-y-8 text-center relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-cinzel text-4xl tracking-widest ${
                      pathname === link.href ? "text-[#D4AF37]" : "text-white hover:text-gray-400"
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
