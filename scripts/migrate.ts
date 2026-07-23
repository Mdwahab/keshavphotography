import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.galleryImage.updateMany({
    where: { category: "USA / DUBAI" },
    data: { category: "International Shoots", country: "USA" }
  });
  console.log(`Updated ${updated.count} records from USA / DUBAI -> International Shoots / USA`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
