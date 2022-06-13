import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function UserProtected(props) {
   const navigate = useNavigate()

   async function getUser() {

    // if(data.plan=="free"){
    //   navigate('/subscription')
    // }
   }
   
    useEffect(()=>{
        if(localStorage.getItem('token')){
          try {
            var data = JSON.parse(localStorage.getItem('user'))
            if(data.plan=="free"){
              navigate('/subscription')
            }
          } catch (error) {
          }

          getUser()
          
        }else{
            navigate('/')
        }

    },[props])
  return (
    <>

        <Outlet/>
    </>
  )
}

export default UserProtected