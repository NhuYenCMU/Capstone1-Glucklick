import React from 'react';
import './css/Footer.css';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaTwitterSquare, FaYoutube, FaInstagramSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <span className="logo-text">GLUCKLICK</span>
        <span className="separator">|</span>
        <span className="logo-subtitle">Virtual Class for Zoom</span>
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#my-results">My Results</a>
        <a href="#chatbox">ChatBox</a>
        <a href="#about-us">About Us</a>
        <a href="#contact-us">Contact Us</a>
      </div>

      <div className="footer-social">
        <div className="social-links">
          {/* Add links to each social media platform */}
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <IoLogoWhatsapp />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitterSquare />
          </a>
          <a href="mailto:support@example.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <IoIosMail />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagramSquare />
          </a>
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
};
