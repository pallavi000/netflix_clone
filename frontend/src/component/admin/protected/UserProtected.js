import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UserProtected(props) {
    const navigate = useNavigate()
    const CMP = props.CMP
    useEffect(()=>{
        if(localStorage.getItem('token')){
          

        }else{
            props.navigate('/')
        }

    },[props])
  return (
    <>
        <CMP {...props}/>
    </>
  )
}

export default UserProtected