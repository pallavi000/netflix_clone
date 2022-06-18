import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../../node_modules/toastr/build/toastr.css'


function CreateSubscription() {
    const[name,setName] = useState('')
    const[price,setPrice] = useState('')
    const[period,setPeriod] = useState('')
    const[isLoading,setIsLoading] = useState(false)


    const navigate = useNavigate(-1)

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    async function addPlan(e){
        try {
            e.preventDefault()
            setIsLoading(true)
            const data={
                name,
                price,
                period
            }
    
            const response = await axios.post('/subscription',data,config)
            console.log(response.data)
            setIsLoading(false)
            Toastr.success('New Subscription has been added')
            
            navigate(-1)
            
        } catch (error) {
            console.log(error.request.response)
            Toastr.error(error.request.response)
            setIsLoading(false)

        }
      
    }


  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <div className='card'>
        <div className='card-body text-right'>
            <button className='btn btn-info' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
    <div className='card py-5 px-3'>
    <h2 className='pl-3'>Add Subscription</h2>
      <div className='card-body'>
      <form onSubmit={(e)=>addPlan(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Name</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="subscription name" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Price</label>
      <input type="number" className="form-control color"  name="name" onChange={(e)=>setPrice(e.target.value)}  id="formGroupExampleInput" placeholder="Enter price" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Period</label>
      <input type="number" className="form-control color"  name="name" onChange={(e)=>setPeriod(e.target.value)}  id="formGroupExampleInput" placeholder="enter Subscription duration" required/>
    </div>
    {isLoading?(
      <button type="submit" className="btn btn-start loading-btn" disabled>Submitting</button>

    ):(
      <button type="submit" className="btn btn-start">Submit</button>

    )}
  </form>
      </div>
    </div>
    
    </div>
    </div>
  )
}

export default CreateSubscription