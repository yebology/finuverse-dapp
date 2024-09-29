import React from 'react';
import { motion } from 'framer-motion';

// Define the Course type
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
interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <>
     <motion.h2
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         layout
         className="text-2xl font-bold mt-2 text-blue-400">
            Course Created
            </motion.h2>
    <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {courses.map((course, index) => (
        <motion.div 
          key={index}
          className="course-item flex items-center p-4 rounded-lg bg-gray-100 hover:bg-blue-500 transition-colors duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
        >
          <img 
            src={course.thumbnail} 
            alt={course.name} 
            className="w-16 h-16 object-cover rounded-md mr-4" 
          />
          <span className="font-semibold text-gray-800 hover:text-white">
            {course.name}
          </span>
        </motion.div>
      ))}
    </div>
    </>
  );
};

export default CourseList;
