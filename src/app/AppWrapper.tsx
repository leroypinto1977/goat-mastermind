"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<"home" | "quote">(
    pathname === "/quotation" ? "quote" : "home"
  );

  useEffect(() => {
    if (pathname === "/quotation") {
      setCurrentPage("quote");
    } else {
      setCurrentPage("home");
    }
  }, [pathname]);

  const handleNavigate = (page: "home" | "quote") => {
    setCurrentPage(page);
    if (page === "home") {
      router.push("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }, 0);
    } else if (page === "quote") {
      router.push("/quotation");
    }
  };

  useEffect(() => {
    if (currentPage === "home" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [currentPage, pathname]);

  // Don't show Navbar/Footer on admin routes
  const isAdminRoute =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/studio") ||
    pathname?.startsWith("/auth");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      {(currentPage === "home" || currentPage === "quote") && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      {children}
      <Footer />
    </div>
  );
}
