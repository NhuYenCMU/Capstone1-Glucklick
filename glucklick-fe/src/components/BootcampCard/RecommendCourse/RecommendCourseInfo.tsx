import React from "react";
import { useNavigate } from "react-router-dom";
import Recomandcourse from "./RecommendCourse";
import "./RecommendCourse.css";

const RecommendCourseInfo: React.FC = () => {
  const navigate = useNavigate();

  const courses = [
    {
      imageUrl: "https://storage.googleapis.com/a1aa/image/py0nofWwsfvByEfSfdBnh0ZUdQ0xW1wMuLm7efIe78oeP5penA.jpg",
      title: "Scratch cho người mới bắt đầu",
      platform: "codelearn",
      rating: 4.9,
      link: "/course/scratch",
    },
    { 
      imageUrl: "https://storage.googleapis.com/a1aa/image/py0nofWwsfvByEfSfdBnh0ZUdQ0xW1wMuLm7efIe78oeP5penA.jpg",
      title: "Python cho người mới bắt đầu",
      platform: "codelearn",
      rating: 4.8,
      link: "/course/python",
    },
    // Add more courses as needed
  ];

  const handleCardClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="course-container">
      {courses.map((course, index) => (
        <div key={index} onClick={() => handleCardClick(course.link)}>
          <Recomandcourse
            imageUrl={course.imageUrl}
            title={course.title}
            platform={course.platform}
            rating={course.rating}
          />
        </div>
      ))}
    </div>
  );
};

export default RecommendCourseInfo;