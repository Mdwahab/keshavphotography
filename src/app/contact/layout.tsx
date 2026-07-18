import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Keshav Photography | Book Your Luxury Wedding Shoot in Eluru",
  description: "Contact Keshav Photography for premium wedding, engagement, and cinematic photography in Eluru, Hyderabad, USA, and Dubai. Call us at +91 88866 44868.",
  keywords: "Contact Keshav Photography, Wedding Photographer Eluru Contact, Book Wedding Photographer Hyderabad, USA Dubai Photography",
  alternates: {
    canonical: "https://keshavphotography.com/contact",
  },
  openGraph: {
    title: "Contact Keshav Photography | Book Your Luxury Wedding Shoot in Eluru",
    description: "Contact Keshav Photography for premium wedding, engagement, and cinematic photography in Eluru, Hyderabad, USA, and Dubai.",
    url: "https://keshavphotography.com/contact",
    images: ["/logo/logo.png"],
    type: "website",
    siteName: "Keshav Photography",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Keshav Photography | Book Your Luxury Wedding Shoot in Eluru",
    description: "Contact Keshav Photography for premium wedding, engagement, and cinematic photography in Eluru, Hyderabad, USA, and Dubai.",
    images: ["/logo/logo.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
                "name": "Contact",
                "item": "https://keshavphotography.com/contact"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
