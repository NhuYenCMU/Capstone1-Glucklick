import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        console.log('Register:', { email, username, password });
    };

    return (
        <Container className="auth-form p-4">
            <h2>Create Glücklich Account</h2>
            <FormGroup>
                <label>Email Address</label>
                <Input type="email" placeholder="Enter your Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
            </FormGroup>
            <FormGroup>
                <label>User name</label>
                <Input type="text" placeholder="Enter your User name" onChange={(e) => setUsername(e.target.value)} value={username} />
            </FormGroup>
            <FormGroup>
                <label>Password</label>
                <Input type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </FormGroup>
            <Button color="primary" block onClick={handleRegister}>Register</Button>
        </Container>
    );
};

export default RegisterPage;
