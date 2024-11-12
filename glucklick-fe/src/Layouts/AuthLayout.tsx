// src/components/AuthLayout.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginImage from '../Login/Image/login.jpg';
import './css/AuthLayout.css';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const location = useLocation();
    const isAuthRoute = ["/login", "/register", "/forgot-password", "/change-password"].includes(location.pathname);

    return (
        <div className="app-container">
            {isAuthRoute && (
                <div className="side-image">
                    <img src={LoginImage} alt="Programming illustration" />
                    <p>Discover your ideal programming path today.</p>
                </div>
            )}
            <div className="form-container">
                {isAuthRoute && (
                    <div className="tabs">
                        <Link to="/login" className={`tab-link ${location.pathname === "/login" ? "active" : ""}`}>Login</Link>
                        <Link to="/register" className={`tab-link ${location.pathname === "/register" ? "active" : ""}`}>Register</Link>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
