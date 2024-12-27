import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Ensure Bootstrap JS is imported


// Context
import { AuthProvider, AuthContext } from './Context/Appcontext';

// Pages
import RegisterPage from './Login/pages/RegisterPage';
import LoginPage from './Login/pages/LoginPage';
import ForgotPasswordPage from './Login/pages/ForgotPasswordPage';
import Homepage from './features/home/HomePage';
import ChangePasswordPage from './Login/pages/ChangePassword';
// Layouts
import HomepageLayout from './Layouts/HomepageLayout';
import AuthLayout from './Layouts/AuthLayout';
import ChatBotPage from './Layouts/ChatbotLayout';
import Mycourses from './features/Mycourses/Mycourses';
import Testanswer1 from './features/Testanswer/Testanswer1';
import Testanswer2 from './features/Testanswer/Testanswer2';
import Testanswer3 from './features/Testanswer/Testanswer3';
import NotFound from './components/BootcampCard/NotFound/NotFound';
import Recomandcoursein4 from './components/BootcampCard/Recomandcourse/Recomandcoursein4';
import Uploadfile from './components/Uploadfile/Uploadfile';
import ResultsPage from './components/BootcampCard/ResultsPage/ResultsPage';
import CozeChatBubble from './components/CozeBubble/cozeSDK';

const App: React.FC = () => {
    return (
        <Router>
            {/* Thêm bong bóng chat của Coze SDK */}
            <CozeChatBubble />
            <AuthProvider>
                <InnerApp />
            </AuthProvider>
        </Router>
    );
};

const InnerApp: React.FC = () => {
    const location = useLocation();
    const authContext = React.useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { login } = authContext;

    // Array of paths where the Header should be hidden
    const authRoutes = ['/login', '/register', '/forgot-password', '/change-password'];
    const showHeader = !authRoutes.includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <Routes>
                {/* Public homepage */}
                <Route
                    path="/"
                    element={
                        <HomepageLayout>
                            <Homepage />
                        </HomepageLayout>
                    }
                />
                {/* Public routes */}
                <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
                <Route path="/login" element={<AuthLayout><LoginPage onLogin={login} /></AuthLayout>} />
                <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />
                <Route path="/change-password" element={<AuthLayout><ChangePasswordPage /></AuthLayout>} />
                <Route path="/chatbot" element={<ChatBotPage />} />
                <Route path="/Mycourses" element={<Mycourses />} />
                <Route path="/page1" element={<Testanswer1 />} />
                <Route path="/page2" element={<Testanswer2 />} />
                <Route path="/page3" element={<Testanswer3 />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/ResultsPage" element={<ResultsPage />} />
                <Route path="/Recomandcourse" element={<Recomandcoursein4 />} />
                <Route path="/Uploadfile" element={<Uploadfile />} />
                {/* Protected route example */}
                <Route
                    path="/protected"
                    element={
                        <ProtectedRoute>
                            <div>Protected Content</div>
                        </ProtectedRoute>
                    }
                />
                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};

// ProtectedRoute component to handle protected routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authContext = React.useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { auth } = authContext;

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
