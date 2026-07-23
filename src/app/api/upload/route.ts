import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const file = formData.get("image") as File;
    const category = formData.get("category") as string;
    const country = formData.get("country") as string | null;

    if (!file || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const title = `${category} Image - ${Date.now()}`;
    const description = "";

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Upload directly to Cloudinary using a stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "keshav_photography" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    }) as any;
    
    const imageUrl = uploadResult.secure_url;
    const publicId = uploadResult.public_id;

    const newImage = await prisma.galleryImage.create({
      data: {
        title,
        description,
        category,
        country,
        imageUrl,
        publicId,
      }
    });

    console.log(`
    [UPLOAD SUCCESS]
    Cloudinary URL: ${imageUrl}
    Public ID: ${publicId}
    Selected Category: ${category}
    Database ID: ${newImage.id}
    `);

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
