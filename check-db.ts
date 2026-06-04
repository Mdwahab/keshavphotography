import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking Database Connection...");
  
  // Upsert default theme
  const settings = await prisma.websiteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      theme: 'dark'
    }
  });

  console.log("WebsiteSettings Record:", settings);

  // Count images
  const imageCount = await prisma.galleryImage.count();
  console.log("Total Gallery Images:", imageCount);
}

main()
  .catch(e => {
    console.error("Error during check:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
