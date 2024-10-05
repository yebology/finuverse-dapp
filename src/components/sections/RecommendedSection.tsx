import React from "react";
import CourseCard from "../CourseCard";

type RecommendedSectionProps = {
  course: any[]
}

export const RecommendedSection : React.FC<RecommendedSectionProps> = ({ course }) => {
  return (
    <div className="font-poppins my-12 md:px-12">
      <h1 className="font-semibold text-3xl mb-5">
        <span
          style={{
            background: "linear-gradient(45deg, #1f6feb, #22d1ee, #f8f9fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Top{" "}
        </span>
        Picks for You{" "}
      </h1>
      <div className="courses-list flex flex-wrap gap-3 justify-center">
        {course.map((data) => (
          <CourseCard key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
};
