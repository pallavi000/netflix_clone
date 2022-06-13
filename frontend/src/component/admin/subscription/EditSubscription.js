import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditSubscription() {
const[name,setName] = useState('')
const[price,setPrice] = useState('')
const[period,setPeriod] = useState('')
const [plan,setPlan] = useState({})

const params = useParams()
const navigate = useNavigate()

const config={
    headers:{
        'access-token':localStorage.getItem('token')
    }
}

useEffect(()=>{
getPlan()
},[])

  async  function getPlan(){
    try {
        const response = await axios.get('/subscription/'+params.id,config)
        setPlan(response.data)
        setName(response.data.name)
        setPrice(response.data.price)
        setPeriod(response.data.period)
        console.log(response.data)
    } catch (error) {
        
    }
}

async function editPlan(e){
    e.preventDefault()
try {
    const data = {
        name,
        price,
        period
    }
    const response = await axios.put('/subscription/'+params.id,data,config)
    console.log(response.data)

    navigate(-1)
} catch (error) {
    console.log(error.request.response)
}
}


  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <div className='card py-5 px-3'>
    <h2 className='pl-3'>Edit Subscription</h2>
      <div className='card-body'>
      <form onSubmit={(e)=>editPlan(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Name</label>
      <input type="text" className="form-control color"  name="name" defaultValue={plan.name} onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="subscription name" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Price</label>
      <input type="text" className="form-control color"  name="name" defaultValue={plan.price} onChange={(e)=>setPrice(e.target.value)}  id="formGroupExampleInput" placeholder="Enter price" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Period</label>
      <input type="text" className="form-control color"  name="name" defaultValue={plan.period} onChange={(e)=>setPeriod(e.target.value)}  id="formGroupExampleInput" placeholder="enter Subscription duration" required/>
    </div>
   <button type="submit" className="btn btn-primary">Submit</button>
  </form>
      </div>
    </div>
    
    </div>
    </div>
  )
}

export default EditSubscription