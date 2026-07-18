import { Metadata } from "next";
import { categorySlugs } from "@/lib/constants";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { category } = await params;
  
  // Find the exact display name from the slug mapping
  let categoryName = "Gallery";
  for (const [slug, name] of Object.entries(categorySlugs)) {
    if (slug === category) {
      categoryName = name;
      break;
    }
  }

  const title = `${categoryName} Photography | Premium Wedding Photographer in Eluru & Hyderabad`;
  const description = `View our exclusive ${categoryName.toLowerCase()} photography gallery. Keshav Photography specializes in capturing timeless, luxury moments in Eluru, Hyderabad, USA, and Dubai.`;
  const keywords = `${categoryName} Photography, Keshav Photography ${categoryName}, Wedding Photographer Eluru, Luxury ${categoryName} Shoot, Dubai Wedding Photographer, USA Wedding Photographer`;
  const url = `https://keshavphotography.com/gallery/${category}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: ["/logo/logo.png"],
      type: "website",
      siteName: "Keshav Photography",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo/logo.png"],
    },
  };
}

export default async function CategoryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  
  let categoryName = "Gallery";
  for (const [slug, name] of Object.entries(categorySlugs)) {
    if (slug === category) {
      categoryName = name;
      break;
    }
  }

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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": categoryName,
                "item": `https://keshavphotography.com/gallery/${category}`
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
