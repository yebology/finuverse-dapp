import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { truncate } from "../utils/helper";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface CourseCardProps {
  id: string;
  thumbnail: string;
  name: string;
  category: number;
  buyers: number;
  creator: string;
  price: number;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  thumbnail,
  name,
  category,
  buyers,
  creator,
  price,
  description,
}) => {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <div className="relative">
        <img
        src={`https://gateway.pinata.cloud/ipfs/${thumbnail}`}
alt={name}
          className="course-thumbnail"
        />
        <div className="absolute p-2 top-0 left-0">
          <div
            className={`${
              category == 1
                ? "bg-yellow-300"
                : category === 2
                ? "bg-blue-300"
                : "bg-red-500"
            } uppercase font-semibold p-1 rounded-md`}
          >
            <h5 className="text-sm text-white">{category == 1 ? 'Beginner' : category == 2 ? 'Intermediate' : 'Advanced'}</h5>
          </div>
        </div>
      </div>
      <h1 style={{ color: "#1f6feb" }} className="font-bold text-md">
        {name}
      </h1>
      <div className="my-1">
        <p className="font-semibold">
          Creator :{" "}
          <span className="font-normal">{truncate(creator, 4, 4, 11)}</span>
        </p>
        <p className="font-semibold">
          Price :{" "}
          <span className="font-normal">
            {price / LAMPORTS_PER_SOL} <span>SOL</span>{" "}
          </span>
        </p>
      </div>
      <button
        style={{ backgroundColor: "#1f6feb" }}
        onClick={() => navigate(`/course/${id}`)}
      >
        See Course Detail
      </button>
    </div>
  );
};

export default CourseCard;
