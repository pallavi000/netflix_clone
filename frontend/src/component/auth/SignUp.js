import React from 'react'
import {Link} from 'react-router-dom'

function SignUp() {
  return (
    <div className='login-section'>
    <div className='login-card'>
        <div className='login-title'>Sign Up</div>
        <form className='login-form'>
        <div className='form-group'>
        <input type="text" placeholder='Username'/>
        </div>
        <div className='form-group'>
        <input type="text" placeholder='Email or phone number'/>
        </div>
        <div className='form-group'>
        <input type="text" placeholder='Password'/>
        </div>
        <button className='btn-login'>Sign Up</button>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='remember-me'>Remember me</div>
            <div className='remember-me'>Need help?</div>
        </div>
        </form>

        <div className='learn-more-section'>
            <div className='new-login'>Already have an account?<span> Sign In.</span></div>
        </div>
    </div>
</div>
  )
}

export default SignUp