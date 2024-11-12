// src/Homepage.tsx
import React from 'react';
import './css/HomePage.css';
import banner from './../../assets/header-mountains-desktop.svg';

import { Footer} from './../../components/common/Footer'

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <section className="hero">
          <h1>"It's wonderful to feel understood finally."</h1>
          <p>If only it took 10 minutes to receive a "surprisingly accurate" description of your programming interests and career path.</p>
          <button className='start-testing-button'>Start Testing Now → </button>
        <div className="illustration">
            <img src={banner} alt="banner"/>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Homepage;