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

const serviceUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.string().min(1).optional(),
  price: z.number().min(0).optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  weightRange: z.string().optional(),
  isActive: z.boolean().optional(),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
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

// GET /api/services/[id] - Get single service
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Verify it's actually a service, not staff
    if (
      product.category !== "Services" &&
      !serviceTypeCategories.includes(product.category) &&
      !(
        product.category &&
        product.category !== "All Categories" &&
        !oldStaffCategories.includes(product.category)
      )
    ) {
      return NextResponse.json(
        { error: "This is staff, not a service. Use /api/staff/[id]" },
        { status: 400 }
      );
    }

    return NextResponse.json({ service: product });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/services/[id] - Update service (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const data = serviceUpdateSchema.parse(body);

    // Check if product exists and is a service
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Verify it's actually a service, not staff
    if (
      existingProduct.category !== "Services" &&
      !serviceTypeCategories.includes(existingProduct.category) &&
      !(
        existingProduct.category &&
        existingProduct.category !== "All Categories" &&
        !oldStaffCategories.includes(existingProduct.category)
      )
    ) {
      return NextResponse.json(
        { error: "This is staff, not a service. Use /api/staff/[id]" },
        { status: 400 }
      );
    }

    // Validate new category if provided
    if (data.category) {
      if (oldStaffCategories.includes(data.category)) {
        return NextResponse.json(
          {
            error:
              "Invalid category for service. This category is reserved for staff. Use /api/staff for staff.",
          },
          { status: 400 }
        );
      }
    }

    // Update service
    const updatedService = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        price: data.price,
        image: data.image,
        images: data.images,
        weightRange: data.weightRange,
        isActive: data.isActive,
      },
      include: {
        variants: true,
      },
    });

    // Update variants if provided
    if (data.variants) {
      // Delete existing variants
      await prisma.productVariant.deleteMany({
        where: { productId: id },
      });

      // Create new variants
      if (data.variants.length > 0) {
        await prisma.productVariant.createMany({
          data: data.variants.map((variant) => ({
            productId: id,
            weight: variant.weight,
            dimensions: variant.dimensions || "",
            description: variant.description || "",
            width: variant.width || "",
            height: variant.height || "",
            diameter: variant.diameter || "",
            purities: variant.purities || [],
          })),
        });
      }

      // Fetch updated service with variants
      const serviceWithVariants = await prisma.product.findUnique({
        where: { id },
        include: { variants: true },
      });

      return NextResponse.json({ service: serviceWithVariants });
    }

    return NextResponse.json({ service: updatedService });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id] - Delete service (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Check if product exists and is a service
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Verify it's actually a service, not staff
    if (
      existingProduct.category !== "Services" &&
      !serviceTypeCategories.includes(existingProduct.category) &&
      !(
        existingProduct.category &&
        existingProduct.category !== "All Categories" &&
        !oldStaffCategories.includes(existingProduct.category)
      )
    ) {
      return NextResponse.json(
        { error: "This is staff, not a service. Use /api/staff/[id]" },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    await prisma.product.update({
      where: { id },
      data: { isActive: false },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
