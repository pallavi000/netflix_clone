import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function New() {

    const[movies,setMovies]=useState([])

    useEffect(() => {
     getmovie()
    }, [])
    
    const config = {
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }
  

    async function getmovie(){
        try {
          
            const response = await axios.get('/frontend/new/movies',config)
            console.log(response.data)
            setMovies(response.data)
        } catch (error) {
            console.log(error.request.response)
        }
    }




  return (
    <div className='movies-section'>
        <div className='movie-top-section'>
            <div className='movie-header'>New</div>
            <div className='start-btn-section row mt-3 w-50'>
            <input type="text" className='start-input' placeholder='Email address'></input>
            <button className='btn-start d-flex align-items-center pl-3'>Search <i class="fa-solid fa-angle-right ml-3"></i> </button>
        </div>
        <div className='row movies'>
        {movies.map(movie=>{
            return(
                <Link className='col-md-3 col-sm-6 mt-5' to={`/movie-detail/${movie._id}`} >
                <div className='movie-card'>
                 <div className='movie-image-container'>
                 <div className='movie-image '>
                <img src={movie.image} className='img-fluid'/>
                </div>
                <div className='movie-rating'><i class="fa-regular fa-star"></i> 6.8</div>
            </div>
            <div className='movie-name'>{movie.name}</div>
            </div>
        </Link>
            )
        })}
        
           
        </div>
        </div>
    </div>
  )
}

export default New