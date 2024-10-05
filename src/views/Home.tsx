import { useEffect, useState } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { RecommendedSection } from "../components/sections/RecommendedSection";
import { getCourse } from "../services/course";
import LoadingScreen from "../components/ui/loading-screen";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [recommendedCouse, setRecommendedCouse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourse();
        if (data) {
          const shuffled = data.sort(() => 0.5 - Math.random());
          const filtered = shuffled.slice(0, 8);
          setRecommendedCouse(filtered)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <HeroSection />
      <RecommendedSection course={recommendedCouse}/>
    </div>
  );
};
