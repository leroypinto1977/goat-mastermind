"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2, Download, LogIn } from "lucide-react";
import BackButton from "@/components/BackButton";
import { QUOTE_STEPS } from "@/config/constants";

interface QuoteFormData {
  name: string;
  businessName: string;
  niche: string;
  writer: "Not needed" | "Professional" | "Expert" | "Creative Director";
  editor: "Not needed" | "Professional" | "Expert" | "Creative Director";
  videographer: "Not needed" | "Professional" | "Expert" | "Creative Director";
}

const serviceOptions: (
  | "Not needed"
  | "Professional"
  | "Expert"
  | "Creative Director"
)[] = ["Not needed", "Professional", "Expert", "Creative Director"];

// Service pricing structure - will be loaded from API
interface ServicePricing {
  [serviceName: string]: {
    [level: string]: number;
  };
}

export default function QuotationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    businessName: "",
    niche: "",
    writer: "Not needed",
    editor: "Not needed",
    videographer: "Not needed",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [servicePricing, setServicePricing] = useState<ServicePricing>({
    Writer: {
      "Not needed": 0,
      Professional: 126000,
      Expert: 252000,
      "Creative Director": 420000,
    },
    Editor: {
      "Not needed": 0,
      Professional: 168000,
      Expert: 336000,
      "Creative Director": 504000,
    },
    Videographer: {
      "Not needed": 0,
      Professional: 210000,
      Expert: 420000,
      "Creative Director": 672000,
    },
  });
  const [, setLoadingServices] = useState(true);

  // Pre-fill form with user data when logged in
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        businessName: session.user.companyName || "",
      }));
    }
  }, [session]);

  // Fetch services pricing from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const response = await fetch("/api/services");
        if (response.ok) {
          const data = await response.json();
          // Services endpoint already returns only services
          const services = data.services || [];

          const pricing: ServicePricing = {
            Writer: { "Not needed": 0 },
            Editor: { "Not needed": 0 },
            Videographer: { "Not needed": 0 },
          };

          services.forEach((service: any) => {
            const nameParts = service.name.split(" - ");
            if (nameParts.length === 2) {
              const serviceName = nameParts[0];
              const level = nameParts[1];
              if (serviceName in pricing && service.price) {
                pricing[serviceName as keyof typeof pricing][level] =
                  Math.round(service.price);
              }
            }
          });

          setServicePricing(pricing);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        // Keep default pricing on error
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  const handleNavigate = (page: "home" | "quote") => {
    if (page === "home") {
      router.push("/");
    } else {
      router.push("/quotation");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    const writerPrice =
      servicePricing.Writer[
        formData.writer as keyof typeof servicePricing.Writer
      ] || 0;
    const editorPrice =
      servicePricing.Editor[
        formData.editor as keyof typeof servicePricing.Editor
      ] || 0;
    const videographerPrice =
      servicePricing.Videographer[
        formData.videographer as keyof typeof servicePricing.Videographer
      ] || 0;
    return writerPrice + editorPrice + videographerPrice;
  };

  const total = calculateTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const writerPrice =
        servicePricing.Writer[
          formData.writer as keyof typeof servicePricing.Writer
        ] || 0;
      const editorPrice =
        servicePricing.Editor[
          formData.editor as keyof typeof servicePricing.Editor
        ] || 0;
      const videographerPrice =
        servicePricing.Videographer[
          formData.videographer as keyof typeof servicePricing.Videographer
        ] || 0;

      // Submit quote to API
      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: session?.user?.email || "",
          businessName: formData.businessName,
          niche: formData.niche,
          items: [
            {
              service: "Writer",
              level: formData.writer,
              price: writerPrice,
            },
            {
              service: "Editor",
              level: formData.editor,
              price: editorPrice,
            },
            {
              service: "Videographer",
              level: formData.videographer,
              price: videographerPrice,
            },
          ],
          total: total,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit quote");
      }

      const data = await response.json();
      setQuoteId(data.quote.id);

      // Generate PDF
      const pdfResponse = await fetch(`/api/quotes/${data.quote.id}/pdf`, {
        method: "GET",
      });

      if (!pdfResponse.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await pdfResponse.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `quote-${quoteId || "quotation"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#b87333]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <BackButton onNavigate={handleNavigate} />

      {/* Hero Section */}
      <section
        id="quote-hero"
        className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6 bg-[#FDFBF7] border-b border-[#EDEAE2]"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#1C1C1C] leading-tight">
              GOAT Mastermind
              <sup
                className="text-xs ml-0.5"
                style={{ fontSize: "0.4em", verticalAlign: "super" }}
              >
                ™
              </sup>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-[#1C1C1C] leading-snug">
              Your growth journey starts with a conversation
            </h2>

            <div className="flex flex-col gap-2.5 sm:gap-3 py-3 sm:py-4">
              {QUOTE_STEPS.map((milestone, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b87333] text-white flex items-center justify-center font-medium text-xs flex-shrink-0">
                      {milestone.step}
                    </div>
                    {index < QUOTE_STEPS.length - 1 && (
                      <div className="w-0.5 h-5 sm:h-6 bg-[#E8E4DA] mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pt-0.5 sm:pt-1">
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#1C1C1C] mb-0.5 sm:mb-1">
                      {milestone.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#F5F5F5] to-[#E8E4DA]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/albums/Second page.jpg"
              alt="Business platform"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          {!session?.user ? (
            // Not logged in - Show CTA to login
            <div className="text-center py-16 sm:py-20 md:py-24 bg-gradient-to-br from-[#FDFBF7] to-[#FAF9F7] rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] px-6 sm:px-8 md:px-12">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#b87333]/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                  <LogIn className="w-10 h-10 sm:w-12 sm:h-12 text-[#b87333]" />
                          </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1C1C] mb-4 sm:mb-6">
                  Members Only
              </h2>
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded text-left">
                  <p className="text-sm sm:text-base text-amber-800">
                    <strong>Important:</strong> Quote requests are exclusively
                    available to GOAT Mastermind members. If you&apos;re not yet
                    a member, please register for our workshop first or contact
                    us to learn more about membership.
                  </p>
                </div>
                <p className="text-base sm:text-lg text-[#5A5A5A] mb-8 sm:mb-10 leading-relaxed">
                  Please log in to your GOAT Mastermind account to access our
                  quotation form and get a personalized quote for your business
                  growth needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => router.push("/auth")}
                    className="px-8 sm:px-10 py-3 sm:py-4 bg-[#b87333] text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <LogIn className="w-5 h-5" />
                    Login Now
                </button>
                  <button
                    onClick={() => router.push("/contact")}
                    className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-[#b87333] text-[#b87333] rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#b87333] hover:text-white flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    Learn More
                  </button>
          </div>
              </div>
            </div>
          ) : (
            // Logged in - Show form
            <div className="bg-white rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8 md:p-10">
              <h2 className="text-2xl sm:text-3xl font-light text-[#1C1C1C] mb-6 sm:mb-8 text-center">
                Request Your Quote
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
            </div>
          )}

              {pdfUrl && quoteId ? (
                // Show success and download button
                <div className="text-center py-12 sm:py-16">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                    <Download className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
          </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-[#1C1C1C] mb-3 sm:mb-4">
                    Quote Generated Successfully!
              </h3>
                  <p className="text-sm sm:text-base text-[#5A5A5A] mb-8 sm:mb-10">
                    Your quotation has been created and is ready for download.
                  </p>
                  <button
                    onClick={handleDownloadPDF}
                    className="px-8 sm:px-10 py-3 sm:py-4 bg-[#b87333] text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg flex items-center justify-center gap-2 mx-auto min-h-[44px]"
                  >
                    <Download className="w-5 h-5" />
                    Download Quote PDF
                  </button>
                </div>
              ) : (
                // Show form
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm sm:text-base font-medium text-[#1C1C1C] mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                      id="name"
                      name="name"
                  required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your full name"
                />
              </div>

                  {/* Business Name */}
              <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm sm:text-base font-medium text-[#1C1C1C] mb-2"
                    >
                      Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                      id="businessName"
                      name="businessName"
                  required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your business name"
                />
              </div>

                  {/* Niche */}
              <div>
                    <label
                      htmlFor="niche"
                      className="block text-sm sm:text-base font-medium text-[#1C1C1C] mb-2"
                    >
                      Niche <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                      id="niche"
                      name="niche"
                  required
                      value={formData.niche}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your business niche"
                />
              </div>

                  {/* Services Section */}
                  <div className="space-y-6">
                    <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] border-b border-[#E8E4DA] pb-3">
                      Services
                    </h3>

                    {/* Writer */}
              <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="writer"
                          className="block text-sm sm:text-base font-medium text-[#1C1C1C]"
                        >
                          Writer
                </label>
                        {formData.writer !== "Not needed" && (
                          <span className="text-sm sm:text-base font-medium text-[#b87333]">
                            ₹
                            {(
                              servicePricing.Writer[
                                formData.writer as keyof typeof servicePricing.Writer
                              ] || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <select
                        id="writer"
                        name="writer"
                        value={formData.writer}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-sm sm:text-base bg-white"
                      >
                        {serviceOptions.map((option) => {
                          const price =
                            servicePricing.Writer[
                              option as keyof typeof servicePricing.Writer
                            ] || 0;
                          return (
                            <option key={option} value={option}>
                              {option}
                              {option !== "Not needed" &&
                                price > 0 &&
                                ` - ₹${price.toLocaleString("en-IN")}`}
                            </option>
                          );
                        })}
                      </select>
              </div>

                    {/* Editor */}
              <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="editor"
                          className="block text-sm sm:text-base font-medium text-[#1C1C1C]"
                        >
                          Editor
                </label>
                        {formData.editor !== "Not needed" && (
                          <span className="text-sm sm:text-base font-medium text-[#b87333]">
                            ₹
                            {(
                              servicePricing.Editor[
                                formData.editor as keyof typeof servicePricing.Editor
                              ] || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      <select
                        id="editor"
                        name="editor"
                        value={formData.editor}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-sm sm:text-base bg-white"
                      >
                        {serviceOptions.map((option) => {
                          const price =
                            servicePricing.Editor[
                              option as keyof typeof servicePricing.Editor
                            ] || 0;
                          return (
                            <option key={option} value={option}>
                              {option}
                              {option !== "Not needed" &&
                                price > 0 &&
                                ` - ₹${price.toLocaleString("en-IN")}`}
                            </option>
                          );
                        })}
                      </select>
              </div>

                    {/* Videographer */}
              <div>
                      <div className="flex items-center justify-between mb-2">
                        <label
                          htmlFor="videographer"
                          className="block text-sm sm:text-base font-medium text-[#1C1C1C]"
                        >
                          Videographer
                </label>
                        {formData.videographer !== "Not needed" && (
                          <span className="text-sm sm:text-base font-medium text-[#b87333]">
                            ₹
                            {(
                              servicePricing.Videographer[
                                formData.videographer as keyof typeof servicePricing.Videographer
                              ] || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        )}
              </div>
                      <select
                        id="videographer"
                        name="videographer"
                        value={formData.videographer}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-sm sm:text-base bg-white"
                      >
                        {serviceOptions.map((option) => {
                          const price =
                            servicePricing.Videographer[
                              option as keyof typeof servicePricing.Videographer
                            ] || 0;
                          return (
                            <option key={option} value={option}>
                              {option}
                              {option !== "Not needed" &&
                                price > 0 &&
                                ` - ₹${price.toLocaleString("en-IN")}`}
                            </option>
                          );
                        })}
                      </select>
          </div>
        </div>

                  {/* Total Section */}
                  {total > 0 && (
                    <div className="border-t-2 border-[#E8E4DA] pt-6 mt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-medium text-[#1C1C1C]">
                          Total Quote:
                        </span>
                        <span className="text-2xl sm:text-3xl font-bold text-[#b87333]">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
            </div>
                      <p className="text-xs sm:text-sm text-[#5A5A5A] mt-2">
                        This is an estimated quote. Final pricing will be
                        confirmed after consultation.
                      </p>
                    </div>
                  )}

                  {/* Submit Button */}
              <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-[#b87333] text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Get Quote"
                    )}
              </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
