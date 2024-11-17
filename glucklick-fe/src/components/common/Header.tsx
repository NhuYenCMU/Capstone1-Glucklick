import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

interface HeaderProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo-header">GLUCKLICH</div>
            <nav className="nav">
                <Link className="item" to="/">Home</Link>
                <Link to="/my-results">My Results</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/chatbox">ChatBox</Link>
                <Link to="/blog">Blog</Link>
            </nav>
            <div className="user-section" ref={dropdownRef}>
                {isAuthenticated ? (
                    <div className="user" onClick={toggleDropdown}>
                        <img src="logo-user.jpg" alt="User avatar" />
                        <span className="username">Himass</span>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link to="/edit-profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Edit Profile</Link>
                                <Link to="/change-password" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>Change Password</Link>
                                <button className="dropdown-item" onClick={onLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-button">Login</Link>
                        <Link to="/register" className="auth-button">Register</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
