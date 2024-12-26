import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './css/Header.css'

interface HeaderProps {
  isAuthenticated: boolean
  onLogout: () => void
  username: string
  avatar: string
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout, username, avatar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const navigate = useNavigate()
  const handleLogoClick = () => {
    // Chuyển hướng về trang chủ
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo-header' onClick={handleLogoClick}>
        <img src='/Glücklich.png' className='d-block w-100' alt='Logo' />
      </div>
      <nav className='nav'>
        <a className='item' href='/'>
          Home
        </a>
        <a className='item' href='/ResultsPage'>
          My Results
        </a>
        <a className='item' href='#dashboard'>
          Dashboard
        </a>
        <a className='item' href='/chatbot'>
          ChatBot
        </a>
        <a className='item' href='/Mycourses'>
          My Courses
        </a>
      </nav>
      <div className='user' ref={dropdownRef}>
        {isAuthenticated ? (
          <>
            {/* Hiển thị avatar và username từ props */}
            <img
              src={avatar || 'default-avatar.jpg'}
              alt='User avatar'
              onClick={toggleDropdown}
              className='user-avatar'
            />
            <span className='username' onClick={toggleDropdown}>
              {username || 'User'}
            </span>
            {isDropdownOpen && (
              <div className='dropdown-menu'>
                <Link to='/edit-profile' className='dropdown-item' onClick={() => setIsDropdownOpen(false)}>
                  Edit Profile
                </Link>
                <Link to='/change-password' className='dropdown-item' onClick={() => setIsDropdownOpen(false)}>
                  Change Password
                </Link>
                <button className='auth-button' onClick={onLogout}>
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
