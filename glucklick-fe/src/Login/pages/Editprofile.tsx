import React, { useState } from 'react'
import axios from 'axios'
import './css/Editprofile.css'

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    email: '',
    bio: ''
  })

  // Hàm xử lý thay đổi form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Hàm gửi yêu cầu cập nhật đến backend
  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/auth/editUser/${formData.userId}`, {
        username: formData.fullName,
        email: formData.email,
        bio: formData.bio,
        profilePic: '' // Nếu có thêm logic upload ảnh, cập nhật giá trị này
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
                    <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='Maxwell Admin' />
                  </div>
                  <h5 className='user-name'>{formData.fullName || 'Yuki Hayashi'}</h5>
                  <h6 className='user-email'>{formData.email || 'yuki@Maxwell.com'}</h6>
                </div>
                <div className='about'>
                  <h5>About</h5>
                  <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences.</p>
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
                    <input
                      type='text'
                      className='form-control'
                      id='userId'
                      placeholder='Enter user ID'
                      value={formData.userId}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='fullName'
                      placeholder='Enter full name'
                      value={formData.fullName}
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
                      placeholder='Enter email ID'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='bio'>Bio</label>
                    <input
                      type='text'
                      className='form-control'
                      id='bio'
                      placeholder='Enter bio'
                      value={formData.bio}
                      onChange={handleChange}
                    />
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
                          fullName: '',
                          email: '',
                          bio: '',
                          userId: ''
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
