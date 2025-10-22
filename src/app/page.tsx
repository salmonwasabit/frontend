import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import HomeAboutSection from "@/components/HomeAboutSection";
import HomeContactSection from "@/components/HomeContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <HighlightsSection />
      <HomeAboutSection />
      <HomeContactSection />
    </div>
  );
}
