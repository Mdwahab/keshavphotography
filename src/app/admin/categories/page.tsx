import prisma from "@/lib/prisma";
import { categories } from "@/lib/constants";

export default async function AdminCategories() {
  // Fetch image counts per category
  const categoryCounts = await prisma.galleryImage.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
  });

  const countMap = categoryCounts.reduce((acc, curr) => {
    acc[curr.category] = curr._count.category;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Categories</h1>
        <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Manage your portfolio collections</p>
      </div>

      <div className="glass-panel border border-[var(--border-color)] p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center justify-between p-4 bg-black/30 border border-[var(--border-subtle)] rounded-sm hover:border-[#D4AF37]/30 transition-colors">
              <span className="font-poppins text-[var(--foreground)]">{cat}</span>
              <span className="font-space text-xs text-[#D4AF37] px-3 py-1 bg-[#D4AF37]/10 rounded-full">
                {countMap[cat] || 0} Images
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-white/5 border border-[var(--border-color)] rounded-sm">
          <p className="font-space text-xs text-[var(--muted-text)] leading-relaxed">
            <strong className="text-[#D4AF37]">Note:</strong> These are the official master categories for Keshav Photography. 
            Images uploaded to these categories will automatically sort into their respective galleries on the public website.
          </p>
        </div>
      </div>
    </div>
  );
}
