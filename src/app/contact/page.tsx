"use client";

import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Award,
  ArrowRight,
  FileText,
  LogIn,
  Loader2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const results = [
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Average 40-60% revenue increase within 6 months",
    },
    {
      icon: Users,
      title: "Team Expansion",
      description: "Scale teams efficiently with proven hiring frameworks",
    },
    {
      icon: Target,
      title: "Market Expansion",
      description: "Enter new markets with confidence and strategy",
    },
    {
      icon: Award,
      title: "Operational Excellence",
      description: "Streamline operations and reduce costs by 25-30%",
    },
  ];

  const registrationSteps = [
    {
      step: "1",
      title: "Fill the Registration Form",
      description:
        "Complete our online registration form with your business details",
    },
    {
      step: "2",
      title: "Receive Confirmation",
      description:
        "You'll receive a confirmation email with workshop details and payment information",
    },
    {
      step: "3",
      title: "Complete Payment",
      description: "Secure your spot by completing the payment process",
    },
    {
      step: "4",
      title: "Join the Workshop",
      description:
        "Attend the workshop in Kerala and start your growth journey",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] via-white to-[#FAF9F7]">
      <main>
        {/* Enhanced Hero Section */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#b87333]/5 via-transparent to-[#b87333]/10"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#b87333]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#b87333]/5 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#b87333]/10 rounded-full mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 text-[#b87333]" />
              <span className="text-sm font-medium text-[#b87333]">
                Transform Your Business
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1C1C] mb-4 sm:mb-6 leading-tight">
              GOAT Mastermind
              <sup
                className="text-xs ml-0.5"
                style={{ fontSize: "0.4em", verticalAlign: "super" }}
              >
                ™
              </sup>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#5A5A5A] max-w-3xl mx-auto leading-relaxed">
              Transform your business with proven strategies, expert mentorship,
              and a community of successful entrepreneurs
            </p>
          </div>
        </section>

        {/* Enhanced About Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block mb-4">
                <div className="h-1 w-20 bg-[#b87333] mx-auto"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1C1C] mb-6 sm:mb-8">
                About GOAT Mastermind
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6 text-[#5A5A5A] text-base sm:text-lg leading-relaxed">
              <div className="bg-gradient-to-r from-[#FDFBF7] to-transparent p-6 sm:p-8 rounded-2xl border-l-4 border-[#b87333]">
                <p className="font-medium text-[#1C1C1C] mb-3">
                  GOAT Mastermind is a premier business growth platform designed
                  to help ambitious entrepreneurs scale their businesses faster
                  and smarter.
                </p>
                <p>
                  We combine proven strategies, expert mentorship, and a
                  supportive community to create a comprehensive ecosystem for
                  business success.
                </p>
              </div>
              <p>
                Our workshops are intensive, hands-on experiences where
                you&apos;ll learn directly from successful entrepreneurs who
                have built and scaled multiple businesses. We provide actionable
                frameworks, strategic planning tools, and ongoing support to
                ensure your business reaches its full potential.
              </p>
              <p>
                Whether you&apos;re looking to increase revenue, expand your
                team, enter new markets, or streamline operations, GOAT
                Mastermind provides the guidance and community you need to
                achieve your goals.
              </p>
            </div>
          </div>
        </section>

        {/* Workshop Days */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FDFBF7]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#b87333]/10 rounded-full mb-4 sm:mb-6">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-[#b87333]" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1C1C] mb-4">
                Workshop Schedule
              </h2>
              <p className="text-base sm:text-lg text-[#5A5A5A]">
                Join us for intensive, transformative workshops designed to
                accelerate your business growth
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-medium text-[#1C1C1C] mb-3 sm:mb-4">
                  Weekend Workshop
                </h3>
                <div className="space-y-2 sm:space-y-3 text-[#5A5A5A]">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#b87333]" />
                    <span className="font-medium">Saturday & Sunday</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#b87333]" />
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="text-sm sm:text-base mt-4">
                    Two-day intensive workshop covering strategic planning,
                    growth frameworks, and implementation strategies.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-medium text-[#1C1C1C] mb-3 sm:mb-4">
                  Extended Program
                </h3>
                <div className="space-y-2 sm:space-y-3 text-[#5A5A5A]">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#b87333]" />
                    <span className="font-medium">5-Day Intensive</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#b87333]" />
                    <span>Monday - Friday, 9:00 AM - 5:00 PM</span>
                  </p>
                  <p className="text-sm sm:text-base mt-4">
                    Comprehensive program with deep-dive sessions, one-on-one
                    mentorship, and ongoing support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results We Deliver */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1C1C] mb-4">
                Results We Deliver
              </h2>
              <p className="text-base sm:text-lg text-[#5A5A5A] max-w-2xl mx-auto">
                Our proven methodologies have helped hundreds of businesses
                achieve remarkable growth
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="bg-[#FDFBF7] rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#b87333]/10 rounded-full mb-4 sm:mb-6 mx-auto">
                    <result.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#b87333]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] mb-2 sm:mb-3">
                    {result.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#5A5A5A]">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Steps */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FDFBF7]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block mb-4">
                <div className="h-1 w-20 bg-[#b87333] mx-auto"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1C1C] mb-4">
                How to Register
              </h2>
              <p className="text-base sm:text-lg text-[#5A5A5A]">
                Follow these simple steps to join our next workshop
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
              {/* Left Side - Steps */}
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex flex-col gap-2.5 sm:gap-3 py-3 sm:py-4">
                  {registrationSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#b87333] text-white flex items-center justify-center font-medium text-xs flex-shrink-0">
                          {step.step}
                        </div>
                        {index < registrationSteps.length - 1 && (
                          <div className="w-0.5 h-5 sm:h-6 bg-[#E8E4DA] mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1 pt-0.5 sm:pt-1">
                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#1C1C1C] mb-0.5 sm:mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5A5A5A] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 sm:pt-6">
                  <Link
                    href="/quotation"
                    className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-[#b87333] text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg min-h-[44px]"
                  >
                    Register Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-[#F5F5F5] to-[#E8E4DA]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/albums/Second page.jpg"
                  alt="Workshop registration"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Request a Quote Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#FDFBF7] relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8 md:p-10 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#b87333]/5 rounded-full -mr-32 -mt-32"></div>
              <div className="relative">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-[#b87333]/10 rounded-full mb-4 sm:mb-6">
                    <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[#b87333]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1C1C1C] mb-4">
                    Request a Quote
                  </h2>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-5 sm:p-6 rounded-xl mb-6 max-w-2xl mx-auto">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            !
                          </span>
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-amber-900 text-left leading-relaxed">
                        <strong className="font-semibold">Important:</strong>{" "}
                        Quote requests are exclusively available to GOAT
                        Mastermind members. If you&apos;re not yet a member,
                        please register for our workshop first or contact us to
                        learn more about membership.
                      </p>
                    </div>
                  </div>
                </div>

                {status === "loading" ? (
                  <div className="text-center py-12">
                    <Loader2 className="w-10 h-10 animate-spin text-[#b87333] mx-auto" />
                  </div>
                ) : session?.user ? (
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="text-base sm:text-lg text-[#1C1C1C] font-medium">
                        You&apos;re a GOAT Mastermind Member
                      </p>
                    </div>
                    <p className="text-base sm:text-lg text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
                      As a GOAT Mastermind member, you can request a
                      personalized quote for our services. Get detailed pricing
                      for Writer, Editor, and Videographer services tailored to
                      your business needs.
                    </p>
                    <Link
                      href="/quotation"
                      className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-[#b87333] text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg min-h-[44px]"
                    >
                      Request Quote
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <p className="text-base sm:text-lg text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
                      To request a quote, you need to be a GOAT Mastermind
                      member. Please log in to your account or contact us to
                      learn more about becoming a member.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => router.push("/auth")}
                        className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-[#b87333] text-white rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg min-h-[44px]"
                      >
                        <LogIn className="w-5 h-5" />
                        Login to Request Quote
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Location & Contact Information */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Location */}
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#b87333]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#b87333]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#1C1C1C]">
                    Workshop Location
                  </h2>
                </div>
                <div className="bg-[#FDFBF7] rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] mb-2">
                      Kerala, India
                    </h3>
                    <p className="text-sm sm:text-base text-[#5A5A5A] mb-4">
                      Our workshops are held in premium venues across Kerala,
                      providing a conducive environment for learning and
                      networking. The exact location will be shared upon
                      registration confirmation.
                    </p>
                    <p className="text-sm sm:text-base text-[#5A5A5A]">
                      <span className="font-medium">Venue Details:</span> Will
                      be provided in your confirmation email
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#b87333]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#b87333]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#1C1C1C]">
                    Contact Information
                  </h2>
                </div>
                <div className="bg-[#FDFBF7] rounded-lg sm:rounded-xl border-2 border-[#E8E4DA] p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-[#b87333]" />
                      Email
                    </h3>
                    <a
                      href="mailto:info@goatmastermind.com"
                      className="text-sm sm:text-base text-[#b87333] hover:text-[#9d5f28] transition-colors duration-200 block"
                    >
                      info@goatmastermind.com
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] mb-3 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-[#b87333]" />
                      Phone
                    </h3>
                    <a
                      href="tel:+919876543210"
                      className="text-sm sm:text-base text-[#b87333] hover:text-[#9d5f28] transition-colors duration-200 block"
                    >
                      +91 98765 43210
                    </a>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-[#1C1C1C] mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2 text-sm sm:text-base text-[#5A5A5A]">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                      <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
