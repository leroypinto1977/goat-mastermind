import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'csv-parse/sync'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

interface CSVRow {
  Category: string
  'Product Name': string
  'Weight (Grams)': string
  'Height (Inches)': string
  'Diameter (Inches)': string
  'Length (inches)': string
  Status: string
  Notes: string
}

interface ProductVariant {
  weightGrams: number
  heightInches?: number
  diameterInches?: number
  lengthInches?: number
  status: string
  notes?: string
}

interface ProcessedProduct {
  name: string
  slug: string
  category: string
  variants: ProductVariant[]
  shortDescription: string
  description: any[]
  materials: string[]
  collections: string[]
  images: any[]
  featured: boolean
  available: boolean
  publishedAt: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseNumber(value: string): number | undefined {
  const num = parseFloat(value)
  return isNaN(num) ? undefined : num
}

function getProductDescription(productName: string, category: string): any[] {
  const descriptions: { [key: string]: string } = {
    'Plain Bowl': 'Classic plain silver bowl perfect for serving and ceremonial use. Crafted with traditional techniques and representing the essence of Indian silvercraft.',
    'Design Bowl': 'Elegantly designed silver bowl featuring intricate patterns and motifs. Perfect for special occasions and decorative display.',
    'Chombu': 'Traditional South Indian water vessel (Chombu) used for sacred rituals and daily use. Handcrafted with authentic designs.',
    'Glass': 'Pure silver drinking glass for special occasions. Traditional design meets modern functionality.',
    'Plate': 'Traditional silver serving plate perfect for ceremonial use and fine dining. Available in various sizes.',
    'Tray': 'Handcrafted silver serving tray with intricate designs. Perfect for serving guests and ceremonial purposes.',
    'Lamp': 'Traditional silver oil lamp (Deepam) for religious ceremonies and festivals. Sacred and beautifully crafted.',
    'Cup': 'Elegant silver cup for beverages and ceremonial use. Combines functionality with traditional aesthetics.',
  }

  // Find matching description based on product name
  const matchingKey = Object.keys(descriptions).find(key => 
    productName.toLowerCase().includes(key.toLowerCase())
  )
  
  const descriptionText = matchingKey 
    ? descriptions[matchingKey]
    : `Authentic ${category.toLowerCase()} crafted from pure silver. Traditional South Indian silverware item perfect for ceremonial and daily use.`

  return [
    {
      _type: 'block',
      _key: Math.random().toString(36).substr(2, 9),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substr(2, 9),
          text: descriptionText,
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]
}

function getMaterialsForCategory(category: string): string[] {
  const categoryMaterials: { [key: string]: string[] } = {
    'Bowls': ['pure-silver-999'],
    'Chombu': ['pure-silver-999'],
    'Glasses': ['sterling-silver-925'],
    'Plates & Serving': ['pure-silver-999'],
    'Trays': ['pure-silver-999'],
    'Lamps & Lighting': ['pure-silver-999'],
    'Cups & Drinkware': ['sterling-silver-925'],
    'Vessels & Cookware': ['pure-silver-999'],
    'Coins & Bars': ['pure-silver-999'],
  }
  
  return categoryMaterials[category] || ['sterling-silver-925']
}

function getCollectionsForProduct(productName: string): string[] {
  const collections: string[] = []
  
  if (productName.toLowerCase().includes('plain')) {
    collections.push('plain-heritage')
  }
  if (productName.toLowerCase().includes('design') || productName.toLowerCase().includes('engraving')) {
    collections.push('hand-engraved-artistry')
  }
  if (productName.toLowerCase().includes('matte')) {
    collections.push('matte-finish-contemporary')
  }
  if (productName.toLowerCase().includes('sacred') || productName.toLowerCase().includes('lamp') || productName.toLowerCase().includes('chombu')) {
    collections.push('ceremonial-ritual')
  }
  
  // Default collection if none match
  if (collections.length === 0) {
    collections.push('daily-use-essentials')
  }
  
  return collections
}

function processCSVData(): void {
  console.log('🚀 Processing comprehensive CSV data with variants for SilverCrafts...')
  
  // Read CSV file
  const csvPath = '/Users/leroy/Downloads/Silvercraft products - Copy of Updation in progree.csv'
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found at:', csvPath)
    return
  }
  
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  console.log('📄 CSV file read successfully')
  
  // Parse CSV
  const csvData: CSVRow[] = csv.parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  })
  
  console.log(`📊 Parsed ${csvData.length} rows from CSV`)
  
  // Group products by name
  const productGroups = new Map<string, CSVRow[]>()
  
  csvData.forEach(row => {
    const productName = row['Product Name']?.trim()
    if (!productName) return
    
    if (!productGroups.has(productName)) {
      productGroups.set(productName, [])
    }
    productGroups.get(productName)!.push(row)
  })
  
  console.log(`🔗 Grouped into ${productGroups.size} unique products`)
  
  // Process each product group
  const processedProducts: ProcessedProduct[] = []
  const categories = new Set<string>()
  
  productGroups.forEach((rows, productName) => {
    const firstRow = rows[0]
    const category = firstRow.Category?.trim()
    if (!category) return
    
    categories.add(category)
    
    // Create variants from all rows
    const variants: ProductVariant[] = rows.map(row => ({
      weightGrams: parseNumber(row['Weight (Grams)']) || 0,
      heightInches: parseNumber(row['Height (Inches)']),
      diameterInches: parseNumber(row['Diameter (Inches)']),
      lengthInches: parseNumber(row['Length (inches)']),
      status: row.Status?.toLowerCase() === 'available' ? 'available' : 'out_of_stock',
      notes: row.Notes?.trim() || undefined,
    })).filter(variant => variant.weightGrams > 0)
    
    if (variants.length === 0) return
    
    // Sort variants by weight
    variants.sort((a, b) => a.weightGrams - b.weightGrams)
    
    const product: ProcessedProduct = {
      name: productName,
      slug: slugify(productName),
      category: slugify(category),
      variants,
      shortDescription: `Premium ${category.toLowerCase()} available in ${variants.length} weight option${variants.length > 1 ? 's' : ''}.`,
      description: getProductDescription(productName, category),
      materials: getMaterialsForCategory(category),
      collections: getCollectionsForProduct(productName),
      images: [], // Will be populated after image upload
      featured: Math.random() < 0.2, // 20% chance of being featured
      available: true,
      publishedAt: new Date().toISOString(),
    }
    
    processedProducts.push(product)
  })
  
  // Sort products by name
  processedProducts.sort((a, b) => a.name.localeCompare(b.name))
  
  // Generate categories
  const processedCategories = Array.from(categories)
    .sort()
    .map(category => ({
      name: category,
      slug: slugify(category),
      description: `Traditional ${category.toLowerCase()} crafted from pure silver`,
      order: Array.from(categories).indexOf(category) + 1,
    }))
  
  // Generate materials (same as before)
  const materials = [
    {
      name: 'Pure Silver (99.9%)',
      slug: 'pure-silver-999',
      purity: 99.9,
      description: 'Highest purity silver for premium products',
    },
    {
      name: 'Sterling Silver (92.5%)',
      slug: 'sterling-silver-925',
      purity: 92.5,
      description: 'Standard silver alloy for durability and beauty',
    },
    {
      name: 'Traditional Silver Alloy',
      slug: 'traditional-silver-alloy',
      purity: 90.0,
      description: 'Traditional Indian silver composition',
    },
  ]
  
  // Generate collections (same as before)
  const collections = [
    {
      name: 'Sacred Motifs Collection',
      slug: 'sacred-motifs',
      description: 'Products featuring traditional sacred designs and religious motifs',
    },
    {
      name: 'Plain Heritage Collection',
      slug: 'plain-heritage',
      description: 'Classic plain silver items showcasing pure craftsmanship',
    },
    {
      name: 'Hand Engraved Artistry',
      slug: 'hand-engraved-artistry',
      description: 'Intricately hand-engraved pieces by master craftsmen',
    },
    {
      name: 'Machine Engraved Precision',
      slug: 'machine-engraved-precision',
      description: 'Precisely engraved designs using modern techniques',
    },
    {
      name: 'Matte Finish Contemporary',
      slug: 'matte-finish-contemporary',
      description: 'Modern matte finish items for contemporary aesthetics',
    },
    {
      name: 'Ceremonial & Ritual',
      slug: 'ceremonial-ritual',
      description: 'Items specifically designed for ceremonies and rituals',
    },
    {
      name: 'Daily Use Essentials',
      slug: 'daily-use-essentials',
      description: 'Practical items for everyday use',
    },
    {
      name: 'Investment Grade',
      slug: 'investment-grade',
      description: 'High-value items suitable for investment purposes',
    },
  ]
  
  // Create output directory
  const outputDir = path.join(process.cwd(), 'src', 'data', 'csv-processed-variants')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  
  // Save all data files
  fs.writeFileSync(
    path.join(outputDir, 'categories.json'),
    JSON.stringify(processedCategories, null, 2)
  )
  
  fs.writeFileSync(
    path.join(outputDir, 'materials.json'),
    JSON.stringify(materials, null, 2)
  )
  
  fs.writeFileSync(
    path.join(outputDir, 'collections.json'),
    JSON.stringify(collections, null, 2)
  )
  
  fs.writeFileSync(
    path.join(outputDir, 'products.json'),
    JSON.stringify(processedProducts, null, 2)
  )
  
  // Create summary file
  const summary = {
    totalUniqueProducts: processedProducts.length,
    totalVariants: processedProducts.reduce((sum, product) => sum + product.variants.length, 0),
    totalCategories: processedCategories.length,
    totalMaterials: materials.length,
    totalCollections: collections.length,
    processedAt: new Date().toISOString(),
    sampleProducts: processedProducts.slice(0, 5).map(p => ({
      name: p.name,
      variantCount: p.variants.length,
      weightRange: `${Math.min(...p.variants.map(v => v.weightGrams))}g - ${Math.max(...p.variants.map(v => v.weightGrams))}g`
    }))
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  )
  
  console.log('✨ Generated with variants:')
  console.log(`   📁 Categories: ${processedCategories.length}`)
  console.log(`   🧱 Materials: ${materials.length}`)
  console.log(`   📦 Collections: ${collections.length}`)
  console.log(`   🍴 Products: ${processedProducts.length} (${summary.totalVariants} total variants)`)
  console.log(`💾 Data saved to: ${outputDir}`)
  console.log('✅ CSV processing with variants complete!')
  
  // Show some examples
  console.log('\n📋 Sample products with variants:')
  summary.sampleProducts.forEach(product => {
    console.log(`   • ${product.name}: ${product.variantCount} variants (${product.weightRange})`)
  })
}

// Run the script
if (require.main === module) {
  processCSVData()
}

export { processCSVData }