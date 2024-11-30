import React, { useEffect } from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';
import CanvasBackground from './../../components/Backgrough';
import imageBG from './../../features/image/logo1.png';

const Homepage: React.FC = () => {
  useEffect(() => {
    // Add Font Awesome CDN dynamically
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
      <div className="container-fluid p-0">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <div className="d-flex align-items-center slide-content">
                <div className="text-section">
                  <h1>HỖ TRỢ HỌC LẬP TRÌNH ĐA DẠNG NGÔN NGỮ</h1>
                  <h2>CHO NHỮNG NGƯỜI MỚI BẮT ĐẦU</h2>
                  <p>Thiết kế đặc biệt cho người mới bắt đầu</p>
                  <button className="btn btn-warning">TÌM HIỂU THÊM</button>
                </div>
                <div className="image-section">
                  <img
                    src={imageBG}
                    alt="Programmer"
                    className="main-image"
                  />
                </div>
              </div>
            </div>
  
            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="d-flex align-items-center slide-content">
                <div className="text-section">
                  <h1>HỆ THỐNG KIẾN THỨC VỚI NHỮNG BÀI TEST HIỆU QUẢ</h1>
                  <h2>PHÙ HỢP CHO MỌI ĐỐI TƯỢNG</h2>
                  <p>Tìm kiếm khóa học với giá phù hợp với bạn</p>
                  <button className="btn btn-warning">KHÁM PHÁ NGAY</button>
                </div>
                <div className="image-section">
                  <img
                    src={imageBG}
                    alt="Training"
                    className="main-image"
                  />
                </div>
              </div>
            </div>
          </div>
  
          {/* Nút điều hướng */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className='content'>
          <div className='content-card'>
            <div className="card-header">
              <span>Learn HTML/CSS</span>
            </div>
            <div className="card-body">
              
            </div>
          </div>
          <div className='content-card'>
            <span> Learn OOP</span>
          </div>
          <div className='content-card'>
            <span> Learn Software Architecture </span>
          </div>
        </div>
      </div>
  );
};

export default Homepage;
