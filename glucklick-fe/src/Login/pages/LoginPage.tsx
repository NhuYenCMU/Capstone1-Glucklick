import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify
import './css/Toast.css';

interface LoginPageProps {
    onLogin: (token: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!username || !password) {
            const message = "Please enter both username and password";
            toast.error(message);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });

            if (response.data.token) {
                // Save token to localStorage or sessionStorage
                if (rememberMe) {
                    localStorage.setItem('token', response.data.token);
                } else {
                    sessionStorage.setItem('token', response.data.token);
                }
                toast.success(response.data.message, { theme: "colored" });
                // Call onLogin callback on successful login
                onLogin(response.data.token);
                navigate('/');
            }
        } catch (error: any) {
            const message = error.response?.data?.message;
            toast.error(message, { theme: "colored" });
        }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Welcome to Glücklich..!</h2>
            <p>To ensure the security of your account, please login.</p>
            
            <FormGroup>
                <label>User name</label>
                <Input
                    type="text"
                    placeholder="Enter your User name"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </FormGroup>
            <FormGroup>
                <label>Password</label>
                <Input
                    type="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </FormGroup>
            <FormGroup className="form-group check">
                <div className="remember-me">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                </div>
<a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
            </FormGroup>
            <Button className="btn" color="primary" block onClick={handleLogin}>Login</Button>
            <ToastContainer 
                position="top-right"
                autoClose={3000} // Auto close after 3 seconds
                hideProgressBar={false} // Show progress bar
                newestOnTop={true} // Show newest notifications on top
                closeOnClick // Close on click
                rtl={false} // Support left-to-right
                pauseOnFocusLoss // Pause on focus loss
                draggable // Allow dragging
                pauseOnHover // Pause on hover
                theme="colored"  
            />
        </Container>
    );
};

export default LoginPage;