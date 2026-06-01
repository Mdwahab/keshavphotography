"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { categories } from "@/lib/constants";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    address: "",
    specs: "",
    notes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 10) {
      setFormData({ ...formData, phone: val });
      if (val.length > 0 && val.length < 10) {
        setPhoneError("Please enter a valid 10-digit number");
      } else {
        setPhoneError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      setPhoneError("A 10-digit phone number is required");
      return;
    }
    setIsSubmitting(true);
    
    // Slight delay to show the redirecting animation
    setTimeout(() => {
      const message = `
          𝙺𝙿 𝙱𝙾𝙾𝙺𝙸𝙽𝙶 𝙸𝙽𝚀𝚄𝙸𝚁𝚈

Full Name : ${formData.name}

Email Address : ${formData.email}

Phone Number : ${formData.phone}

Event Type : ${formData.eventType}

Event Date : ${formData.date}

Event Venue / Address : ${formData.address}

Photography Specifications : ${formData.specs || 'N/A'}

Additional Notes / Our Story : ${formData.notes || 'N/A'}
━━━━━━━━━━━━━
𝘚𝘶𝘣𝘮𝘪𝘵𝘵𝘦𝘥 𝘷𝘪𝘢
𝙆𝙚𝙨𝙝𝙖𝙫 𝙋𝙝𝙤𝙩𝙤𝙜𝙧𝙖𝙥𝙝𝙮 𝙒𝙚𝙗𝙨𝙞𝙩𝙚

Date Submitted :
${new Date().toLocaleString()}
━━━━━━━━━━━━━`;

      window.open(
        `https://wa.me/918886644868?text=${encodeURIComponent(message)}`,
        "_blank"
      );
      
      setIsSubmitting(false);
      
      setFormData({
        name: "", email: "", phone: "", eventType: "", date: "", address: "", specs: "", notes: ""
      });
    }, 1000);
  };

  return (
    <main className="bg-[var(--background)] min-h-screen pt-32 pb-20 overflow-hidden text-[var(--foreground)] relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none z-0" />

      <section className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-cinzel text-4xl md:text-6xl mb-4"
          >
            Book Your <span className="text-gradient-gold">Experience</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-poppins text-[var(--muted-text)] max-w-2xl mx-auto"
          >
            Let us craft your eternal masterpiece. Fill out the details below, and our team will get back to you to orchestrate the magic.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-12 rounded-sm relative overflow-hidden">
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-8">
              {/* Name */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.1 }}
                className="relative group md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Full Name</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
              </motion.div>

              {/* Email */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.15 }}
                className="relative group md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Email Address</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
              </motion.div>

              {/* Phone */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.2 }}
                className="relative group md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <input required type="tel" inputMode="numeric" pattern="[0-9]*" name="phone" value={formData.phone} onChange={handlePhoneChange} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Phone Number</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
                <AnimatePresence>
                  {phoneError && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -bottom-5 left-0 text-[10px] text-red-400 font-space tracking-widest uppercase md:hidden">
                      {phoneError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Event Type Custom Dropdown */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.25 }}
                className="relative group md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <div 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full bg-transparent border-b pb-3 md:pb-2 cursor-pointer flex justify-between items-center transition-all duration-300 relative z-10 ${
                    isDropdownOpen || formData.eventType ? 'border-transparent md:border-[#D4AF37]' : 'border-[var(--border-color)]'
                  } ${isDropdownOpen ? '-translate-y-1 shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:translate-y-0 md:shadow-none' : ''}`}
                >
                  <span className={`font-poppins text-base ${formData.eventType ? 'text-[var(--foreground)]' : 'text-transparent'}`}>
                    {formData.eventType || "Select Photography Service"}
                  </span>
                  <div className={`w-3 h-3 border-r border-b border-[#D4AF37] transform transition-transform ${isDropdownOpen ? '-rotate-135 translate-y-1' : 'rotate-45 -translate-y-1/2'}`} />
                </div>
                <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] transition-all duration-500 md:hidden ${isDropdownOpen || formData.eventType ? 'w-full' : 'w-0'}`} />
                
                <label 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform origin-left transition-all duration-300 cursor-pointer pointer-events-none ${
                    formData.eventType || isDropdownOpen 
                      ? '-translate-y-5 scale-75 text-[#D4AF37]' 
                      : 'translate-y-0 scale-100'
                  }`}
                >
                  Select Photography Service
                </label>

                {/* Custom Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-[40]" onClick={() => setIsDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-[calc(100%+8px)] bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[50] overflow-hidden w-full max-w-full"
                      >
                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar flex flex-col py-2">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, eventType: cat });
                                setIsDropdownOpen(false);
                              }}
                              className={`text-left px-5 py-3 font-poppins text-sm transition-colors ${
                                formData.eventType === cat 
                                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-medium' 
                                  : 'text-white/80 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Date */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.3 }}
                className="relative group md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <input required type="date" style={{ colorScheme: 'dark' }} name="date" value={formData.date} onChange={handleChange} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Event Date</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
              </motion.div>

              {/* Address */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.35 }}
                className="relative group md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Event Venue / Address</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
              </motion.div>

              {/* Specifications */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.4 }}
                className="relative group md:col-span-2 md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <input type="text" name="specs" value={formData.specs} onChange={handleChange} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Photography Specifications (e.g., Drone, Cinematic Video)</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
              </motion.div>

              {/* Notes */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.5, delay: 0.45 }}
                className="relative group md:col-span-2 md:!opacity-100 md:!translate-y-0 md:!transform-none"
              >
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full bg-transparent border-b border-[var(--border-color)] pb-3 md:pb-2 font-poppins text-[var(--foreground)] focus:outline-none focus:border-transparent md:focus:border-[#D4AF37] transition-all duration-300 peer resize-none focus:-translate-y-1 focus:shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)] md:focus:translate-y-0 md:focus:shadow-none relative z-10" placeholder=" " />
                <label className="absolute left-0 top-0 text-[var(--muted-text)] font-poppins text-sm transform -translate-y-5 scale-75 origin-left transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Additional Notes / Our Story</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] w-0 transition-all duration-500 peer-focus:w-full md:hidden" />
              </motion.div>
            </div>

            <div className="mt-14 md:mt-12 flex justify-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="relative px-12 py-4 bg-[#D4AF37] text-black font-space tracking-[0.2em] uppercase text-sm w-full md:w-auto hover:bg-white active:scale-95 md:active:scale-100 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed magnetic-item group overflow-hidden"
              >
                {/* Mobile Shimmer Effect */}
                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[shimmer_3s_infinite] md:hidden" />
                
                <span className="relative z-10">{isSubmitting ? "Redirecting..." : "Submit Inquiry"}</span>
                
                {!isSubmitting && (
                  <span className="absolute inset-0 border border-[#D4AF37] scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 hidden md:block" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
