import React, { useState } from 'react'
import { Button, FormGroup, Input, Container } from 'reactstrap'
import axios from 'axios'

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMessage('Please enter your email')
      return
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/forgot-password', { email })
      setMessage(response.data.message)
      setErrorMessage('')
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset link')
      setMessage('')
    }
  }

  return (
    <Container className='container-center'>
      <div className='auth-form'>
        <h2>Reset Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <FormGroup>
          <label>Email Address</label>
          <Input
            type='email'
            placeholder='Enter your Email Address'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <Button className='btn' color='primary' onClick={handleForgotPassword}>
          Send Reset Link
        </Button>
      </div>
    </Container>
  )
}

export default ForgotPasswordPage
