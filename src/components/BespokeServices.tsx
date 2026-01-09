'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Gift, Crown } from "lucide-react";

const BespokeServices = () => {
  const services = [
    {
      icon: Sparkles,
      title: "Custom Engraving",
      description: "Personalize your pieces with monograms, family crests, or special dates",
      features: ["Hand-engraved details", "Multiple font styles", "Crest reproduction", "Date commemoration"],
      duration: "2-3 weeks",
      popular: true
    },
    {
      icon: Users,
      title: "Corporate Gifting",
      description: "Elegant corporate gifts and awards for distinguished clients and employees",
      features: ["Bulk ordering", "Company branding", "Gift presentation", "Volume discounts"],
      duration: "3-4 weeks",
      popular: false
    },
    {
      icon: Gift,
      title: "Wedding Collections",
      description: "Curated sets perfect for weddings, anniversaries, and special celebrations",
      features: ["Bridal registry", "Custom packaging", "Monogram services", "Gift messaging"],
      duration: "4-6 weeks",
      popular: false
    },
    {
      icon: Crown,
      title: "Heirloom Restoration",
      description: "Professional restoration and refurbishing of vintage and antique silverware",
      features: ["Expert assessment", "Historical accuracy", "Protective coatings", "Documentation"],
      duration: "6-8 weeks",
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-navy mb-4">
            Bespoke Services
          </h2>
          <p className="text-lg text-gray-600">
            Tailored craftsmanship for your unique needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="relative">
              {service.popular && (
                <Badge className="absolute -top-2 left-4 bg-gold text-white">
                  Popular
                </Badge>
              )}
              <CardHeader>
                <service.icon className="w-8 h-8 text-gold mb-2" />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <ul className="text-xs text-gray-500 mb-4 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-navy mb-1">
                    Duration: {service.duration}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BespokeServices;