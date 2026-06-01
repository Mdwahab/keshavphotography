"use server";

import fs from "fs";
import path from "path";

export async function getBackgroundImages() {
  try {
    const dir = path.join(process.cwd(), "public", "photos", "background");
    if (!fs.existsSync(dir)) {
      return [];
    }
    
    const files = fs.readdirSync(dir);
    const validFiles = files.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
    
    // Map to public URLs, encoding filenames to safely handle spaces and emojis
    return validFiles.map((file) => `/photos/background/${encodeURIComponent(file)}`);
  } catch (error) {
    console.error("Error reading background images:", error);
    return [];
  }
}
