import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MovieList({movie}) {
    const[isList,setIsList] = useState(movie.is_list)

    const config = {
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    async function addtoList(e,id){
        e.preventDefault()
        try {
            const response = await axios.post('/watchlist/'+id,'',config)
            setIsList(true)
        } catch (error) {
            console.log(error.request.response)
        }
    }

   async function removeFromList(e,id){
        e.preventDefault()
        try {
            const response = await axios.delete('/watchlist/'+id,config)
            setIsList(false)
        } catch (error) {
            console.log(error.request.response)
        }
    }

  return (
    <Link className='col-md-3 col-sm-6 mt-5' to={`/movie-detail/${movie._id}`} >
    <div className='movie-card'>
     <div className='movie-image-container'>
     <div className='movie-image '>
    <img src={movie.image} className='img-fluid'/>
    </div>
    {isList?(
        <div className='movie-rating' onClick={(e)=>removeFromList(e,movie._id)}><i class="fa-solid fa-star"></i> 6.8</div>

    ):(
        <div className='movie-rating' onClick={(e)=>addtoList(e,movie._id)}><i class="fa-regular fa-star"></i> 6.8</div>

    )}
</div>
<div className='movie-name'>{movie.name}</div>
</div>
</Link>
  )
}

export default MovieList