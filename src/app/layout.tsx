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
  metadataBase: new URL('https://keshavphotography.com'),
  title: "Keshav Photography | Premium Wedding Photographer in Eluru, Hyderabad, USA & Dubai",
  description: "Keshav Photography provides premium wedding photography, pre wedding shoots, engagement photography, maternity shoots, baby photography, birthday photography, half saree ceremonies and cinematic photography services in Eluru, Hyderabad, USA and Dubai.",
  keywords: "Keshav Photography, Wedding Photographer Eluru, Wedding Photography Hyderabad, Best Wedding Photographer, Pre Wedding Photography, Wedding Shoot, Cinematic Wedding Photography, Engagement Photography, Haldi Photography, Reception Photography, Maternity Photography, Baby Photography, Birthday Photography, Half Saree Ceremony Photography, Luxury Photography, USA Wedding Photographer, Dubai Wedding Photographer",
  authors: [{ name: "Keshav Photography" }],
  robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  alternates: {
    canonical: "https://keshavphotography.com",
  },
  openGraph: {
    title: "Keshav Photography | Premium Wedding Photographer in Eluru, Hyderabad, USA & Dubai",
    description: "Keshav Photography provides premium wedding photography, pre wedding shoots, engagement photography, maternity shoots, baby photography, birthday photography, half saree ceremonies and cinematic photography services in Eluru, Hyderabad, USA and Dubai.",
    url: "https://keshavphotography.com",
    siteName: "Keshav Photography",
    images: [
      {
        url: "/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Keshav Photography",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshav Photography | Premium Wedding Photographer in Eluru, Hyderabad, USA & Dubai",
    description: "Keshav Photography provides premium wedding photography, pre wedding shoots, engagement photography, maternity shoots, baby photography, birthday photography, half saree ceremonies and cinematic photography services in Eluru, Hyderabad, USA and Dubai.",
    images: ["/logo/logo.png"],
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
      "@type": ["LocalBusiness", "PhotographyBusiness", "ProfessionalService"],
      "@id": "https://keshavphotography.com/#localbusiness",
      "name": "Keshav Photography",
      "image": "https://keshavphotography.com/logo/logo.png",
      "telephone": "+918886644868",
      "url": "https://keshavphotography.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Eluru",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN"
      },
      "areaServed": [
        { "@type": "City", "name": "Eluru" },
        { "@type": "City", "name": "Hyderabad" },
        { "@type": "State", "name": "Andhra Pradesh" },
        { "@type": "Country", "name": "USA" },
        { "@type": "City", "name": "Dubai" }
      ],
      "sameAs": [
        "https://www.instagram.com/keshav_fotographie",
        "https://www.youtube.com/@keshavphotography",
        "https://wa.me/918886644868"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://keshavphotography.com/#organization",
      "name": "Keshav Photography",
      "url": "https://keshavphotography.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://keshavphotography.com/#logo",
        "inLanguage": "en-IN",
        "url": "https://keshavphotography.com/logo/logo.png",
        "width": 1200,
        "height": 630,
        "caption": "Keshav Photography"
      },
      "sameAs": [
        "https://www.instagram.com/keshav_fotographie",
        "https://www.youtube.com/@keshavphotography",
        "https://wa.me/918886644868"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://keshavphotography.com/#website",
      "name": "Keshav Photography",
      "url": "https://keshavphotography.com",
      "publisher": {
        "@id": "https://keshavphotography.com/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://keshavphotography.com/#webpage",
      "url": "https://keshavphotography.com",
      "name": "Keshav Photography | Premium Wedding Photographer in Eluru, Hyderabad, USA & Dubai",
      "isPartOf": {
        "@id": "https://keshavphotography.com/#website"
      },
      "about": {
        "@id": "https://keshavphotography.com/#organization"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://keshavphotography.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://keshavphotography.com/"
        }
      ]
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
