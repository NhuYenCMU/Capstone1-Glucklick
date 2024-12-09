import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify
interface LoginPageProps {
    onLogin: () => void;
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
            // Lưu token vào localStorage hoặc sessionStorage
            if (rememberMe) {
                localStorage.setItem('token', response.data.token);
            } else {
                sessionStorage.setItem('token', response.data.token);
            }
            toast.success('Login successful!', { theme: "colored" });
            // Đặt callback khi đăng nhập thành công
            onLogin();
            navigate('/');
        }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message, { theme: "colored" });
    }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Welcome to Glücklich..!</h2>
            <p>To ensure the security of your account, please login.</p>
            
            {/* {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} */}
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
            <ToastContainer position="top-right"
              autoClose={3000} // Tự động đóng sau 3 giây
              hideProgressBar={false} // Hiện thanh tiến trình
              newestOnTop={true} // Sắp xếp thông báo mới lên trên
              closeOnClick // Đóng khi nhấp chuột
              rtl={false} // Hỗ trợ hướng từ trái sang phải
              pauseOnFocusLoss // Dừng khi chuyển cửa sổ
              draggable // Cho phép kéo
              pauseOnHover // Dừng khi rê chuột qua
              theme="colored"  />
        </Container>
    );
};

export default LoginPage;
