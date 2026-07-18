import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Keshav Photography | Leading Wedding Photographer in Eluru",
  description: "Learn about Keshav Photography, the leading luxury wedding and cinematic photographer in Eluru, Hyderabad, USA, and Dubai. 16+ years of capturing eternal memories.",
  keywords: "About Keshav Photography, Wedding Photographer Eluru, Luxury Photographer, Best Wedding Photographer Hyderabad",
  alternates: {
    canonical: "https://keshavphotography.com/about",
  },
  openGraph: {
    title: "About Keshav Photography | Leading Wedding Photographer in Eluru",
    description: "Learn about Keshav Photography, the leading luxury wedding and cinematic photographer in Eluru, Hyderabad, USA, and Dubai.",
    url: "https://keshavphotography.com/about",
    images: ["/photos/about us/keshav.png"],
    type: "website",
    siteName: "Keshav Photography",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Keshav Photography | Leading Wedding Photographer in Eluru",
    description: "Learn about Keshav Photography, the leading luxury wedding and cinematic photographer in Eluru, Hyderabad, USA, and Dubai.",
    images: ["/photos/about us/keshav.png"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://keshavphotography.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://keshavphotography.com/about"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
