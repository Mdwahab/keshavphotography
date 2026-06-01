"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setThemeGlobal: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ 
  children, 
  initialTheme 
}: { 
  children: React.ReactNode; 
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextTheme, setNextTheme] = useState<Theme | null>(null);

  // Sync with document element on mount and theme change
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  const setThemeGlobal = (newTheme: Theme) => {
    if (newTheme === theme) return;
    
    // Start transition animation
    setNextTheme(newTheme);
    setIsTransitioning(true);
    
    // Halfway through animation, actually flip the theme
    setTimeout(() => {
      setTheme(newTheme);
    }, 400); // 400ms is half of the 800ms transition

    // End transition overlay
    setTimeout(() => {
      setIsTransitioning(false);
      setNextTheme(null);
    }, 1000);
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeGlobal }}>
      {children}
      
      {/* Cinematic Theme Switch Transition: Light Sweep */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center overflow-hidden"
            style={{
              backgroundColor: nextTheme === "light" ? "#F8F6F2" : "#050505"
            }}
          >
            {/* Cinematic Lens Flare / Sweep Effect */}
            <motion.div
              initial={{ x: "-150%", skewX: -20, opacity: 0 }}
              animate={{ x: "150%", skewX: -20, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute w-[200%] h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 blur-[40px]"
              style={{
                mixBlendMode: nextTheme === "light" ? "screen" : "lighten"
              }}
            />
            {/* Core Brightness Flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.8, 0], scale: 1.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-full h-full bg-gradient-to-b from-transparent via-[#FFFFFF] to-transparent opacity-50 blur-[60px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
