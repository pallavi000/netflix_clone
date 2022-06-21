import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../../node_modules/toastr/build/toastr.css'

function EditUser(props) {
    const params = useParams()
    const navigate = useNavigate()


    const[user,setUser] = useState({})
    const[username,setUsername] = useState('')
    const[email,setEmail] = useState('')
    const[isLoading,setIsLoading] = useState(false)



    useEffect(() => {
    getuser()
    }, [])

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    async function getuser(){
        try {
            const response = await axios.get('/user/'+params.id,config)
            setUser(response.data)
            setUsername(response.data.username)
            setEmail(response.data.email)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    async function edituser(e){
        e.preventDefault()
        setIsLoading(true)
        try {
            const data={
                username,
                email
            }
            const response = await axios.put('/user/'+params.id,data,config)
                console.log(response.data)
                Toastr.success('Success','User has been updated')
                setIsLoading(false)
                navigate(-1)
                console.log("hello")
        } catch (error) {
            console.log(error.message)
            console.log(error.request.response)
            Toastr.error(error.request.response)
            setIsLoading(false)  
        }
    }

  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <div className='card'>
        <div className='card-body text-right  d-flex justify-content-between align-items-center'>
        <h2 className='pl-3'>Edit User</h2>
            <button className='btn btn-info' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
    <div className='card py-5 px-3'>
        <div className='card-body'>
        <form onSubmit={(e)=>edituser(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Username</label>
      <input type="text" className="form-control color"  defaultValue={user.username} onChange={(e)=>setUsername(e.target.value)}  id="formGroupExampleInput" placeholder="Username" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Email</label>
      <input type="email" className="form-control color"  defaultValue={user.email} onChange={(e)=>setEmail(e.target.value)}  id="formGroupExampleInput" placeholder="Email" required/>
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

export default EditUser