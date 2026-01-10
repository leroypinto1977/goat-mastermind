"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceAdded: (service: any) => void;
  onServiceUpdated?: (service: any) => void;
  editService?: any;
  serviceTypes?: string[]; // Dynamic service types from categories
}

const defaultServiceTypes = [
  "Writer",
  "Editor",
  "Videographer",
];

const serviceLevels = [
  "Professional",
  "Expert",
  "Creative Director",
];

const AddServiceDialog = ({
  open,
  onOpenChange,
  onServiceAdded,
  onServiceUpdated,
  editService,
  serviceTypes = defaultServiceTypes, // Use provided service types or defaults
}: AddServiceDialogProps) => {
  const isEditMode = !!editService;

  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceLevel, setServiceLevel] = useState("");
  const [category, setCategory] = useState("Services");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing or reset when adding new
  useEffect(() => {
    if (editService && open) {
      // Reset form fields first
      setServiceName("");
      setServiceType("");
      setServiceLevel("");
      
      // Priority 1: Use category if it exists in available service types
      if (editService.category && serviceTypes.includes(editService.category)) {
        setServiceType(editService.category);
        setCategory(editService.category);
        
        // Try to extract level from name (format: "ServiceType - Professional")
        const nameParts = editService.name?.split(" - ") || [];
        if (nameParts.length >= 2 && nameParts[0] === editService.category) {
          setServiceLevel(nameParts[1]);
        }
      } else {
        // Priority 2: Parse service name if it's in format "ServiceType - Level"
        const nameParts = editService.name?.split(" - ") || [];
        if (nameParts.length >= 2 && serviceTypes.includes(nameParts[0])) {
          setServiceType(nameParts[0]);
          setServiceLevel(nameParts[1]);
          setCategory(nameParts[0]);
        } else {
          // Fallback: use name as-is and try to extract category from name
          setServiceName(editService.name || "");
          if (nameParts.length >= 1 && serviceTypes.includes(nameParts[0])) {
            setServiceType(nameParts[0]);
            setCategory(nameParts[0]);
          } else if (editService.category && serviceTypes.includes(editService.category)) {
            setServiceType(editService.category);
            setCategory(editService.category);
          } else {
            setCategory(editService.category || "");
          }
        }
      }
      
      setPrice(editService.price || "");
      setDescription(editService.description || "");
    } else if (!editService && open) {
      // Reset form when opening for new service
      setServiceName("");
      setServiceType("");
      setServiceLevel("");
      setCategory("");
      setPrice("");
      setDescription("");
    }
  }, [editService, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields - Service Type and Level are required
    if (!serviceType || !serviceLevel) {
      toast.error("Please select both Service Type and Service Level");
      setIsSubmitting(false);
      return;
    }

    if (!price || (typeof price === "string" && !price.trim())) {
      toast.error("Please enter a price");
      setIsSubmitting(false);
      return;
    }

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice) || numericPrice < 0) {
      toast.error("Please enter a valid price");
      setIsSubmitting(false);
      return;
    }

    try {
      // Generate service name from type and level
      // Use manual name if provided, otherwise auto-generate from type and level
      const finalServiceName = serviceName.trim() || `${serviceType} - ${serviceLevel}`;
      // Category should be the Service Type (Writer, Editor, Videographer), not "Services"
      const finalCategory = serviceType;

      if (isEditMode) {
        // Update existing service
        const updatedService = {
          ...editService,
          name: finalServiceName,
          category: finalCategory, // Use service type as category
          price: numericPrice,
          description,
          updatedAt: new Date().toISOString(),
        };

        onServiceUpdated?.(updatedService);
        toast.success("Service updated successfully!");
      } else {
        // Create new service
        const newService = {
          id: Date.now().toString(),
          name: finalServiceName,
          category: finalCategory, // Use service type as category
          price: numericPrice,
          description,
          image: "/logos/Main logo.png",
          images: ["/logos/Main logo.png"],
          isActive: true,
          createdAt: new Date().toISOString(),
        };

        onServiceAdded(newService);
        toast.success("Service added successfully!");
      }

      // Reset form
      setServiceName("");
      setServiceType("");
      setServiceLevel("");
      setCategory("");
      setPrice("");
      setDescription("");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update service" : "Failed to add service"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription>
            Fill in the service details below. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type and Level - Always Visible */}
          <div className="grid grid-cols-2 gap-4">
            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="serviceType">
                Service Type <span className="text-red-500">*</span>
              </Label>
              <select
                id="serviceType"
                value={serviceType}
                onChange={(e) => {
                  setServiceType(e.target.value);
                  // Update category to match service type
                  if (e.target.value) {
                    setCategory(e.target.value);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent"
                required
              >
                <option value="">Select service type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Writer, Editor, or Videographer
              </p>
            </div>

            {/* Service Level */}
            <div className="space-y-2">
              <Label htmlFor="serviceLevel">
                Service Level <span className="text-red-500">*</span>
              </Label>
              <select
                id="serviceLevel"
                value={serviceLevel}
                onChange={(e) => setServiceLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent"
                required
              >
                <option value="">Select level</option>
                {serviceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500">
                Professional, Expert, or Creative Director
              </p>
            </div>
          </div>

          {/* Service Name - Optional override */}
          <div className="space-y-2">
            <Label htmlFor="serviceName">
              Service Name (Optional - will be auto-generated from Type & Level)
            </Label>
            <Input
              id="serviceName"
              placeholder={`e.g., ${serviceType || "Writer"} - ${serviceLevel || "Professional"}`}
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Leave empty to auto-generate from Service Type and Level above
            </p>
          </div>

          {/* Category - Auto-set to Service Type, Display Only */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Input
              id="category"
              value={serviceType || category || "Select Service Type above"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent bg-gray-50"
              readOnly
              disabled
            />
            <p className="text-xs text-gray-500">
              Category is automatically set to the selected Service Type
            </p>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Price (INR) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price in INR"
              value={price}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
                  setPrice(value === "" ? "" : parseFloat(value));
                }
              }}
              required
              min="0"
              step="1"
            />
            <p className="text-xs text-gray-500">
              Enter the price in Indian Rupees (₹)
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter service description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-gray-500">
              Describe what this service includes and its benefits
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#b87333] hover:bg-[#9d5f28] text-white"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                ? "Update Service"
                : "Add Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;

