import { useNavigate } from "react-router-dom";
import Recomandcourse from "./RecommendCourse";
import "./RecommendCourse.css";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RecommendCourseInfo: React.FC = () => {
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const title = queryParams.get('title');

  useEffect(() => {
    const fetchCourse = async () => {
    
      if (!title) return;

      try {
        const response = await fetch(
          `http://localhost:8080/api/courses/search?keyword=${title}`
        );
        const data = await response.json();
        setCourseData(data); // Lấy course đầu tiên (hoặc tùy chỉnh logic)
        setLoading(false);
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [title]);

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  if (!courseData) {
    return <p>Không tìm thấy khóa học.</p>;
  }
  const handleCardClick = (link: string) => {
    if (link.startsWith('http')) {
      // Nếu link là URL đầy đủ, điều hướng bằng window.location.href
      window.location.href = link;
    } else {
      // Nếu link là đường dẫn nội bộ, dùng navigate
      navigate(link);
    }
  };

  return (
    <div className="course-container">
      {courseData.map((course, index) => (
        <div key={index} onClick={() => handleCardClick(course.link)}>
          <Recomandcourse
            imageUrl={"https://storage.googleapis.com/a1aa/image/py0nofWwsfvByEfSfdBnh0ZUdQ0xW1wMuLm7efIe78oeP5penA.jpg"}
            title={course.courseName}
            platform={course.description}
            rating={course.rating}
          />
        </div>
      ))}
    </div>
  );
};

export default RecommendCourseInfo;