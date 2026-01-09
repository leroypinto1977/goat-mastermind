"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Shield, Clock } from "lucide-react";

const PlaceOrderSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const features = [
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Get immediate confirmation and order tracking",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-grade security for all transactions",
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Quick processing and delivery timelines",
    },
  ];

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-navy to-navy/80 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-gold" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
            Order Submitted Successfully!
          </h2>
          <p className="text-xl mb-8 font-sans">
            Thank you for using our B2B order platform. Our
            team will contact you within 24 hours with a detailed quote and
            timeline.
          </p>
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-2xl mb-4">What happens next?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-navy font-bold text-sm">1</span>
                  </div>
                  <span className="font-semibold font-sans">
                    Review & Quote
                  </span>
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  Our experts review your requirements and prepare a detailed
                  quote
                </p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-navy font-bold text-sm">2</span>
                  </div>
                  <span className="font-semibold font-sans">Production</span>
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  Your order enters our production queue with priority handling
                </p>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center mr-3">
                    <span className="text-navy font-bold text-sm">3</span>
                  </div>
                  <span className="font-semibold font-sans">Delivery</span>
                </div>
                <p className="text-sm text-gray-300 font-sans">
                  Quality-checked products delivered to your doorstep
                </p>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-gold text-navy hover:bg-navy hover:text-gold font-sans transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={() => setSubmitted(false)}
          >
            Place Another Order
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden min-h-screen"
      style={{
        backgroundColor: "hsl(210, 68%, 15%)",
        background:
          "linear-gradient(135deg, hsl(210, 68%, 15%) 0%, hsl(210, 68%, 10%) 50%, hsl(210, 68%, 15%) 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v30h30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-20 w-32 h-32 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(251, 191, 36, 0.2)" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-16 h-16 rounded-full blur-2xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col justify-center min-h-screen py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge
              className="mb-4 font-sans"
              style={{
                backgroundColor: "hsl(43, 74%, 52%)",
                color: "hsl(210, 68%, 15%)",
              }}
            >
              India&apos;s First
            </Badge>
            <h2 className="font-heading text-4xl lg:text-6xl font-bold mb-6">
              Place Your Order
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 font-sans">
              Experience the future of B2B ordering with our
              revolutionary platform. Get instant quotes, track production, and
              receive your order faster than ever before.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h3 className="font-heading text-2xl mb-8">
                Why Choose Our Platform?
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(251, 191, 36, 0.2)" }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: "hsl(43, 74%, 52%)" }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 font-heading">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm font-sans">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-12 rounded-lg p-6"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <h4 className="font-heading text-lg mb-4">Order Statistics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-sans">
                      Average Processing Time
                    </span>
                    <span className="font-semibold font-sans">48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-sans">
                      Success Rate
                    </span>
                    <span className="font-semibold font-sans">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300 font-sans">
                      Customer Satisfaction
                    </span>
                    <span className="font-semibold font-sans">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Management System CTA */}
            <div>
              <div
                className="rounded-2xl p-8 mb-8 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)",
                  border: "1px solid rgba(251, 191, 36, 0.2)",
                }}
              >
                <h3 className="font-heading text-2xl font-bold text-gold mb-4">
                  Experience Our Order Management System
                </h3>
                <p className="text-gray-300 font-sans text-lg mb-6 max-w-2xl mx-auto">
                  Try out and experience an intuitive and revolutionary order
                  management system to purchase the products you need.
                  Streamline your procurement process with our advanced B2B
                  platform.
                </p>
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg bg-gold text-navy hover:bg-navy hover:text-gold font-sans transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => (window.location.href = "/quotation")}
                >
                  Get Started
                </Button>
              </div>

              {/* Order Form */}
              <Card
                className="backdrop-blur-sm shadow-xl py-6 gap-3"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <CardHeader>
                  <CardTitle className="font-heading text-2xl text-white">
                    Quick Quote Request
                  </CardTitle>
                  <CardDescription className="text-gray-300 font-sans">
                    Provide your basic details and our expert team will get back
                    to you with a personalized quote.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-white font-sans mb-2"
                        >
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="text-white placeholder:text-gray-300"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="email"
                          className="text-white font-sans mb-2"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="text-white placeholder:text-gray-300"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label
                          htmlFor="businessName"
                          className="text-white font-sans mb-2"
                        >
                          Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          required
                          className="text-white placeholder:text-gray-300"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                          placeholder="Enter your business name"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-white font-sans mb-2"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="text-white placeholder:text-gray-300"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            borderColor: "rgba(255, 255, 255, 0.3)",
                          }}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-sans text-lg py-6 hover:bg-navy hover:text-gold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      style={{
                        backgroundColor: "hsl(43, 74%, 52%)",
                        color: "hsl(210, 68%, 15%)",
                      }}
                    >
                      Request Quote
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrderSection;
