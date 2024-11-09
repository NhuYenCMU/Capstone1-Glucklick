import React from 'react';
import './css/Header.css';

export const Header: React.FC = () => {
  return (
      <header className="header">
        <div className="logo">TOTC</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#my-results">My Results</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#chatbox">ChatBox</a>
          <a href="#blog">Blog</a>
          <div className="user">Lina ▼</div>
        </nav>
      </header>
  );
};