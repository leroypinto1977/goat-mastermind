"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ShoppingBag,
  Plus,
  RotateCcw,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Package,
  Settings,
  FileText,
  ClipboardList,
  Briefcase,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import AdminHeader from "@/components/admin/AdminHeader";
import CreateUserDialog from "@/components/admin/CreateUserDialog";
import AddProductDialog from "@/components/admin/AddProductDialog";
import AddServiceDialog from "@/components/admin/AddServiceDialog";
import CategoryManagementDialog from "@/components/admin/CategoryManagementDialog";
import QuoteDetailsDialog from "@/components/admin/QuoteDetailsDialog";
import OrderDetailsDialog from "@/components/admin/OrderDetailsDialog";
import UserDetailsDialog from "@/components/admin/UserDetailsDialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isTemporary: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface ProductVariant {
  id: string;
  width?: string;
  height?: string;
  diameter?: string;
  weight: string;
  purities: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  weightRange?: string;
  images?: string[];
  variants?: ProductVariant[];
}

interface QuoteRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  products: {
    productName: string;
    quantity: number;
    category?: string;
    service?: string;
    level?: string;
    price?: number;
  }[];
  message?: string;
  status: "pending" | "sent" | "rejected";
  createdAt: string;
  businessName?: string;
  gstin?: string;
  userId?: string | null;
  niche?: string;
  total?: number;
}

interface Order {
  id: string;
  orderNumber?: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  products: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "delivered";
  paymentStatus: "pending" | "paid" | "refunded";
  createdAt: string;
  shippingAddress: string;
  businessName?: string;
  gstin?: string;
}

type TabType = "users" | "products" | "services" | "quotes" | "orders";

const defaultCategories = [
  "All Categories",
  // Categories will be dynamically loaded from existing staff in the database
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Product[]>([]);
  const [allServices, setAllServices] = useState<Product[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCategories, setProductCategories] =
    useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);
  const [showQuoteDetails, setShowQuoteDetails] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingService, setEditingService] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  // Alert dialog states
  const [deleteUserDialog, setDeleteUserDialog] = useState<{
    open: boolean;
    userId: string | null;
  }>({ open: false, userId: null });
  const [deleteProductDialog, setDeleteProductDialog] = useState<{
    open: boolean;
    productId: string | null;
  }>({ open: false, productId: null });
  const [deleteQuoteDialog, setDeleteQuoteDialog] = useState<{
    open: boolean;
    quoteId: string | null;
  }>({ open: false, quoteId: null });
  const [deleteOrderDialog, setDeleteOrderDialog] = useState<{
    open: boolean;
    orderId: string | null;
  }>({ open: false, orderId: null });
  // Reset password dialog state
  const [resetPasswordData, setResetPasswordData] = useState<{
    user: any;
    temporaryPassword: string;
  } | null>(null);

  // Redirect non-admin users
  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session?.user) {
      window.location.href = "/auth";
      return;
    }

    if (session.user.role !== "ADMIN") {
      window.location.href = "/";
      return;
    }
  }, [session, status]);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchUsers();
      fetchProducts();
      fetchServices();
      fetchQuotes();
      fetchOrders();
    }
  }, [session]);

  // Update categories based on active tab
  useEffect(() => {
    if (activeTab === "products" && allProducts.length > 0) {
      // Staffs tab - show all categories except Services
      const uniqueCategories = Array.from(
        new Set(allProducts.map((p) => p.category).filter(Boolean))
      ).sort();
      const updatedCategories = ["All Categories", ...uniqueCategories];
      setProductCategories(updatedCategories);
      // Reset to "All Categories" if current selection doesn't exist
      if (!updatedCategories.includes(selectedCategory)) {
        setSelectedCategory("All Categories");
        setProducts(allProducts);
      }
    } else if (activeTab === "services") {
      // Services tab - show "All Categories" and all unique service type categories
      // Get unique service categories from existing services (dynamically)
      const uniqueServiceCategories = Array.from(
        new Set(
          allServices
            .map((s) => s.category)
            .filter(
              (cat) => cat && cat !== "Services" && cat !== "All Categories"
            )
        )
      ).sort();

      // Start with default service types, then add any additional categories found
      const defaultServiceTypes = ["Writer", "Editor", "Videographer"];
      const allServiceTypes = Array.from(
        new Set([...defaultServiceTypes, ...uniqueServiceCategories])
      ).sort();

      const serviceCategories = ["All Categories", ...allServiceTypes];
      setProductCategories(serviceCategories);
      // Reset to "All Categories" if current selection doesn't exist
      if (!serviceCategories.includes(selectedCategory)) {
        setSelectedCategory("All Categories");
        if (allServices.length > 0) {
          setServices(allServices);
        }
      }
    }
  }, [activeTab, allProducts, allServices]);

  // Helper function to map database status to frontend status
  const mapDbStatusToFrontend = (dbStatus: string): Order["status"] => {
    const statusMap: { [key: string]: Order["status"] } = {
      PENDING: "pending",
      PROCESSING: "processing",
      SHIPPED: "completed", // Map SHIPPED to completed for frontend
      DELIVERED: "delivered",
      CANCELLED: "pending", // Map cancelled to pending
    };
    return statusMap[dbStatus?.toUpperCase()] || "pending";
  };

  // Helper function to map database payment status to frontend payment status
  const mapDbPaymentStatusToFrontend = (
    dbPaymentStatus: string
  ): Order["paymentStatus"] => {
    const paymentStatusMap: { [key: string]: Order["paymentStatus"] } = {
      PENDING: "pending",
      PAID: "paid",
      REFUNDED: "refunded",
    };
    return paymentStatusMap[dbPaymentStatus?.toUpperCase()] || "pending";
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch users:", response.status, errorData);
        toast.error(errorData.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services");
      if (response.ok) {
        const data = await response.json();
        // Services endpoint already filters and returns only services
        const allServiceProducts = data.services || [];

        // Transform API services to match admin panel structure
        // Extract service type from name or use category (supports any service type category)
        const transformedServices: Product[] = allServiceProducts.map(
          (p: any) => {
            // Determine service category:
            // 1. If category is already set and not a staff category, use it
            // 2. Otherwise, extract from name if format is "ServiceType - Level"
            // 3. Fallback to "Services" if we can't determine
            let serviceCategory = p.category;
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

            // If category is not an old staff category and not "Services" or empty, keep it
            if (
              p.category &&
              p.category !== "Services" &&
              !oldStaffCategories.includes(p.category) &&
              p.category !== "All Categories"
            ) {
              serviceCategory = p.category;
            } else if (p.name && typeof p.name === "string") {
              // Extract service type from name (e.g., "ServiceType - Professional" → "ServiceType")
              const nameParts = p.name.split(" - ");
              if (nameParts.length >= 1) {
                const potentialServiceType = nameParts[0];
                // If the extracted type is not an old staff category, use it as service category
                if (
                  !oldStaffCategories.includes(potentialServiceType) &&
                  potentialServiceType !== "All Categories"
                ) {
                  serviceCategory = potentialServiceType;
                } else if (p.category === "Services" && nameParts.length >= 1) {
                  // If category is "Services" (legacy), extract from name
                  serviceCategory = potentialServiceType;
                }
              }
            }

            return {
              id: p.id,
              name: p.name,
              description: p.description || "",
              price: p.price || 0,
              image: p.image || "/assets/placeholder.jpg",
              category: serviceCategory, // Use extracted/determined service type as category
              weightRange: p.weightRange || "",
              images: p.images || [],
              variants:
                p.variants?.map((v: any) => ({
                  id: v.id,
                  weight: v.weight,
                  width: v.width || "",
                  height: v.height || "",
                  diameter: v.diameter || "",
                  purities: v.purities || [],
                })) || [],
            };
          }
        );

        console.log("Fetched services from API:", transformedServices.length);
        setAllServices(transformedServices);

        // Don't update productCategories here - it will be updated by useEffect based on activeTab
        // Apply category filter to services
        if (
          selectedCategory === "All Categories" ||
          selectedCategory === "" ||
          !selectedCategory
        ) {
          setServices(transformedServices);
          console.log("Showing all services:", transformedServices.length);
        } else {
          const filtered = transformedServices.filter(
            (s) => s.category === selectedCategory
          );
          setServices(filtered);
          console.log(
            `Filtered services for ${selectedCategory}:`,
            filtered.length
          );
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch services:", response.status, errorData);
        toast.error("Failed to fetch services");
        setAllServices([]);
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Error fetching services");
      setAllServices([]);
      setServices([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/staff");
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched staff from API:", data.staff?.length || 0);

        // Staff endpoint already filters and returns only staff
        const staffProducts = data.staff || [];

        console.log(
          "Filtered staff (excluding services):",
          staffProducts.length
        );

        // Transform API products to match admin panel structure
        const transformedProducts: Product[] = staffProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || "",
          price: p.price || 0,
          image: p.image || "/assets/placeholder.jpg",
          category: p.category,
          weightRange: p.weightRange || "",
          images: p.images || [],
          variants:
            p.variants?.map((v: any) => ({
              id: v.id,
              weight: v.weight,
              width: v.width || "",
              height: v.height || "",
              diameter: v.diameter || "",
              purities: v.purities || [],
            })) || [],
        }));
        console.log("Transformed staff products:", transformedProducts.length);
        console.log("Selected category:", selectedCategory);
        setAllProducts(transformedProducts);

        // Don't update productCategories here - it will be updated by useEffect based on activeTab
        // Apply category filter to products
        if (
          selectedCategory === "All Categories" ||
          selectedCategory === "" ||
          !selectedCategory
        ) {
          setProducts(transformedProducts);
          console.log("Showing all staff:", transformedProducts.length);
        } else {
          const filtered = transformedProducts.filter(
            (p) => p.category === selectedCategory
          );
          setProducts(filtered);
          console.log(
            `Filtered staff for ${selectedCategory}:`,
            filtered.length
          );
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch products:", response.status, errorData);
        toast.error("Failed to fetch staff");
        // Fallback to empty array
        setAllProducts([]);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error fetching staff");
      // Fallback to empty array
      setAllProducts([]);
      setProducts([]);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/quotes");
      if (response.ok) {
        const data = await response.json();
        // Transform API quotes to match admin panel structure
        const transformedQuotes: QuoteRequest[] = (data.quotes || []).map(
          (q: any) => {
            const items = q.items || {};
            const services = items.services || [];

            // Transform services to products format for backward compatibility
            const products = services
              .filter(
                (service: any) =>
                  service.level && service.level !== "Not needed"
              )
              .map((service: any) => ({
                productName: `${service.service} - ${service.level}`,
                quantity: 1,
                category: service.service,
                service: service.service,
                level: service.level,
                price: service.price || 0,
              }));

            return {
              id: q.id,
              customerName: q.name,
              customerEmail: q.email,
              customerPhone: q.phone || "",
              products:
                products.length > 0
                  ? products
                  : [
                      {
                        productName: "No services selected",
                        quantity: 0,
                        category: "N/A",
                      },
                    ],
              message: "",
              status: (q.status?.toLowerCase() || "pending") as
                | "pending"
                | "sent"
                | "rejected",
              createdAt: new Date(q.createdAt).toISOString(),
              businessName: q.businessName || undefined,
              gstin: q.gstin || undefined,
              userId: q.userId || null,
              niche: items.niche || undefined,
              total: items.total || 0,
            };
          }
        );
        setQuotes(transformedQuotes);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to fetch quotes:", response.status, errorData);
        toast.error(errorData.error || "Failed to fetch quotes");
        setQuotes([]);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Error fetching quotes");
      setQuotes([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        // Transform API orders to match admin panel structure
        const transformedOrders: Order[] = (data.orders || []).map((o: any) => {
          const items = o.items || [];
          const totalAmount = items.reduce((sum: number, item: any) => {
            // Calculate total - you may need to adjust this based on your pricing logic
            return sum + (item.quantity || 1) * 1000; // Placeholder calculation
          }, 0);

          return {
            id: o.id,
            orderNumber: o.orderNumber || o.id.substring(0, 6).toUpperCase(), // Use orderNumber or fallback to first 6 chars of ID
            userId: o.userId || "",
            customerName: o.name,
            customerEmail: o.email,
            products: items.map((item: any) => ({
              productName: item.productName || "Unknown Product",
              quantity: item.quantity || 1,
              price: 1000, // Placeholder - adjust based on your pricing logic
              width: item.variantDetails?.width || "",
              height: item.variantDetails?.height || "",
              diameter: item.variantDetails?.diameter || "",
              purity: item.variantDetails?.purity || undefined,
            })),
            totalAmount,
            status: mapDbStatusToFrontend(o.status) || "pending",
            paymentStatus:
              mapDbPaymentStatusToFrontend(o.paymentStatus) || "pending",
            createdAt: new Date(o.createdAt).toISOString(),
            shippingAddress: "", // Not stored in current schema
            businessName: o.businessName || undefined,
            gstin: o.gstin || undefined,
          };
        });
        setOrders(transformedOrders);
      } else {
        toast.error("Failed to fetch orders");
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
      setOrders([]);
    }
  };

  const handleToggleUserStatus = async (
    userId: string,
    currentStatus: boolean
  ) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: !currentStatus,
        }),
      });

      if (response.ok) {
        toast.success(
          `User ${!currentStatus ? "activated" : "deactivated"} successfully`
        );
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to update user");
      }
    } catch (_error) {
      toast.error("Error updating user");
    }
  };

  const handleResetPassword = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "reset-password",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set the reset password data and open the dialog
        setResetPasswordData({
          user: data.user,
          temporaryPassword: data.temporaryPassword,
        });
        setShowCreateUser(true);
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to reset password");
      }
    } catch (_error) {
      toast.error("Error resetting password");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setDeleteUserDialog({ open: true, userId });
  };

  const confirmDeleteUser = async () => {
    if (!deleteUserDialog.userId) return;

    try {
      const response = await fetch(`/api/users/${deleteUserDialog.userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete user");
      }
    } catch (_error) {
      toast.error("Error deleting user");
    } finally {
      setDeleteUserDialog({ open: false, userId: null });
    }
  };

  const handleUserCreated = () => {
    fetchUsers();
  };

  const handleDeleteProduct = async (productId: string) => {
    setDeleteProductDialog({ open: true, productId });
  };

  const confirmDeleteProduct = async () => {
    if (!deleteProductDialog.productId) return;

    try {
      // Mock delete - replace with actual API call
      const updatedAllProducts = allProducts.filter(
        (p) => p.id !== deleteProductDialog.productId
      );
      setAllProducts(updatedAllProducts);
      setProducts(
        products.filter((p) => p.id !== deleteProductDialog.productId)
      );
      toast.success("Staff deleted successfully");
    } catch (_error) {
      toast.error("Error deleting staff");
    } finally {
      setDeleteProductDialog({ open: false, productId: null });
    }
  };

  const handleEditProduct = (productId: string) => {
    const productToEdit = allProducts.find((p) => p.id === productId);
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setShowAddProduct(true);
    }
  };

  const handleEditService = (serviceId: string) => {
    const serviceToEdit = allServices.find((s) => s.id === serviceId);
    if (serviceToEdit) {
      setEditingService(serviceToEdit);
      setShowAddService(true);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedAllServices = allServices.filter(
          (s) => s.id !== serviceId
        );
        setAllServices(updatedAllServices);
        setServices(services.filter((s) => s.id !== serviceId));
        toast.success("Service deleted successfully");
      } else {
        toast.error("Failed to delete service");
      }
    } catch (_error) {
      toast.error("Error deleting service");
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (activeTab === "products") {
      // Staffs tab - filter from allProducts (excludes services)
      if (category === "All Categories") {
        setProducts(allProducts);
      } else {
        const filtered = allProducts.filter(
          (product) => product.category === category
        );
        setProducts(filtered);
      }
    } else if (activeTab === "services") {
      // Services tab - filter from allServices by service type (Writer, Editor, Videographer)
      if (category === "All Categories") {
        setServices(allServices);
      } else {
        // Filter by the service type category (Writer, Editor, or Videographer)
        const filtered = allServices.filter(
          (service) => service.category === category
        );
        setServices(filtered);
      }
    }
  };

  const handleProductAdded = async (newProduct: Product) => {
    try {
      // Save to API
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          category: newProduct.category,
          price: newProduct.price,
          image: newProduct.image,
          images: newProduct.images || [],
          weightRange: newProduct.weightRange || "",
          variants:
            newProduct.variants?.map((v) => ({
              weight: v.weight,
              width: v.width || "",
              height: v.height || "",
              diameter: v.diameter || "",
              purities: v.purities || [],
            })) || [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const savedProduct: Product = {
          id: data.staff.id,
          name: data.staff.name,
          description: data.staff.description || "",
          price: data.staff.price || 0,
          image: data.staff.image || "/assets/placeholder.jpg",
          category: data.staff.category,
          weightRange: data.staff.weightRange || "",
          images: data.staff.images || [],
          variants:
            data.staff.variants?.map((v: any) => ({
              id: v.id,
              weight: v.weight,
              width: v.width || "",
              height: v.height || "",
              diameter: v.diameter || "",
              purities: v.purities || [],
            })) || [],
        };

        setAllProducts([...allProducts, savedProduct]);

        // Update displayed products based on current filter
        if (
          selectedCategory === "All Categories" ||
          selectedCategory === savedProduct.category
        ) {
          setProducts([...products, savedProduct]);
        }

        toast.success("Staff added successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to add staff");
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      toast.error("Error adding staff");
    }
  };

  const handleProductUpdated = async (updatedProduct: Product) => {
    try {
      // Update via API
      const response = await fetch(`/api/staff/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          description: updatedProduct.description,
          category: updatedProduct.category,
          price: updatedProduct.price,
          image: updatedProduct.image,
          images: updatedProduct.images || [],
          weightRange: updatedProduct.weightRange || "",
          variants:
            updatedProduct.variants?.map((v) => ({
              weight: v.weight,
              width: v.width || "",
              height: v.height || "",
              diameter: v.diameter || "",
              purities: v.purities || [],
            })) || [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const savedProduct: Product = {
          id: data.staff.id,
          name: data.staff.name,
          description: data.staff.description || "",
          price: data.staff.price || 0,
          image: data.staff.image || "/assets/placeholder.jpg",
          category: data.staff.category,
          weightRange: data.staff.weightRange || "",
          images: data.staff.images || [],
          variants:
            data.staff.variants?.map((v: any) => ({
              id: v.id,
              weight: v.weight,
              width: v.width || "",
              height: v.height || "",
              diameter: v.diameter || "",
              purities: v.purities || [],
            })) || [],
        };

        // Update in all products
        const updatedAllProducts = allProducts.map((p) =>
          p.id === savedProduct.id ? savedProduct : p
        );
        setAllProducts(updatedAllProducts);

        // Update in displayed products
        const updatedProducts = products.map((p) =>
          p.id === savedProduct.id ? savedProduct : p
        );
        setProducts(updatedProducts);

        // Reset editing state
        setEditingProduct(null);

        toast.success("Staff updated successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update staff");
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("Error updating staff");
    }
  };

  const handleProductDialogClose = (open: boolean) => {
    setShowAddProduct(open);
    if (!open) {
      setEditingProduct(null);
    }
  };

  const handleServiceAdded = async (newService: Product) => {
    try {
      // Extract service type from name or use category
      let serviceCategory = newService.category;
      if (newService.name && typeof newService.name === "string") {
        const nameParts = newService.name.split(" - ");
        if (
          nameParts.length >= 1 &&
          ["Writer", "Editor", "Videographer"].includes(nameParts[0])
        ) {
          serviceCategory = nameParts[0];
        }
      }

      // Save to API - use service type as category, but also mark it as a service
      // Note: We'll store the actual service type (Writer, Editor, Videographer) as category
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newService.name,
          description: newService.description,
          category: serviceCategory || "Services", // Use service type (Writer, Editor, Videographer) as category
          price: newService.price,
          image: newService.image || "/logos/Main logo.png",
          images: newService.images || ["/logos/Main logo.png"],
          weightRange: "",
          variants: [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Extract category from saved service name if needed
        let savedCategory = data.service.category;
        if (data.service.name && typeof data.service.name === "string") {
          const nameParts = data.service.name.split(" - ");
          if (
            nameParts.length >= 1 &&
            ["Writer", "Editor", "Videographer"].includes(nameParts[0])
          ) {
            savedCategory = nameParts[0];
          }
        }

        const savedService: Product = {
          id: data.service.id,
          name: data.service.name,
          description: data.service.description || "",
          price: data.service.price || 0,
          image: data.service.image || "/logos/Main logo.png",
          category: savedCategory, // Use service type as category
          weightRange: "",
          images: data.service.images || [],
          variants: [],
        };

        setAllServices([...allServices, savedService]);

        // Update displayed services based on current filter
        if (
          selectedCategory === "All Categories" ||
          selectedCategory === savedCategory
        ) {
          setServices([...services, savedService]);
        }

        // Refresh services list to ensure consistency
        fetchServices();

        toast.success("Service added successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Error adding service");
    }
  };

  const handleServiceUpdated = async (updatedService: Product) => {
    try {
      // Extract service type from name or use category
      let serviceCategory = updatedService.category;
      if (updatedService.name && typeof updatedService.name === "string") {
        const nameParts = updatedService.name.split(" - ");
        if (
          nameParts.length >= 1 &&
          ["Writer", "Editor", "Videographer"].includes(nameParts[0])
        ) {
          serviceCategory = nameParts[0];
        }
      }

      // Update via API - use service type as category
      const response = await fetch(`/api/services/${updatedService.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedService.name,
          description: updatedService.description,
          category: serviceCategory || "Services", // Use service type (Writer, Editor, Videographer) as category
          price: updatedService.price,
          image: updatedService.image || "/logos/Main logo.png",
          images: updatedService.images || ["/logos/Main logo.png"],
          weightRange: "",
          variants: [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Extract category from saved service name if needed
        let savedCategory = data.service.category;
        if (data.service.name && typeof data.service.name === "string") {
          const nameParts = data.service.name.split(" - ");
          if (
            nameParts.length >= 1 &&
            ["Writer", "Editor", "Videographer"].includes(nameParts[0])
          ) {
            savedCategory = nameParts[0];
          }
        }

        const savedService: Product = {
          id: data.service.id,
          name: data.service.name,
          description: data.service.description || "",
          price: data.service.price || 0,
          image: data.service.image || "/logos/Main logo.png",
          category: savedCategory, // Use service type as category
          weightRange: "",
          images: data.service.images || [],
          variants: [],
        };

        // Update in all services
        const updatedAllServices = allServices.map((s) =>
          s.id === savedService.id ? savedService : s
        );
        setAllServices(updatedAllServices);

        // Update in displayed services - handle category-based filtering
        if (selectedCategory === "All Categories") {
          // Show all services, just update the edited one
          const updatedServices = services.map((s) =>
            s.id === savedService.id ? savedService : s
          );
          setServices(updatedServices);
        } else if (selectedCategory === savedCategory) {
          // Category matches filter, update in place
          const updatedServices = services.map((s) =>
            s.id === savedService.id ? savedService : s
          );
          setServices(updatedServices);
        } else {
          // Category changed and doesn't match filter, remove from view
          setServices(services.filter((s) => s.id !== savedService.id));
        }

        // Refresh to ensure consistency
        fetchServices();

        // Reset editing state
        setEditingService(null);

        // Refresh services list
        fetchServices();

        toast.success("Service updated successfully!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Error updating service");
    }
  };

  const handleServiceDialogClose = (open: boolean) => {
    setShowAddService(open);
    if (!open) {
      setEditingService(null);
    }
  };

  const handleCategoriesUpdate = (updatedCategories: string[]) => {
    if (activeTab === "services") {
      // For Services tab, allow dynamic service type categories
      // Filter out "All Categories" when setting
      const serviceTypes = updatedCategories.filter(
        (cat) => cat !== "All Categories"
      );
      setProductCategories(updatedCategories);
      // If the currently selected category was deleted, reset to "All Categories"
      if (!updatedCategories.includes(selectedCategory)) {
        setSelectedCategory("All Categories");
        setServices(allServices);
      } else {
        // Re-filter services based on selected category
        handleCategoryChange(selectedCategory);
      }
      toast.success("Service types updated successfully!");
    } else {
      // For Staffs tab, allow normal category management
      setProductCategories(updatedCategories);
      // If the currently selected category was deleted, reset to "All Categories"
      if (!updatedCategories.includes(selectedCategory)) {
        setSelectedCategory("All Categories");
        setProducts(allProducts);
      }
    }
  };

  const handleQuoteClick = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setShowQuoteDetails(true);
  };

  const handleQuoteSent = (quoteId: string) => {
    // Update quote status to "sent"
    setQuotes(
      quotes.map((q) =>
        q.id === quoteId ? { ...q, status: "sent" as const } : q
      )
    );
    toast.success("Quote sent successfully!");
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleDeleteQuote = async (quoteId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the quote click
    setDeleteQuoteDialog({ open: true, quoteId });
  };

  const confirmDeleteQuote = async () => {
    if (!deleteQuoteDialog.quoteId) return;

    try {
      const response = await fetch(`/api/quotes/${deleteQuoteDialog.quoteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQuotes(quotes.filter((q) => q.id !== deleteQuoteDialog.quoteId));
        toast.success("Quote deleted successfully");
      } else {
        toast.error("Failed to delete quote");
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
      toast.error("Error deleting quote");
    } finally {
      setDeleteQuoteDialog({ open: false, quoteId: null });
    }
  };

  const handleDeleteOrder = async (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the order click
    setDeleteOrderDialog({ open: true, orderId });
  };

  const confirmDeleteOrder = async () => {
    if (!deleteOrderDialog.orderId) return;

    try {
      const response = await fetch(`/api/orders/${deleteOrderDialog.orderId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setOrders(orders.filter((o) => o.id !== deleteOrderDialog.orderId));
        toast.success("Order deleted successfully");
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    } finally {
      setDeleteOrderDialog({ open: false, orderId: null });
    }
  };

  const handleOrderStatusUpdate = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        );
        setOrders(updatedOrders);

        // Update selectedOrder if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }

        toast.success(`Order status updated to ${newStatus}!`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const handlePaymentStatusUpdate = async (
    orderId: string,
    newPaymentStatus: Order["paymentStatus"]
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((o) =>
          o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o
        );
        setOrders(updatedOrders);

        // Update selectedOrder if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({
            ...selectedOrder,
            paymentStatus: newPaymentStatus,
          });
        }

        toast.success(`Payment status updated to ${newPaymentStatus}!`);
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.error || "Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not admin (will be redirected)
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {session?.user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                {users.filter((u) => u.isActive).length} active users
              </p>
            </CardContent>
          </Card>

          <Card className="py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Staffs</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                Total staff members
              </p>
            </CardContent>
          </Card>

          <Card className="py-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Temporary Passwords
              </CardTitle>
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.isTemporary).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Users need to change passwords
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("users")}
                className={`${
                  activeTab === "users"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <Users className="h-5 w-5" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`${
                  activeTab === "products"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <Package className="h-5 w-5" />
                Staffs
              </button>
              <button
                onClick={() => setActiveTab("services")}
                className={`${
                  activeTab === "services"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <Briefcase className="h-5 w-5" />
                Services
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`${
                  activeTab === "quotes"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <FileText className="h-5 w-5" />
                Quotes
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`${
                  activeTab === "orders"
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
              >
                <ClipboardList className="h-5 w-5" />
                Orders
              </button>
            </nav>
          </div>
        </div>

        {/* User Management Tab */}
        {activeTab === "users" && (
          <Card className="py-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </div>
                <Button onClick={() => setShowCreateUser(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserDetails(true);
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge
                            variant={
                              user.role === "ADMIN" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                          {user.isTemporary && (
                            <Badge variant="destructive">Temp Password</Badge>
                          )}
                          <Badge
                            variant={user.isActive ? "default" : "secondary"}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleToggleUserStatus(user.id, user.isActive)
                        }
                        disabled={user.role === "ADMIN"}
                      >
                        {user.isActive ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResetPassword(user.id)}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reset Password
                      </Button>

                      {user.role !== "ADMIN" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Staffs Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <label
                  htmlFor="category-filter"
                  className="text-sm font-medium text-gray-700"
                >
                  Filter by Category:
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-sm"
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">
                  ({products.length}{" "}
                  {products.length === 1 ? "staff" : "staffs"})
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCategoryManagement(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Categories
                </Button>
                <Button onClick={() => setShowAddProduct(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Staff
                </Button>
              </div>
            </div>

            <Card className="py-6">
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">
                      No staff found in this category
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* Product Image */}
                          <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {product.description}
                            </p>
                            <div className="mt-1">
                              <Badge variant="secondary">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              {/* Category Filter */}
              <div className="flex items-center gap-3">
                <label
                  htmlFor="service-category-filter"
                  className="text-sm font-medium text-gray-700"
                >
                  Filter by Category:
                </label>
                <select
                  id="service-category-filter"
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-sm"
                >
                  {productCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500">
                  ({services.length}{" "}
                  {services.length === 1 ? "service" : "services"})
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCategoryManagement(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Categories
                </Button>
                <Button onClick={() => setShowAddService(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </div>

            <Card className="py-6">
              <CardContent>
                {loading && services.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b87333] mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm">Loading services...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">
                      No services found in this category
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {/* Service Image */}
                          <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                            <Image
                              src={service.image}
                              alt={service.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Service Details */}
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {service.description}
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="secondary">
                                {service.category}
                              </Badge>
                              {service.price && service.price > 0 && (
                                <Badge
                                  variant="outline"
                                  className="bg-[#b87333]/10 text-[#b87333] border-[#b87333]/30"
                                >
                                  ₹{service.price.toLocaleString("en-IN")}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditService(service.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <div>
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Quote Requests ({quotes.length})</CardTitle>
                <CardDescription>
                  Click on a quote to view details and send response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quotes.map((quote) => (
                    <div
                      key={quote.id}
                      onClick={() => handleQuoteClick(quote)}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                          {quote.customerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {quote.customerName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {quote.products.length} service
                            {quote.products.length !== 1 ? "s" : ""} requested
                            {quote.total && quote.total > 0
                              ? ` • ₹${quote.total.toLocaleString("en-IN")}`
                              : ""}{" "}
                            • {new Date(quote.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {!quote.userId && (
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            New User
                          </Badge>
                        )}
                        <Badge
                          variant={
                            quote.status === "pending"
                              ? "default"
                              : quote.status === "sent"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {quote.status}
                        </Badge>
                        <button
                          onClick={(e) => handleDeleteQuote(quote.id, e)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete quote"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <Card className="py-6">
              <CardHeader>
                <CardTitle>Orders ({orders.length})</CardTitle>
                <CardDescription>
                  Click on an order to view details and manage status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">There are no orders</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => handleOrderClick(order)}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                            {order.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {order.customerName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {order.orderNumber ||
                                order.id.substring(0, 6).toUpperCase()}{" "}
                              • {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              order.status === "delivered"
                                ? "secondary"
                                : order.status === "completed"
                                ? "default"
                                : order.status === "processing"
                                ? "default"
                                : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                          <Badge
                            variant={
                              order.paymentStatus === "paid"
                                ? "default"
                                : order.paymentStatus === "refunded"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {order.paymentStatus}
                          </Badge>
                          <button
                            onClick={(e) => handleDeleteOrder(order.id, e)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete order"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <CreateUserDialog
        open={showCreateUser}
        onOpenChange={(open) => {
          setShowCreateUser(open);
          if (!open) {
            setResetPasswordData(null);
          }
        }}
        onUserCreated={() => {
          handleUserCreated();
          setResetPasswordData(null);
        }}
        mode={resetPasswordData ? "reset" : "create"}
        resetUserData={resetPasswordData}
      />

      <AddProductDialog
        open={showAddProduct}
        onOpenChange={handleProductDialogClose}
        onProductAdded={handleProductAdded}
        onProductUpdated={handleProductUpdated}
        categories={productCategories}
        editProduct={editingProduct}
      />

      <AddServiceDialog
        open={showAddService}
        onOpenChange={handleServiceDialogClose}
        onServiceAdded={handleServiceAdded}
        onServiceUpdated={handleServiceUpdated}
        editService={editingService}
        serviceTypes={
          activeTab === "services"
            ? productCategories.filter((cat) => cat !== "All Categories")
            : undefined
        }
      />

      <CategoryManagementDialog
        open={showCategoryManagement}
        onOpenChange={setShowCategoryManagement}
        categories={productCategories}
        onCategoriesUpdate={handleCategoriesUpdate}
        isServicesTab={activeTab === "services"}
      />

      <QuoteDetailsDialog
        open={showQuoteDetails}
        onOpenChange={setShowQuoteDetails}
        quote={selectedQuote}
        onQuoteSent={handleQuoteSent}
      />

      <OrderDetailsDialog
        open={showOrderDetails}
        onOpenChange={setShowOrderDetails}
        order={selectedOrder}
        onStatusUpdate={handleOrderStatusUpdate}
        onPaymentStatusUpdate={handlePaymentStatusUpdate}
      />

      <UserDetailsDialog
        open={showUserDetails}
        onOpenChange={setShowUserDetails}
        user={selectedUser}
      />

      {/* Delete User Alert Dialog */}
      <AlertDialog
        open={deleteUserDialog.open}
        onOpenChange={(open) => setDeleteUserDialog({ open, userId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Staff Alert Dialog */}
      <AlertDialog
        open={deleteProductDialog.open}
        onOpenChange={(open) =>
          setDeleteProductDialog({ open, productId: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Staff</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this staff member? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProduct}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Quote Alert Dialog */}
      <AlertDialog
        open={deleteQuoteDialog.open}
        onOpenChange={(open) => setDeleteQuoteDialog({ open, quoteId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Quote</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this quote? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteQuote}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Order Alert Dialog */}
      <AlertDialog
        open={deleteOrderDialog.open}
        onOpenChange={(open) => setDeleteOrderDialog({ open, orderId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteOrder}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
