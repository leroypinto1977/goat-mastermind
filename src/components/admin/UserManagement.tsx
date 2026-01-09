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
import { Search, UserCog, Mail, Calendar } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock data - replace with actual API calls when backend is implemented
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      const mockUsers: Profile[] = [
        {
          id: "1",
          user_id: "1",
          email: "admin@goatmastermind.com",
          full_name: "Admin User",
          role: "admin",
          created_at: "2024-01-15T10:00:00Z",
          updated_at: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          user_id: "2",
          email: "john.doe@example.com",
          full_name: "John Doe",
          role: "user",
          created_at: "2024-02-20T14:30:00Z",
          updated_at: "2024-02-20T14:30:00Z",
        },
        {
          id: "3",
          user_id: "3",
          email: "sarah.wilson@example.com",
          full_name: "Sarah Wilson",
          role: "manager",
          created_at: "2024-03-10T09:15:00Z",
          updated_at: "2024-03-10T09:15:00Z",
        },
        {
          id: "4",
          user_id: "4",
          email: "mike.johnson@example.com",
          full_name: "Mike Johnson",
          role: "user",
          created_at: "2024-03-25T16:45:00Z",
          updated_at: "2024-03-25T16:45:00Z",
        },
      ];

      setUsers(mockUsers);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      // Mock update - replace with actual API call when backend is implemented
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast({
        title: "Success",
        description: `User role updated to ${newRole}.`,
      });
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive" as const;
      case "manager":
        return "default" as const;
      default:
        return "secondary" as const;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <UserCog className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-black">Users</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <UserCog className="h-5 w-5 text-gray-400" />
        <h3 className="text-lg font-semibold text-black">
          Users ({filteredUsers.length})
        </h3>
        <p className="text-sm text-gray-600 ml-auto">
          View and manage all registered users
        </p>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm border-gray-200 focus:border-black focus:ring-black"
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-black font-semibold">User</TableHead>
              <TableHead className="text-black font-semibold">Email</TableHead>
              <TableHead className="text-black font-semibold">Role</TableHead>
              <TableHead className="text-black font-semibold">Joined</TableHead>
              <TableHead className="text-black font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                      <span className="text-sm font-medium">
                        {user.full_name?.charAt(0)?.toUpperCase() ||
                          user.email?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {user.full_name || "No name"}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : user.role === "manager"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {user.role || "user"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {user.role !== "admin" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateUserRole(user.id, "admin")}
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        Make Admin
                      </Button>
                    )}
                    {user.role === "admin" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateUserRole(user.id, "user")}
                        className="border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        Remove Admin
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 border border-gray-200 rounded-lg bg-white">
          <p className="text-gray-500">No users found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
