import { useEffect, useState } from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { RecommendedSection } from "../components/sections/RecommendedSection";
import { getCourse } from "../services/course";
import LoadingScreen from "../components/ui/loading-screen";

export const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourse()
        if (data) {
          // const filtered = data.filter((course) => course.)
        }
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <HeroSection />
      <RecommendedSection message={"Released"}/>
    </div>
  );
};
