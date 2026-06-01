"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, CheckCircle } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function AdminSettings() {
  const { theme: globalTheme, setThemeGlobal } = useTheme();
  const [theme, setTheme] = useState<"dark" | "light">(globalTheme);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings/theme")
      .then((res) => res.json())
      .then((data) => {
        setTheme(data.theme);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch theme", err);
        setLoading(false);
      });
  }, []);

  const handleSaveTheme = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (res.ok) {
        setThemeGlobal(theme);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Error saving theme", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Settings</h1>
        <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">System configuration</p>
      </div>

      <div className="space-y-8">
        {/* Global Theme Selector */}
        <div className="glass-panel border border-[var(--border-color)] p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-cinzel text-xl text-[#D4AF37] mb-2">Website Theme</h3>
              <p className="font-space text-[10px] tracking-widest text-[var(--muted-text)] uppercase">Global aesthetic for all public visitors</p>
            </div>
            {saved && (
              <span className="flex items-center gap-2 text-green-400 font-space text-[10px] uppercase tracking-widest animate-pulse">
                <CheckCircle size={14} /> Theme Updated Successfully
              </span>
            )}
          </div>

          {loading ? (
            <div className="animate-pulse flex gap-4">
              <div className="h-24 w-1/2 bg-[var(--border-subtle)] rounded-sm"></div>
              <div className="h-24 w-1/2 bg-[var(--border-subtle)] rounded-sm"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-4 p-6 border rounded-sm transition-all duration-300 ${
                  theme === "dark" 
                    ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]" 
                    : "border-[var(--border-color)] hover:border-[var(--muted-text)] bg-[var(--overlay-bg)]"
                }`}
              >
                <div className={`p-3 rounded-full ${theme === "dark" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-[var(--border-subtle)] text-[var(--muted-text)]"}`}>
                  <Moon size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-poppins text-[var(--foreground)] text-lg">Dark Mode</h4>
                  <p className="font-space text-[10px] text-[var(--muted-text)] uppercase mt-1">Cinematic Luxury</p>
                </div>
              </button>

              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-4 p-6 border rounded-sm transition-all duration-300 ${
                  theme === "light" 
                    ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]" 
                    : "border-[var(--border-color)] hover:border-[var(--muted-text)] bg-[var(--overlay-bg)]"
                }`}
              >
                <div className={`p-3 rounded-full ${theme === "light" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-[var(--border-subtle)] text-[var(--muted-text)]"}`}>
                  <Sun size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-poppins text-[var(--foreground)] text-lg">Light Mode</h4>
                  <p className="font-space text-[10px] text-[var(--muted-text)] uppercase mt-1">Clean & Elegant</p>
                </div>
              </button>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSaveTheme}
              disabled={loading || saving}
              className="bg-[#D4AF37] hover:bg-[#b5952f] text-black font-space text-xs tracking-widest uppercase px-8 py-3 rounded-sm transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="glass-panel border border-[var(--border-color)] p-8">
          <div className="space-y-8">
            <div>
              <h3 className="font-cinzel text-xl text-[var(--foreground)] mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-space text-[10px] tracking-widest text-[var(--muted-text)] uppercase mb-1">Username</label>
                  <div className="font-poppins text-[var(--foreground)]">keshav0101</div>
                </div>
                <div>
                  <label className="block font-space text-[10px] tracking-widest text-[var(--muted-text)] uppercase mb-1">Role</label>
                  <div className="font-poppins text-[var(--foreground)]">Super Admin</div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[var(--border-color)]">
              <h3 className="font-cinzel text-xl text-[var(--foreground)] mb-4">Storage Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-space text-[10px] tracking-widest text-[var(--muted-text)] uppercase mb-1">Current Provider</label>
                  <div className="font-poppins text-[var(--foreground)]">Local File System (/public/uploads)</div>
                </div>
                <div>
                  <label className="block font-space text-[10px] tracking-widest text-[var(--muted-text)] uppercase mb-1">Database</label>
                  <div className="font-poppins text-[var(--foreground)]">SQLite (Prisma ORM)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
