/**
 * Reset Admin User Script
 * This script creates or updates the admin user with fresh credentials
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function resetAdmin() {
  try {
    console.log("🔄 Resetting admin user...");

    // Ensure email is lowercase to match auth.ts behavior
    const adminEmail = "admin@goatmastermind.com".toLowerCase();
    const adminPassword = "admin123";

    // Check if admin user exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log("👤 Admin user found, updating password...");

      // Hash the new password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      // Update the admin user
      const updatedAdmin = await prisma.user.update({
        where: { email: adminEmail },
        data: {
          password: hashedPassword,
          role: "ADMIN",
          isTemporary: false,
          isActive: true,
        },
      });

      console.log("✅ Admin user updated successfully!");
      console.log(`📧 Email: ${updatedAdmin.email}`);
      console.log(`🔑 Password: ${adminPassword}`);
      console.log(`👑 Role: ${updatedAdmin.role}`);
    } else {
      console.log("➕ Creating new admin user...");

      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);

      // Create new admin user
      const newAdmin = await prisma.user.create({
        data: {
          name: "Admin User",
          email: adminEmail,
          password: hashedPassword,
          role: "ADMIN",
          isTemporary: false,
          isActive: true,
        },
      });

      console.log("✅ Admin user created successfully!");
      console.log(`📧 Email: ${newAdmin.email}`);
      console.log(`🔑 Password: ${adminPassword}`);
      console.log(`👑 Role: ${newAdmin.role}`);
    }

    // List all users for verification
    console.log("\n📋 All users in database:");
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    allUsers.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });
  } catch (error) {
    console.error("❌ Error resetting admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
