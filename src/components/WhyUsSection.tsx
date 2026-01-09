"use client";

import { Award, Shield, Users, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WhyUsSection = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Every piece is crafted from the finest sterling silver, ensuring durability and lasting beauty that stands the test of time.",
    },
    {
      icon: Shield,
      title: "Expert Craftsmanship",
      description:
        "Our master artisans bring generations of traditional silversmithing techniques combined with modern precision to every creation.",
    },
    {
      icon: Users,
      title: "Trusted by Industry",
      description:
        "We are the preferred supplier for major silverware and jewelry industries across India, delivering excellence consistently.",
    },
    {
      icon: Zap,
      title: "Innovation & Tradition",
      description:
        "Blending centuries-old craftsmanship with cutting-edge manufacturing techniques to meet modern demands while preserving heritage.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-navy mb-6">
            Why Choose GOAT Mastermind?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sans">
            We combine traditional craftsmanship with modern innovation to
            deliver silverware that exceeds expectations in both quality and
            design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-gold/50 bg-white/80 backdrop-blur-sm hover:bg-white transform hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <CardTitle className="text-xl font-heading text-navy">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed font-sans">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-20 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">
                140+
              </div>
              <div className="text-gray-600 font-sans">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">
                50+
              </div>
              <div className="text-gray-600 font-sans">Master Craftsmen</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">
                1000+
              </div>
              <div className="text-gray-600 font-sans">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2 font-heading">
                15
              </div>
              <div className="text-gray-600 font-sans">Product Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
