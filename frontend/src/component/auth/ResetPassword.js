import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

function ResetPassword() {
    const[newPassword,setNewPassword] = useState('')
    const[confirmPassword,setConfirmPassword] = useState('')  
    
    const location = useLocation()
    var verifyKey= location.search.replace('?code=','')
    const navigate = useNavigate()


    useEffect(() => {
       checkUser()
     
    }, [])

    async function checkUser(){
        try {
            const data={
                verifyKey
            }
            const response = await axios.post('/user/check-user',data)
            console.log(response.data)
            
        } catch (error) {
            console.log(error.request.response)
            navigate('/')
            
        }
    }


    

    async function resetpassword(e){
        try {
            e.preventDefault()
        const data={
            newPassword,
            confirmPassword,
            verifyKey
        }

        var response = await axios.post('/user/change/password',data)
        console.log(response.data)
            
        } catch (error) {
            console.log(error.request.response)
        }
        


    }



  return (
    <div className='login-section'>
    <div className='login-card'>
        <div className='login-title'>Forgot Password</div>
        <form className='login-form' onSubmit={(e)=>resetpassword(e)}>
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

export default ResetPassword