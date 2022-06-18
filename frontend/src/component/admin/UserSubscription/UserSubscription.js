import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function UserSubscription() {
    const[users,setUsers] = useState([])
    const [is_loader,setIs_loader] = useState(false)

    const config={
        headers:{
           'access-token':localStorage.getItem('token')
        }
    }

    useEffect(()=>{
        getuser()
    },[])

   async function getuser(){
        try {
          setIs_loader(true)
            const response = await axios.get('/frontend/user/subscription',config)
            console.log(response.data)
            setUsers(response.data)
            setTimeout(()=>{
              $('#myTable').DataTable();
            },1000)
            setIs_loader(false)
        } catch (error) {
            
        }
    }

    async function distroy(e,id){
        try {
            const response = await axios.delete('/frontend/user/subscription/'+id,config)
            const newUser= users.filter(user=>user._id!=id)
            setUsers(newUser)
            
        } catch (error) {
            console.log(error.request.response)
        }
    }
    

  return (
    is_loader?(
        <Oval
        height="100"
        width="100"
        color='#94142C'
        ariaLabel='loading'
        secondaryColor="#ddd"
      />
      ):(
      <div className="content-wrapper">
      <div className="">
      <div className="table-responsive mt-5">
      <table id="myTable">
      <thead>
          <tr className='table-head'>
              <th>Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Start Date</th>
              <th>Expire Date</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
      {users.map(user=>{
        return(
          <tr class="table-body">
          <td >{user.user_id?.username}</td>
          <td >{user.user_id?.email}</td>
          <td >{user.subscription_id?.name}</td>
          <td>{user.createdAt}</td>
          <td>{user.user_id?.expire_date}</td>
          <td>
          <button className="btn btn-danger" onClick={(e)=>distroy(e,user._id)} >Delete</button>
        </td>
      </tr>
        )
      })}
     
     
  
      </tbody>
  </table>
  </div>
  </div>
  </div>
  )
  )
}

export default UserSubscription