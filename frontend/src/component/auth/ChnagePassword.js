import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ChnagePassword() {
    const[currentPassword,setCurrentPassword] = useState('')
    const[newPassword,setNewPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    
    const navigate = useNavigate()

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }


    async function changePassword(e){
        e.preventDefault()
        try {
            const data={
                currentPassword,
                newPassword,
                confirmPassword
            }
console.log(data)
            var response = await axios.post('/user/update/password',data,config)
            console.log(response.data)
            navigate('/account')
            
        } catch (error) {
            console.log(error.request.response)
            
        }
       
        
    }

  return (
    <div className='login-section'>
    <div className='login-card'>
        <div className='login-title'>Change Password</div>
        <form className='login-form' onSubmit={(e)=>changePassword(e)}>
        <div className='form-group'>
        <input type="password" onChange={(e)=>setCurrentPassword(e.target.value)} placeholder='Current Password' required/>
        </div>
        <div className='form-group'>
        <input type="password" onChange={(e)=>setNewPassword(e.target.value)} placeholder='New Password' required/>
        </div>
        <div className='form-group'>
        <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='Confirm Password' required/>
        </div>
        <button className='btn-login'>Submit</button>
        </form>
       
    </div>
</div>
  )
}

export default ChnagePassword