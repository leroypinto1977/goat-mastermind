"use client";

import { Button } from "@/components/ui/button";

const AntwerpCraftsmanship = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="font-serif text-4xl font-bold text-navy mb-6 leading-tight">
              Timeless Elegance, European Silvercraft
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Elevate your business experience with GOAT Mastermind. Our
                platform provides showcase European craftsmanship at its finest,
                creating timeless pieces that celebrate life's most precious
                moments.
              </p>
              <p>
                Each piece combines centuries of European silversmith expertise
                with modern design sensibilities, ensuring that your silverware
                reflects both tradition and contemporary elegance.
              </p>
              <p>
                From classic dinner sets to intricate serving pieces, our
                collection offers the perfect complement for your most treasured
                occasions.
              </p>
            </div>
            <div className="mt-8">
              <Button
                variant="default"
                size="lg"
                className="bg-navy text-white hover:bg-navy/90"
              >
                Shop Now →
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/assets/dining-set.jpg"
                alt="Elegant silver dining set on snowy background"
                className="w-full max-w-md h-auto object-cover rounded-lg shadow-luxury"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AntwerpCraftsmanship;
