import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MovieIndex() {
  const[movies,setMovies] = useState([])

  useEffect(() => {
   getmovies()
  }, [])

 async  function getmovies(){
try {
  const response = await axios.get('/movie')
  console.log(response.data)
} catch (error) {
  console.log(error.request.response)
}
  }
  
  function distroy(){

  }
  return (
    <div className="content-wrapper">
        <div className="container ">
        <Link className="btn btn-secondary float-right mb-2" to='/admin/movie/add' > Add</Link>

        <div className="table-responsive mt-5">
        <table className="table table-light bg-white table-striped" id ="myTable">
    <thead>
    <tr className="trhead">
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Type</th>
        <th scope="col">Genre</th>
        <th scope="col">Duration</th>
        <th scope="col">Release Date</th>
        <th scope="col">Season</th>
        <th scope="col">Episode</th>
        
        <th scope="col">Action</th>
      </tr>
    </thead>
    
    <tbody>
    {movies.map(movie=>{
        return(

      <tr key={movie._id}>
        <th scope="row">{movie._id}</th>
        <td> {movie.image}</td>
        
        <td>
        <Link className="btn btn-primary" to=''>Edit</Link>
        <button className="btn btn-danger" onClick={(e)=>distroy(e)} >Delete</button>
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

export default MovieIndex