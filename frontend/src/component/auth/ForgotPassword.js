import axios from 'axios'
import React, { useState } from 'react'

function ForgotPassword() {
    const[email,setEmail] = useState([])

    async function forgotpassword(e){
        e.preventDefault()
        try {
            const data={
                email
            }
            var response = await axios.post('/user/forgot/password',data)
            console.log(response.data)
        } catch (error) {
            console.log(error.request.response)
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
            <button className='btn-login'>Submit</button>
            </form>
           
        </div>
    </div>
  )
}

export default ForgotPassword