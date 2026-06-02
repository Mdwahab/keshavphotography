import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let totalImages = 0;
  let categoryCounts: any = [];
  let recentUploads: any = [];

  try {
    totalImages = await prisma.galleryImage.count();
    
    categoryCounts = await prisma.galleryImage.groupBy({
      by: ['category'],
      _count: { category: true },
    });

    recentUploads = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Dashboard</h1>
        <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Overview of your gallery</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-panel p-8 border border-[var(--border-color)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="font-space text-xs text-[var(--muted-text)] tracking-widest uppercase mb-2">Total Images</h3>
          <p className="font-cinzel text-5xl text-[#D4AF37]">{totalImages}</p>
        </div>
        <div className="glass-panel p-8 border border-[var(--border-color)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="font-space text-xs text-[var(--muted-text)] tracking-widest uppercase mb-2">Active Categories</h3>
          <p className="font-cinzel text-5xl text-[#D4AF37]">{categoryCounts.length}</p>
        </div>
      </div>

      <div className="glass-panel border border-[var(--border-color)] p-8">
        <h2 className="font-cinzel text-2xl text-[var(--foreground)] mb-6 border-b border-[var(--border-color)] pb-4">Recent Uploads</h2>
        
        {recentUploads.length === 0 ? (
          <p className="text-[var(--muted-text)] font-poppins text-sm py-4">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {(recentUploads as any[]).map((img: any) => (
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
