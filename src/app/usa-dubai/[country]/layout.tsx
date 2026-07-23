import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedCountry = decodeURIComponent(resolvedParams.country).replace(/-/g, ' ');
  const titleCountry = decodedCountry.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return {
    title: `${titleCountry} Wedding Photography | Keshav Photography`,
    description: `Premium wedding and pre-wedding photography services in ${titleCountry}. Explore our exclusive international shoots gallery by Keshav Photography.`,
    openGraph: {
      title: `${titleCountry} Wedding Photography | Keshav Photography`,
      description: `Premium wedding and pre-wedding photography services in ${titleCountry}.`,
    }
  };
}

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
