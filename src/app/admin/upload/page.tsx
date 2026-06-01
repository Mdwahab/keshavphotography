"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

import { categories } from "@/lib/constants";

export default function AdminUpload() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.refresh();
          router.push("/admin/gallery");
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Upload Image</h1>
        <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Add a new memory to your gallery</p>
      </div>

      <div className="glass-panel p-8 border border-[var(--border-color)]">
        {success && (
          <div className="mb-6 p-4 bg-green-950/40 border border-green-500/50 text-green-400 font-space text-sm text-center rounded-sm">
            Image uploaded successfully! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 text-red-400 font-space text-sm text-center rounded-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Upload Area */}
          <div className="space-y-4">
            <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Image File</label>
            <div className="relative border-2 border-dashed border-[var(--border-color)] hover:border-[#D4AF37]/50 transition-colors rounded-sm h-64 flex items-center justify-center bg-[var(--overlay-bg)] overflow-hidden group">
              {preview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[var(--overlay-bg)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="p-3 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40">
                      <X size={24} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <Upload size={32} className="mx-auto text-[var(--muted-text)] mb-4" />
                  <p className="font-poppins text-sm text-[var(--muted-text)]">Click to browse or drag image here</p>
                  <p className="font-space text-[10px] text-[var(--muted-text)] mt-2">JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={!!preview}
              />
            </div>
          </div>

          {/* Details Area */}
          <div className="space-y-6">
            <div>
              <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 transition-colors rounded-sm"
                placeholder="E.g., Beautiful Beach Wedding"
              />
            </div>

            <div>
              <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 transition-colors rounded-sm"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[var(--background)]">{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Description (Optional)</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-3 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/50 transition-colors rounded-sm resize-none custom-scrollbar"
                placeholder="Brief description about the shot..."
              />
            </div>

            <button 
              type="submit"
              disabled={loading || !file}
              className="w-full py-4 bg-[#D4AF37] text-black font-space text-xs tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading..." : "Save Image"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
