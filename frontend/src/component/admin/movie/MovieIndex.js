import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
} catch (error) {
  console.log(error.request.response)
}
  }
  
  function distroy(){

  }
  return (
    <div className="content-wrapper">
        <div className="">
        <Link className="btn btn-secondary float-right mb-2" to='/admin/movie/add' > Add</Link>

        <div className="table-responsive mt-5">
        <table>
        <thead>
            <tr className='table-head'>
                <th>Name</th>
                <th>Category</th>
                <th>Popularity/Interest</th>
                <th>Watchlist</th>
                <th>Stareams</th>
                <th>Release Date </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {movies.map(movie=>{
          return(
            <tr class="table-body">
            <td className='row'><img src={movie.image} className='img-fluid table-image'/>{movie.name}</td>
            <td >
            {movie.genre_id.map(genre=>{
              return(
                <div className='table-category-flex'>
                <div className="table-category">{genre.name}</div>
                 </div>
              )
            })}
            </td>
            <td></td>
            <td>2,34,567</td>
            <td>{movie.stream}</td>
            <td>{movie.release_date}</td>
            <td><Link className="table-edit" to={`/admin/movie/edit/${movie._id}`}>Edit</Link></td>
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