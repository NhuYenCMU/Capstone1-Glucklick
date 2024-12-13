import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const handleLogoClick = () => {
        // Chuyển hướng về trang chủ ("/" là đường dẫn trang chính)
        navigate('/');
      };

    return (
        <header className="header">
            <div className="logo-header" onClick={handleLogoClick}>
              <img src="/Glücklich.png" className="d-block w-100" alt="Logo" />
            </div>
            <nav className="nav">
{/* <<<<<<< HEAD */}
                <a className="item" href="/">Home</a>
                <a className="item" href="#my-results">My Results</a>
                <a className="item" href="#dashboard">Dashboard</a>
                <a className="item" href="/chatbot">ChatBot</a>
                <a className="item" href="/Mycourses">My Courses</a>
{/* =======
                <Link className="item" to="/">Home</Link>
                <Link className="item" to="/my-results">My Results</Link>
                <Link className="item" to="/dashboard">Dashboard</Link>
                <Link className="item" to="/chatbox">ChatBox</Link>
                <Link className="item" to="/blog">Blog</Link>
>>>>>>> c98d765 (yen-forgotpassword) */}
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
                    <Link to="/login" className="btn">
                        <span className="animation">Login</span>
                    </Link>
                    <Link to="/register" className="btn">
                        <span className="animation">Register</span>
                    </Link>
                    </div>

                  
                )}
            </div>
        </header>
    );
};

export default Header;
