import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { buyCourse, completeCourse, getBoughtCourse, getCompletedCourse, getCourse, getCourseRating, rateCourse } from "../services/course";

export const Fetch = () => {
  const wallet = useAnchorWallet();

  // done
  const fetchCourse = async () => {
    await getCourse();
  };

  const handleRate = async () => {
    await rateCourse(wallet, 1727353151, 4)
  };

  const fetchRate = async () => {
    await getCourseRating(1727353151)
  }

  const handleComplete = async () => {
    await completeCourse(wallet, 1727353151, 3)
  };

  const handleBuy = async () => {
    await buyCourse(wallet, 1727413318)
  };

  const fetchBuy = async () => {
    await getBoughtCourse(wallet)
  }

  const fetchComplete = async () => {
    await getCompletedCourse(wallet);
  }

  return (
    <div className="flex flex-col">
      <button className="bg-green-600 " onClick={() => fetchCourse()}>fetch course</button>
      <button className="bg-red-600" onClick={() => handleRate()}>rate course</button>
      <button className="bg-yellow-600" onClick={() => fetchRate()}>fetch rate</button>
      <button className="bg-blue-600" onClick={() => handleComplete()}>complete course</button>
      <button className="bg-pink-600" onClick={() => fetchComplete()}>fetch complete</button>
      <button className="bg-indigo-600" onClick={() => handleBuy()}>buy course</button>
      <button className="bg-violet-600" onClick={() => fetchBuy()}>fetch buy</button>
    </div>
  );
};
