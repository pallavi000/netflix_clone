import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Account() {
    const[user,setUser] = useState({})

useEffect(()=>{
getUser()
},[])

const config={
    headers:{
        'access-token':localStorage.getItem('token')
    }
}

async function getUser(){
    try {
        const response = await axios.get('/frontend/current/user',config)
            console.log(response.data)
            setUser(response.data)
        
    } catch (error) {
        
    }
}

  return (
    <div className='account-section col-md-9 mx-auto'>
        <div className='account-header'>Account</div>
        <div className='account-detail row'>
            <div className='col-md-3 membership-section-heading'>
                    Membership and Billing
            </div>
            <div className='col-md-9'>
            <div className=' row'>
                <div className='col-md-6 account-section-item'>Username : </div>
                <div className='col-md-6 account-section-item' >{user.username}</div>
            </div>
            <div className=' row'>
                <div className='col-md-6 account-section-item'>Email : </div>
                <div className='col-md-6 account-section-item'>{user.email}</div>
            </div>

            <div className=' row'>
                <div className='col-md-6 account-section-item'>Password : </div>
                <Link className='col-md-6 account-section-link' to='/change-password'>Change Password</Link>
            </div>
            </div>
        </div>

        <div className='account-detail row'>
            <div className='col-md-3 membership-section-heading'>
                    plan detail
            </div>
            <div className='col-md-9 row'>
            {user.plan=="free"?(
                    <>
                    <div className='col-md-6 account-section-item'>No Streaming Plan</div>
                                    <Link className='col-md-6 account-section-link' to=''>Add Streaming Plan</Link>
                    </>
            ):(
                <>
                <div className='col-md-6 account-section-item'>{user.subscription_id?.name}</div>
                <div className='col-md-6 account-section-item' >{user.expire_date}</div>               
                </>
            )}
  
            </div>
        </div>
    </div>
  )
}

export default Account