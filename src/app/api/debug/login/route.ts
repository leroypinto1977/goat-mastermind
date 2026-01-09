import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    return NextResponse.json({
      userFound: true,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isTemporary: user.isTemporary,
      passwordValid: isPasswordValid,
      hashedPassword: user.password.substring(0, 20) + "...", // Just first 20 chars for debugging
    });
  } catch (error) {
    console.error("Debug login error:", error);
    return NextResponse.json({ error: "Debug failed" }, { status: 500 });
  }
}
