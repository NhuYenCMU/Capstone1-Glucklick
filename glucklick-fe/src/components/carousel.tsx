import React from 'react';
import './common/css/Carousel.css';

const CarouselExample: React.FC = () => {
  return (
    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/slide1.png" className="d-block w-100" alt="" />
          <div className="carousel-caption">
            <h5>HELP YOU FIND THE RIGHT PROGAMMING COURSES</h5>
            <a href="/page1" className="btn btn-primary">Get started now</a>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/slide2.png" className="d-block w-100" alt="Slide 2" />
          <div className="carousel-caption2">
            <h5>JOIN THE GLUCKLICK COMMUNITY FOR LEARNING EXCHANGE</h5>
            <a href="https://discord.gg/PJvXjdww" className="btn btn-primary">Join now</a>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/slide3.png" className="d-block w-100" alt="Slide 3" />
          <div className="carousel-caption3">
            <h5>VARIETY OF PROGRAMMING LANGUAGES</h5>
            <a href="#more-info" className="btn btn-primary">More infomation</a>
          </div>
        </div>
      </div>
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
  );
};

export default CarouselExample;
