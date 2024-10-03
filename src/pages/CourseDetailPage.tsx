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
    correctAnswer?: string; // Opsional: Jika Anda ingin menambahkan jawaban benar
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
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [userRating, setUserRating] = useState<number>(0);

    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                // Fetch data dari API atau gunakan data dummy
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
                            question: 'Apa yang dimaksud dengan JSX dalam React?',
                            options: [
                                'Sebuah library untuk manajemen state',
                                'Sintaks JavaScript yang mirip XML',
                                'Framework CSS untuk styling',
                                'Alat untuk testing aplikasi',
                            ],
                            correctAnswer: 'Sintaks JavaScript yang mirip XML', // Opsional
                        },
                        {
                            id: 'q2',
                            question: 'Apa fungsi dari useState dalam React?',
                            options: [
                                'Mengelola side effects',
                                'Mengatur routing aplikasi',
                                'Menangani state lokal dalam komponen',
                                'Membuat elemen virtual DOM',
                            ],
                            correctAnswer: 'Menangani state lokal dalam komponen', // Opsional
                        },
                        {
                            id: 'q3',
                            question: 'Bagaimana cara mengirim props ke komponen anak?',
                            options: [
                                'Menggunakan state',
                                'Menggunakan context API',
                                'Mengoper props melalui atribut JSX',
                                'Tidak bisa mengirim props ke komponen anak',
                            ],
                            correctAnswer: 'Mengoper props melalui atribut JSX', // Opsional
                        },
                    ],
                };
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course detail:', error);
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
            alert('Terima kasih atas partisipasi Anda!');
        }
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
                <h2>Test Pemahaman</h2>
                {course.questions.map((q, index) => (
                    <div key={q.id} className="question">
                        <p>
                            <strong>Soal {index + 1}:</strong> {q.question}
                        </p>
                        {q.options.map((option) => (
                            <label key={option}>
                                <input
                                    type="radio"
                                    name={q.id}
                                    value={option}
                                    checked={answers[q.id] === option}
                                    onChange={() => handleOptionChange(q.id, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                {!submitted ? (
                    <button onClick={handleSubmit} disabled={Object.keys(answers).length < course.questions.length}>
                        Submit Jawaban
                    </button>
                ) : (
                    <div className="results">
                        <h3>Hasil Tes Anda:</h3>
                        <p>
                            Anda menjawab {score} dari {course.questions.length} soal dengan benar.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseDetailPage;