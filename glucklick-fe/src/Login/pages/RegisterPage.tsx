import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import axios from 'axios';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async () => {
        if (!email || !username || !password) {
            setErrorMessage('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                email,
                username,
                password,
            });

            if (response.status === 201) {
                setSuccessMessage('Registration successful! You can now log in.');
                setErrorMessage('');
                setEmail('');
                setUsername('');
                setPassword('');
            }
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Registration failed');
            setSuccessMessage('');
        }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Create Glücklich Account</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
        </Container>
    );
};

export default RegisterPage;
