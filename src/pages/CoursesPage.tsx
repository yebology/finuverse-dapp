import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CourseCard from '../components/CourseCard';
import CategoryFilter from '../components/CategoryFilter';

interface Course {
    id: string;
    thumbnail: string;
    title: string;
    category: 'Beginner' | 'Intermediate' | 'Advanced';
    buyers: number;
    creator: string;
    price: number;
    description: string;
}

const CoursesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        // Fetch courses dari API atau data dummy
        const fetchCourses = async () => {
            // Contoh data dummy
            const data: Course[] = [
                {
                    id: '1',
                    thumbnail: 'https://via.placeholder.com/300x150',
                    title: 'React for Beginners',
                    category: 'Beginner',
                    buyers: 1500,
                    creator: 'John Doe',
                    price: 49.99,
                    description: 'Learn the basics of React.js and build dynamic web applications.',
                },
                {
                    id: '2',
                    thumbnail: 'https://via.placeholder.com/300x150',
                    title: 'Advanced React Patterns',
                    category: 'Advanced',
                    buyers: 800,
                    creator: 'Jane Smith',
                    price: 99.99,
                    description: 'Dive deep into advanced React patterns and techniques.',
                },
                {
                    id: '3',
                    thumbnail: 'https://via.placeholder.com/300x150',
                    title: 'Intermediate React',
                    category: 'Intermediate',
                    buyers: 1200,
                    creator: 'Mike Johnson',
                    price: 69.99,
                    description: 'Enhance your React skills with intermediate concepts and projects.',
                },
                // Tambahkan lebih banyak kursus sesuai kebutuhan
            ];
            setCourses(data);
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="courses-page bg-neutralLight min-h-screen">
            <h1 className="text-3xl font-bold text-primary mb-6 text-center">Courses</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <div className="flex-1 w-full">
                    <SearchBar value={searchTerm} onChange={setSearchTerm} />
                </div>
                <div className="w-full md:w-48">
                    <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
                </div>
            </div>
            <div className="courses-list flex flex-wrap gap-5 justify-center">
                {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                ))}
            </div>
        </div>
    );
};

export default CoursesPage;