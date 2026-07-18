import { Metadata } from "next";

export const metadata: Metadata = {
  title: "USA & Dubai Photography Services | Keshav Photography",
  description: "Keshav Photography offers premium international photography services across the USA and Dubai. We capture cross-cultural weddings and destination events with unparalleled luxury.",
  keywords: "USA Wedding Photographer, Dubai Wedding Photographer, Destination Wedding Photography USA, Keshav Photography Dubai",
  alternates: {
    canonical: "https://keshavphotography.com/usa-dubai",
  },
  openGraph: {
    title: "USA & Dubai Photography Services | Keshav Photography",
    description: "Keshav Photography offers premium international photography services across the USA and Dubai. We capture cross-cultural weddings and destination events with unparalleled luxury.",
    url: "https://keshavphotography.com/usa-dubai",
    images: ["/photos/usa and dubai/usa.jpg"],
    type: "website",
    siteName: "Keshav Photography",
  },
  twitter: {
    card: "summary_large_image",
    title: "USA & Dubai Photography Services | Keshav Photography",
    description: "Keshav Photography offers premium international photography services across the USA and Dubai. We capture cross-cultural weddings and destination events with unparalleled luxury.",
    images: ["/photos/usa and dubai/usa.jpg"],
  },
};

export default function UsaDubaiLayout({ children }: { children: React.ReactNode }) {
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
                "name": "USA / Dubai",
                "item": "https://keshavphotography.com/usa-dubai"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
