import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Get image to find URL and publicId
    const image = await prisma.galleryImage.findUnique({
      where: { id }
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Try to delete file from Cloudinary if it has a publicId
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (err) {
        console.error("Failed to delete Cloudinary file:", err);
      }
    }

    // Delete from DB
    await prisma.galleryImage.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await req.json();

    const updated = await prisma.galleryImage.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        category: data.category
      }
    });

    return NextResponse.json({ success: true, image: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update image" }, { status: 500 });
  }
}
