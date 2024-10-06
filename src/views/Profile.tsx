import { useEffect, useState } from "react";
import "../App.css";
import ProfileSection from "../components/ui/profilesection";
import CourseBuy from "../components/ui/recorded-amount-course-buy";
import CourseUploaded from "../components/ui/recorded-amount-course-uploaded";
import CourseFinnished from "../components/ui/recorded-amount-course-finnished";

import profilepicture from "../assets/WhatsApp Image 2024-09-26 at 13.33.09_560b102b.jpg";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { truncate } from "../utils/helper";
import {
  getBoughtCourse,
  getCompletedCourse,
  getUploadedCourse,
} from "../services/course";
import LoadingScreen from "../components/ui/loading-screen";
import CourseCard from "../components/CourseCard";

interface Course {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  section_title: [string, string, string];
  section_description: [string, string, string];
  section_duration: [number, number, number];
  section_video: [File | null, File | null, File | null];
  question_list: [string, string, string];
  answer_list: [string, string, string];
  first_answer_options: [string, string, string, string];
  second_answer_options: [string, string, string, string];
  third_answer_options: [string, string, string, string];
}

export const Profile = () => {
  const [user, setUser] = useState("");
  const [boughtCourse, setBoughtCourse] = useState([]);
  const [uploadedCourse, setUploadedCourse] = useState([]);
  const [finishedCourse, setFinishedCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const wallet = useAnchorWallet();

  const [courses, setCourses] = useState<Course[]>([
    {
      name: "Introduction to Web Development",
      description: "A comprehensive course designed to teach you the basics.",
      price: 5,
      thumbnail: profilepicture,
      section_title: [
        "Getting Started",
        "HTML & CSS Basics",
        "JavaScript Fundamentals",
      ],
      section_description: [
        "Introduction to the tools and setup required.",
        "Learn the foundational structure and styling.",
        "Understand JavaScript fundamentals.",
      ],
      section_duration: [30, 45, 60],
      section_video: [null, null, null],
      question_list: [
        "What is HTML?",
        "How do you style a webpage?",
        "What is a function in JavaScript?",
      ],
      answer_list: [
        "HTML is a markup language.",
        "You style a webpage using CSS.",
        "A function is a block of code designed.",
      ],
      first_answer_options: ["HTML", "CSS", "JavaScript", "Python"],
      second_answer_options: ["CSS", "Bootstrap", "JavaScript", "PHP"],
      third_answer_options: ["Function", "Variable", "Array", "Object"],
    },
    // Add more course objects as needed
  ]);

  const fetchBoughtCourse = async (wallet: AnchorWallet) => {
    const boughtCourse = await getBoughtCourse(wallet);
    console.log("a");
    setBoughtCourse(boughtCourse);
    return true;
  };

  const fetchUploadedCourse = async (wallet: AnchorWallet) => {
    const uploadedCourse = await getUploadedCourse(wallet);
    console.log("a");
    setUploadedCourse(uploadedCourse);
    return true;
  };

  const fetchFinishedCourse = async (wallet: AnchorWallet) => {
    const finishedCourse = await getCompletedCourse(wallet);
    console.log("a");
    setFinishedCourse(finishedCourse);
    return true;
  };

  useEffect(() => {
    const fetchData = async () => {
      const userPubkey = wallet?.publicKey.toString();
      try {
        console.log("b");
        setLoading(true);
        if (userPubkey && wallet) {
          setUser(userPubkey);
          const doneFetchBought = await fetchBoughtCourse(wallet);
          console.log("done");
          const doneFetchUploaded = await fetchUploadedCourse(wallet);
          console.log("don2");
          const doneFetchFinished = await fetchFinishedCourse(wallet);
          console.log("done3");
          if (doneFetchFinished && doneFetchBought && doneFetchUploaded) {
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [wallet]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="font-poppins flex items-center justify-center my-8">
      <div className="rounded-lg flex flex-col">
        <div className="flex flex-col md:flex-row md:items-start mb-8">
          <div className="profile-section border-b border-gray-300 pb-4 flex justify-center mb-4 md:mb-0 md:border-b-0 md:border-r border-gray-300 md:pr-4">
            <ProfileSection
              profilePicture={`https://api.dicebear.com/9.x/adventurer/jpg?seed=${user}`}
              username={truncate(user, 4, 4, 11)}
            />
          </div>

          {/* Right Section for Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:mt-0 md:ml-4 flex-grow">
            <div className="course-card bg-gray-200 rounded-lg p-6 shadow-md">
              <CourseBuy courseCount={loading ? 0 : boughtCourse.length} />
            </div>
            <div className="course-card bg-gray-200 rounded-lg p-6 shadow-md">
              <CourseFinnished
                CourseFinnish={loading ? 0 : finishedCourse.length}
              />
            </div>
            <div className="course-card bg-gray-200 rounded-lg p-6 shadow-md">
              <CourseUploaded
                courseUploaded={loading ? 0 : uploadedCourse.length}
              />
            </div>
          </div>
        </div>
        {uploadedCourse.length > 0 && (
          <div className="my-6">
            <h1
              style={{ color: "#1f6feb" }}
              className="mb-3 font-bold text-2xl"
            >
              Course Uploaded :{" "}
            </h1>
            <div className="grid grid-cols-4 gap-3">
              {uploadedCourse.map((course: any) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        )}
        {boughtCourse.length > 0 && (
          <div className="my-6">
            <h1
              style={{ color: "#1f6feb" }}
              className="mb-3 font-bold text-2xl"
            >
              Course Boughted :{" "}
            </h1>
            <div className="grid grid-cols-4 gap-3">
              {boughtCourse.map((course: any) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
