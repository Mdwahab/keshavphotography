import { Metadata } from "next";

export const metadata: Metadata = {
  title: "USA & Dubai Photography Services | Keshav Photography",
  description: "Keshav Photography offers premium international photography services across the USA and Dubai. We capture cross-cultural weddings and destination events with unparalleled luxury.",
  alternates: {
    canonical: "https://www.keshavphotography.com/usa-dubai",
  },
  openGraph: {
    title: "USA & Dubai Photography Services | Keshav Photography",
    description: "Keshav Photography offers premium international photography services across the USA and Dubai. We capture cross-cultural weddings and destination events.",
    url: "https://www.keshavphotography.com/usa-dubai",
    images: ["/photos/usa and dubai/usa.jpg"],
  },
  twitter: {
    title: "USA & Dubai Photography Services | Keshav Photography",
    description: "Premium international photography services across the USA and Dubai.",
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
                "item": "https://www.keshavphotography.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "USA / Dubai",
                "item": "https://www.keshavphotography.com/usa-dubai"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
