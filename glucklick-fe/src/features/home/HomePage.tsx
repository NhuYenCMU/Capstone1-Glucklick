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
    // <div className="homepage">
    //   <CanvasBackground />
    //   <section className="hero">
    //     <div className="hero-content">
    //       <h1>"It's wonderful to feel understood finally."</h1>
    //       <p>If only it took 10 minutes to receive a "surprisingly accurate" description of your programming interests and career path.</p>
    //       <button className="start-testing-button">Start Testing Now →</button>
    //     </div>
    //     <div className="image-container">
    //       <img src={imageBG} alt="Coding illustration" className="homepage-image" />
    //     </div>
    //     {/* <div className="text-background">
    //       <div className="circle-container">
    //       <div className="text"><img src="/python.png" alt="Python" className="bg-image" /></div>
    //       <div className="text"><img src="/java.png" alt="Java" className="bg-image" /></div>
    //       <div className="text"><img src="/dart.png" alt="Dart" className="bg-image" /></div>
    //       <div className="text"><img src="/angular.png" alt="Angular" className="bg-image" /></div>
    //       <div className="text"><img src="/javascript.png" alt="JavaScript" className="bg-image" /></div>
    //       <div className="text"><img src="/php.png" alt="PHP" className="bg-image" /></div>
    //       <div className="text"><img src="/sql.png" alt="SQL" className="bg-image" /></div>
    //       <div className="text"><img src="/kotlin.png" alt="Kotlin" className="bg-image" /></div>
    //       </div>
    //     </div> */}
    //  {/* <div className="text-background">
    //   <div className="text" style={{ position: "absolute", top: "400px", left: "100px" }}>
    //     <img src="/python.png" alt="Python" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "50px", right: "200px" }}>
    //     <img src="/java.png" alt="Java" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "100px", left: "200px" }}>
    //     <img src="/dart.png" alt="Dart" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "150px", right: "300px" }}>
    //     <img src="/angular.png" alt="Angular" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "200px", left: "250px" }}>
    //     <img src="/javascript.png" alt="JavaScript" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "300px", right: "200px" }}>
    //     <img src="/php.png" alt="PHP" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "300px", left: "350px" }}>
    //     <img src="/sql.png" alt="SQL" />
    //   </div>
    //   <div className="text" style={{ position: "absolute", top: "550px", right: "30px" }}>
    //     <img src="/kotlin.png" alt="Kotlin" />
    //   </div>
    // </div> */}
    //   </section>
    //   <Footer />
    // </div>
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
                  <h1>HỌC LẬP TRÌNH KHÔNG GIỚI HẠN</h1>
                  <h2>VỚI GÓI THÀNH VIÊN (SUBSCRIPTION)</h2>
                  <p>Thiết kế đặc biệt cho Sinh viên CNTT</p>
                  <button className="btn btn-warning">TÌM HIỂU THÊM</button>
                </div>
                <div className="image-section">
                  <img
                    src={imageBG}
                    alt="Programmer"
                    className="main-image"
                  />
                  {/* <div className="icons">
                    <img src="/images/code-icon.png" alt="Code Icon" />
                    <img src="/images/gear-icon.png" alt="Gear Icon" />
                    <img src="/images/braces-icon.png" alt="Braces Icon" />
                  </div> */}
                </div>
              </div>
            </div>
  
            {/* Slide 2 */}
            <div className="carousel-item">
              <div className="d-flex align-items-center slide-content">
                <div className="text-section">
                  <h1>HỆ THỐNG ĐÀO TẠO HIỆN ĐẠI</h1>
                  <h2>PHÙ HỢP CHO MỌI ĐỐI TƯỢNG</h2>
                  <p>Học mọi lúc, mọi nơi với chi phí hợp lý</p>
                  <button className="btn btn-warning">KHÁM PHÁ NGAY</button>
                </div>
                <div className="image-section">
                  <img
                    src={imageBG}
                    alt="Training"
                    className="main-image"
                  />
                  <div className="icons">
                    <img src="/images/laptop-icon.png" alt="Laptop Icon" />
                    <img src="/images/document-icon.png" alt="Document Icon" />
                  </div>
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
      </div>
  );
};

export default Homepage;
