import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import * as fs from "fs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!file || !title || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sanitize filename: remove spaces, special chars, keep dots and dashes
    const originalName = file.name || "image.jpg";
    const extension = path.extname(originalName);
    const basename = path.basename(originalName, extension);
    
    // Replace all non-alphanumeric characters with dashes
    const safeBasename = basename.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const filename = `${Date.now()}-${safeBasename}${extension}`;
    
    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    const imageUrl = `/uploads/${encodeURIComponent(filename)}`;

    const newImage = await prisma.galleryImage.create({
      data: {
        title,
        description,
        category,
        imageUrl,
      }
    });

    console.log(`
    [UPLOAD SUCCESS]
    Filename: ${filename}
    Saved Image URL: ${imageUrl}
    Selected Category: ${category}
    Database ID: ${newImage.id}
    `);

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
