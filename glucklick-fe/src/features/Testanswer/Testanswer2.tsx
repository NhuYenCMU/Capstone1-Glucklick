import React, { useRef } from 'react'; // Importing React and useRef    
import './CSS/Testanswer.css'; // Importing the CSS file for styles
import { Link, useLocation } from 'react-router-dom'; // Importing Link from react-router-dom for navigation
import imageBG from './../../features/image/background.png'; // Importing the background image

export const Testanswer2: React.FC = () => {
  const scrollToRef = useRef<HTMLDivElement | null>(null); // ref for smooth scroll to content section
  const location = useLocation(); // Hook to get the current route path

  return (
    <div ref={scrollToRef} className="app-container2">
      {/* Center content with heading and description */}
      <div className="center-text-container">
        <h2>Find what's right for you</h2>
        <p>Answer 3 quick questions to get recommendations that match your interests.</p>
      </div>

      {/* Content section: Left for buttons and Right for image */}
      <div className="content-container">
        {/* Left container for buttons */}
        <div className="left-container">
          <h3>What do you want to achieve?</h3>
          <div className="tabs">
            {/* Generate 10 buttons dynamically */}
            {Array.from({ length: 10 }, (_, index) => (
              <Link
                to={`/page${index + 1}`}
                key={index}
                className={`tab-button ${location.pathname === `/page${index + 1}` ? 'active' : ''}`}
              >
                Page {index + 1}
              </Link>
            ))}
          </div>
          {/* Skip Personalization Link */}
          <a href="/" className="Skip">Skip personalization</a> 
        </div>

        {/* Right container for image */}
        <div className="right-container">
          <div className="side-image1">
            <img src={imageBG} alt="Programming illustration" />
            <p>People who set a goal are 40% more likely to achieve it.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testanswer2;