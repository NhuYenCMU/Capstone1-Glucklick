import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!email || !username || !password) {
          const errorMessage =" Please fill in all fields";
          toast.error(errorMessage);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                email,
                username,
                password,
            });

            if (response.status === 201) {
                const successMessage= "Registration successful! You can now log in.";
                toast.success(successMessage, { theme: "colored" });
                setEmail('');
                setUsername('');
                setPassword('');
            }
        } catch (error: any) {
          const message = error.response?.data?.message || 'Registration failed';
          toast.error(message, { theme: "colored" }); 
        }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Create Glücklich Account</h2>
            <FormGroup>
                <label>Email Address</label>
                <Input
                    type="email"
                    placeholder="Enter your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </FormGroup>
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
            <Button color="primary" block onClick={handleRegister}>Register</Button>
        <ToastContainer /> 
        </Container>
    );
};

export default RegisterPage;
