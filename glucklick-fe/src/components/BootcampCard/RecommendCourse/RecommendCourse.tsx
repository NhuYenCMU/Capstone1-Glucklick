import React from "react";
import "./RecommendCourse.css";

interface RecommendCourseProps {
  imageUrl: string;
  title: string;
  platform: string;
  rating: number;
}

const RecommendCourse: React.FC<RecommendCourseProps> = ({
  imageUrl,
  title,
  platform,
  rating,
}) => {
  return (
    <div className="course-container">
    <div className="card-recomandcourse">
      <img
        src={imageUrl}
        alt="Scratch for Beginners course image with a cartoon cat and coding blocks"
        className="card-image"
      />
      <div className="card-recomandcourse-content">
        <h3>{title}</h3>
        <p>{platform}</p>
        <div className="rating">
          {Array.from({ length: 5 }).map((_, index) => {
            const isFullStar = rating >= index + 1;
            const isHalfStar = rating > index && rating < index + 1;
            return isFullStar ? (
              <i key={index} className="fas fa-star"></i>
            ) : isHalfStar ? (
              <i key={index} className="fas fa-star-half-alt"></i>
            ) : (
              <i key={index} className="far fa-star"></i>
            );
          })}
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecommendCourse;