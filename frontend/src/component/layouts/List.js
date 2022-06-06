import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function List() {
const[lists,setLists]= useState([])

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    useEffect(() => {
     getWatchlist()
    }, [])


    async function getWatchlist(){
        try {
            const response = await axios.get('/watchlist',config)
            console.log(response.data)
            setLists(response.data)
        } catch (error) {
            console.log(error.request.response)
        }
    }
    

  return (
    <div className='movies-section'>
        <div className='movie-top-section'>
            <div className='movie-header'>My List</div>
            <div className='start-btn-section row mt-3 w-50'>
            <input type="text" className='start-input' placeholder='Email address'></input>
            <button className='btn-start d-flex align-items-center pl-3'>Search <i class="fa-solid fa-angle-right ml-3"></i> </button>
        </div>
        
        <div className='row movies'>
        {lists.map(list=>{
            return(
                <Link className='col-md-3 col-sm-6 mt-5' to="/show-detail">
                <div className='movie-card'>
                 <div className='movie-image-container'>
                 <div className='movie-image '>
                <img src={list.movie_id?.image} className='img-fluid'/>
                </div>
                <div className='movie-rating'><i class="fa-regular fa-star"></i> 6.8</div>
            </div>
            <div className='movie-name'>{list.movie_id.name}</div>
            </div>
        </Link>
            )
        })}
        
           
        </div>
        </div>
    </div>
  )
}

export default List