import React from 'react';
import './css/Header.css';

export const Header: React.FC = () => {
  return (
      <header className="header">
        <div className='logo-header'>GLUCKLICK</div>
        <nav className="nav">
          <a className='item' href="#home">Home</a>
          <a href="#my-results">My Results</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#chatbox">ChatBox</a>
          <a href="#blog">Blog</a>
        </nav>
        <div className="user">
          <img src="logo-user.jpg" alt="User avatar" />
          <a href="#name" className="username">Himass</a>
        </div>
      </header>
  );
};