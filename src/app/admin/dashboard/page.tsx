import prisma from "@/lib/prisma";
import { GalleryImage } from "@prisma/client";

export const dynamic = "force-dynamic";

type CategoryCount = {
  category: string;
  _count: { category: number };
};

export default async function AdminDashboard() {
  const getDashboardData = async () => {
    try {
      const totalImages = await prisma.galleryImage.count();
      
      const counts = await prisma.galleryImage.groupBy({
        by: ['category'],
        _count: { category: true },
      });

      const recent = await prisma.galleryImage.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4,
      });
      
      return { totalImages, categoryCounts: counts as CategoryCount[], recentUploads: recent };
    } catch (error) {
      console.error("Database connection failed:", error);
      return { totalImages: 0, categoryCounts: [] as CategoryCount[], recentUploads: [] as GalleryImage[] };
    }
  };

  const { totalImages, categoryCounts, recentUploads } = await getDashboardData();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Dashboard</h1>
        <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Overview of your gallery</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12">
        <div className="glass-panel p-6 md:p-8 border border-[var(--border-color)] relative overflow-hidden group rounded-xl md:rounded-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="font-space text-[10px] md:text-xs text-[var(--muted-text)] tracking-widest uppercase mb-1 md:mb-2">Total Images</h3>
          <p className="font-cinzel text-4xl md:text-5xl text-[#D4AF37] drop-shadow-sm">{totalImages}</p>
        </div>
        <div className="glass-panel p-6 md:p-8 border border-[var(--border-color)] relative overflow-hidden group rounded-xl md:rounded-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="font-space text-[10px] md:text-xs text-[var(--muted-text)] tracking-widest uppercase mb-1 md:mb-2">Total Videos</h3>
          <p className="font-cinzel text-4xl md:text-5xl text-[#D4AF37] drop-shadow-sm">6</p>
        </div>
        <div className="glass-panel p-6 md:p-8 border border-[var(--border-color)] relative overflow-hidden group rounded-xl md:rounded-sm sm:col-span-2 md:col-span-1">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="font-space text-[10px] md:text-xs text-[var(--muted-text)] tracking-widest uppercase mb-1 md:mb-2">Active Categories</h3>
          <p className="font-cinzel text-4xl md:text-5xl text-[#D4AF37] drop-shadow-sm">{categoryCounts.length}</p>
        </div>
      </div>

      <div className="glass-panel border border-[var(--border-color)] p-8">
        <h2 className="font-cinzel text-2xl text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-4">Recent Uploads</h2>
        
        {recentUploads.length === 0 ? (
          <p className="text-[var(--muted-text)] font-poppins text-sm py-4">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recentUploads.map((img) => (
              <div key={img.id} className="relative group rounded-sm overflow-hidden aspect-square border border-[var(--border-color)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--overlay-bg-heavy)] via-[var(--overlay-bg)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="font-poppins text-[var(--foreground)] text-sm truncate">{img.title}</p>
                  <p className="font-space text-[10px] text-[#D4AF37] uppercase tracking-widest">{img.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
