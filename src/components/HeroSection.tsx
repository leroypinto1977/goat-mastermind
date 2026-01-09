"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative py-32 lg:py-40 bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/white-blue-hero-bg.jpg"
          alt="Luxury background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="font-serif text-5xl lg:text-7xl font-bold text-navy mb-6 leading-tight">
          PREMIUM SILVERWARE
        </h2>
        <p className="font-serif text-2xl lg:text-4xl mb-12 text-neutral-900">
          HANDCRAFTED ELEGANCE
        </p>
        <Button
          variant="default"
          size="lg"
          className="px-12 py-4 text-xl bg-navy text-white hover:bg-navy/90"
        >
          Shop Now →
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
