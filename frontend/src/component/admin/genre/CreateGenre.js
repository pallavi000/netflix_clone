import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateGenre() {
    const[name,setName] = useState('')
    const navigate = useNavigate()
   

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }
    async function addgenre(e){
        e.preventDefault()
        try {
            const data={
                name
            }
            const response = await axios.post('/genre',data,config)
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
    <h2 className='pl-3'>Add Genre</h2>
      <div className='card-body'>
      <form onSubmit={(e)=>addgenre(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Genre Name</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="Genre" required/>
    </div>
   <button type="submit" className="btn btn-primary">Submit</button>
  </form>
      </div>
    </div>
    
    </div>
    </div>
  )
}

export default CreateGenre