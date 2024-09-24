import { HeroSection } from "../components/sections/HeroSection";
import { RecommendedSection } from "../components/sections/RecommendedSection";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <RecommendedSection message={"Rating"}/>
      <RecommendedSection message={"Released"}/>
    </div>
  );
};
