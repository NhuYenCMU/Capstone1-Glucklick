// CourseCard.tsx
import React from 'react';

interface CourseCardProps {
  imageUrl: string;
  title: string;
  completion: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ imageUrl, title, completion }) => {
  return (
    <div className="course-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <div className="progress-bar">
        <div style={{ width: `${completion}%` }}></div>
      </div>
    </div>
  );
};

export default CourseCard;
