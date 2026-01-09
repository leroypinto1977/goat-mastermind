"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, Globe } from "lucide-react";

export default function About() {
  const milestones = [
    {
      year: "1885",
      title: "The Beginning",
      description:
        "Founded in Antwerp by master craftsman Johannes Van Der Berg",
      image: "/placeholder.svg",
    },
    {
      year: "1923",
      title: "Royal Recognition",
      description:
        "Appointed as official silversmith to the Belgian Royal Family",
      image: "/placeholder.svg",
    },
    {
      year: "1956",
      title: "International Expansion",
      description: "First international showroom opened in London",
      image: "/placeholder.svg",
    },
    {
      year: "1987",
      title: "Innovation in Design",
      description:
        "Introduced contemporary collections while preserving traditional craftsmanship",
      image: "/placeholder.svg",
    },
    {
      year: "2024",
      title: "Digital Heritage",
      description:
        "Bridging centuries of tradition with modern e-commerce excellence",
      image: "/placeholder.svg",
    },
  ];

  const stats = [
    { icon: Clock, label: "Years of Excellence", value: "140+" },
    { icon: Users, label: "Master Craftsmen", value: "50+" },
    { icon: Award, label: "International Awards", value: "25+" },
    { icon: Globe, label: "Countries Served", value: "40+" },
  ];

  const values = [
    {
      title: "Exceptional Craftsmanship",
      description:
        "Every piece is meticulously handcrafted by master artisans with decades of experience.",
    },
    {
      title: "Timeless Quality",
      description:
        "We use only the finest materials and time-tested techniques to create heirloom pieces.",
    },
    {
      title: "Heritage & Innovation",
      description:
        "Combining traditional silversmithing with contemporary design and technology.",
    },
    {
      title: "Customer Excellence",
      description:
        "Providing personalized service and building lasting relationships with our clients.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-gray-50">
          <div className="container mx-auto px-6 text-center">
            <Badge variant="outline" className="mb-4">
              Since 1885
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
              Our Story
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              GOAT Mastermind has been helping ambitious business owners
              scale faster and smarter through proven strategies, expert mentorship,
              and a supportive community. From our humble beginnings to becoming a
              trusted partner for hundreds of growing businesses.
            </p>
            <Button size="lg" className="px-8">
              Start Your Growth Journey
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Timeline */}
        <section className="py-20 bg-gradient-to-br from-background to-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
                A Legacy of Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Over 140 years of uncompromising quality and artisanal mastery,
                passed down through generations of skilled craftspeople.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-400 hidden lg:block"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } flex-col lg:flex-row`}
                  >
                    <div className="flex-1">
                      <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-8">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            {milestone.year}
                          </div>
                          <h3 className="text-2xl font-serif font-semibold mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Timeline dot */}
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                    <div className="flex-1 lg:block hidden">
                      <div className="h-32 bg-gray-100 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide our craft and define our commitment to
                excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center border-blue-100 hover:border-blue-200 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    <h3 className="text-xl font-serif font-semibold mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">
              Experience the Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover why discerning customers worldwide choose GOAT Mastermind
              for their most precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Shop Our Collections
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Contact Our Artisans
              </Button>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}
