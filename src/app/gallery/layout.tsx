import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Keshav Photography Portfolio",
  description: "Explore the Keshav Photography gallery featuring our best work in luxury weddings, engagements, maternity, and more across India and internationally.",
  alternates: {
    canonical: "https://www.keshavphotography.com/gallery",
  },
  openGraph: {
    title: "Gallery | Keshav Photography Portfolio",
    description: "Explore the Keshav Photography gallery featuring our best work in luxury weddings, engagements, maternity, and more.",
    url: "https://www.keshavphotography.com/gallery",
  },
  twitter: {
    title: "Gallery | Keshav Photography Portfolio",
    description: "Explore the Keshav Photography gallery featuring our best work.",
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
                "item": "https://www.keshavphotography.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gallery",
                "item": "https://www.keshavphotography.com/gallery"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
