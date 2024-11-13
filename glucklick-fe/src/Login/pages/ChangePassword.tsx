// ChangePasswordPage.tsx
import React, { useState } from 'react';
import { Button, FormGroup, Input, Container } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            // Example: You would replace this console.log with actual logic for changing the password
            console.log('Password changed:', { currentPassword, newPassword });
            navigate('/'); // Redirect to the homepage or any other page after password change
        } else {
            console.log('New passwords do not match');
        }
    };

    return (
        <Container className="auth-form p-4">
            <h2>Change Your Password</h2>
            <p>To keep your account secure, please update your password regularly.</p>
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
