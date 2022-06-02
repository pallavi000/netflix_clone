import React,{useEffect, useLayoutEffect, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


function SignIn(e) {
  const navigate = useNavigate()
  
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')

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

  async function login(e){
    e.preventDefault()
    try {
      const data = {
        email,
        password
      }
      var response = await axios.post('/user/login',data)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      console.log(response.data)
      navigate('/')
      
    } catch (error) {
      console.log(error.messsage)
      console.log('frontend')
    }
  }


  return (
    <div className='login-section'>
        <div className='login-card'>
            <div className='login-title'>Sign In</div>
            <form className='login-form' onSubmit={(e)=>login(e)}>
            <div className='form-group'>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Email or phone number' required/>
            </div>
            <div className='form-group'>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required/>
            </div>
            <button className='btn-login'>Sign In</button>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='remember-me'>Remember me</div>
                <div className='remember-me'>Need help?</div>
            </div>
            </form>

            <div className='learn-more-section'>
                <Link className='new-login' to="/sign-up">New to Netflix?<span> Sign up now.</span></Link>
            </div>
        </div>
    </div>
  )
}


export default SignIn