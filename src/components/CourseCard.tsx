import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
    id: string;
    thumbnail: string;
    title: string;
    category: 'Beginner' | 'Intermediate' | 'Advanced';
    buyers: number;
    creator: string;
    price: number;
    description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
                                                   id,
                                                   thumbnail,
                                                   title,
                                                   category,
                                                   buyers,
                                                   creator,
                                                   price,
                                                   description,
                                               }) => {
    const navigate = useNavigate();

    return (
        <div className="course-card">
            <img src={thumbnail} alt={title} className="course-thumbnail" />
            <h3>{title}</h3>
            <p>Category: {category}</p>
            <p>Buyers: {buyers}</p>
            <p>Creator: {creator}</p>
            <p>Price: ${price}</p>
            <p className="course-description">{description}</p>
            <button onClick={() => navigate(`/course/${id}`)}>See Course Detail</button>
        </div>
    );
};

export default CourseCard;