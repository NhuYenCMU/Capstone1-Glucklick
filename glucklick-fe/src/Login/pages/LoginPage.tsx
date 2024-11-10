import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username && password) {
            console.log('Login:', { username, password, rememberMe });
            onLogin();
            navigate('/');
        } else {
            console.log('Please enter both username and password');
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
            <Button color="primary" block onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default LoginPage;
