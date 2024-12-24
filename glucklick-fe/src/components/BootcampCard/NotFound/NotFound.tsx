import React from 'react';
import './css/NotFound.css';

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className="error-code">
        404<span>.</span>
      </div>
      <div className="error-message">Oops... Page Not Found</div>
      <div className="error-description">
        Sorry, the page you are trying to open was not found. Please make sure
        the URL you entered is correct.
      </div>
      <a href="/" className="home-button">
        Homepage
      </a>
    </div>
  );
};

export default NotFound;
