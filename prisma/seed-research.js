const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.research.create({
    data: {
      title: "Fintech Growth in Nigeria 2026",
      category: "Technology",
      summary: "A comprehensive look at the digital banking revolution and its impact on financial inclusion.",
      fullContent: "## The Digital Shift\n\nNigeria remains a powerhouse in African fintech...\n\n- **Payments**: Over 40% growth in real-time transactions.\n- **Lending**: Neo-banks are capturing market share.",
      icon: "TrendingUp",
      publishedAt: new Date()
    }
  });
  console.log("Seeded research data successfully!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
