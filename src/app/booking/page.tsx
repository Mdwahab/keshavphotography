"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate backend submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "", email: "", phone: "", eventType: "", date: "", address: "", specs: "", notes: ""
        });
      }, 5000);
    }, 2000);
  };

  return (
    <main className="bg-[#050505] min-h-screen pt-32 pb-20 overflow-hidden text-white relative">
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
            className="font-poppins text-gray-400 max-w-2xl mx-auto"
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
            
            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle2 size={80} className="text-[#D4AF37] mb-6 shadow-[0_0_30px_#D4AF37]" />
                  </motion.div>
                  <h2 className="font-cinzel text-3xl text-white mb-2">Experience Secured</h2>
                  <p className="font-poppins text-gray-400 max-w-md">
                    Thank you for choosing Keshav Photography. We will be in touch shortly to finalize the details of your cinematic journey.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name */}
              <div className="relative group">
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Full Name</label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Email Address</label>
              </div>

              {/* Phone */}
              <div className="relative group">
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Phone Number</label>
              </div>

              {/* Event Type */}
              <div className="relative group">
                <select required name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none relative z-10 cursor-pointer">
                  <option value="" disabled className="bg-[#050505] text-gray-500">Select Event Type</option>
                  <option value="Wedding" className="bg-[#050505]">Wedding</option>
                  <option value="Pre-Wedding Shoot" className="bg-[#050505]">Pre-Wedding Shoot</option>
                  <option value="Ceremony" className="bg-[#050505]">Ceremony</option>
                  <option value="Birthday" className="bg-[#050505]">Birthday</option>
                  <option value="Other" className="bg-[#050505]">Other</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-r border-b border-[#D4AF37] transform rotate-45 pointer-events-none" />
              </div>

              {/* Date */}
              <div className="relative group">
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Event Date</label>
              </div>

              {/* Address */}
              <div className="relative group">
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Event Venue / Address</label>
              </div>

              {/* Specifications */}
              <div className="relative group md:col-span-2">
                <input type="text" name="specs" value={formData.specs} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Photography Specifications (e.g., Drone, Cinematic Video, specific styles)</label>
              </div>

              {/* Notes */}
              <div className="relative group md:col-span-2">
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full bg-transparent border-b border-white/20 pb-2 font-poppins text-white focus:outline-none focus:border-[#D4AF37] transition-colors peer resize-none" placeholder=" " />
                <label className="absolute left-0 top-0 text-gray-500 font-poppins text-sm transform -translate-y-4 scale-75 origin-left transition-all peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-[#D4AF37]">Additional Notes / Our Story</label>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="relative px-12 py-4 bg-[#D4AF37] text-black font-space tracking-[0.2em] uppercase text-sm hover:bg-white transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed magnetic-item group"
              >
                {isSubmitting ? "Orchestrating..." : "Submit Inquiry"}
                {!isSubmitting && (
                  <span className="absolute inset-0 border border-[#D4AF37] scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
