"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Elegance Fork",
    description: "Sterling silver dinner fork",
    price: "₹7,000",
    image: "/assets/fork-elegance.jpg",
  },
  {
    id: 2,
    name: "Sterling Spoon",
    description: "Handcrafted tablespoon",
    price: "₹6,000",
    image: "/assets/spoon-sterling.jpg",
  },
  {
    id: 3,
    name: "Ornate Tray",
    description: "Engraved serving tray",
    price: "₹24,000",
    image: "/assets/tray-ornate.jpg",
  },
  {
    id: 4,
    name: "Carved Knife",
    description: "Premium dinner knife",
    price: "₹7,500",
    image: "/assets/knife-carved.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-navy mb-4">
            Our Featured Silverware
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-elegant hover:shadow-luxury transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-navy mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-end">
                  <Button size="sm" variant="ghost" className="p-2">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
