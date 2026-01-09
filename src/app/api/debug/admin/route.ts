import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Not authorized - admin only" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Admin access granted!",
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
      },
    });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
