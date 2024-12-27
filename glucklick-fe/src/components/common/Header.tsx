import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/Appcontext'
import './css/Header.css'

const Header: React.FC = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider')
  }

  const { auth, logout } = authContext
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleLogout = async () => {
    await logout()
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className='header'>
      <div className='logo-header' onClick={handleLogoClick}>
        <img src='/Glücklich.png' className='d-block w-100' alt='Logo' />
      </div>
      <nav className='nav'>
        <Link className='item' to='/'>
          Home
        </Link>
        <Link className='item' to='/ResultsPage'>
          My Results
        </Link>
        <Link className='item' to='/dashboard'>
          Dashboard
        </Link>
        <Link className='item' to='/chatbot'>
          ChatBot
        </Link>
        <Link className='item' to='/Mycourses'>
          My Courses
        </Link>
      </nav>
      <div className='user'>
        {auth ? (
          <>
            <img src='logo-user.jpg' alt='User avatar' className='user-avatar' onClick={toggleDropdown} />
            <span className='username' onClick={toggleDropdown}>
              Himass
            </span>
            {isDropdownOpen && (
              <div className='dropdown-menu'>
                <Link to='/EditUser' className='dropdown-item'>
                  Edit Profile
                </Link>
                <Link to='/change-password' className='dropdown-item'>
                  Change Password
                </Link>
                <button className='dropdown-item' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='auth-buttons'>
            <Link to='/login' className='btn'>
              <span className='animation'>Login</span>
            </Link>
            <Link to='/register' className='btn'>
              <span className='animation'>Register</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
