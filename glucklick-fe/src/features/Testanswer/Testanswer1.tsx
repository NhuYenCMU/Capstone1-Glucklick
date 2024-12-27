import React, { useRef } from 'react'; // Importing React and useRef    
import './CSS/Testanswer.css'; // Importing the CSS file for styles
import imageBG from './../../features/image/background.png'; // Importing the background image

export const Testanswer1: React.FC = () => {
  const scrollToRef = useRef<HTMLDivElement | null>(null); // ref for smooth scroll to content section

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
            <a href="/page2" className="tab-button">Web development</a>
            <a href="/page2" className="tab-button">Data science</a>
            <a href="/page2" className="tab-button">Computer science</a>
            <a href="/page2" className="tab-button">Web design</a>
            <a href="/page2" className="tab-button">Artificial intelligence</a>
            <a href="/page2" className="tab-button">Machine learning</a>
            <a href="/page2" className="tab-button">Game development</a>
            <a href="/page2" className="tab-button">Mobile development</a>
            <a href="/page2" className="tab-button">Data visualization</a>
            <a href="/page2" className="tab-button">Cloud computing</a>
            <a href="/page2" className="tab-button">Cybersecurity</a>
            <a href="/page2" className="tab-button">Not sure yet</a>
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
export default Testanswer1;