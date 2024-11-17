import React from 'react';
import './css/HomePage.css';
import { Footer } from './../../components/common/Footer';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <section className="hero">
        {/* Floating Text Background */}
        <div className="text-background">
          <div className="text">JavaScript</div>
          <div className="text">Python</div>
          <div className="text">Java</div>
          <div className="text">C#</div>
          <div className="text">Ruby</div>
          <div className="text">TypeScript</div>
          <div className="text">SQL</div>
          <div className="text">Swift</div>
          <div className="text">PHP</div>
        </div>
        {/* Main Content */}
        <h1>"It's wonderful to feel understood finally."</h1>
        <p>If only it took 10 minutes to receive a "surprisingly accurate" description of your programming interests and career path.</p>
        <button className="start-testing-button">Start Testing Now → </button>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
