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

  const title = `${categoryName} Photography | Keshav Photography`;
  const description = `View our exclusive ${categoryName.toLowerCase()} photography gallery. Keshav Photography specializes in capturing timeless, luxury moments in Eluru and beyond.`;
  const url = `https://www.keshavphotography.com/gallery/${category}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
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
                "item": "https://www.keshavphotography.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Gallery",
                "item": "https://www.keshavphotography.com/gallery"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": categoryName,
                "item": `https://www.keshavphotography.com/gallery/${category}`
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
