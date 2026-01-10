"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, AlertTriangle, TrendingUp } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  location: string;
  supplier: string;
  unitCost: number;
  lastRestocked: string;
  status: "in-stock" | "low-stock" | "out-of-stock" | "overstocked";
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Silver Chain Necklace",
    sku: "SCN-001",
    category: "Necklaces",
    currentStock: 45,
    minThreshold: 10,
    maxThreshold: 100,
    location: "Warehouse A-1",
    supplier: "Premium Silver Co.",
    unitCost: 89.99,
    lastRestocked: "2024-09-15",
    status: "in-stock",
  },
  {
    id: "2",
    name: "Gold Earrings Set",
    sku: "GES-002",
    category: "Earrings",
    currentStock: 5,
    minThreshold: 8,
    maxThreshold: 50,
    location: "Warehouse B-2",
    supplier: "Golden Crafts Ltd.",
    unitCost: 149.99,
    lastRestocked: "2024-08-22",
    status: "low-stock",
  },
  {
    id: "3",
    name: "Diamond Ring",
    sku: "DR-003",
    category: "Rings",
    currentStock: 0,
    minThreshold: 5,
    maxThreshold: 25,
    location: "Vault C-1",
    supplier: "Diamond Direct",
    unitCost: 899.99,
    lastRestocked: "2024-07-10",
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "Silver Bracelet",
    sku: "SB-004",
    category: "Bracelets",
    currentStock: 120,
    minThreshold: 15,
    maxThreshold: 80,
    location: "Warehouse A-3",
    supplier: "Premium Silver Co.",
    unitCost: 65.99,
    lastRestocked: "2024-09-20",
    status: "overstocked",
  },
  {
    id: "5",
    name: "Pearl Pendant",
    sku: "PP-005",
    category: "Pendants",
    currentStock: 25,
    minThreshold: 10,
    maxThreshold: 60,
    location: "Warehouse B-1",
    supplier: "Ocean Pearls Inc.",
    unitCost: 199.99,
    lastRestocked: "2024-09-12",
    status: "in-stock",
  },
];

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredInventory = mockInventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "in-stock": {
        label: "In Stock",
        className: "bg-black text-white border-black",
      },
      "low-stock": {
        label: "Low Stock",
        className: "bg-gray-800 text-white border-gray-800",
      },
      "out-of-stock": {
        label: "Out of Stock",
        className: "bg-gray-600 text-white border-gray-600",
      },
      overstocked: {
        label: "Overstocked",
        className: "bg-gray-400 text-black border-gray-400",
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStockLevel = (current: number, min: number, max: number) => {
    const percentage = (current / max) * 100;
    let color = "bg-black";

    if (current === 0) color = "bg-gray-300";
    else if (current <= min) color = "bg-gray-600";
    else if (current >= max) color = "bg-gray-400";

    return (
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    );
  };

  const categories = [
    "all",
    ...Array.from(new Set(mockInventory.map((item) => item.category))),
  ];

  // Calculate summary stats
  const totalItems = mockInventory.length;
  const lowStockItems = mockInventory.filter(
    (item) => item.status === "low-stock" || item.status === "out-of-stock"
  ).length;
  const totalValue = mockInventory.reduce(
    (sum, item) => sum + item.currentStock * item.unitCost,
    0
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{totalItems}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{lowStockItems}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              ₹{totalValue.toLocaleString("en-IN")}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Categories
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {categories.length - 1}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 py-6">
        <CardHeader>
          <CardTitle className="text-black">Inventory Management</CardTitle>
          <p className="text-gray-600">
            Monitor and manage your product inventory levels.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 border-gray-200 focus:border-black"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-black"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          {/* Inventory Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-black">
                    Product
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    SKU
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Stock Level
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Location
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Supplier
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Unit Cost
                  </TableHead>
                  <TableHead className="font-semibold text-black">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-black">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.category}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-gray-700">
                        {item.sku}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-black">
                            {item.currentStock}
                          </span>
                          <span className="text-gray-500">
                            /{item.maxThreshold}
                          </span>
                        </div>
                        {getStockLevel(
                          item.currentStock,
                          item.minThreshold,
                          item.maxThreshold
                        )}
                        <div className="text-xs text-gray-500">
                          Min: {item.minThreshold}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <span className="text-gray-700">{item.location}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-700">{item.supplier}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-black">
                        ₹{item.unitCost?.toLocaleString("en-IN") || "0"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-800 text-white"
                        >
                          Restock
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Adjust
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No inventory items found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
