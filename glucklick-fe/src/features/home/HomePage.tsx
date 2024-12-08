import React, { useEffect, useRef } from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';
import { Testanswer1 } from '../Testanswer/Testanswer1'; // Correct import
import CanvasBackground from './../../components/Backgrough';
import imageBG from './../../features/image/background.png';

const Homepage: React.FC = () => {
  const scrollToRef = useRef<HTMLDivElement | null>(null); // ref to scroll to the Testanswer1 section

  // Scroll function to scroll to the specified section when the button is clicked
  const scrollToSection = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
    }
  };

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
          <button className="animated-button" onClick={scrollToSection}>
              <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                />
              </svg>
              <span className="text">Start Testing Now</span>
              <span className="circle"></span>
              <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
                <path
                  d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                />
              </svg>
            </button>

        </div>
        <div className="image-container">
          <img src={imageBG} alt="Coding illustration" className="homepage-image" />
        </div>
        <div className="text-background">
          <div className="text">
            <img src="/python.png" alt="Python" className="bg-image" />
          </div>
          <div className="text">
            <img src="/java.png" alt="Java" className="bg-image" />
          </div>
          <div className="text">
            <img src="/dart.png" alt="Dart" className="bg-image" />
          </div>
          <div className="text">
            <img src="/angular.png" alt="Angular" className="bg-image" />
          </div>
          <div className="text">
            <img src="/javascript.png" alt="JavaScript" className="bg-image" />
          </div>
          <div className="text">
            <img src="/php.png" alt="PHP" className="bg-image" />
          </div>
          <div className="text">
            <img src="/sql.png" alt="SQL" className="bg-image" />
          </div>
          <div className="text">
            <img src="/kotlin.png" alt="Kotlin" className="bg-image" />
          </div>
        </div>
      </section>
      {/* Section that appears when the user clicks the button */}
      <div ref={scrollToRef}>
        <Testanswer1 />
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
