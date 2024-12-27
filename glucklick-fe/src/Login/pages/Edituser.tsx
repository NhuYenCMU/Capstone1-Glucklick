import React from 'react'
import './css/EditUser.css'

const EditUser: React.FC = () => {
  return (
    <div className='container'>
      <div className='card h-100'>
        <div className='user-profile'>
          <div className='user-avatar'>
            <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='User Avatar' />
          </div>
          <h5 className='user-name'>Yuki Hayashi</h5>
          <h6 className='user-email'>yuki@Maxwell.com</h6>
        </div>
        <div className='about'>
          <h5>About</h5>
          <p>I'm Yuki. Full Stack Designer I enjoy creating user-centric, delightful, and human experiences.</p>
        </div>
      </div>

      <div className='card h-100'>
        <div>
          <h6 className='mb-2 text-primary'>Personal Details</h6>
          <div className='row'>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='fullName'>Full Name</label>
                <input type='text' id='fullName' placeholder='Enter full name' />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='eMail'>Email</label>
                <input type='email' id='eMail' placeholder='Enter email ID' />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='phone'>Phone</label>
                <input type='text' id='phone' placeholder='Enter phone number' />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='website'>Website URL</label>
                <input type='url' id='website' placeholder='Website url' />
              </div>
            </div>
          </div>
          <h6 className='mt-3 mb-2 text-primary'>Address</h6>
          <div className='row'>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='Street'>Street</label>
                <input type='text' id='Street' placeholder='Enter Street' />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='ciTy'>City</label>
                <input type='text' id='ciTy' placeholder='Enter City' />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='sTate'>State</label>
                <input type='text' id='sTate' placeholder='Enter State' />
              </div>
            </div>
            <div className='col-6'>
              <div className='form-group'>
                <label htmlFor='zIp'>Zip Code</label>
                <input type='text' id='zIp' placeholder='Zip Code' />
              </div>
            </div>
          </div>
          <div className='text-right'>
            <button type='button' className='btn btn-secondary'>
              Cancel
            </button>
            <button type='button' className='btn btn-primary'>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
