import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePasswordPage: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage('New passwords do not match.');
            return;
        }

        try {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (!token) {
                setErrorMessage('You must be logged in to change your password.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5003/api/auth/change-password',
                {
                    oldPassword: currentPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            setSuccessMessage('Password changed successfully.');
            setErrorMessage('');
            setTimeout(() => {
                navigate('/'); // Redirect after successful password change
            }, 2000);
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || 'Failed to change password.');
            setSuccessMessage('');
        }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Change Your Password</h2>
            <p>To keep your account secure, please update your password regularly.</p>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <FormGroup>
                <label>Current Password</label>
                <Input
                    type="password"
                    placeholder="Enter your current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                />
            </FormGroup>
            <FormGroup>
                <label>New Password</label>
                <Input
                    type="password"
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                />
            </FormGroup>
            <FormGroup>
                <label>Confirm New Password</label>
                <Input
                    type="password"
                    placeholder="Confirm your new password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
            </FormGroup>
            <Button color="primary" block onClick={handleChangePassword}>Change Password</Button>
        </Container>
    );
};

export default ChangePasswordPage;