import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'

function SuscriptionIndex() {
    const[subscriptions,setSubscriptions] = useState([])

    useEffect(() => {
    getSubscription()
    }, [])

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

   async function getSubscription(){
        try {
            const response = await axios.get('/frontend/subscription',config)
            console.log(response.data)
            setSubscriptions(response.data)

            setTimeout(()=>{
              $('#myTable').DataTable();
            },1000)
        } catch (error) {
            console.log(error.request.response)
            
        }
    }

    async function distroy(e,id){
      try {
        const response = await axios.delete('/subscription/'+id,config)
        console.log(response.data)
       var newgenre=  subscriptions.filter(gen=>gen._id!=id)
       setSubscriptions(newgenre)
      } catch (error) {
        console.log(error.request.response)
        
      }
    }
    
  return (
    <div className="content-wrapper">
        <div className="container ">
        <Link className="btn btn-secondary float-right mb-2" to='/admin/subscription/create' > Add</Link>

        <div className="table-responsive mt-5">
        <table className="table table-light bg-white table-striped" id ="myTable">
    <thead>
    <tr className="trhead">
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Period</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    
    <tbody>
    {subscriptions.map(sub=>{
        return(

      <tr key={sub._id}>
        <th scope="row">{sub._id}</th>
        <td> {sub.name}</td>
        <td> {sub.price}</td>
        <td> {sub.period}</td>
        <td>
        <Link className="btn btn-primary mr-2" to={`/admin/subscription/edit/${sub._id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={(e)=>distroy(e,sub._id)} >Delete</button>

        </td>
        
      </tr>
     
      )})}
    </tbody>
  
  </table>
    </div>
    </div>
    </div>
  )
}

export default SuscriptionIndex