import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Starting database seeding...");

    // Create admin user
    const existingAdmin = await prisma.user.findUnique({
      where: {
        email: "admin@goatmastermind.com",
      },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      await prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@goatmastermind.com",
          password: hashedPassword,
          role: "ADMIN",
          isActive: true,
          isTemporary: false,
        },
      });
      console.log("✅ Admin user created successfully!");
      console.log("📧 Email: admin@goatmastermind.com");
      console.log("🔐 Password: admin123");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    console.log("✅ Database seeding completed!");
    console.log(
      "💡 Note: Products and services should be seeded using separate scripts:"
    );
    console.log("   - npm run seed-services (for services)");
    console.log("   - Products can be added through the admin panel");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
