const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "superadmin@afconomy.com";
  const adminPassword = "SuperSecurePassword2024!"; 
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (existingAdmin) {
    console.log(`User ${adminEmail} already exists. Upgrading to ADMIN role...`);
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: { role: "ADMIN" }
    });
    console.log("Permissions updated successfully.");
  } else {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Super Admin",
        role: "ADMIN"
      }
    });
    console.log("Super Admin account created successfully.");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  }
}

main()
  .catch((e) => {
    console.error("Failed to create Super Admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
