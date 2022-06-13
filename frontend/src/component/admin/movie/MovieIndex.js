import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


import "datatables.net-dt/js/dataTables.dataTables"
// import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'


function MovieIndex() {
  const[movies,setMovies] = useState([])

  useEffect(() => {
   getmovies()
  }, [])

  const config = {
    headers:{
      'access-token':localStorage.getItem('token')
    }
  }

 async  function getmovies(){
try {
  const response = await axios.get('/movie',config)
  console.log(response.data)
  setMovies(response.data)
  setTimeout(()=>{
    $('#myTable').DataTable();
  },1000)

} catch (error) {
  console.log(error.request.response)
}
  }
  
  async function distroy(e,id){
    try {
      const response = await axios.delete('/movie/remove/'+id)
      var newmovie= movies.filter(movie=>movie._id!=id)
      console.log(newmovie)
      setMovies(newmovie)
      console.log('hellooo')
      
    } catch (error) {
      console.log(error.request.response)
    }
  }
  return (
    <div className="content-wrapper">
        <div className="">
        <Link className="btn btn-secondary float-right mb-2" to='/admin/movie/add' > Add</Link>

        <div className="table-responsive mt-5">
        <table id="myTable">
        <thead>
            <tr className='table-head'>
            <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Watchlist</th>
                <th>Stareams</th>
                <th>Release Date </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {movies.map(movie=>{
          return(
            
            <tr class="table-body" key={movie._id}>
            <td className='row image-td'><img src={movie.image} className='img-fluid table-image'/></td>
            <td>{movie.name}</td>
            <td >
            {movie.genre_id.map(genre=>{
              return(
                <div className='table-category-flex'>
                <div className="table-category">{genre.name}</div>
                 </div>
              )
            })}
            </td>
            
            <td>{movie.watchListCount}</td>
            <td>{movie.stream}</td>
            <td>{movie.release_date}</td>

            <td className='d-flex'>
            <Link className="table-edit mr-3" to={`/admin/movie/edit/${movie._id}`}>Edit</Link>
            <button className="btn btn-danger" onClick={(e)=>distroy(e,movie._id)} >Delete</button>
            </td>
            

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

export default MovieIndex