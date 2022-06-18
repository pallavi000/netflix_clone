import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../../node_modules/toastr/build/toastr.css'

function CreateGenre() {
    const[name,setName] = useState('')
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
   

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }
    async function addgenre(e){
        e.preventDefault()
        setIsLoading(true)
        
        
        try {
            const data={
                name
            }
            const response = await axios.post('/genre',data,config)
            console.log(response.data)
            Toastr.success('Genre added')
            setIsLoading(false)

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
    <h2 className='pl-3'>Add Genre</h2>
      <div className='card-body'>
      <form onSubmit={(e)=>addgenre(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Genre Name</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="Genre" required/>
    </div>
    {isLoading?(
      <button type="submit" className="btn btn-start loading-btn" disabled>Submitting..</button>
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

export default CreateGenre