import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
    selectedOption?: string;
}

interface CourseDetail {
    id: string;
    thumbnail: string;
    title: string;
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
    const [questions, setQuestions] = useState<Question[]>([]);
    const [userRating, setUserRating] = useState<number>(0); // Mengubah nama state menjadi userRating

    useEffect(() => {
        // Fetch course detail dari API atau data dummy
        const fetchCourseDetail = async () => {
            // Contoh data dummy
            const data: CourseDetail = {
                id: '1',
                thumbnail: 'https://via.placeholder.com/600x300',
                title: 'React for Beginners',
                buyers: 1500,
                description: 'Detailed description of the React course.',
                price: 49.99,
                rating: 4.5,
                ratingCount: 200,
                sections: [
                    {
                        id: 's1',
                        title: 'Introduction',
                        duration: '10:00',
                        videoUrl: 'https://www.example.com/video1',
                        description: 'Introduction to the course.',
                    },
                    // Tambahkan lebih banyak section sesuai kebutuhan
                ],
                questions: [
                    {
                        id: 'q1',
                        question: 'How satisfied are you with this course?',
                        options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'],
                    },
                    // Tambahkan lebih banyak pertanyaan sesuai kebutuhan
                ],
            };
            setCourse(data);
            setQuestions(data.questions);
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
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === questionId ? { ...q, selectedOption: option } : q
            )
        );
    };

    const handleSubmit = () => {
        // Handle submit logic, misalnya mengirim jawaban ke server
        console.log('Submitted Answers:', questions);
        alert('Terima kasih atas feedback Anda!');
    };

    const handleRating = (rating: number) => {
        if (!course) return;

        // Menghitung rating rata-rata baru
        const totalRating = course.rating * course.ratingCount;
        const newRatingCount = course.ratingCount + 1;
        const newRating = (totalRating + rating) / newRatingCount;

        // Update state course dengan rating baru
        setCourse({
            ...course,
            rating: parseFloat(newRating.toFixed(1)),
            ratingCount: newRatingCount,
        });

        // Reset userRating setelah memberikan rating
        setUserRating(0);

        alert('Terima kasih atas rating Anda!');
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="course-detail-page">
            <h1>{course.title}</h1>
            <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
            <p>{course.description}</p>
            <p>Buyers: {course.buyers}</p>
            <p>Price: ${course.price}</p>
            <button className="buy-button">Buy Course</button>
            <div className="rating-section">
                <p>Rating: {course.rating} / 5</p>
                <p>Rated by {course.ratingCount} people</p>
                <div className="user-rating">
                    <p>Rate this course:</p>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${userRating >= star ? 'filled' : ''}`}
                                onClick={() => setUserRating(star)}
                            >
                ★
              </span>
                        ))}
                    </div>
                    {userRating > 0 && (
                        <button onClick={() => handleRating(userRating)}>Submit Rating</button>
                    )}
                </div>
            </div>
            <div className="sections">
                <h2>Course Sections</h2>
                {course.sections.map((section) => (
                    <div key={section.id} className="section">
                        <h3 onClick={() => toggleSection(section.id)}>
                            {section.title} ({section.duration}) {expandedSections.includes(section.id) ? '▲' : '▼'}
                        </h3>
                        {expandedSections.includes(section.id) && (
                            <div className="section-content">
                                <video src={section.videoUrl} controls width="600" />
                                <p>{section.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="questions-section">
                <h2>Feedback</h2>
                {questions.map((q) => (
                    <div key={q.id} className="question">
                        <p>{q.question}</p>
                        {q.options.map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={option}
                                    checked={q.selectedOption === option}
                                    onChange={() => handleOptionChange(q.id, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default CourseDetailPage;