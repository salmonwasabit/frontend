import HeroSection from "@/components/HeroSection";
import BrandsSection from "@/components/BrandsSection";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeContactSection from "@/components/HomeContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <BrandsSection />
      <HomeAboutSection />
      <HomeContactSection />
    </div>
  );
}
