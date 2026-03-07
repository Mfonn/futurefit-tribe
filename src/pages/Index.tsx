import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import BioBarSection from "@/components/BioBarSection";
import LocationSection from "@/components/LocationSection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <BioBarSection />
      <LocationSection />
      <RSVPSection />
      <Footer />
    </div>
  );
};

export default Index;
