"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

const PremiumTestimonials = () => {
  const testimonials = [
    {
      name: "Lady Margaret Thornfield",
      title: "Estate Owner, England",
      rating: 5,
      quote:
        "The Royal Heritage collection graces our family dining room with unparalleled elegance. Each piece is a testament to exceptional craftsmanship.",
      purchase: "Royal Heritage 24-piece set",
      image: "/placeholder.svg",
      verified: true,
    },
    {
      name: "Chef Antoine Dubois",
      title: "Michelin Star Restaurant",
      rating: 5,
      quote:
        "Professional quality that enhances our fine dining experience. The weight, balance, and finish are absolutely perfect for our establishment.",
      purchase: "Executive Collection",
      image: "/placeholder.svg",
      verified: true,
    },
    {
      name: "Sarah & Michael Chen",
      title: "Wedding Couple",
      rating: 5,
      quote:
        "Our Wedding Celebration set was the highlight of our reception. Guests couldn't stop admiring the beautiful craftsmanship.",
      purchase: "Wedding Celebration 20-piece set",
      image: "/placeholder.svg",
      verified: true,
    },
    {
      name: "Ambassador Robert Williams",
      title: "Diplomatic Corps",
      rating: 5,
      quote:
        "For official state dinners, nothing compares to the sophistication and prestige these pieces bring to our table.",
      purchase: "Modern Elegance Collection",
      image: "/placeholder.svg",
      verified: true,
    },
    {
      name: "Isabella Rodriguez",
      title: "Interior Designer",
      rating: 5,
      quote:
        "I recommend these pieces to all my luxury clients. The attention to detail and timeless design make them perfect heirloom pieces.",
      purchase: "Custom Engraved Set",
      image: "/placeholder.svg",
      verified: true,
    },
  ];

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 ">
          <h2 className="font-serif text-4xl font-bold mb-4 text-slate-50">
            What Our Clients Say
          </h2>
          <p className="text-lg text-zinc-400">
            Testimonials from our distinguished clientele
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="bg-inherit">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 ">
                <Card className="h-full border-0 bg-slate-800">
                  <CardContent className="p-6 bg-slate-800">
                    <div className="flex items-center mb-4">
                      <div className="flex text-gold mr-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <p className="mb-4 italic text-slate-50">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-neutral-50">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-neutral-50">
                        {testimonial.title}
                      </p>
                      <p className="text-xs text-gold mt-1">
                        {testimonial.purchase}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="group hover:bg-yellow-500 hover:border-yellow-500 hover:text-slate-900 transition-all duration-300">
            <ArrowLeft className="transition-transform duration-300 group-hover:-rotate-45" />
          </CarouselPrevious>
          <CarouselNext className="group hover:bg-yellow-500 hover:border-yellow-500 hover:text-slate-900 transition-all duration-300">
            <ArrowRight className="transition-transform duration-300 group-hover:rotate-45" />
          </CarouselNext>
        </Carousel>
      </div>
    </section>
  );
};

export default PremiumTestimonials;
