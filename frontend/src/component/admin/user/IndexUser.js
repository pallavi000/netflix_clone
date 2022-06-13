import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

function IndexUser() {
    const[users,setUsers] = useState([])

    useEffect(()=>{
        getuser()
    },[])

    const config={
        headers:{
           'access-token':localStorage.getItem('token')
        }
    }

   async function getuser(){
        try {
            const response = await axios.get('/user',config)
            console.log(response.data)
            setUsers(response.data)
            setTimeout(()=>{
              $('#myTable').DataTable();
            },1000)
        } catch (error) {
            
        }
    }
    
  return (
    <div className="content-wrapper">
    <div className="">
    <div className="table-responsive mt-5">
    <table id="myTable">
    <thead>
        <tr className='table-head'>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
    {users.map(user=>{
      return(
        <tr class="table-body">
        <td className='row'>{user.username}</td>
        <td>{user.role}</td>
    
        <td><Link className="table-edit" to={`/admin/user/edit/${user._id}`}>Edit</Link></td>
    </tr>
      )
    })}
   
   

    </tbody>
</table>
</div>
</div>
</div>
  )
}

export default IndexUser