import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { products as frontendProducts } from "../src/data/products";

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

    // Delete all existing products and their variants
    console.log("🗑️  Deleting existing products...");
    const deletedVariants = await prisma.productVariant.deleteMany({});
    const deletedProducts = await prisma.product.deleteMany({});
    console.log(
      `✅ Deleted ${deletedProducts.count} products and ${deletedVariants.count} variants`
    );

    // Seed all 76 products from products.ts
    console.log("📦 Seeding 76 products...");

    // Helper function to parse weight range and generate variants
    const parseWeightRange = (weightRange: string) => {
      const match = weightRange.match(/(\d+)-(\d+)/);
      if (match) {
        const min = parseInt(match[1]);
        const max = parseInt(match[2]);
        const step = Math.floor((max - min) / 3);
        return [min, min + step, max];
      }
      return [100, 200, 300]; // Default weights
    };

    // Helper function to capitalize category name
    const capitalizeCategory = (category: string): string => {
      const categoryMap: { [key: string]: string } = {
        vessels: "Vessels",
        lamps: "Lamps",
        coins: "Coins & Bars",
        bowl: "Bowl",
        boxes: "Boxes",
        chombu: "Chombu",
        cups: "Cups",
        glass: "Glass",
        kamakshi: "Kamakshi",
        kodam: "Kodam",
        others: "Others",
        panchapathram: "Panchapathram",
        plates: "Plates",
        simil: "Simil",
        trays: "Trays",
        vel: "Vel",
      };
      return (
        categoryMap[category] ||
        category.charAt(0).toUpperCase() + category.slice(1)
      );
    };

    for (const product of frontendProducts) {
      const weights = parseWeightRange(product.weightRange);
      const categoryName = capitalizeCategory(product.category);

      await prisma.product.create({
        data: {
          name: product.name,
          description: `Premium ${product.name} - Handcrafted with traditional techniques and modern precision.`,
          category: categoryName,
          price: null, // Price can be set later in admin panel
          image: product.image,
          images: [product.image],
          weightRange: product.weightRange,
          isActive: true,
          variants: {
            create: [
              {
                weight: `${weights[0]}g`,
                dimensions: "Standard size",
                description: `Small variant - 80% purity`,
                purities: ["80"],
              },
              {
                weight: `${weights[1]}g`,
                dimensions: "Medium size",
                description: `Medium variant - 92.5% purity`,
                purities: ["92.5"],
              },
              {
                weight: `${weights[2]}g`,
                dimensions: "Large size",
                description: `Large variant - 92.5% purity`,
                purities: ["92.5"],
              },
            ],
          },
        },
      });
    }

    console.log(
      `✅ Successfully seeded ${frontendProducts.length} products with 3 variants each!`
    );
    console.log("📸 Product images are referenced from /Products/ folder");
    console.log(
      "💡 Products are ready to be displayed in the admin panel and frontend"
    );
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
