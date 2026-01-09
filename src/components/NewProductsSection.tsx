"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Elegant Silver Bowl",
    description: "Handcrafted sterling silver bowl with intricate designs",
    price: "₹7,000",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Bowls",
    weight: "25g - 200g",
    features: [
      "Handcrafted",
      "Sterling Silver",
      "Traditional Design",
      "Food Safe",
    ],
  },
  {
    id: 2,
    name: "Traditional Chombu",
    description: "Classic South Indian water vessel in pure silver",
    price: "₹12,000",
    image:
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Vessels",
    weight: "200g - 500g",
    features: [
      "Traditional Design",
      "Pure Silver",
      "Water Storage",
      "Cultural Significance",
    ],
  },
  {
    id: 3,
    name: "Ornate Serving Tray",
    description: "Beautiful engraved silver serving tray for special occasions",
    price: "₹24,000",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Trays",
    weight: "250g - 500g",
    features: [
      "Engraved Design",
      "Large Serving Area",
      "Premium Quality",
      "Gift Ready",
    ],
  },
  {
    id: 4,
    name: "Silver Drinking Glass",
    description: "Pure silver drinking glass with health benefits",
    price: "₹6,000",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Glasses",
    weight: "50g - 100g",
    features: ["Health Benefits", "Pure Silver", "Easy to Clean", "Daily Use"],
  },
  {
    id: 5,
    name: "Ceremonial Oil Lamp",
    description: "Traditional Kuthuvizhaku for religious ceremonies",
    price: "₹8,500",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Lamps",
    weight: "100g - 300g",
    features: [
      "Religious Significance",
      "Traditional Design",
      "Ceremonial Use",
      "Beautiful Craftsmanship",
    ],
  },
  {
    id: 6,
    name: "Silver Dinner Plate",
    description: "Elegant dinner plate for special meals",
    price: "₹15,000",
    image:
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Plates",
    weight: "200g - 400g",
    features: [
      "Elegant Design",
      "Large Size",
      "Special Occasions",
      "Premium Finish",
    ],
  },
  {
    id: 7,
    name: "Silver Coin Collection",
    description: "Investment-grade silver coins for collectors",
    price: "₹2,500",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Coins",
    weight: "10g - 50g",
    features: [
      "Investment Grade",
      "Collector Quality",
      "Portable",
      "Store of Value",
    ],
  },
  {
    id: 8,
    name: "Custom Silver Jewelry",
    description: "Bespoke silver jewelry pieces crafted to order",
    price: "₹18,000",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1609205603146-2a5bac2f3dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ],
    category: "Jewelry",
    weight: "30g - 150g",
    features: [
      "Custom Made",
      "Unique Design",
      "Premium Materials",
      "Personal Touch",
    ],
  },
];

const NewProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section
      className="py-20 text-white relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(210, 68%, 15%) 0%, hsl(210, 68%, 10%) 50%, hsl(210, 68%, 15%) 100%)",
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white mb-6">
            Our Featured Collection
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sans">
            Discover our exquisite range of handcrafted silverware, each piece
            telling a story of traditional craftsmanship and modern elegance.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-gray-600 hover:border-gold/50 cursor-pointer bg-white/10 backdrop-blur-sm overflow-hidden"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentImageIndex(0);
              }}
            >
              <CardHeader className="p-0">
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <Badge
                  variant="secondary"
                  className="mb-2 text-xs bg-gold/20 text-gold border-gold/30"
                >
                  {product.category}
                </Badge>
                <CardTitle className="text-lg mb-2 line-clamp-2 font-heading text-white">
                  {product.name}
                </CardTitle>
                <p className="text-sm mb-4 line-clamp-3 font-sans text-gray-300">
                  {product.description}
                </p>
                <div className="flex justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-navy transition-all duration-300 transform hover:scale-105"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Get Quote CTA */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gold/30 max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6 font-sans">
              Get a personalized quote for your silverware requirements
            </p>
            <Button
              size="lg"
              className="px-12 py-4 text-xl bg-gold text-navy hover:bg-navy hover:text-gold font-sans shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => (window.location.href = "/quote")}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Product Details Box */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-gray-900 border-gray-200 border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 h-full">
              {/* Image Carousel */}
              <div className="relative">
                <div className="relative h-96 md:h-auto overflow-hidden">
                  <Image
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />

                  {/* Carousel Controls */}
                  {selectedProduct.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                      >
                        <ChevronLeft />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                      >
                        <ChevronRight />
                      </Button>
                    </>
                  )}
                </div>

                {/* Image Indicators */}
                {selectedProduct.images.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2 p-4">
                    {selectedProduct.images.map((_: string, index: number) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-gold"
                            : "bg-gray-400"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 flex flex-col justify-between relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div>
                  <h3 className="font-heading text-3xl text-navy mb-2">
                    {selectedProduct.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="mb-4 text-sm bg-gold/10 text-gold border-gold/30 w-fit"
                  >
                    {selectedProduct.category}
                  </Badge>
                  <p className="text-gray-600 text-base font-sans leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center text-lg">
                      <span className="font-semibold mr-2 font-sans text-gray-700">
                        Material:
                      </span>
                      <span className="text-gray-600 font-sans">
                        Sterling Silver (92.5%)
                      </span>
                    </div>
                    <div className="flex items-center text-lg">
                      <span className="font-semibold mr-2 font-sans text-gray-700">
                        Finish:
                      </span>
                      <span className="text-gray-600 font-sans">Polished</span>
                    </div>
                    <div className="flex items-center text-lg">
                      <span className="font-semibold mr-2 font-sans text-gray-700">
                        Weight:
                      </span>
                      <span className="text-gray-600 font-sans">
                        Approx. 250g
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full bg-gold text-navy hover:bg-navy hover:text-gold font-sans text-lg py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Get a Quote for this Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewProductsSection;
