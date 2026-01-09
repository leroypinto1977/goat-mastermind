"use client";

import { useState, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

function AuthPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        toast.error("Login failed");
        return;
      }

      // Get the session to check user details
      const session = await getSession();
      if (session?.user) {
        toast.success("Login successful!");

        // Check if user has temporary password
        if (session.user.isTemporary) {
          router.push("/change-password");
        } else if (session.user.role === "ADMIN") {
          router.push("/admin");
        } else {
          // Redirect to callback URL or home
          router.push(callbackUrl);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#b87333]/10 via-[#b87333]/5 to-[#FAF9F7]">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Logo in top left corner */}
        <div className="p-6 sm:p-8">
          <img
            src="/logos/Main logo.webp"
            alt="GOAT Mastermind Logo"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            loading="eager"
          />
        </div>

        {/* Login Form Container */}
        <div className="flex-1 flex items-start justify-start px-6 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 pb-8">
          <div className="w-full max-w-md">
            {/* Welcome Back Text */}
            <div className="mb-8 sm:mb-10 text-left">
              <p className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1C1C] mb-3 text-left">
                Hello!
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1C1C1C] mb-3 text-left">
                Welcome Back
              </h1>
              <p className="text-base sm:text-lg text-[#5A5A5A] text-left">
                Ready to scale your business to new heights?
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="block text-sm sm:text-base font-medium text-[#1C1C1C]"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A5A5A]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-5 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-base sm:text-lg bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="block text-sm sm:text-base font-medium text-[#1C1C1C]"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A5A5A]" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-5 border border-[#E8E4DA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b87333] focus:border-transparent text-base sm:text-lg bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm text-[#b87333] hover:text-[#9d5f28] transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-[#b87333] text-white rounded-lg text-sm sm:text-base font-medium transition-all duration-300 hover:bg-[#9d5f28] hover:shadow-lg flex items-center justify-center gap-2 min-h-[40px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-left">
              <p className="text-sm text-[#5A5A5A]">
                Don&apos;t have an account?{" "}
                <a
                  href="/contact"
                  className="text-[#b87333] hover:text-[#9d5f28] transition-colors duration-200 font-medium"
                >
                  Contact us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="w-full h-full flex items-center justify-center p-2 md:p-4">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/login/login.jpg"
                alt="Business Growth"
                className="w-full h-full object-cover scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#b87333] mx-auto mb-4" />
            <p className="text-[#5A5A5A]">Loading...</p>
          </div>
        </div>
      }
    >
      <AuthPageContent />
    </Suspense>
  );
}
