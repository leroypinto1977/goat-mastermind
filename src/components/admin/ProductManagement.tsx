"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Package, Plus, Edit, Eye, EyeOff } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  price: number;
  stock_quantity: number;
  min_stock_level: number;
  is_active: boolean;
  image_url: string;
  created_at: string;
}

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Mock data - replace with actual API calls when backend is implemented
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      const mockProducts: Product[] = [
        {
          id: "1",
          name: "Sterling Silver Fork Set",
          description:
            "Elegant 12-piece sterling silver fork set with intricate patterns",
          category: "Cutlery",
          sku: "SSF-001",
          price: 299.99,
          stock_quantity: 25,
          min_stock_level: 5,
          is_active: true,
          image_url: "/assets/fork-elegance.jpg",
          created_at: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          name: "Ornate Serving Tray",
          description: "Handcrafted serving tray with detailed engravings",
          category: "Serving",
          sku: "OST-002",
          price: 189.99,
          stock_quantity: 8,
          min_stock_level: 3,
          is_active: true,
          image_url: "/assets/tray-ornate.jpg",
          created_at: "2024-02-10T14:30:00Z",
        },
        {
          id: "3",
          name: "Premium Dinner Knife Set",
          description:
            "Professional-grade dinner knives with ergonomic handles",
          category: "Cutlery",
          sku: "PDK-003",
          price: 399.99,
          stock_quantity: 2,
          min_stock_level: 5,
          is_active: true,
          image_url: "/assets/knife-carved.jpg",
          created_at: "2024-03-05T09:15:00Z",
        },
        {
          id: "4",
          name: "Classic Spoon Collection",
          description: "Traditional sterling silver spoons for fine dining",
          category: "Cutlery",
          sku: "CSC-004",
          price: 249.99,
          stock_quantity: 15,
          min_stock_level: 5,
          is_active: false,
          image_url: "/assets/spoon-sterling.jpg",
          created_at: "2024-03-20T16:45:00Z",
        },
      ];

      setProducts(mockProducts);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to fetch products.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleProductStatus = async (
    productId: string,
    currentStatus: boolean
  ) => {
    try {
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, is_active: !currentStatus }
            : product
        )
      );

      toast({
        title: "Success",
        description: `Product ${!currentStatus ? "activated" : "deactivated"}.`,
      });
    } catch (error: any) {
      console.error("Error toggling product status:", error);
      toast({
        title: "Error",
        description: "Failed to update product status.",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Card className="py-6">
        <CardHeader>
          <CardTitle>Product Management</CardTitle>
          <CardDescription>Loading products...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-muted animate-pulse rounded"
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Product Management
          </h2>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="py-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products ({filteredProducts.length})
          </CardTitle>
          <CardDescription>Manage your product catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.description?.substring(0, 50)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>₹{product.price?.toLocaleString("en-IN") || "0"}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{product.stock_quantity}</span>
                        {product.stock_quantity <= product.min_stock_level && (
                          <Badge variant="destructive">Low</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.is_active ? "default" : "secondary"}
                      >
                        {product.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            toggleProductStatus(product.id, product.is_active)
                          }
                        >
                          {product.is_active ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductManagement;
