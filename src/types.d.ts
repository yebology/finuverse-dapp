export interface Course {
    id: string;
    thumbnail: string;
    title: string;
    category: 'Beginner' | 'Intermediate' | 'Advanced';
    buyers: number;
    creator: string;
    price: number;
    description: string;
}

export interface Section {
    id: string;
    title: string;
    duration: string;
    videoUrl: string;
    description: string;
}

export interface Question {
    id: string;
    question: string;
    options: string[];
    selectedOption?: string;
}

export interface CourseDetail extends Course {
    description: string;
    rating: number;
    ratingCount: number;
    sections: Section[];
    questions: Question[];
}