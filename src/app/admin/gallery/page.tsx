"use client";

import { useState, useEffect } from "react";
import { categories } from "@/lib/constants";
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

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/images?category=${filter}`);
      const data = await res.json();
      setImages(data);
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Gallery Manager</h1>
          <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Organize your portfolio</p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 rounded-sm w-full md:w-64"
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-[#D4AF37] font-space py-20">Loading...</div>
      ) : images.length === 0 ? (
        <div className="text-center text-[var(--muted-text)] font-poppins py-20 glass-panel border border-[var(--border-color)]">
          No images found. Go to Upload to add some.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map(img => (
            <div key={img.id} className="glass-panel border border-[var(--border-color)] overflow-hidden group flex flex-col">
              <div className="relative aspect-square overflow-hidden bg-[var(--overlay-bg)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img.imageUrl} 
                  alt={img.title}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-red-950/20');
                    target.insertAdjacentHTML('afterend', '<div class="text-red-400 font-space text-[10px] text-center p-4">⚠️ Image URL Invalid<br/><span class="text-[var(--muted-text)] text-[8px]">' + img.imageUrl + '</span></div>');
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setEditingImage(img);
                      setEditTitle(img.title);
                      setEditCategory(img.category);
                    }}
                    className="p-2 bg-[var(--overlay-bg)] hover:bg-[#D4AF37] text-[var(--foreground)] hover:text-black rounded-sm backdrop-blur-sm transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="p-2 bg-[var(--overlay-bg)] hover:bg-red-500 text-[var(--foreground)] rounded-sm backdrop-blur-sm transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-poppins text-[var(--foreground)] text-sm truncate mb-1">{img.title}</h3>
                <div className="flex justify-between items-center mt-auto">
                  <p className="font-space text-[10px] text-[#D4AF37] uppercase tracking-widest">{img.category}</p>
                  <p className="font-space text-[9px] text-[var(--muted-text)]">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
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
