import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers'
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import { tab } from '@testing-library/user-event/dist/tab'
import { getSpaceUntilMaxLength, hasFormSubmit, hasSelectionSupport, isValidInputTimeValue } from '@testing-library/user-event/dist/utils'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import movie1 from '../../images/movie1.png'
import movie2 from '../../images/movie2.png'
import movie3 from '../../images/movie3.png'
import movie4 from '../../images/movie4.png'


function Movies() {
    const[movies,setMovies]=useState([
        movie1,movie2,movie3,movie4, movie1,movie2,movie3,movie4
    ])
  return (
    <div className='movies-section'>
        <div className='movie-top-section'>
            <div className='movie-header'>Movies</div>
            <div className='start-btn-section row mt-3 w-50'>
            <input type="text" className='start-input' placeholder='Email address'></input>
            <button className='btn-start d-flex align-items-center pl-3'>Search <i class="fa-solid fa-angle-right ml-3"></i> </button>
        </div>
        <div className='row movies'>
        {movies.map(movie=>{
            return(
                <Link className='col-md-3 col-sm-6 mt-5' to="/movie-detail" >
                <div className='movie-card'>
                 <div className='movie-image-container'>
                 <div className='movie-image '>
                <img src={movie} className='img-fluid'/>
                </div>
                <div className='movie-rating'><i class="fa-regular fa-star"></i> 6.8</div>
            </div>
            <div className='movie-name'>Black Widow</div>
            </div>
        </Link>
            )
        })}
        
           
        </div>
        </div>
    </div>
  )
}



export default Movies
