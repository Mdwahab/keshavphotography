import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const country = searchParams.get("country");

  try {
    let where: any = {};
    if (category && category !== "All") {
      if (category === "International Shoots") {
        where = { 
          category: { in: ["International Shoots", "USA / DUBAI"] },
          ...(country && country !== "All" ? { country } : {})
        };
      } else {
        where = { category };
      }
    }
    
    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
