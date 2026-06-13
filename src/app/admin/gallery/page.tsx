"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { adminCategories } from "@/lib/constants";
import { Trash2, Edit2, X } from "lucide-react";

type GalleryImage = {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
  category: string;
  createdAt: string;
};

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  
  // Edit Modal State
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/images?category=${filter}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      } else {
        setImages([]);
        console.error("API returned error:", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchImages();
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/images/${id}`, { method: "DELETE" });
      if (res.ok) {
        setImages(images.filter(img => img.id !== id));
      }
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    try {
      const res = await fetch(`/api/images/${editingImage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, category: editCategory })
      });
      if (res.ok) {
        const { image: updated } = await res.json();
        setImages(images.map(img => img.id === updated.id ? updated : img));
        setEditingImage(null);
      }
    } catch (err) {
      alert("Failed to update");
    }
  };

  const [displayedImagesCount, setDisplayedImagesCount] = useState(16);

  useEffect(() => {
    setDisplayedImagesCount(16);
  }, [filter, searchQuery]);

  const filteredImages = useMemo(() => {
    return images.filter(img => img.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [images, searchQuery]);

  const displayedImages = useMemo(() => {
    return filteredImages.slice(0, displayedImagesCount);
  }, [filteredImages, displayedImagesCount]);

  return (
    <div className="max-w-6xl mx-auto pb-20 md:pb-0">
      <div className="flex flex-col mb-8 gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-cinzel text-2xl md:text-3xl text-[var(--foreground)] mb-1 md:mb-2">Gallery Manager</h1>
            <p className="font-space text-[10px] md:text-xs tracking-widest text-[var(--muted-text)] uppercase">Organize your portfolio <span className="text-[#D4AF37]">({filteredImages.length} items)</span></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input 
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-sm text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 rounded-sm w-full sm:w-48"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-sm text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 rounded-sm w-full sm:w-48"
            >
              <option value="All">All Categories</option>
              {adminCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="glass-panel border border-[var(--border-color)] overflow-hidden flex flex-col aspect-[4/5] animate-pulse rounded-md md:rounded-sm">
              <div className="w-full aspect-square bg-[#D4AF37]/5" />
              <div className="p-3 md:p-4 flex-1 flex flex-col justify-end gap-2 bg-[var(--overlay-bg)]">
                <div className="h-3 bg-[#D4AF37]/10 w-3/4 rounded" />
                <div className="flex justify-between items-center mt-1">
                   <div className="h-2 bg-[#D4AF37]/10 w-1/3 rounded" />
                   <div className="h-2 bg-[#D4AF37]/10 w-1/4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="text-center text-[var(--muted-text)] font-poppins py-20 glass-panel border border-[var(--border-color)] rounded-md">
          {searchQuery ? "No images match your search." : "No images found. Go to Upload to add some."}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {displayedImages.map(img => (
              <div key={img.id} className="glass-panel border border-[var(--border-color)] overflow-hidden group flex flex-col rounded-md md:rounded-sm">
                <div className="relative aspect-square overflow-hidden bg-[var(--overlay-bg)]">
                  <Image 
                    src={img.imageUrl} 
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 active:scale-95"
                  />
                  <div className="absolute top-1 right-1 md:top-2 md:right-2 flex gap-1 md:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setEditingImage(img);
                        setEditTitle(img.title);
                        setEditCategory(img.category);
                      }}
                      className="p-1.5 md:p-2 bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black rounded-sm backdrop-blur-md transition-colors shadow-lg active:scale-90"
                    >
                      <Edit2 size={12} className="md:w-[14px] md:h-[14px]" />
                    </button>
                    <button 
                      onClick={() => handleDelete(img.id)}
                      className="p-1.5 md:p-2 bg-black/60 hover:bg-red-600 text-white rounded-sm backdrop-blur-md transition-colors shadow-lg active:scale-90"
                    >
                      <Trash2 size={12} className="md:w-[14px] md:h-[14px]" />
                    </button>
                  </div>
                </div>
                <div className="p-2 md:p-4 flex-1 flex flex-col bg-gradient-to-b from-transparent to-black/20">
                  <h3 className="font-poppins text-[var(--foreground)] text-[10px] md:text-sm truncate mb-1" title={img.title}>{img.title}</h3>
                  <div className="flex justify-between items-center mt-auto">
                    <p className="font-space text-[8px] md:text-[10px] text-[#D4AF37] uppercase tracking-widest truncate max-w-[60%]">{img.category}</p>
                    <p className="font-space text-[7px] md:text-[9px] text-[var(--muted-text)]">
                      {new Date(img.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {displayedImages.length < filteredImages.length && (
            <div className="flex justify-center pt-8 pb-4">
              <button 
                onClick={() => setDisplayedImagesCount(prev => prev + 16)}
                className="px-8 py-3 bg-[var(--overlay-bg)] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 text-[#D4AF37] font-space text-xs tracking-[0.2em] uppercase transition-all duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-bg-heavy)] backdrop-blur-sm p-4">
          <div className="bg-[var(--card-bg)] border border-[#D4AF37]/30 p-8 w-full max-w-md relative">
            <button 
              onClick={() => setEditingImage(null)}
              className="absolute top-4 right-4 text-[var(--muted-text)] hover:text-[var(--foreground)]"
            >
              <X size={20} />
            </button>
            <h2 className="font-cinzel text-2xl text-[#D4AF37] mb-6">Edit Image</h2>
            <form onSubmit={handleEditSave} className="space-y-4">
              <div>
                <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Title</label>
                <input 
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50"
                  required
                />
              </div>
              <div>
                <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Category</label>
                <select
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                  className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50"
                >
                  {adminCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button 
                type="submit"
                className="w-full py-3 mt-4 bg-[#D4AF37] text-black font-space text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
