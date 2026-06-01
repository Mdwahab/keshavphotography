"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Scene3D from "@/components/3d/Scene";
import BookingCTA from "@/components/ui/BookingCTA";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Scene3D />
      <Navbar />
      {children}
      <BookingCTA />
      <Footer />
    </SmoothScroll>
  );
}
