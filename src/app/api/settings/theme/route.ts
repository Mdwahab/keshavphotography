import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (!prisma.websiteSettings) {
      return NextResponse.json({ theme: "dark" });
    }
    const settings = await prisma.websiteSettings.findUnique({
      where: { id: "global" }
    });
    return NextResponse.json({ theme: settings?.theme || "dark" });
  } catch (error) {
    console.error("Theme fetch error:", error);
    return NextResponse.json({ theme: "dark" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { theme } = body;

    if (theme !== "dark" && theme !== "light") {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
    }

    if (!prisma.websiteSettings) {
      return NextResponse.json({ error: "Prisma client out of sync. Please restart the dev server." }, { status: 500 });
    }

    const settings = await prisma.websiteSettings.upsert({
      where: { id: "global" },
      update: { theme },
      create: { id: "global", theme },
    });

    // Clear the Next.js cache so layout.tsx refetches the updated theme on the next load
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, theme: settings.theme });
  } catch (error) {
    console.error("Theme update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
