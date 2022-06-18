import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../../node_modules/toastr/build/toastr.css'

function EditGenre(props) {
    const[genre,setGenre] = useState('')
    const[name,setName] = useState('')
    const params = useParams()
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
    


    const config = {
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }
console.log('props',params)
    async function getgenre(){
        try {
            const response = await axios.get('/genre/'+params.id,config)
            setGenre(response.data)
            setName(response.data.name)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    
useEffect(() => {
    getgenre()
}, [])


async function editgenre(e){
e.preventDefault()
setIsLoading(true)
const data={
    name
}
try {
    const response =await  axios.put('/genre/'+params.id,data,config)
    console.log(response.data)  
    Toastr.success('Genre updated successfully.')
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
    <h2 className='pl-3'>Edit Genre</h2>

        <div className='card-body'>
        <form onSubmit={(e)=>editgenre(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Genre Name</label>
      <input type="text" className="form-control color"  defaultValue={genre.name} onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput" placeholder="Example input" required/>
    </div>
    {isLoading?(   <button type="submit" className="btn btn-start loading-btn" disabled>Submitting</button>
        ):(   <button type="submit" className="btn btn-start">Submit</button>
        )}
  </form>
        </div>
    </div>
    </div>
    </div>
  )
}

export default EditGenre