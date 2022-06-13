import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

function SignUp() {
const[username,setUsername] = useState('')
const[email,setEmail] = useState('')
const[password,setPassword] = useState('')

const navigate = useNavigate()

useEffect(()=>{
setEmail(localStorage.getItem('email'))
},[])

async function register(e){
  try {
    e.preventDefault()
    const data={
      username,
      email,
      password
    }
    const response = await axios.post('/user/register',data)
    console.log(response.data)
    navigate('/sign-in')
  } catch (error) {
    console.log(error.request.response)
  }
 
}

  return (
    <div className='login-section'>
    <div className='login-card'>
        <div className='login-title'>Sign Up</div>
        <form className='login-form' onSubmit={(e)=>register(e)} >
        <div className='form-group'>
        <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className='form-group'>
        <input type="text" placeholder='Email or phone number' defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='form-group'>
        <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button className='btn-login'>Sign Up</button>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='remember-me'>Remember me</div>
            <div className='remember-me'>Need help?</div>
        </div>
        </form>

        <div className='learn-more-section'>
                <Link className='new-login' to="/sign-in">Already have an account?<span> Sign In now.</span></Link>
            </div>
    </div>
</div>
  )
}



export default SignUp