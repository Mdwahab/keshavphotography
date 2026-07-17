import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Keshav Photography | The Story Behind the Lens",
  description: "Learn more about Keshav, the visionary behind Keshav Photography. Discover our 16+ years of experience capturing over 1000 luxury weddings in Eluru and beyond.",
  alternates: {
    canonical: "https://www.keshavphotography.com/about",
  },
  openGraph: {
    title: "About Keshav Photography | The Story Behind the Lens",
    description: "Learn more about Keshav, the visionary behind Keshav Photography. Discover our 16+ years of experience capturing over 1000 luxury weddings in Eluru and beyond.",
    url: "https://www.keshavphotography.com/about",
    images: ["/photos/about us/keshav.png"],
  },
  twitter: {
    title: "About Keshav Photography | The Story Behind the Lens",
    description: "Learn more about Keshav, the visionary behind Keshav Photography.",
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
                "item": "https://www.keshavphotography.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "About",
                "item": "https://www.keshavphotography.com/about"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
