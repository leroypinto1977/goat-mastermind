import type { Metadata } from "next";
import { Inter, Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";
import AppWrapper from "./AppWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GOAT Mastermind",
  description:
    "Scale your business faster with proven strategies, expert mentorship, and a community of successful entrepreneurs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <AppWrapper>{children}</AppWrapper>
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
