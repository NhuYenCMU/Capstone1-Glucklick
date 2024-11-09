import React from 'react';
import './css/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo">
            <span className="logo-text">GLUCKLICK</span>
            <span className="separator">|</span>
            <span className="logo-subtitle">Virtual Class for Zoom</span>
      </div>
      <div className='nav-links'>
          <a href="#home">Home </a>
          <a href="#my-results">My Results</a>
          <a href="#chatbox">ChatBox</a>
          <a href="#blog">About Us</a>
          <a href="#blog">Contact Us</a>
      </div>
      <div className="footer-social">
        {/* Placeholder for social icons */}
        <div className='social-links'>
        <FontAwesomeIcon icon="coffee" />
        <IoLogoWhatsapp />
        <FaFacebook /> 
        <FaTwitterSquare />
        <IoIosMail />
        <FaYoutube />
        <FaInstagramSquare />
        </div>
        <div className="footer-links">
          <a href="#careers">Careers</a>
          <span className="separator">|</span>
          <a href="#privacy">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="#terms">Terms & Conditions</a>
        </div>
        <div className="copyright">
          Copyright © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}