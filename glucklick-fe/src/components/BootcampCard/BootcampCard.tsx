import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface BootcampCardProps {
  image: string;
  title: string;
  name: string;
  format: string;
  alt: string;
  // link: string; // Thêm thuộc tính link
}

const BootcampCard: React.FC<BootcampCardProps> = ({ image, title, name, format, alt }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    // Điều hướng đến trang khóa học với title làm query parameter
    navigate(`/Recomandcourse?title=${title}`);
  };


  return (
    <div className="card" onClick={handleImageClick}>
      <div className="overlay"></div>
      <img src={image} alt={alt}  />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{name}</p>
        <p>{format}</p>
      </div>
    </div>
  );
};

export default BootcampCard;
