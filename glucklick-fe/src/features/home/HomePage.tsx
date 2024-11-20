import React, { useEffect } from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';
import CanvasBackground from './../../components/Backgrough';
import imageBG from './../../features/image/background.png';

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
    <div className="homepage">
      <CanvasBackground />
      <section className="hero">
        <div className="hero-content">
          <h1>"It's wonderful to feel understood finally."</h1>
          <p>If only it took 10 minutes to receive a "surprisingly accurate" description of your programming interests and career path.</p>
          <button className="start-testing-button">Start Testing Now →</button>
        </div>
        <div className="image-container">
          <img src={imageBG} alt="Coding illustration" className="homepage-image" />
        </div>
        <div className="text-background">
          <div className="text"><img src="/python.png" alt="Python" className="bg-image" /></div>
          <div className="text"><img src="/java.png" alt="Java" className="bg-image" /></div>
          <div className="text"><img src="/dart.png" alt="Dart" className="bg-image" /></div>
          <div className="text"><img src="/angular.png" alt="Angular" className="bg-image" /></div>
          <div className="text"><img src="/javascript.png" alt="JavaScript" className="bg-image" /></div>
          <div className="text"><img src="/php.png" alt="PHP" className="bg-image" /></div>
          <div className="text"><img src="/sql.png" alt="SQL" className="bg-image" /></div>
          <div className="text"><img src="/kotlin.png" alt="Kotlin" className="bg-image" /></div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
