/**
 * CSV Data Processing Script for SilverCrafts
 *
 * This script processes the comprehensive CSV file and generates:
 * - Categories based on unique Category values
 * - Products with proper field mapping from CSV
 * - Materials and Collections for silvercraft items
 */

import fs from "fs";
import path from "path";

// CSV data interface matching the structure
interface CSVProduct {
  Category: string;
  "Product Name": string;
  "Weight (Grams)": string;
  "Height (Inches)": string;
  "Diameter (Inches)": string;
  "Length (inches)": string;
  Status: string;
  Notes: string;
}

// Function to parse CSV content
function parseCSV(csvContent: string): CSVProduct[] {
  const lines = csvContent.split("\n").filter((line) => line.trim());
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const product: any = {};

    headers.forEach((header, index) => {
      product[header.trim()] = values[index]?.trim() || "";
    });

    return product as CSVProduct;
  });
}

// Function to clean and validate data
function cleanProductData(product: CSVProduct) {
  return {
    category: product.Category?.trim() || "",
    name: product["Product Name"]?.trim() || "",
    weightGrams: parseFloat(product["Weight (Grams)"]) || 0,
    heightInches: parseFloat(product["Height (Inches)"]) || null,
    diameterInches: parseFloat(product["Diameter (Inches)"]) || null,
    lengthInches: parseFloat(product["Length (inches)"]) || null,
    status: product.Status?.trim() || "",
    notes: product.Notes?.trim() || "",
  };
}

// Function to generate slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing dashes
}

// Function to generate categories
function generateCategories(products: CSVProduct[]) {
  const categorySet = new Set<string>();

  products.forEach((product) => {
    if (product.Category?.trim()) {
      categorySet.add(product.Category.trim());
    }
  });

  return Array.from(categorySet).map((category) => ({
    _id: `category-${generateSlug(category)}`,
    _type: "category",
    name: category,
    slug: {
      _type: "slug",
      current: generateSlug(category),
    },
    description: `Traditional South Indian ${category.toLowerCase()} crafted from premium silver`,
    featured: ["Bowl", "Chombu", "Lamps", "Trays"].includes(category),
    publishedAt: new Date().toISOString(),
  }));
}

// Function to generate materials
function generateMaterials() {
  return [
    {
      _id: "material-pure-silver-999",
      _type: "material",
      name: "Pure Silver (99.9%)",
      slug: {
        _type: "slug",
        current: "pure-silver-999",
      },
      description: "Highest purity silver with 99.9% silver content",
      purity: "99.9%",
      properties: ["Antimicrobial", "Tarnish resistant", "Hypoallergenic"],
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "material-sterling-silver-925",
      _type: "material",
      name: "Sterling Silver (92.5%)",
      slug: {
        _type: "slug",
        current: "sterling-silver-925",
      },
      description:
        "Premium silver alloy with 92.5% silver content for enhanced durability",
      purity: "92.5%",
      properties: ["Durable", "Workable", "Beautiful finish"],
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "material-traditional-silver-alloy",
      _type: "material",
      name: "Traditional Silver Alloy",
      slug: {
        _type: "slug",
        current: "traditional-silver-alloy",
      },
      description:
        "Time-tested silver alloy used in traditional South Indian silvercraft",
      purity: "90%+",
      properties: ["Traditional", "Culturally authentic", "Artisan preferred"],
      publishedAt: new Date().toISOString(),
    },
  ];
}

// Function to generate collections
function generateCollections() {
  return [
    {
      _id: "collection-plain-heritage",
      _type: "collection",
      name: "Plain Heritage Collection",
      slug: {
        _type: "slug",
        current: "plain-heritage",
      },
      description:
        "Timeless plain designs that showcase the natural beauty of silver",
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-hand-engraved",
      _type: "collection",
      name: "Hand Engraved Artistry",
      slug: {
        _type: "slug",
        current: "hand-engraved",
      },
      description:
        "Exquisite hand-engraved pieces showcasing traditional craftsmanship",
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-machine-engraved",
      _type: "collection",
      name: "Machine Engraved Precision",
      slug: {
        _type: "slug",
        current: "machine-engraved",
      },
      description:
        "Precisely crafted designs with consistent machine engraving",
      featured: false,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-nagas-design",
      _type: "collection",
      name: "Nagas Design Collection",
      slug: {
        _type: "slug",
        current: "nagas-design",
      },
      description:
        "Traditional serpent motifs representing wisdom and protection",
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-ashtalakshmi",
      _type: "collection",
      name: "Ashtalakshmi Collection",
      slug: {
        _type: "slug",
        current: "ashtalakshmi",
      },
      description:
        "Sacred designs featuring the eight forms of Goddess Lakshmi",
      featured: true,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-matte-finish",
      _type: "collection",
      name: "Matte Finish Contemporary",
      slug: {
        _type: "slug",
        current: "matte-finish",
      },
      description: "Modern matte finish pieces for contemporary aesthetics",
      featured: false,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-ceremonial",
      _type: "collection",
      name: "Ceremonial & Ritual",
      slug: {
        _type: "slug",
        current: "ceremonial",
      },
      description:
        "Sacred pieces designed for religious ceremonies and rituals",
      featured: false,
      publishedAt: new Date().toISOString(),
    },
    {
      _id: "collection-daily-use",
      _type: "collection",
      name: "Daily Use Essentials",
      slug: {
        _type: "slug",
        current: "daily-use",
      },
      description: "Practical pieces for everyday use and dining",
      featured: false,
      publishedAt: new Date().toISOString(),
    },
  ];
}

// Function to determine product collection based on name
function getProductCollections(name: string): string[] {
  const collections: string[] = [];
  const nameLower = name.toLowerCase();

  if (nameLower.includes("plain")) {
    collections.push("collection-plain-heritage");
  }
  if (
    nameLower.includes("hand engraving") ||
    nameLower.includes("hand-engraving")
  ) {
    collections.push("collection-hand-engraved");
  }
  if (
    nameLower.includes("machine engraving") ||
    nameLower.includes("machine-engraving")
  ) {
    collections.push("collection-machine-engraved");
  }
  if (nameLower.includes("nagas")) {
    collections.push("collection-nagas-design");
  }
  if (nameLower.includes("ashtalakshmi")) {
    collections.push("collection-ashtalakshmi");
  }
  if (nameLower.includes("matte")) {
    collections.push("collection-matte-finish");
  }

  // Default collections based on category
  if (nameLower.includes("kamakshi") || nameLower.includes("panchapathram")) {
    collections.push("collection-ceremonial");
  } else if (!collections.length) {
    collections.push("collection-daily-use");
  }

  return collections;
}

// Function to determine material based on weight and type
function getProductMaterial(weightGrams: number, name: string): string {
  const nameLower = name.toLowerCase();

  // Heavy pieces usually use traditional alloy for strength
  if (weightGrams > 500) {
    return "material-traditional-silver-alloy";
  }

  // Fine jewelry and delicate pieces use pure silver
  if (
    weightGrams < 50 ||
    nameLower.includes("coin") ||
    nameLower.includes("bar")
  ) {
    return "material-pure-silver-999";
  }

  // Most items use sterling silver for balance of purity and durability
  return "material-sterling-silver-925";
}

// Function to generate products
function generateProducts(csvProducts: CSVProduct[], categories: any[]) {
  const categoryMap = new Map();
  categories.forEach((cat) => {
    categoryMap.set(cat.name, cat._id);
  });

  return csvProducts
    .filter(
      (product) => product.Category?.trim() && product["Product Name"]?.trim()
    )
    .map((product) => {
      const cleaned = cleanProductData(product);
      const productId = `product-${generateSlug(cleaned.name)}-${cleaned.weightGrams}g`;

      return {
        _id: productId,
        _type: "product",
        name: cleaned.name,
        slug: {
          _type: "slug",
          current: `${generateSlug(cleaned.name)}-${cleaned.weightGrams}g`,
        },
        weightGrams: cleaned.weightGrams,
        heightInches: cleaned.heightInches,
        diameterInches: cleaned.diameterInches,
        lengthInches: cleaned.lengthInches,
        status: cleaned.status,
        notes: cleaned.notes,
        shortDescription: `Traditional ${cleaned.category.toLowerCase()} weighing ${cleaned.weightGrams}g, crafted from premium silver`,
        description: [
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: `This ${cleaned.name.toLowerCase()} represents the finest in South Indian silvercraft tradition. Weighing ${cleaned.weightGrams} grams, each piece is carefully crafted to meet the highest standards of quality and authenticity.`,
              },
            ],
          },
          {
            _type: "block",
            style: "normal",
            children: [
              {
                _type: "span",
                text: "Handcrafted by skilled artisans using time-honored techniques passed down through generations. Perfect for both ceremonial use and daily appreciation of fine silverwork.",
              },
            ],
          },
        ],
        category: {
          _type: "reference",
          _ref: categoryMap.get(cleaned.category),
        },
        materials: [
          {
            _type: "reference",
            _ref: getProductMaterial(cleaned.weightGrams, cleaned.name),
          },
        ],
        collections: getProductCollections(cleaned.name).map(
          (collectionId) => ({
            _type: "reference",
            _ref: collectionId,
          })
        ),
        images: [
          {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "image-placeholder", // Will be replaced when images are uploaded
            },
            alt: `${cleaned.name} - ${cleaned.weightGrams}g silver ${cleaned.category.toLowerCase()}`,
            caption: `Traditional South Indian ${cleaned.category.toLowerCase()}`,
          },
        ],
        featured: cleaned.weightGrams >= 100 && cleaned.weightGrams <= 300,
        available:
          cleaned.status !== "remove" &&
          cleaned.status !== "needs Updation/ checking",
        publishedAt: new Date().toISOString(),
      };
    });
}

// Main processing function
async function processCSVData() {
  console.log("🚀 Processing comprehensive CSV data for SilverCrafts...");

  try {
    // Read the CSV file
    const csvPath =
      "/Users/leroy/Downloads/Silvercraft products - Copy of Updation in progree.csv";
    const csvContent = fs.readFileSync(csvPath, "utf-8");

    console.log("📄 CSV file read successfully");

    // Parse CSV data
    const csvProducts = parseCSV(csvContent);
    console.log(`📊 Parsed ${csvProducts.length} products from CSV`);

    // Generate all data
    const categories = generateCategories(csvProducts);
    const materials = generateMaterials();
    const collections = generateCollections();
    const products = generateProducts(csvProducts, categories);

    console.log(`✨ Generated:`);
    console.log(`   📁 Categories: ${categories.length}`);
    console.log(`   🧱 Materials: ${materials.length}`);
    console.log(`   📦 Collections: ${collections.length}`);
    console.log(`   🍴 Products: ${products.length}`);

    // Create output directory
    const outputDir = path.join(process.cwd(), "src/data/csv-processed");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write individual files
    fs.writeFileSync(
      path.join(outputDir, "categories.json"),
      JSON.stringify(categories, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "materials.json"),
      JSON.stringify(materials, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "collections.json"),
      JSON.stringify(collections, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "products.json"),
      JSON.stringify(products, null, 2)
    );

    // Write combined file
    const completeData = {
      categories,
      materials,
      collections,
      products,
      metadata: {
        totalProducts: products.length,
        totalCategories: categories.length,
        totalMaterials: materials.length,
        totalCollections: collections.length,
        description: "Complete SilverCrafts product catalog processed from CSV",
        version: "2.0.0",
        lastUpdated: new Date().toISOString(),
        source: "Silvercraft products - Copy of Updation in progree.csv",
      },
    };

    fs.writeFileSync(
      path.join(outputDir, "complete-data.json"),
      JSON.stringify(completeData, null, 2)
    );

    console.log(`💾 Data saved to: ${outputDir}`);
    console.log("✅ CSV processing complete!");

    return completeData;
  } catch (error) {
    console.error("❌ Error processing CSV:", error);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  processCSVData().catch(console.error);
}

export { processCSVData };
