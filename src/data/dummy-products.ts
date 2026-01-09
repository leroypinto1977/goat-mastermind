// TODO: Update to use Prisma types instead of Sanity
// import { Product, Category, Collection, Material } from "@/types/sanity";

// Temporary type definitions (replace with Prisma types)
type Material = any;
type Category = any;
type Collection = any;
type Product = any;

// Dummy Materials
export const dummyMaterials: Material[] = [
  {
    _id: "material-pure-silver",
    _type: "material",
    name: "Pure Silver (99.9%)",
    description: "Finest quality pure silver with 99.9% purity",
    properties: ["Antimicrobial", "Lustrous", "Durable", "Hypoallergenic"],
    careInstructions: "Clean with soft cloth and mild silver cleaner",
  },
  {
    _id: "material-sterling-silver",
    _type: "material",
    name: "Sterling Silver (92.5%)",
    description: "Traditional sterling silver alloy with 92.5% purity",
    properties: ["Strong", "Lustrous", "Durable", "Traditional"],
    careInstructions: "Regular polishing recommended to maintain shine",
  },
  {
    _id: "material-silver-alloy",
    _type: "material",
    name: "Traditional Silver Alloy",
    description:
      "Time-tested silver alloy used in traditional Indian silvercraft",
    properties: ["Cultural Heritage", "Authentic", "Durable"],
    careInstructions: "Gentle cleaning with traditional methods",
  },
];

// Dummy Categories
export const dummyCategories: Category[] = [
  {
    _id: "category-bowls",
    _type: "category",
    name: "Bowls",
    slug: { current: "bowls" },
    description: "Elegant silver bowls for serving and ceremonial use",
  },
  {
    _id: "category-chombu",
    _type: "category",
    name: "Chombu",
    slug: { current: "chombu" },
    description: "Traditional South Indian water vessels",
  },
  {
    _id: "category-lamps",
    _type: "category",
    name: "Lamps & Lighting",
    slug: { current: "lamps" },
    description: "Sacred and decorative oil lamps",
  },
  {
    _id: "category-plates",
    _type: "category",
    name: "Plates & Serving",
    slug: { current: "plates" },
    description: "Serving plates and dining accessories",
  },
  {
    _id: "category-trays",
    _type: "category",
    name: "Trays",
    slug: { current: "trays" },
    description: "Decorative and functional serving trays",
  },
  {
    _id: "category-glasses",
    _type: "category",
    name: "Glasses",
    slug: { current: "glasses" },
    description: "Silver drinking glasses and cups",
  },
  {
    _id: "category-ritual",
    _type: "category",
    name: "Ritual Items",
    slug: { current: "ritual" },
    description: "Sacred items for religious ceremonies",
  },
  {
    _id: "category-investment",
    _type: "category",
    name: "Coins & Bars",
    slug: { current: "investment" },
    description: "Investment grade silver coins and bars",
  },
];

// Dummy Collections
export const dummyCollections: Collection[] = [
  {
    _id: "collection-sacred-motifs",
    _type: "collection",
    name: "Sacred Motifs Collection",
    slug: { current: "sacred-motifs" },
    description: "Spiritual designs with religious significance",
    featured: true,
  },
  {
    _id: "collection-plain-heritage",
    _type: "collection",
    name: "Plain Heritage Collection",
    slug: { current: "plain-heritage" },
    description: "Classic plain designs celebrating traditional craftsmanship",
    featured: true,
  },
  {
    _id: "collection-hand-engraved",
    _type: "collection",
    name: "Hand Engraved Artistry",
    slug: { current: "hand-engraved" },
    description: "Intricate hand-carved patterns by master artisans",
    featured: false,
  },
  {
    _id: "collection-machine-engraved",
    _type: "collection",
    name: "Machine Engraved Precision",
    slug: { current: "machine-engraved" },
    description: "Precise geometric patterns with modern techniques",
    featured: false,
  },
  {
    _id: "collection-matte-finish",
    _type: "collection",
    name: "Matte Finish Contemporary",
    slug: { current: "matte-finish" },
    description: "Modern matte finish for contemporary aesthetics",
    featured: true,
  },
  {
    _id: "collection-ceremonial",
    _type: "collection",
    name: "Ceremonial & Ritual",
    slug: { current: "ceremonial" },
    description: "Sacred items for traditional ceremonies",
    featured: false,
  },
];

// Dummy Products
export const dummyProducts: Product[] = [
  {
    _id: "product-plain-silver-bowl-25g",
    _type: "product",
    name: "Plain Silver Bowl - 25g",
    slug: { current: "plain-silver-bowl-25g" },
    description:
      "Our 25-gram plain silver bowl represents the essence of traditional craftsmanship. Hand-polished to achieve a mirror-like finish, this versatile piece serves both ceremonial and practical purposes. Perfect for serving sweets, holding sacred items, or displaying as a decorative centerpiece.",
    shortDescription:
      "Classic plain silver bowl perfect for serving and ceremonial use.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-plain-silver-bowl-25g", _type: "reference" },
        alt: "Plain Silver Bowl 25g",
      },
    ],
    category: dummyCategories[0], // Bowls
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 50,
      width: 100,
      unit: "mm" as const,
      weight: 25,
      weightUnit: "g" as const,
    },
    weight: {
      value: 25,
      unit: "g" as const,
    },
    features: [
      "Hand-polished mirror finish",
      "Traditional design",
      "Versatile usage",
      "Authentic craftsmanship",
    ],
    craftingTechnique: "Traditional hand forging and polishing",
    origin: "South India",
    artisan: "Master Craftsmen of Kerala",
    careInstructions:
      "Clean with soft cloth and mild silver cleaner. Store in dry place.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "product-design-matte-bowl-50g",
    _type: "product",
    name: "Design Matte Finish Bowl - 50g",
    slug: { current: "design-matte-bowl-50g" },
    description:
      "This 50-gram matte finish bowl combines contemporary aesthetics with traditional silversmithing. The unique matte surface reduces glare while maintaining the inherent beauty of silver. Ideal for modern homes that appreciate traditional craftsmanship with a contemporary twist.",
    shortDescription: "Contemporary matte finish bowl with modern appeal.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-design-matte-bowl-50g", _type: "reference" },
        alt: "Design Matte Finish Bowl 50g",
      },
    ],
    category: dummyCategories[0], // Bowls
    collection: dummyCollections[4], // Matte Finish
    materials: [dummyMaterials[1]], // Sterling Silver
    dimensions: {
      height: 60,
      width: 120,
      unit: "mm" as const,
      weight: 50,
      weightUnit: "g" as const,
    },
    weight: {
      value: 50,
      unit: "g" as const,
    },
    features: [
      "Contemporary matte finish",
      "Modern design aesthetic",
      "Reduces glare",
      "Contemporary home decor",
    ],
    craftingTechnique: "Specialized matte finishing technique",
    origin: "South India",
    artisan: "Contemporary Silver Studio",
    careInstructions: "Clean with soft dry cloth. Avoid harsh chemicals.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    _id: "product-bowl-nagas-design-100g",
    _type: "product",
    name: "Bowl Nagas Design - 100g",
    slug: { current: "bowl-nagas-design-100g" },
    description:
      "This magnificent 100-gram bowl features intricate Nagas (serpent) motifs, deeply rooted in Hindu and Buddhist traditions. The detailed engravings showcase mythical serpents that symbolize protection, fertility, and divine energy. Each curve and pattern is meticulously crafted by skilled artisans.",
    shortDescription: "Sacred bowl featuring intricate Nagas serpent motifs.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-bowl-nagas-design-100g", _type: "reference" },
        alt: "Bowl Nagas Design 100g",
      },
    ],
    category: dummyCategories[0], // Bowls
    collection: dummyCollections[0], // Sacred Motifs
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 70,
      width: 150,
      unit: "mm" as const,
      weight: 100,
      weightUnit: "g" as const,
    },
    weight: {
      value: 100,
      unit: "g" as const,
    },
    features: [
      "Intricate Nagas motifs",
      "Sacred symbolism",
      "Hand-engraved details",
      "Spiritual significance",
    ],
    craftingTechnique: "Hand engraving with traditional tools",
    origin: "Tamil Nadu",
    artisan: "Temple Art Specialists",
    careInstructions:
      "Handle with care due to intricate details. Clean gently with soft brush.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    _id: "product-chombu-plain-200g",
    _type: "product",
    name: "Chombu Plain - 200g",
    slug: { current: "chombu-plain-200g" },
    description:
      "A traditional South Indian water vessel, this 200-gram Chombu represents centuries of functional design perfection. Used for storing and serving water, its wide base ensures stability while the narrow neck prevents spilling. An essential item in traditional Indian households.",
    shortDescription:
      "Traditional South Indian water vessel with functional design.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-chombu-plain-200g", _type: "reference" },
        alt: "Chombu Plain 200g",
      },
    ],
    category: dummyCategories[1], // Chombu
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 120,
      width: 100,
      unit: "mm" as const,
      weight: 200,
      weightUnit: "g" as const,
    },
    weight: {
      value: 200,
      unit: "g" as const,
    },
    features: [
      "Traditional water vessel",
      "Functional design",
      "Wide stable base",
      "Cultural heritage",
    ],
    craftingTechnique: "Traditional vessel forming",
    origin: "Kerala",
    artisan: "Heritage Vessel Makers",
    careInstructions: "Rinse with clean water after use. Dry thoroughly.",
    featured: false,
    isAvailable: true,
    createdAt: "2024-01-25T10:00:00Z",
  },
  {
    _id: "product-chombu-ashtalakshmi-250g",
    _type: "product",
    name: "Chombu Ashtalakshmi - 250g",
    slug: { current: "chombu-ashtalakshmi-250g" },
    description:
      "This sacred 250-gram Chombu features the Ashtalakshmi design, representing the eight forms of Goddess Lakshmi. Each panel depicts different aspects of prosperity and abundance. This vessel is not just functional but serves as a beautiful representation of spiritual wealth and divine blessings.",
    shortDescription:
      "Sacred water vessel featuring Ashtalakshmi (eight forms of Lakshmi) design.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-chombu-ashtalakshmi-250g", _type: "reference" },
        alt: "Chombu Ashtalakshmi 250g",
      },
    ],
    category: dummyCategories[1], // Chombu
    collection: dummyCollections[0], // Sacred Motifs
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 130,
      width: 110,
      unit: "mm" as const,
      weight: 250,
      weightUnit: "g" as const,
    },
    weight: {
      value: 250,
      unit: "g" as const,
    },
    features: [
      "Ashtalakshmi sacred motifs",
      "Eight forms of Lakshmi",
      "Spiritual significance",
      "Prosperity symbolism",
    ],
    craftingTechnique: "Sacred motif engraving",
    origin: "Tamil Nadu",
    artisan: "Temple Vessel Artisans",
    careInstructions:
      "Sacred item - handle with reverence. Clean with pure water.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-02-05T10:00:00Z",
  },
  {
    _id: "product-kuthuvizhaku-plain-100g",
    _type: "product",
    name: "Kuthuvizhaku Plain - 100g",
    slug: { current: "kuthuvizhaku-plain-100g" },
    description:
      "Traditional oil lamp used in South Indian households and temples. This 100-gram Kuthuvizhaku features a classic design that has remained unchanged for centuries. The lamp represents the victory of light over darkness and is an essential element in religious ceremonies.",
    shortDescription:
      "Traditional South Indian oil lamp for religious ceremonies.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-kuthuvizhaku-plain-100g", _type: "reference" },
        alt: "Kuthuvizhaku Plain 100g",
      },
    ],
    category: dummyCategories[2], // Lamps
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 80,
      width: 70,
      unit: "mm" as const,
      weight: 100,
      weightUnit: "g" as const,
    },
    weight: {
      value: 100,
      unit: "g" as const,
    },
    features: [
      "Traditional oil lamp",
      "Religious significance",
      "Classic design",
      "Light over darkness",
    ],
    craftingTechnique: "Traditional lamp forming",
    origin: "Kerala",
    artisan: "Temple Lamp Makers",
    careInstructions: "Clean wick holder regularly. Use pure oils only.",
    featured: false,
    isAvailable: true,
    createdAt: "2024-01-30T10:00:00Z",
  },
  {
    _id: "product-lamp-annam-nagas-200g",
    _type: "product",
    name: "Lamp Annam Nagas - 200g",
    slug: { current: "lamp-annam-nagas-200g" },
    description:
      "This ornate 200-gram lamp combines Annam (swan) and Nagas (serpent) motifs, creating a masterpiece of symbolic art. The swan represents purity and divine knowledge, while the serpents symbolize protection and cosmic energy. Perfect for special occasions and temple worship.",
    shortDescription:
      "Ornate lamp featuring Annam (swan) and Nagas (serpent) sacred motifs.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-lamp-annam-nagas-200g", _type: "reference" },
        alt: "Lamp Annam Nagas 200g",
      },
    ],
    category: dummyCategories[2], // Lamps
    collection: dummyCollections[0], // Sacred Motifs
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 120,
      width: 90,
      unit: "mm" as const,
      weight: 200,
      weightUnit: "g" as const,
    },
    weight: {
      value: 200,
      unit: "g" as const,
    },
    features: [
      "Annam swan motifs",
      "Nagas serpent designs",
      "Divine symbolism",
      "Temple worship",
    ],
    craftingTechnique: "Sacred motif engraving and embossing",
    origin: "Tamil Nadu",
    artisan: "Temple Art Masters",
    careInstructions:
      "Sacred item - handle with reverence. Professional cleaning recommended.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-02-10T10:00:00Z",
  },
  {
    _id: "product-plate-lunch-300g",
    _type: "product",
    name: "Plate Lunch - 300g",
    slug: { current: "plate-lunch-300g" },
    description:
      "This substantial 300-gram lunch plate represents the tradition of serving meals on silver in royal households. The generous size accommodates full meals while the pure silver construction provides health benefits and maintains food purity. A statement piece for special dining occasions.",
    shortDescription:
      "Large traditional lunch plate for royal dining experience.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-plate-lunch-300g", _type: "reference" },
        alt: "Plate Lunch 300g",
      },
    ],
    category: dummyCategories[3], // Plates
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 20,
      width: 250,
      unit: "mm" as const,
      weight: 300,
      weightUnit: "g" as const,
    },
    weight: {
      value: 300,
      unit: "g" as const,
    },
    features: [
      "Royal dining tradition",
      "Generous size",
      "Health benefits",
      "Pure silver construction",
    ],
    craftingTechnique: "Traditional plate forming and polishing",
    origin: "Rajasthan",
    artisan: "Royal Silverware Craftsmen",
    careInstructions:
      "Wash with mild soap. Dry immediately to prevent water spots.",
    featured: false,
    isAvailable: true,
    createdAt: "2024-02-15T10:00:00Z",
  },
  {
    _id: "product-tray-ashtalakshmi-500g",
    _type: "product",
    name: "Tray Ashtalakshmi - 500g",
    slug: { current: "tray-ashtalakshmi-500g" },
    description:
      "A magnificent 500-gram serving tray featuring the complete Ashtalakshmi design. This large tray showcases all eight forms of Goddess Lakshmi in intricate detail, making it perfect for special occasions, festivals, and ceremonial use. Each motif is carefully crafted to maintain the sacred proportions.",
    shortDescription:
      "Large ceremonial tray with complete Ashtalakshmi sacred design.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-tray-ashtalakshmi-500g", _type: "reference" },
        alt: "Tray Ashtalakshmi 500g",
      },
    ],
    category: dummyCategories[4], // Trays
    collection: dummyCollections[0], // Sacred Motifs
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 25,
      width: 350,
      length: 250,
      unit: "mm" as const,
      weight: 500,
      weightUnit: "g" as const,
    },
    weight: {
      value: 500,
      unit: "g" as const,
    },
    features: [
      "Complete Ashtalakshmi design",
      "Large ceremonial size",
      "Festival occasions",
      "Sacred proportions",
    ],
    craftingTechnique: "Master-level sacred engraving",
    origin: "Tamil Nadu",
    artisan: "Temple Art Guild",
    careInstructions:
      "Sacred item - handle with utmost care. Professional maintenance recommended.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    _id: "product-glass-plain-50g",
    _type: "product",
    name: "Glass Plain - 50g",
    slug: { current: "glass-plain-50g" },
    description:
      "A simple yet elegant 50-gram silver drinking glass that embodies the purity of traditional craftsmanship. The plain design highlights the natural beauty of silver while providing the health benefits associated with drinking from silver vessels. Perfect for daily use or special occasions.",
    shortDescription: "Elegant plain silver drinking glass for daily use.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-glass-plain-50g", _type: "reference" },
        alt: "Glass Plain 50g",
      },
    ],
    category: dummyCategories[5], // Glasses
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[1]], // Sterling Silver
    dimensions: {
      height: 80,
      width: 60,
      unit: "mm" as const,
      weight: 50,
      weightUnit: "g" as const,
    },
    weight: {
      value: 50,
      unit: "g" as const,
    },
    features: [
      "Health benefits",
      "Daily use design",
      "Natural silver beauty",
      "Traditional purity",
    ],
    craftingTechnique: "Traditional glass forming",
    origin: "Uttar Pradesh",
    artisan: "Silver Vessel Artisans",
    careInstructions: "Rinse after use. Hand wash with mild soap.",
    featured: false,
    isAvailable: true,
    createdAt: "2024-02-25T10:00:00Z",
  },
  {
    _id: "product-silver-coin-10g",
    _type: "product",
    name: "Silver Coin - 10g",
    slug: { current: "silver-coin-10g" },
    description:
      "Investment-grade 10-gram silver coin featuring traditional Indian motifs. Struck with precision and hallmarked for purity, this coin represents both cultural heritage and financial investment. Each coin comes with authenticity certification and detailed purity documentation.",
    shortDescription:
      "Investment-grade 10g silver coin with traditional motifs.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-silver-coin-10g", _type: "reference" },
        alt: "Silver Coin 10g",
      },
    ],
    category: dummyCategories[7], // Investment
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 3,
      width: 28,
      unit: "mm" as const,
      weight: 10,
      weightUnit: "g" as const,
    },
    weight: {
      value: 10,
      unit: "g" as const,
    },
    features: [
      "Investment grade",
      "Hallmarked purity",
      "Authenticity certified",
      "Traditional motifs",
    ],
    craftingTechnique: "Precision striking and finishing",
    origin: "Mumbai",
    artisan: "Certified Mint",
    careInstructions:
      "Store in protective case. Handle minimally to preserve condition.",
    featured: false,
    isAvailable: true,
    createdAt: "2024-03-01T10:00:00Z",
  },
  {
    _id: "product-silver-bar-100g",
    _type: "product",
    name: "Silver Bar - 100g",
    slug: { current: "silver-bar-100g" },
    description:
      "Pure 100-gram silver bar for serious investors and collectors. This investment-grade bar meets international purity standards and comes with complete documentation. The clean, modern design makes it perfect for those who appreciate both traditional silver craft and contemporary investment vehicles.",
    shortDescription: "Investment-grade 100g pure silver bar for collectors.",
    images: [
      {
        _type: "image",
        asset: { _ref: "image-silver-bar-100g", _type: "reference" },
        alt: "Silver Bar 100g",
      },
    ],
    category: dummyCategories[7], // Investment
    collection: dummyCollections[1], // Plain Heritage
    materials: [dummyMaterials[0]], // Pure Silver
    dimensions: {
      height: 10,
      width: 50,
      length: 30,
      unit: "mm" as const,
      weight: 100,
      weightUnit: "g" as const,
    },
    weight: {
      value: 100,
      unit: "g" as const,
    },
    features: [
      "Investment grade",
      "International standards",
      "Complete documentation",
      "Modern design",
    ],
    craftingTechnique: "Industrial precision casting",
    origin: "Mumbai",
    artisan: "Certified Refinery",
    careInstructions:
      "Store in original packaging. Avoid handling to prevent oxidation.",
    featured: true,
    isAvailable: true,
    createdAt: "2024-03-05T10:00:00Z",
  },
];

// Helper functions for easy access
export const getDummyProducts = (): Product[] => dummyProducts;
export const getDummyCategories = (): Category[] => dummyCategories;
export const getDummyCollections = (): Collection[] => dummyCollections;
export const getDummyMaterials = (): Material[] => dummyMaterials;

// Filter helpers
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return dummyProducts.filter(
    (product) => product.category?.slug.current === categorySlug
  );
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return dummyProducts.filter(
    (product) => product.collection?.slug.current === collectionSlug
  );
};

export const getFeaturedProducts = (): Product[] => {
  return dummyProducts.filter((product) => product.featured);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return dummyProducts.find((product) => product.slug.current === slug);
};
