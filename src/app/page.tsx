"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Star,
  Truck,
  Receipt,
  IndianRupee,
  ArrowRight,
  Award,
  CheckCircle,
  Building2,
} from "lucide-react";
import {
  FACTORY_IMAGES,
  HOME_CAROUSEL_IMAGES,
  RETAILER_LOGOS,
  CERTIFICATIONS,
  FEATURES,
  TIMINGS,
} from "@/config/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { smoothScrollToElement } from "@/utils/animations";

// Convert carousel images array to objects with src and caption
const albumImages = HOME_CAROUSEL_IMAGES.map((src, index) => ({
  src,
  caption: `Product ${index + 1}`,
}));

export default function HomePage() {
  const router = useRouter();
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(
    Math.floor(FACTORY_IMAGES.length / 2)
  );

  // Setup scroll animations
  useScrollAnimation();

  const handleNavigate = (page: "home" | "quote") => {
    if (page === "quote") {
      router.push("/quotation");
    } else {
      router.push("/");
    }
  };

  // Cycle through all factory images
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImageIndex((prev) => (prev + 1) % FACTORY_IMAGES.length);
      setRightImageIndex((prev) => (prev + 1) % FACTORY_IMAGES.length);
    }, TIMINGS.imageTransition);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#FAF9F7]">
      <style>{`
        .hero-image {
          object-position: 65% 35%;
        }
        @media (min-width: 768px) {
          .hero-image {
            object-position: center 35%;
          }
        }
      `}</style>
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/albums/hero.jpg"
            alt="GOAT Mastermind Hero"
            className="w-full h-full object-cover hero-image"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/70 via-[#1A1A1A]/40 to-transparent sm:from-[#1A1A1A]/60 sm:via-[#1A1A1A]/30"></div>
        </div>

        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-24 sm:py-28 md:py-32 relative z-10">
          <div className="max-w-2xl space-y-6 sm:space-y-8 animate-on-scroll">
            <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-xl">
              Scale your business faster with proven strategies, expert guidance, and a community of successful entrepreneurs
            </p>
            <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={() => handleNavigate("quote")}
                className="px-6 py-3 sm:px-8 sm:py-3 bg-transparent border-2 border-white text-white rounded-full text-sm sm:text-base font-medium transition-all duration-300 hover:bg-white hover:text-[#1A1A1A] min-h-[44px]"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Carousel Section with Title */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FAF9F7] border-t border-[#EDEAE2]">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-center text-[#1C1C1C] mb-8 sm:mb-10 md:mb-12 animate-on-scroll px-4">
            Success Stories
          </h2>

          <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] bg-[#F5EFE6] overflow-hidden rounded-lg sm:rounded-xl border border-[#E8E4DA]">
            {/* Mobile: Single Carousel (all images) */}
            <div className="md:hidden absolute inset-0">
              <div className="w-full h-full relative overflow-hidden">
                {FACTORY_IMAGES.map((image, index) => (
                  <div
                    key={`mobile-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      leftImageIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Success Story ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>
              </div>

              {/* Light border dividers */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent"></div>
            </div>

            {/* Desktop: Dual Carousel (split screen) */}
            <div className="hidden md:flex absolute inset-0 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-5 md:p-6">
              {/* Left Side - Cycles through all images */}
              <div className="flex-1 h-full relative overflow-hidden rounded-lg sm:rounded-xl">
                {FACTORY_IMAGES.map((image, index) => (
                  <div
                    key={`left-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      leftImageIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Success Story ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

                {/* Border dividers for left frame */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent"></div>
              </div>

              {/* Right Side - Cycles through all images (offset) */}
              <div className="flex-1 h-full relative overflow-hidden rounded-lg sm:rounded-xl">
                {FACTORY_IMAGES.map((image, index) => (
                  <div
                    key={`right-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      rightImageIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Success Story ${index + 1}`}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

                {/* Border dividers for right frame */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white border-t border-[#EDEAE2]">
        <div className="max-w-5xl mx-auto text-center space-y-3 sm:space-y-4 animate-on-scroll">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-[#1C1C1C] animate-on-scroll px-4">
            Verified for your peace of mind
          </h2>
          <p className="text-sm md:text-base text-[#666666]"></p>
        </div>
        <div className="max-w-5xl mx-auto mt-8 sm:mt-10 md:mt-12">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={`cert-placeholder-${index}`}
                className="flex items-center justify-center w-[28%] sm:w-auto"
              >
                <div className="h-12 sm:h-14 md:h-16 lg:h-18 w-24 sm:w-28 md:w-32 lg:w-36 flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] to-[#E8E4DA] rounded-lg border border-[#E8E4DA]">
                  <div className="text-center p-2 sm:p-3">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#b87333] mx-auto mb-1" />
                    <p className="text-[8px] sm:text-[10px] md:text-xs text-[#5A5A5A] font-medium">Cert {index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="categories"
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-center text-[#1C1C1C] mb-8 sm:mb-10 md:mb-12 animate-on-scroll px-4">
            Our Services, for Your Growth
          </h2>

          <div className="relative animate-on-scroll">
            <div className="flex gap-4 sm:gap-5 md:gap-6 animate-scroll-left w-max">
              {[...Array(6)].map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="flex-shrink-0 w-40 sm:w-44 md:w-48 cursor-pointer"
                  onClick={() => {
                    handleNavigate("quote");
                    setTimeout(() => {
                      smoothScrollToElement("quote-hero");
                    }, 100);
                  }}
                >
                  <div className="relative h-52 sm:h-56 md:h-60 rounded-lg sm:rounded-xl overflow-hidden border border-[#E8E4DA] bg-gradient-to-br from-[#F5F5F5] to-[#E8E4DA] flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 bg-[#b87333]/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#b87333]" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#5A5A5A] font-medium">Service {index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7] via-white to-[#FAF9F7] opacity-50"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="animate-on-scroll">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-[#1C1C1C] mb-3 sm:mb-4 px-4">
                Our story
              </h2>
              <div className="inline-block mb-3 sm:mb-4">
                <div className="w-12 sm:w-14 md:w-16 h-0.5 sm:h-1 bg-[#b87333] mx-auto rounded-full"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl border border-[#E8E4DA] shadow-sm p-5 sm:p-6 md:p-8 lg:p-12 space-y-5 sm:space-y-6">
              <div className="space-y-4 sm:space-y-5 text-left">
                <p className="text-sm sm:text-base md:text-lg text-[#5A5A5A] leading-relaxed">
                GOAT Mastermind was founded with one mission — to help
                   ambitious business owners scale faster and smarter.
                 </p>
 
                 <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent my-4 sm:my-5 md:my-6"></div>
 
                 <p className="text-sm sm:text-base md:text-lg text-[#5A5A5A] leading-relaxed">
                   We understand that scaling a business is challenging. That's why we've
                   created a comprehensive platform that combines proven strategies, expert
                   mentorship, and a supportive community. Our approach has helped hundreds
                   of entrepreneurs break through growth plateaus and achieve their goals.
                 </p>
 
                 <div className="h-px bg-gradient-to-r from-transparent via-[#E8E4DA] to-transparent my-4 sm:my-5 md:my-6"></div>
 
                 <p className="text-sm sm:text-base md:text-lg text-[#5A5A5A] leading-relaxed">
                   We're not just consultants — we're your growth partners, committed to
                   your success every step of the way.
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-center text-[#1C1C1C] mb-8 sm:mb-10 md:mb-12 animate-on-scroll px-4">
            With us you can
          </h2>

          {/* Reverse Pyramid Layout: 3 cards top row, 2 cards centered bottom row */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* First Row: 3 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {FEATURES.slice(0, 3).map((item, index) => {
                // Map icons to features
                const icons = [TrendingUp, IndianRupee, Star, Truck, Receipt];
                const Icon = icons[index];

                return (
                  <div
                    key={index}
                    className="text-left space-y-3 sm:space-y-4 p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-white border border-[#E8E4DA] animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F5EFE6] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#b87333]" />
                    </div>
                    <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Second Row: 2 Cards Centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              {FEATURES.slice(3, 5).map((item, index) => {
                // Map icons to features (indices 3 and 4)
                const icons = [TrendingUp, IndianRupee, Star, Truck, Receipt];
                const Icon = icons[index + 3];

                return (
                  <div
                    key={index + 3}
                    className="text-left space-y-3 sm:space-y-4 p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl bg-white border border-[#E8E4DA] animate-on-scroll"
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#F5EFE6] rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#b87333]" />
                    </div>
                    <h3 className="text-sm sm:text-base font-normal text-[#1C1C1C]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto animate-on-scroll">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-center text-[#1C1C1C] mb-6 sm:mb-7 md:mb-8 animate-on-scroll px-4">
            Trusted by the best
          </h3>

          <div className="relative overflow-hidden animate-on-scroll">
            <div className="flex gap-8 sm:gap-10 md:gap-12 lg:gap-14 animate-scroll-left w-max">
              {[...Array(8)].map((_, index) => (
                <div
                  key={`brand-placeholder-${index}`}
                  className="flex-shrink-0 flex items-center justify-center w-20 sm:w-24 md:w-28 lg:w-32 h-10 sm:h-12 md:h-14 lg:h-16"
                >
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F5F5] to-[#E8E4DA] rounded-lg border border-[#E8E4DA] px-2 sm:px-3">
                    <div className="text-center">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#b87333] mx-auto mb-1" />
                      <p className="text-[8px] sm:text-[10px] text-[#5A5A5A] font-medium whitespace-nowrap">Partner {index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 bg-gradient-to-b from-[#FDFBF7] to-white border-t border-[#EDEAE2]">
        <div className="max-w-4xl mx-auto text-center animate-on-scroll">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-[#1C1C1C] leading-relaxed mb-6 sm:mb-7 md:mb-8 px-4">
            Ready to scale your business? Let's discuss your growth strategy
          </h2>
          <button
            onClick={() => {
              handleNavigate("quote");
              setTimeout(() => {
                smoothScrollToElement("quote-hero");
              }, 100);
            }}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-[#b87333] text-white rounded-full text-sm sm:text-base font-normal transition-colors duration-300 hover:bg-[#9d5f28] flex items-center justify-center gap-2 mx-auto min-h-[44px]"
          >
            Start Growing
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
