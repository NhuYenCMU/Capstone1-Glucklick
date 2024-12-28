import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './css/Editprofile.css'

interface UserProfileProps {
  username: string
  email: string
  avatarUrl: string
  about: string
}

const UserProfile: React.FC<UserProfileProps> = ({ username, email, avatarUrl, about }) => (
  <div className='user-profile'>
    <div className='user-avatar'>
      <img src={avatarUrl} alt={`${username} Avatar`} />
    </div>
    <h5 className='user-name'>{username}</h5>
    <h6 className='user-email'>{email}</h6>
    <div className='about'>
      <h5>About</h5>
      <p>{about}</p>
    </div>
  </div>
)

const EditProfile: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    phone: '',
    website: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token')
        if (!token) {
          throw new Error('Token not found')
        }
        console.log('Token:', token)
        const response = await axios.get('http://localhost:8080/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0'
          }
        })
        console.log('User info:', response.data)
        setUserInfo({
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone || '',
          website: response.data.website || '',
          street: response.data.street || '',
          city: response.data.city || '',
          state: response.data.state || '',
          zip: response.data.zip || ''
        })
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  return (
    <div className='EditProfile'>
      <div className='row gutters'>
        <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12'>
          <div className='card h-100'>
            <div className='card-body'>
              <div className='account-settings'>
                <UserProfile
                  username={userInfo.username}
                  email={userInfo.email}
                  avatarUrl='https://bootdey.com/img/Content/avatar/avatar7.png'
                  about="I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful and human experiences."
                />
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
                    <label htmlFor='fullName'>Full Name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='fullName'
                      placeholder='Enter full name'
                      value={userInfo.username}
                      onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='eMail'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      id='eMail'
                      placeholder='Enter email ID'
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='text'
                      className='form-control'
                      id='phone'
                      placeholder='Enter phone number'
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='website'>Website URL</label>
                    <input
                      type='url'
                      className='form-control'
                      id='website'
                      placeholder='Website url'
                      value={userInfo.website}
                      onChange={(e) => setUserInfo({ ...userInfo, website: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className='row gutters'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <h6 className='mt-3 mb-2 text-primary'>Address</h6>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='Street'>Street</label>
                    <input
                      type='name'
                      className='form-control'
                      id='Street'
                      placeholder='Enter Street'
                      value={userInfo.street}
                      onChange={(e) => setUserInfo({ ...userInfo, street: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='ciTy'>City</label>
                    <input
                      type='name'
                      className='form-control'
                      id='ciTy'
                      placeholder='Enter City'
                      value={userInfo.city}
                      onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='sTate'>State</label>
                    <input
                      type='text'
                      className='form-control'
                      id='sTate'
                      placeholder='Enter State'
                      value={userInfo.state}
                      onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                    />
                  </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'>
                  <div className='form-group'>
                    <label htmlFor='zIp'>Zip Code</label>
                    <input
                      type='text'
                      className='form-control'
                      id='zIp'
                      placeholder='Zip Code'
                      value={userInfo.zip}
                      onChange={(e) => setUserInfo({ ...userInfo, zip: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className='row gutters'>
                <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                  <div className='text-right'>
                    <button type='button' id='submit' name='submit' className='btn btn-secondary'>
                      Cancel
                    </button>
                    <button type='button' id='submit' name='submit' className='btn btn-primary'>
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
};

export default EditProfile;