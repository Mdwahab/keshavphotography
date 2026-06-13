import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Poppins, Space_Grotesk, Great_Vibes } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/layout/PublicLayout";
import prisma from "@/lib/prisma";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  metadataBase: new URL('https://www.keshavphotography.com'),
  title: "Keshav Photography | Capturing Emotions Forever",
  description: "Luxury wedding and event photography based in Eluru, India.",
  openGraph: {
    title: "Keshav Photography | Capturing Emotions Forever",
    description: "Luxury wedding and event photography based in Eluru, India.",
    url: "https://www.keshavphotography.com",
    siteName: "Keshav Photography",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Keshav Photography Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshav Photography | Capturing Emotions Forever",
    description: "Luxury wedding and event photography based in Eluru, India.",
    images: ["/twitter-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.keshavphotography.com/#localbusiness",
      "name": "Keshav Photography",
      "image": "https://www.keshavphotography.com/logo/Layer%200.png",
      "telephone": "+918886644868",
      "url": "https://www.keshavphotography.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Eluru",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.instagram.com/keshav_photography",
        "https://www.youtube.com/@keshavphotography",
        "https://wa.me/918886644868"
      ]
    },
    {
      "@type": "PhotographyBusiness",
      "name": "Keshav Photography",
      "description": "Luxury wedding and event photography based in Eluru, India.",
      "url": "https://www.keshavphotography.com"
    },
    {
      "@type": "Organization",
      "name": "Keshav Photography",
      "url": "https://www.keshavphotography.com",
      "logo": "https://www.keshavphotography.com/logo/Layer%200.png"
    },
    {
      "@type": "WebSite",
      "name": "Keshav Photography",
      "url": "https://www.keshavphotography.com"
    }
  ]
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
    console.warn("Failed to fetch theme from DB (database might be waking up). Proceeding with default theme.");
  }

  return (
    <html lang="en" className={theme}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${playfair.variable} ${poppins.variable} ${spaceGrotesk.variable} ${greatVibes.variable} antialiased selection:bg-[#D4AF37] selection:text-black`}
      >
        <ThemeProvider initialTheme={theme}>
          <PublicLayout>
            {children}
          </PublicLayout>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
