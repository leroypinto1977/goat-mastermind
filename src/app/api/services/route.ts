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

// Known service type categories
const serviceTypeCategories = ["Writer", "Editor", "Videographer"];

const serviceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be non-negative"),
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

// GET /api/services - Get all active services (public)
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

    // Filter to only services
    const serviceProducts = products.filter((product) => {
      // Include if category is "Services" (legacy)
      if (product.category === "Services") return true;
      // Include if category is a known service type
      if (serviceTypeCategories.includes(product.category)) return true;
      // Include if category is not a staff category (dynamic service types)
      if (
        product.category &&
        product.category !== "All Categories" &&
        !oldStaffCategories.includes(product.category)
      ) {
        // Additional check: if it's not a known service type but also not a staff category,
        // it might be a dynamically added service type
        return true;
      }
      return false;
    });

    // Transform to match the frontend structure
    const transformedServices = serviceProducts.map((product) => {
      // Determine service category:
      // 1. If category is already set and not a staff category, use it
      // 2. Otherwise, extract from name if format is "ServiceType - Level"
      // 3. Fallback to "Services" if we can't determine
      let serviceCategory = product.category;
      if (
        product.category &&
        product.category !== "Services" &&
        !oldStaffCategories.includes(product.category) &&
        product.category !== "All Categories"
      ) {
        serviceCategory = product.category;
      } else if (product.name && typeof product.name === "string") {
        // Extract service type from name (e.g., "ServiceType - Professional" → "ServiceType")
        const nameParts = product.name.split(" - ");
        if (nameParts.length >= 1) {
          const potentialServiceType = nameParts[0];
          // If the extracted type is not an old staff category, use it as service category
          if (
            !oldStaffCategories.includes(potentialServiceType) &&
            potentialServiceType !== "All Categories"
          ) {
            serviceCategory = potentialServiceType;
          } else if (product.category === "Services" && nameParts.length >= 1) {
            // If category is "Services" (legacy), extract from name
            serviceCategory = potentialServiceType;
          }
        }
      }

      return {
        id: product.id,
        name: product.name,
        category: serviceCategory,
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
      };
    });

    return NextResponse.json({ services: transformedServices });
  } catch (error: any) {
    console.error("Error fetching services:", error);
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

// POST /api/services - Create new service (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const data = serviceSchema.parse(body);

    // Validate that category is a service type, not a staff category
    if (oldStaffCategories.includes(data.category)) {
      return NextResponse.json(
        {
          error:
            "Invalid category for service. This category is reserved for staff. Use /api/staff for staff.",
        },
        { status: 400 }
      );
    }

    // Create service with variants
    const service = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || "",
        category: data.category, // Store service type (Writer, Editor, Videographer, etc.) as category
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

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

