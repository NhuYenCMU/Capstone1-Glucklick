import React, { useState } from 'react';
import { Button, FormGroup, Input, Container, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomAlert_Error from '../../components/CustomAlert';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
      if (!username || !password) {
        setErrorMessage('Please enter both username and password');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            username,
            password
        });

        if (response.data.token) {
            // Lưu token vào localStorage hoặc sessionStorage
            if (rememberMe) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }

            // Đặt callback khi đăng nhập thành công
            onLogin();
            navigate('/');
        }
    } catch (error: any) {
        setErrorMessage(error.response?.data?.message || 'Incorrect username or password');
    }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Welcome to Glücklich..!</h2>
            <p>To ensure the security of your account, please login.</p>
            {errorMessage && (
                <CustomAlert_Error
                    message={errorMessage}
                    color="danger"
                    onClose={() => setErrorMessage('')}
                />
            )}
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
            <Button color="primary" block onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default LoginPage;
