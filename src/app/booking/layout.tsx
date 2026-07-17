import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Keshav Photography | Wedding & Event Photography",
  description: "Ready to capture your special moments? Book Keshav Photography for weddings, engagements, haldi, maternity, and pre-wedding shoots.",
  alternates: {
    canonical: "https://www.keshavphotography.com/booking",
  },
  openGraph: {
    title: "Book Keshav Photography | Wedding & Event Photography",
    description: "Ready to capture your special moments? Book Keshav Photography for weddings, engagements, haldi, maternity, and pre-wedding shoots.",
    url: "https://www.keshavphotography.com/booking",
  },
  twitter: {
    title: "Book Keshav Photography | Wedding & Event Photography",
    description: "Ready to capture your special moments? Book Keshav Photography.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far in advance should we book your photography services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking 3 to 6 months in advance for weddings and major events to ensure availability."
      }
    },
    {
      "@type": "Question",
      "name": "Do you travel for destination weddings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we frequently travel across India and internationally (including USA and Dubai) for destination weddings and shoots."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to receive the final photos and videos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Typically, you will receive a sneak peek within a week, and the full final edited gallery within 4 to 8 weeks depending on the scale of the event."
      }
    }
  ]
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
                "name": "Booking",
                "item": "https://www.keshavphotography.com/booking"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
