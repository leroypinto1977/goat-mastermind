'use client';

import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="relative py-24 min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/final-cta-background.jpg"
          alt="Business platform background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Explore our product collection to find what you need.
          </h2>
          <div className="mt-8">
            <Button variant="default" size="lg" className="px-8 py-3 text-lg bg-gold text-white hover:bg-gold/90">
              Shop Now →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;