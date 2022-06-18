import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.css'

function ChnagePassword() {
    const[currentPassword,setCurrentPassword] = useState('')
    const[newPassword,setNewPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')
    const[isLoading,setIsLoading] = useState(false)

    
    const navigate = useNavigate()

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }


    async function changePassword(e){
        setIsLoading(true)
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
            setIsLoading(false)
            Toastr.success('Password changed!')

        } catch (error) {
            console.log(error.request.response)
            Toastr.error(error.request.response)
            setIsLoading(false)
            

            
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
        {isLoading?(
            <button type="submit" className="btn btn-start loading-btn" disabled>Submitting</button>
        ):(
            <button type="submit" className="btn btn-start">Submit</button>
        )}
        </form>
       
    </div>
</div>
  )
}

export default ChnagePassword