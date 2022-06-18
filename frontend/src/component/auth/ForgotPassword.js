import axios from 'axios'
import React, { useState } from 'react'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

function ForgotPassword() {
    const[email,setEmail] = useState([])
    const[isLoading,setIsLoading] = useState(false)

    async function forgotpassword(e){
        e.preventDefault()
        setIsLoading(true)
        try {
            const data={
                email
            }
            var response = await axios.post('/user/forgot/password',data)
            console.log(response.data)
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
            <div className='login-title'>Forgot Password</div>
            <form className='login-form' onSubmit={(e)=>forgotpassword(e)}>
            <div className='form-group'>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Email or phone number' required/>
            </div>
          {isLoading?(
            <button className='btn-login loading-btn'>Submit</button>

          ):(
            <button className='btn-login'>Submit</button>

          )}
            </form>
           
        </div>
    </div>
  )
}

export default ForgotPassword