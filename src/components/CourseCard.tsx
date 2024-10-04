import React from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  id: string;
  thumbnail: string;
  title: string;
  category: "Beginner" | "Intermediate" | "Advanced";
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
      <p className="font-semibold">Category : <span className="font-normal">{category}</span></p>
      <p className="font-semibold">Buyers : <span className="font-normal">{buyers}</span></p>
      <p className="font-semibold">Creator : <span className="font-normal">{creator}</span></p>
      <p className="font-semibold">Category : <span className="font-normal">{pr}</span></p>
      <p className="course-description line-clamp-2">{description}</p>
      <button style={{'backgroundColor': '#1f6feb'}} onClick={() => navigate(`/course/${id}`)}>
        See Course Detail
      </button>
    </div>
  );
};

export default CourseCard;
