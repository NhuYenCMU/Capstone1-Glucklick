import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS Toastify
import './css/Toast.css';

const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
  }
  if (!/[A-Z]/.test(password)) {
      return 'Password must include at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
      return 'Password must include at least one lowercase letter.';
  }
  if (!/[0-9]/.test(password)) {
      return 'Password must include at least one number.';
  }
  if (!/[@$!%*?&#]/.test(password)) {
      return 'Password must include at least one special character (@, $, !, %, *, ?, &, or #).';
  }
  return null;
};
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      setEmailError(validateEmail(value) ? '' : 'Invalid email format');
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUsername(value);
      setUsernameError(
          value.trim() === ''
              ? 'Username cannot be empty'
              : value.length < 5
              ? 'Username must be at least 5 characters long'
              : ''
      );
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      setPasswordError(validatePassword(value) || '');
    };

    const handleRegister = async () => {
      // if (!validateEmail(email)) {
      //   setEmailError('Invalid email format');
      //   return;
      // }
        if (!email || !username || !password) {
          const errorMessage =" Please fill in all fields";
          toast.error(errorMessage);
            return;
        }
         // Validate password strength
        // const passwordValidationError = validatePassword(password);
        // if (passwordValidationError) {
        //     setPasswordError(passwordValidationError);
        //     return;
        // }
        setEmailError('');
        setPasswordError(''); // Clear password error if validation passes

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
        <Container className="auth-form p-4" >
            <h2>Create Glücklich Account</h2>
            <FormGroup>
                <label>Email Address</label>
                <Input
                    type="email"
                    placeholder="Enter your Email Address"
                    // onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailError && (
                  <p style={{ color: 'red', fontSize: '12px' }}>
                        {emailError}
                    </p>)}
            </FormGroup>
            <FormGroup>
                <label>User name</label>
                <Input
                    type="text"
                    placeholder="Enter your User name"
                    // onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    onChange={handleUsernameChange}
                />
                {usernameError && <p style={{ color: 'red', fontSize: '12px'  }}>{usernameError}</p>}
            </FormGroup>
            <FormGroup>
                <label>Password</label>
                <Input
                    type="password"
                    placeholder="Enter your Password"
                    // onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && (
                    <p style={{ color: 'red',fontSize: '12px' }}>
                        {passwordError}
                    </p>
                )}
            </FormGroup>
            <Button className="btn" color="primary" block onClick={handleRegister}>Register</Button>
        <ToastContainer /> 
        </Container>
    );
};

export default RegisterPage;
