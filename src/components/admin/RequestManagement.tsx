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
import { Search, MessageSquare, Check, X, Clock, Mail } from "lucide-react";

interface CustomerRequest {
  id: string;
  customer_name: string;
  customer_email: string;
  subject: string;
  message: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
  category: string;
}

const RequestManagement = () => {
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // Mock data - replace with actual API calls when backend is implemented
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      const mockRequests: CustomerRequest[] = [
        {
          id: "1",
          customer_name: "Lady Margaret Thornfield",
          customer_email: "margaret@thornfield.com",
          subject: "Custom Engraving Request",
          message:
            "I would like to inquire about custom engraving services for a family crest on a sterling silver serving tray.",
          status: "pending",
          priority: "high",
          created_at: "2024-03-20T10:00:00Z",
          updated_at: "2024-03-20T10:00:00Z",
          category: "Custom Work",
        },
        {
          id: "2",
          customer_name: "Chef Antoine Dubois",
          customer_email: "antoine@restaurant.com",
          subject: "Bulk Order Inquiry",
          message:
            "We are interested in placing a bulk order for our restaurant. Could you provide pricing for 50 sets of dinner cutlery?",
          status: "in_progress",
          priority: "medium",
          created_at: "2024-03-18T14:30:00Z",
          updated_at: "2024-03-19T09:15:00Z",
          category: "Wholesale",
        },
        {
          id: "3",
          customer_name: "Sarah & Michael Chen",
          customer_email: "sarah.chen@email.com",
          subject: "Wedding Gift Set",
          message:
            "Looking for recommendations on a complete silverware set as a wedding gift. What would you suggest for a young couple?",
          status: "completed",
          priority: "low",
          created_at: "2024-03-15T16:45:00Z",
          updated_at: "2024-03-17T11:30:00Z",
          category: "Product Inquiry",
        },
        {
          id: "4",
          customer_name: "Robert Williams",
          customer_email: "robert.w@embassy.gov",
          subject: "Diplomatic Purchase",
          message:
            "We need to purchase silverware for official state dinners. Please provide catalog and pricing for premium collections.",
          status: "pending",
          priority: "high",
          created_at: "2024-03-22T08:20:00Z",
          updated_at: "2024-03-22T08:20:00Z",
          category: "Corporate",
        },
      ];

      setRequests(mockRequests);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
      toast({
        title: "Error",
        description: "Failed to fetch requests.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (
    requestId: string,
    newStatus: "pending" | "in_progress" | "completed" | "cancelled"
  ) => {
    try {
      setRequests(
        requests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: newStatus,
                updated_at: new Date().toISOString(),
              }
            : request
        )
      );

      toast({
        title: "Success",
        description: `Request status updated to ${newStatus}.`,
      });
    } catch (error: any) {
      console.error("Error updating request status:", error);
      toast({
        title: "Error",
        description: "Failed to update request status.",
        variant: "destructive",
      });
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customer_email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="destructive">Pending</Badge>;
      case "in_progress":
        return <Badge variant="default">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline">Completed</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="py-6">
        <CardHeader>
          <CardTitle>Request Management</CardTitle>
          <CardDescription>Loading requests...</CardDescription>
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Request Management
        </h2>
        <p className="text-muted-foreground">
          Manage customer inquiries and requests.
        </p>
      </div>

      <Card className="py-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Customer Requests ({filteredRequests.length})
          </CardTitle>
          <CardDescription>
            Handle customer inquiries and support requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.customer_name}</p>
                        <div className="flex items-center space-x-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {request.customer_email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {request.message.substring(0, 60)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{request.category}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(request.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status === "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateRequestStatus(request.id, "in_progress")
                            }
                          >
                            <Clock className="h-3 w-3" />
                          </Button>
                        )}
                        {request.status === "in_progress" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateRequestStatus(request.id, "completed")
                            }
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        {(request.status === "pending" ||
                          request.status === "in_progress") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateRequestStatus(request.id, "cancelled")
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No requests found.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestManagement;
