import React from 'react';
import './css/Footer.css';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaTwitterSquare, FaYoutube, FaInstagramSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Logo Section */}
      <div className="logo">
        <span className="logo-text">TOTC</span>
        <span className="logo-subtitle">Virtual Class for Zoom</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#my-results">My Results</a>
        <a href="#chatbox">ChatBox</a>
        <a href="#about-us">About Us</a>
        <a href="#contact-us">Contact Us</a>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social">
        <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
          <IoLogoWhatsapp />
        </a>
        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaTwitterSquare />
        </a>
        <a href="mailto:youremail@example.com" target="_blank" rel="noopener noreferrer">
          <IoIosMail />
        </a>
        <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare />
        </a>
      </div>


      {/* Footer Links */}
      <div className="footer-links">
        <a href="#careers">Careers</a>
        <span className="separator">|</span>
        <a href="#privacy">Privacy Policy</a>
        <span className="separator">|</span>
        <a href="#terms">Terms & Conditions</a>
      </div>

      {/* Copyright */}
      <div className="copyright">
        Copyright © {new Date().getFullYear()}
      </div>
    </footer>
  );
};
