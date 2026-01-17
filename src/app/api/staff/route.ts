import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

// List of known old SilverCrafts staff categories (for filtering)
const oldStaffCategories = [
  "Vessels",
  "Lamps",
  "Coins & Bars",
  "Bowl",
  "Boxes",
  "Chombu",
  "Cups",
  "Glass",
  "Kamakshi",
  "Kodam",
  "Others",
  "Panchapathram",
  "Plates",
  "Simil",
  "Trays",
  "Vel",
];

// Known service type categories (for filtering)
const serviceTypeCategories = ["Writer", "Editor", "Videographer"];

const staffSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.number().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  weightRange: z.string().optional(),
  variants: z
    .array(
      z.object({
        weight: z.string(),
        dimensions: z.string().optional(),
        description: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        diameter: z.string().optional(),
        purities: z.array(z.string()).optional(),
      })
    )
    .optional(),
});

// GET /api/staff - Get all active staff (public)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Filter to only staff (exclude services)
    const staffProducts = products.filter((product) => {
      // Exclude if category is "Services"
      if (product.category === "Services") return false;
      // Exclude if category is a known service type
      if (serviceTypeCategories.includes(product.category)) return false;
      // Include everything else (staff categories)
      return true;
    });

    // Transform to match the frontend structure
    const transformedStaff = staffProducts.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image || "/assets/placeholder.jpg",
      description: product.description || "",
      price: product.price || 0,
      weightRange: product.weightRange || "",
      images: product.images || [],
      variants: (product.variants || []).map((variant) => ({
        id: variant.id,
        weight: variant.weight,
        dimensions: variant.dimensions || "",
        description: variant.description || "",
        width: variant.width || "",
        height: variant.height || "",
        diameter: variant.diameter || "",
        purities: variant.purities || [],
      })),
    }));

    return NextResponse.json({ staff: transformedStaff });
  } catch (error: any) {
    console.error("Error fetching staff:", error);
    console.error("Error details:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
    });
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error?.message || "Unknown error",
        details:
          process.env.NODE_ENV === "development" ? error?.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// POST /api/staff - Create new staff member (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = staffSchema.parse(body);

    // Validate that category is not a service type
    if (
      data.category === "Services" ||
      serviceTypeCategories.includes(data.category)
    ) {
      return NextResponse.json(
        { error: "Invalid category for staff. Use /api/services for services." },
        { status: 400 }
      );
    }

    // Create staff with variants
    const staff = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        category: data.category,
        price: data.price || 0,
        image: data.image || data.images?.[0] || "/assets/placeholder.jpg",
        images: data.images || [],
        weightRange: data.weightRange || "",
        isActive: true,
        variants: {
          create:
            data.variants?.map((variant) => ({
              weight: variant.weight,
              dimensions: variant.dimensions || "",
              description: variant.description || "",
              width: variant.width || "",
              height: variant.height || "",
              diameter: variant.diameter || "",
              purities: variant.purities || [],
            })) || [],
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ staff }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Error creating staff:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

