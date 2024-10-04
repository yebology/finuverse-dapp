import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/ui/loading-screen";
import { buyCourse, getCourse, getCourseBuyers, getCourseRating, rateCourse } from "../services/course";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

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
  correctAnswer?: string; // Opsional: Jika Anda ingin menambahkan jawaban benar
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
  sections: Section[];
  questions: Question[];
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [loadingBuyer, setLoadingBuyer] = useState(true);
  const [loadingRating, setLoadingRating] = useState(true);
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [loadingRate, setLoadingRate] = useState(false)
  const [score, setScore] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [totalBuyer, setTotalBuyer] = useState(0);
  const [rating, setRating] = useState(0);
  const [rater, setRater] = useState(0)
  const wallet = useAnchorWallet()

  useEffect(() => {
    const fetchTotalRating = async () => {
      if (course && id) {
        try {
          const [accumulateData, totalData] = await getCourseRating(parseInt(id))
          if (accumulateData && totalData) {
            setRating(accumulateData / totalData)
            console.log(accumulateData)
            console.log(totalData)
            setRater(totalData)
          }
        }
        catch (error) {
          console.log(error)
        }
        finally {
          setLoadingRating(false)
        }
      }
    }
    fetchTotalRating()
  }, [id, course])

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

  const handleSubmit = () => {
    if (course) {
      let calculatedScore = 0;
      course.questions.forEach((q) => {
        if (q.correctAnswer && answers[q.id] === q.correctAnswer) {
          calculatedScore += 1;
        }
      });
      setScore(calculatedScore);
      setSubmitted(true);
      alert("Thankyou for your participation!");
    }
  };

  const handleRating = async(rating: number) => {
    if (id) {
      setTimeout(() => {
        setLoadingRate(true);
      }, 10000);
      try {
        await rateCourse(wallet, parseInt(id), rating)
        console.log("done")
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoadingRate(false)
        if (!loadingRate) {
          console.log(loadingRate)
          window.location.reload();
        }
      }
    }
  };

  const handleBuyCourse = async() => {
    if (id) {
      setTimeout(() => {
        setLoadingBuy(true);
      }, 15000);
      try {
        await buyCourse(wallet, parseInt(id))
      }
      catch (error) {
        console.log(error)
      }
      finally {
        setLoadingBuy(false)
      }
      console.log(loadingBuy)
    }
  }

  if (loading || !course || loadingBuyer || loadingRating || loadingBuy || loadingRate) {
    return <LoadingScreen />;
  }

  return (
    <div className="course-detail-page font-poppins">
      <h1 style={{ color: "#1f6feb" }} className="font-bold text-4xl my-8">
        {course.name}
      </h1>
      <img
        src={`https://cdn.prod.website-files.com/5e318ddf83dd66608255c3b6/62b1de2e8e142538f54863b6_What%20is%20course%20design.jpg`}
        alt={course.name}
        className="course-thumbnail"
      />
      <div className="prose">
        <p>{course.description}</p>
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
      <button
      onClick={() => handleBuyCourse()}
      className="buy-button">Buy Course</button>
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
        {/* {course.sections.map((section) => (
          <div key={section.id} className="section">
            <h3 onClick={() => toggleSection(section.id)}>
              {section.title} ({section.duration}){" "}
              {expandedSections.includes(section.id) ? "▲" : "▼"}
            </h3>
            {expandedSections.includes(section.id) && (
              <div className="section-content">
                <video
                  src={section.videoUrl}
                  controls
                  className="w-full h-auto rounded-md"
                />
                <p>{section.description}</p>
              </div>
            )}
          </div>
        ))} */}
      </div>
      <div className="questions-section">
        <h1 className="font-bold text-2xl mb-2">Mini Quiz</h1>
        {/* {course.questions.map((q, index) => (
          <div key={q.id} className="question">
            <p>
              <strong>[{index + 1}]</strong> {q.question}
            </p>
            {q.options.map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleOptionChange(q.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        ))} */}
        {!submitted ? (
          <button
            style={{ backgroundColor: "#1f6feb" }}
            onClick={handleSubmit}
            // disabled={Object.keys(answers).length < course.questions.length}
            className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-primary transition-colors duration-300 disabled:bg-neutralDark disabled:cursor-not-allowed"
          >
            Submit
          </button>
        ) : (
          <div className="results">
            <h3>Hasil Tes Anda:</h3>
            <p>
              Anda menjawab {score} dari {course.questions.length} soal dengan
              benar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
