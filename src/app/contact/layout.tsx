import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Keshav Photography | Book Your Luxury Shoot",
  description: "Get in touch with Keshav Photography. Call us at +91 88866 44868 or visit our studio in Eluru, Andhra Pradesh. Let's capture your timeless moments.",
  alternates: {
    canonical: "https://www.keshavphotography.com/contact",
  },
  openGraph: {
    title: "Contact Keshav Photography | Book Your Luxury Shoot",
    description: "Get in touch with Keshav Photography. Call us at +91 88866 44868 or visit our studio in Eluru, Andhra Pradesh.",
    url: "https://www.keshavphotography.com/contact",
  },
  twitter: {
    title: "Contact Keshav Photography | Book Your Luxury Shoot",
    description: "Get in touch with Keshav Photography. Call us at +91 88866 44868.",
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
                "item": "https://www.keshavphotography.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://www.keshavphotography.com/contact"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
