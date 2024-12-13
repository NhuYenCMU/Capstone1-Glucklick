import React, { useEffect, useRef } from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';
import { Testanswer1 } from '../Testanswer/Testanswer1'; // Correct import
import CarouselExample from './../../components/carousel';

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
    <div className="homepage-container">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <CarouselExample/>
      </div>
      <div ref={scrollToRef}>
        <Testanswer1 />
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
