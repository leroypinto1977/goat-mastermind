import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import StandardsBanner from "@/components/StandardsBanner";
import ProductCategories from "@/components/ProductCategories";
import BestDiamonds from "@/components/BestDiamonds";
import AntwerpCraftsmanship from "@/components/AntwerpCraftsmanship";
import PremiumTestimonials from "@/components/PremiumTestimonials";
import BespokeServices from "@/components/BespokeServices";
import Testimonial from "@/components/Testimonial";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function OldHome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <StandardsBanner />
        <ProductCategories />
        <BestDiamonds />
        <AntwerpCraftsmanship />
        <PremiumTestimonials />
        <BespokeServices />
        <Testimonial />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
