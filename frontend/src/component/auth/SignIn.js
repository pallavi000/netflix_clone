import React,{useEffect,  useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'


function SignIn(e) {
  const navigate = useNavigate()
  
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const[isLoading,setIsLoading] = useState(false)


  const[error,setError] = useState('')

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
    setIsLoading(true)
    try {
      const data = {
        email,
        password
      }
      var response = await axios.post('/user/login',data)
      localStorage.setItem("token",response.data.token)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      console.log(response.data)
      Toastr.success('Success')
      if(response.data.user.role=="admin") {
        navigate('/admin/dashboard')
      }else if(response.data.user.plan=="free"){
        navigate('/subscription')
      }else{
        window.location.href = '/'
      }
      setIsLoading(false)
      
    } catch (error) {
      console.log(error.messsage)
      console.log('frontend')
      setError(error.message)
      setIsLoading(false)
      Toastr.error(error.request.response)

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
            {isLoading?(
              <button className='btn-login loading-btn'>Sign In</button>

            ):(
              <button className='btn-login'>Sign In</button>

            )}
            {/* <div className='d-flex justify-content-between align-items-center'>
                <div className='remember-me'>Remember me</div>
                <div className='remember-me'>Need help?</div>
            </div> */}
            <Link className='forgot-password' to="/forgot-password">
              Forgot Password ?
            </Link>
            </form>
            <div className='learn-more-section'>
                <Link className='new-login' to="/sign-up">New to Netflix?<span> Sign up now.</span></Link>
            </div>
        </div>
    </div>
  )
}


export default SignIn