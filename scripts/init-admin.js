const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@afconomy.com";
  const adminPassword = "admin-password-123"; // Change this in production
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log("Admin user already exists.");
    // Promote to ADMIN if not already
    if (existingAdmin.role !== "ADMIN") {
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: { role: "ADMIN" }
      });
      console.log("User promoted to ADMIN.");
    }
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Platform Admin",
        role: "ADMIN"
      }
    });
    console.log("Admin user created successfully.");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
