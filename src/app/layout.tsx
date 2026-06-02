import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Poppins, Space_Grotesk, Great_Vibes } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/layout/PublicLayout";
import prisma from "@/lib/prisma";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme: "dark" | "light" = "dark";
  try {
    // Safeguard for when Prisma Client hasn't generated the new model yet due to Windows EPERM lock
    if (prisma.websiteSettings) {
      const settings = await prisma.websiteSettings.findUnique({
        where: { id: "global" }
      });
      if (settings?.theme === "light" || settings?.theme === "dark") {
        theme = settings.theme;
      }
    }
  } catch (error) {
    console.error("Failed to fetch theme from DB", error);
  }

  return (
    <html lang="en" className={theme}>
      <body
        className={`${cinzel.variable} ${playfair.variable} ${poppins.variable} ${spaceGrotesk.variable} ${greatVibes.variable} antialiased selection:bg-[#D4AF37] selection:text-black`}
      >
        <ThemeProvider initialTheme={theme}>
          <PublicLayout>
            {children}
          </PublicLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
