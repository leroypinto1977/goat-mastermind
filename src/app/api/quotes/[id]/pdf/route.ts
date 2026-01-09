import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: quoteId } = await params;

    // Fetch quote from database
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Verify user owns this quote or is admin
    if (quote.userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized to access this quote" },
        { status: 403 }
      );
    }

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size in points
    const { width, height } = page.getSize();
    const margin = 50;

    // Get fonts
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await pdfDoc.embedFont(
      StandardFonts.HelveticaBold
    );

    let yPosition = height - margin;

    // Helper function to add centered text
    const addCenteredText = (
      text: string,
      y: number,
      fontSize: number,
      font: typeof helveticaFont | typeof helveticaBoldFont,
      color = rgb(0, 0, 0)
    ) => {
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      page.drawText(text, {
        x: (width - textWidth) / 2,
        y,
        size: fontSize,
        font,
        color,
      });
    };

    // Header
    addCenteredText("GOAT Mastermind", yPosition, 24, helveticaBoldFont);
    yPosition -= 30;

    addCenteredText(
      "Business Growth & Scaling Services",
      yPosition,
      10,
      helveticaFont
    );
    yPosition -= 60;

    // Title
    addCenteredText("Quotation", yPosition, 18, helveticaBoldFont);
    yPosition -= 40;

    // Quote Details
    page.drawText(`Quote ID: ${quote.id}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 20;
    page.drawText(`Date: ${new Date(quote.createdAt).toLocaleDateString()}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 30;

    // Client Information
    page.drawText("Client Information", {
      x: margin,
      y: yPosition,
      size: 14,
      font: helveticaBoldFont,
    });
    yPosition -= 25;
    page.drawText(`Name: ${quote.name}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 20;
    page.drawText(`Email: ${quote.email}`, {
      x: margin,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    });
    yPosition -= 20;
    if (quote.businessName) {
      page.drawText(`Business Name: ${quote.businessName}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: helveticaFont,
      });
      yPosition -= 20;
    }
    yPosition -= 20;

    interface QuoteItems {
      niche?: string;
      total?: number;
      services?: Array<{
        service: string;
        level: string;
        price?: number;
      }>;
    }

    const items = quote.items as QuoteItems;
    
    // Niche (under business name)
    if (items?.niche) {
      page.drawText(`Niche: ${items.niche}`, {
        x: margin,
        y: yPosition,
        size: 12,
        font: helveticaFont,
      });
      yPosition -= 20;
    }
    yPosition -= 10;

    // Services with pricing
    page.drawText("Services Requested", {
      x: margin,
      y: yPosition,
      size: 14,
      font: helveticaBoldFont,
    });
    yPosition -= 25;

    let subtotal = 0;

    if (items?.services && Array.isArray(items.services)) {
      items.services.forEach((service) => {
        if (service.level && service.level !== "Not needed") {
          const servicePrice = service.price || 0;
          subtotal += servicePrice;
          const serviceText = `${service.service}: ${service.level}`;
          // Use "Rs." instead of "₹" since standard fonts don't support rupee symbol
          const priceText = servicePrice > 0 ? `Rs. ${servicePrice.toLocaleString("en-IN")}` : "Included";
          
          page.drawText(`• ${serviceText}`, {
            x: margin,
            y: yPosition,
            size: 12,
            font: helveticaFont,
          });
          
          // Draw price on the right side
          const priceWidth = helveticaFont.widthOfTextAtSize(priceText, 12);
          page.drawText(priceText, {
            x: width - margin - priceWidth,
            y: yPosition,
            size: 12,
            font: helveticaFont,
            color: rgb(0.72, 0.45, 0.2), // Bronze color
          });
          yPosition -= 25;
        }
      });
    }

    yPosition -= 20;

    // Total Section
    const total = items?.total || subtotal;
    if (total > 0) {
      // Draw a line above total using a rectangle
      page.drawRectangle({
        x: margin,
        y: yPosition,
        width: width - 2 * margin,
        height: 1,
        color: rgb(0.9, 0.9, 0.9),
      });
      yPosition -= 25;

      page.drawText("Total Quote:", {
        x: margin,
        y: yPosition,
        size: 14,
        font: helveticaBoldFont,
      });
      
      // Use "Rs." instead of "₹" since standard fonts don't support rupee symbol
      const totalText = `Rs. ${total.toLocaleString("en-IN")}`;
      const totalWidth = helveticaBoldFont.widthOfTextAtSize(totalText, 16);
      page.drawText(totalText, {
        x: width - margin - totalWidth,
        y: yPosition - 2,
        size: 16,
        font: helveticaBoldFont,
        color: rgb(0.72, 0.45, 0.2), // Bronze color
      });
      yPosition -= 30;
    } else {
      yPosition -= 20;
    }

    // Footer
    const footerText1 =
      "This is a preliminary quotation. Final pricing will be confirmed after consultation.";
    const footerText2 =
      "For inquiries, please contact us at info@goatmastermind.com";

    addCenteredText(
      footerText1,
      yPosition,
      10,
      helveticaFont,
      rgb(0.4, 0.4, 0.4)
    );
    yPosition -= 20;
    addCenteredText(
      footerText2,
      yPosition,
      10,
      helveticaFont,
      rgb(0.4, 0.4, 0.4)
    );

    // Serialize the PDF
    const pdfBytes = await pdfDoc.save();

    // Convert Uint8Array to Buffer for Next.js
    const pdfBuffer = Buffer.from(pdfBytes);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="quote-${quoteId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
