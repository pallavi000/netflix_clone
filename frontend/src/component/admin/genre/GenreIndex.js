import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'

function GenreIndex() {
    const [genre,setGenre] = useState([])
    const [is_loader,setIs_loader] = useState(false)
    const config = {
      headers:{
        'access-token':localStorage.getItem('token')
      }
    }

    async function getgenre(){
      setIs_loader(true)
      const response = await axios.get('/genre',config)
      console.log(response.data)
      setGenre(response.data)
      setIs_loader(false)
      setTimeout(()=>{
        $('#myTable').DataTable();
      },1000)
     
    }


    useEffect(() => {
     getgenre()
    }, [])
    

   async function distroy(e,id){
      try {
        const response = await axios.delete('/genre/'+id,config)
        console.log(response.data)
       var newgenre=  genre.filter(gen=>gen._id!=id)
       setGenre(newgenre)
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
        <div className="container ">
        <Link className="btn btn-secondary float-right mb-2" to='/admin/genre/add' > Add</Link>

        <div className="table-responsive mt-5">
        <table className="table table-light bg-white table-striped" id ="myTable">
    <thead>
    <tr className="trhead">
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    
    <tbody>
    {genre.map(gen=>{
        return(

      <tr key={gen._id}>
        <th scope="row">{gen._id}</th>
        <td> {gen.name}</td>
        <td>
        <Link className="btn btn-primary mr-3" to={`/admin/genre/edit-genre/${gen._id}`}>Edit</Link>
        <button className="btn btn-danger" onClick={(e)=>distroy(e,gen._id)} >Delete</button>
        </td>
        
      </tr>
     
      )})}
    </tbody>
  
  </table>
    </div>
    </div>
    </div>
    )
  )
}

export default GenreIndex