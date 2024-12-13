import React, { useEffect } from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';
import CarouselExample from './../../components/carousel';
import BootcampPrograms from '../../components/BootcampCard/BootcampPrograms';

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
    <div className="homepage-container">
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <CarouselExample/>
      </div>
      <BootcampPrograms/>
      <Footer />
    </div>
  );
};

export default Homepage;
