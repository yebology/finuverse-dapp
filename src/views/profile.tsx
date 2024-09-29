import { useEffect, useState } from 'react';
import '../App.css';
import ProfileSection from '../components/ui/profilesection';
import CourseBuy from '../components/ui/recorded-amount-course-buy';
import CourseUploaded from '../components/ui/recorded-amount-course-uploaded';
import CourseFinnished from '../components/ui/recorded-amount-course-finnished';
import CourseList from '../components/ui/profile-my-course';
import CourseBought from '../components/ui/profile-course-buy';

import profilepicture from '../assets/WhatsApp Image 2024-09-26 at 13.33.09_560b102b.jpg';

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

function Profile() {
  const [user, setUser] = useState({
    profilePicture: profilepicture,
    username: 'JohnDoe',
    courseCount: 4,
    courseUploaded: 5,
    courseFinnish: 4,
  });

  const [courses, setCourses] = useState<Course[]>([
    {
      name: 'Introduction to Web Development',
      description: 'A comprehensive course designed to teach you the basics.',
      price: 5,
      thumbnail: profilepicture,
      section_title: ['Getting Started', 'HTML & CSS Basics', 'JavaScript Fundamentals'],
      section_description: [
        'Introduction to the tools and setup required.',
        'Learn the foundational structure and styling.',
        'Understand JavaScript fundamentals.'
      ],
      section_duration: [30, 45, 60],
      section_video: [null, null, null],
      question_list: ['What is HTML?', 'How do you style a webpage?', 'What is a function in JavaScript?'],
      answer_list: ['HTML is a markup language.', 'You style a webpage using CSS.', 'A function is a block of code designed.'],
      first_answer_options: ['HTML', 'CSS', 'JavaScript', 'Python'],
      second_answer_options: ['CSS', 'Bootstrap', 'JavaScript', 'PHP'],
      third_answer_options: ['Function', 'Variable', 'Array', 'Object'],
    },
    // Add more course objects as needed
  ]);

  useEffect(() => {
    console.log('User data loaded', user);
  }, [user]);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-full">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 sm:w-3/5 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-start mb-8">
          <div className="profile-section border-b border-gray-300 pb-4 flex justify-center mb-4 md:mb-0 md:border-b-0 md:border-r border-gray-300 md:pr-4">
            <ProfileSection 
              profilePicture={user.profilePicture} 
              username={user.username} 
            />
          </div>

          {/* Right Section for Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 md:mt-0 md:ml-4 flex-grow">
            <div className="course-card bg-gray-200 rounded-lg p-6 shadow-md">
              <CourseBuy courseCount={user.courseCount} />
            </div>
            <div className="course-card bg-gray-200 rounded-lg p-6 shadow-md">
              <CourseFinnished CourseFinnish={user.courseFinnish} />
            </div>
            <div className="course-card bg-gray-200 rounded-lg p-6 shadow-md">
              <CourseUploaded courseUploaded={user.courseUploaded} />
            </div>
          </div>
        </div>

        {/* Second Row: Course List Below the Stats */}
        <CourseList courses={courses} />
        <CourseBought courses={courses} />
      </div>
    </div>
  );
}

export default Profile;
