import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './css/Editprofile.css'

const EditProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>() // Extract userId from URL
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    profilePic: ''
  })

  // Hàm xử lý thay đổi form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Lấy dữ liệu người dùng từ backend khi component được render
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          // Ensure userId exists
          const response = await axios.get(`http://localhost:8080/api/auth/getUser/${userId}`)
          setFormData({
            username: response.data.username,
            email: response.data.email,
            bio: response.data.bio || '', // Ensure bio is set to an empty string if not available
            profilePic: response.data.profilePic || 'https://bootdey.com/img/Content/avatar/avatar7.png' // Default avatar
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
        alert('Failed to fetch user data.')
      }
    }

    if (userId) {
      fetchUserData() // Fetch data when component mounts or userId changes
    }
  }, [userId]) // Trigger effect when userId changes

  // Hàm gửi yêu cầu cập nhật đến backend
  const handleSubmit = async () => {
    try {
      if (!userId) return // Ensure userId exists before submitting

      const response = await axios.put(`http://localhost:8080/api/auth/editUser/${userId}`, {
        username: formData.username,
        email: formData.email,
        bio: formData.bio,
        profilePic: formData.profilePic // If there's logic to upload images, handle it here
      })
      alert('Profile updated successfully!')
      console.log('Updated User:', response.data)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile.')
    }
  }

  return (
    <div className='container'>
      <div className='row gutters'>
        <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='account-settings'>
                <div className='user-profile'>
                  <div className='user-avatar'>
                    <img src={formData.profilePic} alt='User Avatar' />
                  </div>
                  <h5 className='user-name'>{formData.username || 'Username'}</h5>
                  <h6 className='user-email'>{formData.email || 'Email'}</h6>
                </div>
                <div className='about'>
                  <h5>About</h5>
                  <p>{formData.bio || 'No bio available'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='row gutters'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <h6 className='mb-2 text-primary'>Personal Details</h6>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='userId'>User ID</label>
                    <input type='text' className='form-control' id='userId' value={userId} disabled />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                      type='text'
                      className='form-control'
                      id='username'
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='bio'>Bio</label>
                    <input type='text' className='form-control' id='bio' value={formData.bio} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className='row gutters'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='text-right'>
                    <button
                      type='button'
                      id='cancel'
                      name='cancel'
                      className='btn btn-secondary'
                      onClick={() =>
                        setFormData({
                          ...formData,
                          username: '',
                          email: '',
                          bio: '',
                          profilePic: ''
                        })
                      }
                    >
                      Cancel
                    </button>
                    <button type='button' id='submit' name='submit' className='btn btn-primary' onClick={handleSubmit}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
