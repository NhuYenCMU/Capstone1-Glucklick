import React, { useEffect } from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';
import CanvasBackground from './../../components/Backgrough';
import imageBG from './../../features/image/background.png';


const Homepage: React.FC = () => {
  useEffect(() => {
    // Thêm Font Awesome CDN
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);

    // Dọn dẹp khi component unmount
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="homepage">
      <CanvasBackground />
      <section className="hero">
        <div className="hero-content">
          <h1>"It's wonderful to feel understood finally."</h1>
          <p>If only it took 10 minutes to receive a "surprisingly accurate" description of your programming interests and career path.</p>
          <button className="start-testing-button">Start Testing Now →</button>
        </div>
        <div className="image-container">
          <img src={imageBG}alt="Coding illustration" className="homepage-image" />
        </div>
        <div className="text-background">
          <div className="text"><img src='./public/python.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/java.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/dart.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/angular.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/javascript.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/php.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/sql.png'alt="Coding illustration" className="bg-image"/></div>
          <div className="text"><img src='./public/kotlin.png'alt="Coding illustration" className="bg-image"/></div>
  
        </div> 
      </section>
      <Footer/>
    </div>
  );
};

export default Homepage;