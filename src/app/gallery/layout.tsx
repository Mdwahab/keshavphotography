import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Keshav Photography Premium Portfolio",
  description: "Explore the premium Keshav Photography gallery featuring luxury weddings, engagements, maternity, baby shoots, and more in Eluru, Hyderabad, USA, and Dubai.",
  keywords: "Gallery Keshav Photography, Wedding Portfolio Eluru, Premium Photography Portfolio, Cinematic Wedding Gallery",
  alternates: {
    canonical: "https://keshavphotography.com/gallery",
  },
  openGraph: {
    title: "Gallery | Keshav Photography Premium Portfolio",
    description: "Explore the premium Keshav Photography gallery featuring luxury weddings, engagements, maternity, baby shoots, and more in Eluru, Hyderabad, USA, and Dubai.",
    url: "https://keshavphotography.com/gallery",
    images: ["/logo/logo.png"],
    type: "website",
    siteName: "Keshav Photography",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Keshav Photography Premium Portfolio",
    description: "Explore the premium Keshav Photography gallery featuring luxury weddings, engagements, maternity, baby shoots, and more in Eluru, Hyderabad, USA, and Dubai.",
    images: ["/logo/logo.png"],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
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
                "name": "Gallery",
                "item": "https://keshavphotography.com/gallery"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
