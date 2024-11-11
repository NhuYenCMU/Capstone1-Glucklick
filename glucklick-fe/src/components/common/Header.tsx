import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/login'); // Điều hướng đến trang login
  };
  return (
      <header className="header">
        <div className='logo-header'>GLUCKLICK</div>
        <nav className="nav">
          <a className='item' href="#home">Home</a>
          <a className='item' href="#my-results">My Results</a>
          <a className='item' href="#dashboard">Dashboard</a>
          <a className='item' href="#chatbox">ChatBox</a>
          <a className='item' href="#blog">Blog</a>
        </nav>
        <div className="user" onClick={handleUserClick} style={{ cursor: 'pointer' }}>
          <img src="logo-user.jpg" alt="User avatar" />
          <a href="#name" className="username">Himass</a>
        </div>
      </header>
  );
};