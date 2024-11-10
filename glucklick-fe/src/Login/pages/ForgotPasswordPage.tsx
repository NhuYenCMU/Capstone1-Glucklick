import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        console.log('Forgot Password:', { email });
    };

    return (
        <Container className="container-center">
            <div className="auth-form">
                <h2>Reset Password</h2>
                <p>Enter your email to receive a password reset link.</p>
                <FormGroup>
                    <label>Email Address</label>
                    <Input type="email" placeholder="Enter your Email Address" onChange={(e) => setEmail(e.target.value)} value={email} />
                </FormGroup>
                <Button color="primary" onClick={handleForgotPassword}>Send Reset Link</Button>
            </div>
        </Container>
    );
};

export default ForgotPasswordPage;
