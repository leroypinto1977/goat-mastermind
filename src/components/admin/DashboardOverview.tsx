"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Package, ShoppingCart, AlertTriangle } from "lucide-react";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    pendingRequests: 0,
    lowStockItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Mock data - replace with actual API calls when backend is implemented
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      setStats({
        totalUsers: 1247,
        totalProducts: 89,
        pendingRequests: 12,
        lowStockItems: 3,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border border-gray-200 py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
              <div className="h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 animate-pulse rounded w-16 mb-1"></div>
              <div className="h-3 bg-gray-200 animate-pulse rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-black">
          Dashboard Overview
        </h2>
        <p className="text-gray-600 mt-2">
          A quick overview of your GOAT Mastermind business metrics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200 bg-white py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {stats.totalUsers}
            </div>
            <p className="text-xs text-gray-500">Registered customers</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Products
            </CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {stats.totalProducts}
            </div>
            <p className="text-xs text-gray-500">In your catalog</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Requests
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {stats.pendingRequests}
            </div>
            <p className="text-xs text-gray-500">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white py-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Low Stock Alert
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.lowStockItems}
            </div>
            <p className="text-xs text-gray-500">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border border-gray-200 bg-white py-6">
          <CardHeader>
            <CardTitle className="text-black">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">
              Latest updates from your GOAT Mastermind business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">
                    New user registration
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">
                    Low stock alert for Sterling Silver Ring
                  </p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">
                    Customer request completed
                  </p>
                  <p className="text-xs text-gray-500">10 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border border-gray-200 bg-white py-6">
          <CardHeader>
            <CardTitle className="text-black">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">
              Common tasks for managing your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
              <p className="text-sm font-medium text-black">Add New Product</p>
              <p className="text-xs text-gray-500">Expand your catalog</p>
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
              <p className="text-sm font-medium text-black">Update Inventory</p>
              <p className="text-xs text-gray-500">Manage stock levels</p>
            </button>
            <button className="w-full text-left p-3 rounded-md hover:bg-gray-100 transition-colors border border-gray-200">
              <p className="text-sm font-medium text-black">View Reports</p>
              <p className="text-xs text-gray-500">Business analytics</p>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
