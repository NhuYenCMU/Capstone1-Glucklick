import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import RegisterPage from './Login/pages/RegisterPage';
import LoginPage from './Login/pages/LoginPage';
import ForgotPasswordPage from './Login/pages/ForgotPasswordPage';
import Homepage from './features/home/HomePage';

// Layouts
import HomepageLayout from './Layouts/HomepageLayout';
import AuthLayout from './Layouts/AuthLayout';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simulate login function for demonstration purposes
    const handleLogin = () => {
        setIsAuthenticated(true); // Set authentication to true after login
    };

    return (
        <Router>
            <Routes>
                {/* Conditional rendering for homepage based on isAuthenticated */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <HomepageLayout><Homepage /></HomepageLayout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Render authentication pages with the AuthLayout */}
                <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
                <Route path="/login" element={<AuthLayout><LoginPage onLogin={handleLogin} /></AuthLayout>} />
                <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
            </Routes>
        </Router>
    );
};

export default App;
