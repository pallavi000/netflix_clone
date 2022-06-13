import React from 'react'

function MovieUi({movie}) {
  return (
    <div className='movie-detail-section'>
    <div className='movie-cover-image'>
        <img src={movie.image} className='img-fluid'/>
    </div>
    <div className='movie-title-info'>
        <div className='movie-category-path'>Home / Movies</div>
        <div className='movie-detail-name'>{movie.name}</div>
    </div>
    <div className='movie-description row mt-3'>
    <div className='col-md-6 movie-description-image '>
          <img src={movie.image} className="img-fluid"/>
    </div>
    <div className='movie-full-description col-md-6'>
        <div className='full-detail-title'>Part of the journey is the end.</div>
        <div className='full-detail-paragraph'>{movie.detail}</div>
        <div className='movie-detail-rating'> <i class="fa-regular fa-star"></i> 8.3</div>
        <div className='full-detail-component py-3'>
            <div className='full-detail-type'>Type</div>
            <div className='full-detail-type-info'>{movie.type}</div>
        </div>
        <div className='full-detail-component py-3'>
            <div className='full-detail-type'>Release Time</div>
            <div className='full-detail-type-info'>{movie.release_date}</div>
        </div>
        <div className='full-detail-component py-3'>
            <div className='full-detail-type'>Run time</div>
            <div className='full-detail-type-info'>{movie.duration}</div>
        </div>
        <div className='full-detail-component py-3'>
            <div className='full-detail-type row'>Genre</div>
            {movie.genre_id && movie.genre_id.length!=0?(
              movie.genre_id.map(genre=>{
                return(
                  <div className='full-detail-type-info'>{genre.name}</div>
                )
            })
            ):(                 
              <div className='full-detail-type-info'></div>
                   )}
          
        </div>
    </div>

    </div>
</div>
  )
}

export default MovieUi