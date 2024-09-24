import React from "react";

type RecommendedSectionProps = {
  message: string;
};

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  message,
}) => {
  return (
    <div className="font-poppins my-12 md:px-12">
      <h1 className="font-semibold text-3xl">
        Based on
        <span
          style={{
            background: "linear-gradient(45deg, #1f6feb, #22d1ee, #f8f9fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {" "}{message}
        </span>
      </h1>
    </div>
  );
};
