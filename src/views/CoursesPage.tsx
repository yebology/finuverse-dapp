import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CourseCard from "../components/CourseCard";
import CategoryFilter from "../components/CategoryFilter";
import { getCourse } from "../services/course";
import LoadingScreen from "../components/ui/loading-screen";

interface Course {
  id: string;
  thumbnail: string;
  name: string;
  category: number;
  buyers: number;
  creator: string;
  price: number;
  description: string;
}

const CoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState<Course[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourse();
        setCourses(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (courses) {
      console.log(courses)
      const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.name.toLowerCase()
          .includes(searchTerm.toLowerCase());
          const convertedCategory = course.category === 1 ? 'Beginner' : course.category === 2 ? 'Intermediate' : 'Advanced'
        const matchesCategory =
          selectedCategory === "All" || convertedCategory === selectedCategory;
        return matchesSearch && matchesCategory;
      });
      setFiltered(filteredCourses)
    }
  }, [courses, selectedCategory, searchTerm]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="courses-page font-poppins bg-neutralLight min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Courses
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
        <div className="flex-1 w-full">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="w-full md:w-48">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
      <div className="courses-list flex flex-wrap gap-3 justify-center">
        {filtered.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
