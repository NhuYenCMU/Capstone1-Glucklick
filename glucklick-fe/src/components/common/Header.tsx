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
                <a className="item" href="#home">Home</a>
                <a className="item" href="#my-results">My Results</a>
                <a className="item" href="#dashboard">Dashboard</a>
                <a className="item" href="#chatbox">ChatBox</a>
                <a className="item" href="#blog">Blog</a>
            </nav>
            <div className="user" ref={dropdownRef}>
                {isAuthenticated ? (
                    <>
                        <img
                            src="logo-user.jpg"
                            alt="User avatar"
                            onClick={toggleDropdown}
                            className="user-avatar"
                        />
                        <span className="username" onClick={toggleDropdown}>Himass</span>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <Link
                                    to="/edit-profile"
                                    className="dropdown-item"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Edit Profile
                                </Link>
                                <Link
                                    to="/change-password"
                                    className="dropdown-item"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Change Password
                                </Link>
                                <button className="auth-button" onClick={onLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-button">
                            Login
                        </Link>
                        <Link to="/register" className="auth-button">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
