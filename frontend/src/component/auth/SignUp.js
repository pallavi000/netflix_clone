import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

function SignUp() {
const[username,setUsername] = useState('')
const[email,setEmail] = useState('')
const[password,setPassword] = useState('')
const[isLoading,setIsLoading] = useState(false)

const navigate = useNavigate()

useEffect(()=>{
setEmail(localStorage.getItem('email'))
},[])

useEffect(() => {
  if(localStorage.getItem('token')){
    try {
     const user = JSON.parse(localStorage.getItem('user'))
       if(user.role=='admin'){
          navigate('/admin/dashboard')
       }else{
         navigate('/')
       }
    } catch (error) {
      navigate('/')
    
    }

  }
 }, [])

async function register(e){
  try {
    e.preventDefault()
    setIsLoading(true)
    const data={
      username,
      email,
      password
    }
    const response = await axios.post('/user/register',data)
    localStorage.setItem("token",response.data.token)
    localStorage.setItem('user',JSON.stringify(response.data.user))
    navigate('/subscription')
    setIsLoading(false)
  } catch (error) {
    console.log(error.request.response)
    Toastr.error(error.request.response)
    setIsLoading(false)
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
        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {isLoading?(
          <button className='btn-login loading-btn'>Sign Up</button>
        ):(
          <button className='btn-login'>Sign Up</button>
        )}
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