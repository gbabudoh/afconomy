const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Initializing test broadcast signal...");
  
  // Deactivate existing streams
  await prisma.stream.updateMany({
    data: { isActive: false }
  });

  const stream = await prisma.stream.create({
    data: {
      title: "Global African Market Intelligence (Live Demo)",
      description: "Analyzing the 2026 economic outlook for West African nations.",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Classic test video
      type: "LIVE",
      isActive: true,
      thumbnailUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1000"
    }
  });

  console.log(`Successfully activated stream: ${stream.title}`);
  console.log(`Stream ID: ${stream.id}`);
}

main()
  .catch((e) => {
    console.error("Failed to activate test stream:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
