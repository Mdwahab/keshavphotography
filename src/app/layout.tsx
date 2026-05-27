import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Scene3D from "@/components/3d/Scene";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Keshav Photography | Capturing Emotions Forever",
  description: "A NEXT-GENERATION cinematic digital universe for Keshav Photography. Luxury wedding and event photography based in Eluru, India.",
  openGraph: {
    title: "Keshav Photography | Capturing Emotions Forever",
    description: "A luxury cinematic photography experience.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${playfair.variable} ${poppins.variable} ${spaceGrotesk.variable} antialiased bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black`}
      >
        <SmoothScroll>
          <CustomCursor />
          <Scene3D />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
