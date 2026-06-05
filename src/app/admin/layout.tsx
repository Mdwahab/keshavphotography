"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Upload, 
  FolderTree, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Gallery Manager", href: "/admin/gallery", icon: ImageIcon },
    { name: "Upload Images", href: "/admin/upload", icon: Upload },
    { name: "Categories", href: "/admin/categories", icon: FolderTree },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const renderSidebarContent = () => (
    <>
      <div className="p-6 border-b border-[var(--border-color)]">
        <Image 
          src="/logo/Layer 0.png" 
          alt="Keshav Photography" 
          width={120} 
          height={60} 
          className="object-contain h-8 w-auto mb-1" 
        />
        <p className="font-space text-[10px] text-[var(--muted-text)] tracking-widest mt-2 uppercase">Admin Control Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm font-poppins text-sm transition-all duration-300 ${
                isActive 
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]" 
                  : "text-[var(--muted-text)] hover:text-[var(--foreground)] hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border-color)] mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-sm font-poppins text-sm transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden pb-16 md:pb-0">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-[var(--border-color)] glass-panel hidden md:flex flex-col z-20 shrink-0">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Slide-out Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <aside className="w-64 bg-[var(--background)] border-r border-[var(--border-color)] flex flex-col relative z-50 h-full animate-in slide-in-from-left duration-300 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden z-10 w-full">
        
        {/* Top Header */}
        <header className="h-16 border-b border-[var(--border-color)] glass-panel flex items-center justify-between px-4 md:px-8 shrink-0 z-10 bg-[var(--background)]/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-[var(--muted-text)] hover:text-[#D4AF37] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="font-cinzel text-lg md:text-xl text-[var(--foreground)] truncate">Admin Control</h1>
          </div>
          <div className="font-space text-[10px] md:text-xs tracking-widest text-[var(--muted-text)] uppercase flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="hidden sm:inline">Logged in as: </span><span className="text-[#D4AF37]">keshav0101</span>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto relative custom-scrollbar p-4 sm:p-6 md:p-12 w-full">
          {/* Cinematic ambient glow for dashboard */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#D4AF37]/5 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-full">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[var(--card-bg)] border-t border-[var(--border-color)] z-40 flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 ${
                isActive ? "text-[#D4AF37]" : "text-[var(--muted-text)] hover:text-white"
              }`}
            >
              <item.icon size={20} className={isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" : ""} />
              <span className="text-[10px] font-space tracking-wider">{item.name === "Gallery Manager" ? "Gallery" : item.name === "Upload Images" ? "Upload" : item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
