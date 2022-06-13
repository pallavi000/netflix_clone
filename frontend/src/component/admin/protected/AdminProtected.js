import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminProtected(props) {
  const navigate = useNavigate()

  
async function getadmin(){
  const config={
    headers:{
      'access-token':localStorage.getItem('token')
    }
  }


  try {
    var response = await axios.get('user/admin/',config)
  } catch (error) {
    navigate('/')
    console.log(error.message)
  }
}


useEffect(()=>{
if(localStorage.getItem('token')){
  getadmin()

}else{
  navigate('/')
}
},[props])



  return (
    <Outlet/>
  )
}

export default AdminProtected