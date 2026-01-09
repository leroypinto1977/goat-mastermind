/**
 * Seed Services Script
 * Adds Writer, Editor, and Videographer services with pricing in INR
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// USD to INR conversion rate (rounded up)
const USD_TO_INR = 84;

// Service pricing in USD
const servicePricing = {
  Writer: {
    Professional: 1500,
    Expert: 3000,
    "Creative Director": 5000,
  },
  Editor: {
    Professional: 2000,
    Expert: 4000,
    "Creative Director": 6000,
  },
  Videographer: {
    Professional: 2500,
    Expert: 5000,
    "Creative Director": 8000,
  },
};

async function seedServices() {
  try {
    console.log("🌱 Seeding services...");

    const services = [];

    // Create services for each service type and level
    for (const [serviceName, levels] of Object.entries(servicePricing)) {
      for (const [level, usdPrice] of Object.entries(levels)) {
        const inrPrice = Math.ceil(usdPrice * USD_TO_INR);
        const serviceDisplayName = `${serviceName} - ${level}`;
        const serviceSlug = `${serviceName.toLowerCase()}-${level.toLowerCase().replace(/\s+/g, "-")}`;

        // Check if service already exists
        const existingService = await prisma.product.findFirst({
          where: {
            name: serviceDisplayName,
            category: "Services",
          },
        });

        if (existingService) {
          console.log(`⏭️  Service "${serviceDisplayName}" already exists, updating...`);
          await prisma.product.update({
            where: { id: existingService.id },
            data: {
              price: inrPrice,
              description: `Professional ${serviceName.toLowerCase()} services at ${level.toLowerCase()} level`,
              isActive: true,
            },
          });
          services.push(serviceDisplayName);
        } else {
          console.log(`➕ Creating service: ${serviceDisplayName} - ₹${inrPrice.toLocaleString("en-IN")}`);
          await prisma.product.create({
            data: {
              name: serviceDisplayName,
              description: `Professional ${serviceName.toLowerCase()} services at ${level.toLowerCase()} level`,
              category: "Services",
              price: inrPrice,
              image: "/logos/Main logo.png",
              images: [],
              isActive: true,
            },
          });
          services.push(serviceDisplayName);
        }
      }
    }

    console.log(`\n✅ Successfully seeded ${services.length} services:`);
    console.log("\nServices created/updated:");
    for (const [serviceName, levels] of Object.entries(servicePricing)) {
      console.log(`\n${serviceName}:`);
      for (const [level, usdPrice] of Object.entries(levels)) {
        const inrPrice = Math.ceil(usdPrice * USD_TO_INR);
        console.log(`  • ${level}: ₹${inrPrice.toLocaleString("en-IN")}`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedServices()
  .then(() => {
    console.log("\n🎉 Services seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Failed to seed services:", error);
    process.exit(1);
  });

