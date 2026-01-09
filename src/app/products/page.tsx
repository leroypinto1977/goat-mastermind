"use client";

import { useState, useEffect } from "react";
import { Search, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// TODO: Update to use Prisma instead of Sanity
// import {
//   ProductListItem,
//   SanityCategory,
//   SanityCollection,
// } from "@/lib/sanity.types";
// import {
//   getProducts,
//   getCategories,
//   getCollections,
//   filterProducts,
//   sortProducts,
// } from "@/lib/sanity.data";
// import { urlFor } from "@/lib/sanity";

// Temporary type definitions (replace with Prisma types)
type ProductListItem = any;
type SanityCategory = any;
type SanityCollection = any;

// Temporary placeholder functions (replace with Prisma queries)
const getProducts = async () => [];
const getCategories = async () => [];
const getCollections = async () => [];
const filterProducts = (products: any[], _filters: any) => products;
const sortProducts = (products: any[], _sortBy: string) => products;
const urlFor = (_image: any) => ({
  width: (_w?: number) => ({
    height: (_h?: number) => ({
      url: () => "/placeholder.jpg",
    }),
  }),
});
import Image from "next/image";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<SanityCategory[]>([]);
  const [collections, setCollections] = useState<SanityCollection[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductListItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, selectedCollection, sortBy]);

  const fetchData = async () => {
    try {
      // Fetch data from Sanity
      const productsData = await getProducts();
      const categoriesData = await getCategories();
      const collectionsData = await getCollections();

      setProducts(productsData);
      setCategories(categoriesData);
      setCollections(collectionsData);
    } catch (error) {
      console.error("Error loading data:", error);
      // Fallback to empty arrays
      setProducts([]);
      setCategories([]);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    // Use the filterProducts function from sanity.data.ts
    const filtered = filterProducts(products, {
      search: searchTerm,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      availability: "all",
    });

    // Sort products using the sortProducts function
    const sorted = sortProducts(
      filtered,
      sortBy as "name" | "weight" | "variants"
    );

    setFilteredProducts(sorted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Loading our exquisite collection...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Artisan Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our exquisite collection of handcrafted silverware, each
            piece telling a story of European craftsmanship and timeless
            elegance.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search our collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category.slug.current}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedCollection}
            onValueChange={setSelectedCollection}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              {collections.map((collection) => (
                <SelectItem
                  key={collection._id}
                  value={collection.slug.current}
                >
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="weight">Weight</SelectItem>
              <SelectItem value="variants">Most Variants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-4">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to discover more
              pieces.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/50"
              >
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                    {product.images?.[0] ? (
                      <Image
                        src={urlFor(product.images[0])
                          .width(400)
                          .height(400)
                          .url()}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to placeholder if image not found
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/placeholder-product.jpg";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🥈</div>
                          <span className="text-gray-500 text-sm">
                            Silver Product
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    {product.category && (
                      <Badge variant="secondary" className="text-xs">
                        {product.category.name}
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge variant="default" className="text-xs bg-primary">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="text-lg mb-2 line-clamp-2">
                    {product.name}
                  </CardTitle>

                  <CardDescription className="text-sm mb-4 line-clamp-3">
                    {product.shortDescription}
                  </CardDescription>

                  {/* Product Details - Variants */}
                  <div className="space-y-2 mb-4 text-xs text-gray-600">
                    <p>
                      <span className="font-medium">Variants:</span>{" "}
                      {product.variantCount} available
                    </p>
                    <p>
                      <span className="font-medium">Weight Range:</span>{" "}
                      {product.minWeight}g - {product.maxWeight}g
                    </p>
                    <p>
                      <span className="font-medium">Available:</span>{" "}
                      {product.variants.some(
                        (v: any) => v.status === "available"
                      )
                        ? "Yes"
                        : "No"}
                    </p>
                  </div>

                  <Link href={`/products/${product.slug}`}>
                    <Button className="w-full group">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Button (if needed) */}
        {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Discover More Pieces
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
