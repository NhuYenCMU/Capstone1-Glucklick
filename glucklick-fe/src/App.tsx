import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';

// Pages
import RegisterPage from './Login/pages/RegisterPage';
import LoginPage from './Login/pages/LoginPage';
import ForgotPasswordPage from './Login/pages/ForgotPasswordPage';
import Homepage from './features/home/HomePage';
import ChangePasswordPage from './Login/pages/ChangePassword';
// Layouts
import HomepageLayout from './Layouts/HomepageLayout';
import AuthLayout from './Layouts/AuthLayout';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true); // Set authentication to true after login
    };

    const handleLogout = () => {
        setIsAuthenticated(false); // Set authentication to false on logout
    };

    return (
        <Router>
            <InnerApp isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
        </Router>
    );
};

// Separate component to use Router context
const InnerApp: React.FC<{ isAuthenticated: boolean; onLogin: () => void; onLogout: () => void }> = ({
    isAuthenticated,
    onLogin,
    onLogout,
}) => {
    const location = useLocation();
    
    // Array of paths where the Header should be hidden
    const authRoutes = ["/login", "/register", "/forgot-password", "/change-password"];
    const showHeader = !authRoutes.includes(location.pathname);

    return (
        <>
            {showHeader && <Header isAuthenticated={isAuthenticated} onLogout={onLogout} />}
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomepageLayout>
                            <Homepage />
                        </HomepageLayout>
                    }
                />
                <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
                <Route path="/login" element={<AuthLayout><LoginPage onLogin={onLogin} /></AuthLayout>} />
                <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
                <Route path="/change-password" element={<AuthLayout><ChangePasswordPage /></AuthLayout>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

export default App;
