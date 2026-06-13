"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Trash2, ImagePlus, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { adminCategories } from "@/lib/constants";

type SelectedFile = {
  id: string;
  file: File;
  preview: string;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminUpload() {
  const router = useRouter();
  const [files, setFiles] = useState<SelectedFile[]>([]);
  const [category, setCategory] = useState(adminCategories[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const [overallProgress, setOverallProgress] = useState(0);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    setGlobalError("");
    const validFiles: SelectedFile[] = [];
    const invalidFiles: string[] = [];

    Array.from(newFiles).forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        invalidFiles.push(`${file.name} (Unsupported format)`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(`${file.name} (Exceeds 5MB)`);
        return;
      }

      validFiles.push({
        id: Math.random().toString(36).substring(7) + Date.now(),
        file,
        preview: URL.createObjectURL(file),
        status: "idle",
      });
    });

    if (invalidFiles.length > 0) {
      setGlobalError(`Skipped ${invalidFiles.length} invalid files. Accepted formats: JPG, PNG, WEBP under 5MB.`);
    }

    setFiles((prev) => [...prev, ...validFiles]);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const newFiles = prev.filter(f => f.id !== id);
      const removed = prev.find(f => f.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return newFiles;
    });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.preview));
    setFiles([]);
    setGlobalError("");
    setOverallProgress(0);
  };

  const handleBatchUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setGlobalError("Please select at least one image");
      return;
    }
    
    setGlobalError("");
    setIsUploading(true);
    setOverallProgress(0);

    const pendingFiles = files.filter(f => f.status === "idle" || f.status === "error");
    let completedCount = files.length - pendingFiles.length;

    // Concurrency limit helper
    const limit = 4;
    let i = 0;
    let hasError = false;
    
    const uploadNext = async (): Promise<void> => {
      if (i >= pendingFiles.length) return;
      const currentIndex = i++;
      const selectedFile = pendingFiles[currentIndex];
      
      // Update status to uploading
      setFiles(prev => prev.map(f => f.id === selectedFile.id ? { ...f, status: "uploading" } : f));

      try {
        const formData = new FormData();
        formData.append("image", selectedFile.file);
        formData.append("category", category);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          setFiles(prev => prev.map(f => f.id === selectedFile.id ? { ...f, status: "success" } : f));
        } else {
          hasError = true;
          const data = await res.json();
          setFiles(prev => prev.map(f => f.id === selectedFile.id ? { ...f, status: "error", error: data.error || "Upload failed" } : f));
        }
      } catch (err) {
        hasError = true;
        setFiles(prev => prev.map(f => f.id === selectedFile.id ? { ...f, status: "error", error: "Network error" } : f));
      }

      completedCount++;
      setOverallProgress(Math.round((completedCount / files.length) * 100));
      await uploadNext();
    };

    // Start initial batch
    const workers = [];
    for (let w = 0; w < Math.min(limit, pendingFiles.length); w++) {
      workers.push(uploadNext());
    }

    await Promise.all(workers);
    setIsUploading(false);

    // If all successful, redirect after a delay
    if (!hasError) {
      setTimeout(() => {
        router.refresh();
        router.push("/admin/gallery");
      }, 1500);
    }
  };

  const totalSize = files.reduce((acc, curr) => acc + curr.file.size, 0);
  const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
  const successCount = files.filter(f => f.status === "success").length;
  const errorCount = files.filter(f => f.status === "error").length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="font-cinzel text-3xl text-[var(--foreground)] mb-2">Upload Images</h1>
          <p className="font-space text-xs tracking-widest text-[var(--muted-text)] uppercase">Bulk upload memories to your gallery</p>
        </div>
        <div className="flex gap-4">
          <label className="cursor-pointer bg-[var(--overlay-bg)] border border-[var(--border-color)] hover:border-[#D4AF37]/50 text-[var(--foreground)] px-6 py-3 font-space text-xs tracking-widest uppercase transition-colors flex items-center gap-2">
            <ImagePlus size={16} className="text-[#D4AF37]" />
            Select Files
            <input id="file-upload" type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" disabled={isUploading} />
          </label>
          {files.length > 0 && !isUploading && (
            <button onClick={clearAll} className="bg-red-950/20 border border-red-900/30 hover:border-red-500/50 text-red-400 px-6 py-3 font-space text-xs tracking-widest uppercase transition-colors flex items-center gap-2">
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="glass-panel p-6 md:p-8 border border-[var(--border-color)]">
        {globalError && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 text-red-400 font-space text-sm rounded-sm flex items-start gap-3">
            <AlertCircle className="shrink-0" />
            <p>{globalError}</p>
          </div>
        )}

        <form onSubmit={handleBatchUpload} className="space-y-8">
          {/* Category Area */}
          <div className="max-w-xl">
            <label className="block font-space text-xs tracking-widest text-[var(--muted-text)] uppercase mb-2">Target Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isUploading}
              className="w-full bg-[var(--overlay-bg)] border border-[var(--border-color)] p-4 text-[var(--foreground)] font-poppins focus:outline-none focus:border-[#D4AF37]/80 transition-colors rounded-sm cursor-pointer hover:border-[#D4AF37]/30 text-lg disabled:opacity-50"
            >
              {adminCategories.map((c) => (
                <option key={c} value={c} className="bg-[var(--background)] py-2">{c}</option>
              ))}
            </select>
          </div>

          {/* Upload Area */}
          {files.length === 0 ? (
            <label 
              htmlFor="file-upload"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-[var(--border-color)] hover:border-[#D4AF37]/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300 rounded-sm h-[300px] flex items-center justify-center bg-[var(--overlay-bg)] overflow-hidden group cursor-pointer relative block"
            >
              <div className="text-center p-6 pointer-events-none">
                <Upload size={40} className="mx-auto text-[#D4AF37] mb-4 opacity-70 group-hover:scale-110 group-hover:text-[#D4AF37] transition-all" />
                <p className="font-poppins text-lg text-[var(--foreground)] mb-2">Drag and drop or click to browse</p>
                <p className="font-space text-xs text-[var(--muted-text)] uppercase tracking-wider">Multiple files supported</p>
                <p className="font-poppins text-[10px] text-[var(--muted-text)] mt-4">JPG, PNG, WEBP up to 5MB each. Shift+Click supported.</p>
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <h3 className="font-space tracking-widest text-sm uppercase text-[var(--foreground)]">
                    {files.length} Image{files.length !== 1 && "s"} Selected
                  </h3>
                  <p className="font-poppins text-xs text-[var(--muted-text)] mt-1">Total Size: {totalSizeMB} MB</p>
                </div>
                {isUploading && (
                  <div className="text-right">
                    <p className="font-space tracking-widest text-xs uppercase text-[#D4AF37] mb-1">
                      Uploading... {overallProgress}%
                    </p>
                    <p className="font-poppins text-[10px] text-[var(--muted-text)]">
                      {successCount} Success / {errorCount} Failed
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {isUploading && (
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37] transition-all duration-300"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              )}

              {/* Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-h-[500px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {files.map((f) => (
                  <div key={f.id} className="relative group aspect-square rounded-md overflow-hidden bg-white/5 border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.preview} alt="Preview" className={`w-full h-full object-cover ${f.status === 'success' ? 'opacity-50' : 'opacity-100'}`} />
                    
                    {/* Status Overlays */}
                    {f.status === "success" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-900/30 backdrop-blur-[2px]">
                        <CheckCircle2 className="text-green-400" size={32} />
                      </div>
                    )}
                    {f.status === "error" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/50 backdrop-blur-[2px] p-2 text-center">
                        <AlertCircle className="text-red-400 mb-1" size={24} />
                        <span className="text-[9px] text-white font-poppins line-clamp-2">{f.error}</span>
                      </div>
                    )}
                    {f.status === "uploading" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                        <Loader2 className="text-[#D4AF37] animate-spin" size={32} />
                      </div>
                    )}

                    {/* Remove Button */}
                    {!isUploading && f.status !== "success" && (
                      <button 
                        type="button"
                        onClick={() => removeFile(f.id)} 
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                      >
                        <X size={14} />
                      </button>
                    )}
                    
                    {/* Size Badge */}
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] font-space text-white/80">
                      {(f.file.size / (1024 * 1024)).toFixed(1)}MB
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 max-w-xl">
            <button 
              type="submit"
              disabled={isUploading || files.length === 0}
              className="w-full py-4 bg-[#D4AF37] text-black font-space text-sm md:text-base tracking-[0.2em] uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Uploading {files.length} Images...
                </>
              ) : files.length > 0 ? (
                `UPLOAD ${files.length} IMAGES TO ${category.toUpperCase()}`
              ) : (
                "SELECT IMAGES TO UPLOAD"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
