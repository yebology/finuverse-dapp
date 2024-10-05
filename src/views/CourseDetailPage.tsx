import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/ui/loading-screen";
import {
  buyCourse,
  completeCourse,
  getCourse,
  getCourseBuyers,
  getCourseRating,
  rateCourse,
} from "../services/course";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { CompleteModal } from "../components/modals/CompleteModal";

interface Section {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
}

interface CourseDetail {
  id: string;
  thumbnail: string;
  name: string;
  buyers: number;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  sectionTitle: [string, string, string];
  sectionDuration: [number, number, number];
  sectionVideo: [string, string, string];
  sectionDescription: [string, string, string];
  questionList: [string, string, string];
  answerList: [string, string, string];
  firstAnswerOptions: [string, string, string, string];
  secondAnswerOptions: [string, string, string, string];
  thirdAnswerOptions: [string, string, string, string];
  sections: Section[];
  questions: Question[];
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [loadingBuyer, setLoadingBuyer] = useState(true);
  const [loadingRating, setLoadingRating] = useState(true);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [loadingRate, setLoadingRate] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingOpenModal, setLoadingOpenModal] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [totalBuyer, setTotalBuyer] = useState(0);
  const [rating, setRating] = useState(0);
  const [rater, setRater] = useState(0);
  const wallet = useAnchorWallet();

  useEffect(() => {
    const fetchTotalRating = async () => {
      if (course && id) {
        try {
          const [accumulateData, totalData] = await getCourseRating(
            parseInt(id)
          );
          if (accumulateData && totalData) {
            setRating(accumulateData / totalData);
            console.log(accumulateData);
            console.log(totalData);
            setRater(totalData);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingRating(false);
        }
      }
    };
    fetchTotalRating();
  }, [id, course]);

  useEffect(() => {
    const fetchTotalBuyer = async () => {
      if (course && id) {
        try {
          const data = await getCourseBuyers(parseInt(id));
          if (data) {
            setTotalBuyer(data.length);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoadingBuyer(false);
        }
      }
    };
    fetchTotalBuyer();
  }, [id, course]);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const data = await getCourse();
        if (data && id) {
          const findCourse = data.find(
            (course: any) => course.id === parseInt(id)
          );
          console.log(findCourse);
          setCourse(findCourse);
        }
      } catch (error) {
        console.error("Error fetching course detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleOptionChange = (questionId: string, option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    if (course && id) {
      console.log(answers);
      console.log(course.answerList);
      let calculatedScore = 0;
      course.answerList.forEach((answer, index) => {
        if (answer == answers[index.toString()]) {
          calculatedScore += 1;
        }
      });
      setLoadingComplete(true);
      try {
        await completeCourse(wallet, parseInt(id), calculatedScore);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingComplete(false);
        if (!loadingComplete) {
          setLoadingOpenModal(true);
        }
      }
      console.log(calculatedScore);
    }
  };

  const handleRating = async (rating: number) => {
    if (id) {
      setLoadingRate(true);
      try {
        await rateCourse(wallet, parseInt(id), rating);
        console.log("done");
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingRate(false);
        if (!loadingRate) {
          console.log(loadingRate);
          window.location.reload();
        }
      }
    }
  };

  const onClose = () => {
    setLoadingOpenModal(false);
  };

  const handleBuyCourse = async () => {
    if (id) {
      try {
        await buyCourse(wallet, parseInt(id));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingBuy(false);
        if (!loadingBuy) {
          console.log(loadingBuy);
          window.location.reload();
        }
      }
      console.log(loadingBuy);
    }
  };

  if (loading || !course || loadingBuyer || loadingRating) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative course-detail-page font-poppins">
      {loadingOpenModal && (
        <CompleteModal
          userAnswer={answers}
          answerList={course.answerList}
          onClose={onClose}
        />
      )}
      <div className={`${loadingOpenModal ? "blur-sm" : ""}`}>
        <h1 style={{ color: "#1f6feb" }} className="font-bold text-4xl my-8">
          {course.name}
        </h1>
        <img
          src={`https://gateway.pinata.cloud/ipfs/${course.thumbnail}`}
          alt={course.name}
          className="course-thumbnail"
        />
        <div className="my-4">
          <h5 className="font-semibold">Course Description : </h5>
          <div className="prose">
            <p>{course.description}</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Buyers : <span className="font-normal">{totalBuyer}</span>
          </p>{" "}
          <p className="font-semibold">
            Price :{" "}
            <span className="font-normal">
              {course.price / LAMPORTS_PER_SOL} SOL
            </span>
          </p>{" "}
        </div>
        <button onClick={() => handleBuyCourse()} className="buy-button">
          Buy Course
        </button>
        <div className="rating-section">
          <p className="font-semibold">Rating : {rating} / 5</p>
          <p className="font-semibold">Rated by {rater} people</p>
          <div className="user-rating">
            <p>Rate this course:</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${userRating >= star ? "filled" : ""}`}
                  onClick={() => setUserRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            {userRating > 0 && (
              <button onClick={() => handleRating(userRating)}>
                Submit Rating
              </button>
            )}
          </div>
        </div>
        <div className="sections">
          <h1 className="font-bold text-2xl mb-2">Course Sections</h1>
          <div className="section">
            <h3 onClick={() => toggleSection("0")}>
              {course.sectionTitle[0]} ({course.sectionDuration[0]} minutes){" "}
              {expandedSections.includes("0") ? "▲" : "▼"}
            </h3>
            {expandedSections.includes("0") && (
              <div className="section-content">
                <video
                  src={`https://gateway.pinata.cloud/ipfs/${course.sectionVideo[0]}`}
                  controls
                  className="w-full h-auto rounded-md my-6"
                />
                <p className="">{course.sectionDescription[0]}</p>
              </div>
            )}
          </div>
          <div className="section">
            <h3 onClick={() => toggleSection("1")}>
              {course.sectionTitle[1]} ({course.sectionDuration[1]} minutes){" "}
              {expandedSections.includes("1") ? "▲" : "▼"}
            </h3>
            {expandedSections.includes("1") && (
              <div className="section-content">
                <video
                  src={`https://gateway.pinata.cloud/ipfs/${course.sectionVideo[1]}`}
                  controls
                  className="w-full h-auto rounded-md my-6"
                />
                <p className="">{course.sectionDescription[1]}</p>
              </div>
            )}
          </div>
          <div className="section">
            <h3 onClick={() => toggleSection("2")}>
              {course.sectionTitle[2]} ({course.sectionDuration[2]} minutes){" "}
              {expandedSections.includes("2") ? "▲" : "▼"}
            </h3>
            {expandedSections.includes("2") && (
              <div className="section-content">
                <video
                  src={`https://gateway.pinata.cloud/ipfs/${course.sectionVideo[2]}`}
                  controls
                  className="w-full h-auto rounded-md my-6"
                />
                <p className="">{course.sectionDescription[2]}</p>
              </div>
            )}
          </div>
        </div>
        <div className="questions-section">
          <h1 className="font-bold text-2xl mb-2">Mini Quiz</h1>
          <div className="question">
            <h5 className="font-semibold">
              <strong>[1]</strong> {course.questionList[0]}
            </h5>
            {course.firstAnswerOptions.map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="first_answerOptions"
                  value={option}
                  onChange={() => handleOptionChange("0", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <div className="question">
            <h5 className="font-semibold">
              <strong>[2]</strong> {course.questionList[1]}
            </h5>
            {course.secondAnswerOptions.map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="second_answerOptions"
                  value={option}
                  onChange={() => handleOptionChange("1", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <div className="question">
            <h5 className="font-semibold">
              <strong>[3]</strong> {course.questionList[2]}
            </h5>
            {course.thirdAnswerOptions.map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="third_answerOptions"
                  value={option}
                  onChange={() => handleOptionChange("2", option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          <button
            style={{ backgroundColor: "#1f6feb" }}
            onClick={handleSubmit}
            className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-primary transition-colors duration-300 disabled:bg-neutralDark disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
