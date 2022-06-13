import React from 'react'

function ShowUi({movie}) {
    console.log(movie)
  return (
    <div className='movie-detail-section'>
      <div className='movie-cover-image'>
          <img src={movie.image} className='img-fluid'/>
      </div>
      <div className='movie-title-info'>
          <div className='movie-category-path'>Home &nbsp; / &nbsp; TV Show</div>
          <div className='movie-detail-name'>{movie.name}</div>
      </div>
      <div className='movie-description row mt-3'>
      <div className='col-md-6 movie-description-image '>
            <img src={movie.image} className="img-fluid"/>
      </div>
      <div className='movie-full-description col-md-6'>
          {/* <div className='full-detail-title'>Have You Seen Our Robot?</div> */}
          <div className='full-detail-paragraph'>{movie.detail}</div>
          <div className='movie-detail-rating'> <i class="fa-regular fa-star"></i> 8.3</div>
          <div className='full-detail-component py-3 row'>
          <div className='col-md-6'>
                <div className='full-detail-type'>Type</div>
              <div className='full-detail-type-info'>{movie.type}</div>
          </div>
          <div className='col-md-6'>
                <div className='full-detail-type'>Status</div>
              <div className='full-detail-type-info'>Returning Series</div>
          </div>
             
          </div>
          <div className='full-detail-component py-3 row'>
          <div className='col-md-6'>
              <div className='full-detail-type'>First air date</div>
              <div className='full-detail-type-info'>2019-04-24</div>
              </div>
              <div className='col-md-6'>
              <div className='full-detail-type'>Last air date</div>
              <div className='full-detail-type-info'>2019-04-24</div>
              </div>
          </div>
          <div className='full-detail-component py-3 row'>
          <div className='col-md-6'>
                <div className='full-detail-type'>No. of Seasons</div>
              <div className='full-detail-type-info'>{movie.season_no}</div>
          </div>
          <div className='col-md-6'>
                <div className='full-detail-type'>No. of episodes</div>
              <div className='full-detail-type-info'>{movie.no_of_episode}</div>
          </div>
              
          </div>
          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Episode run time</div>
              <div className='full-detail-type-info'>{movie.duration}</div>
          </div>

          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Genres</div>
              <div className='full-detail-type-info'>
              
              {
                movie.genre_id && movie.genre_id.length!=0?(
                    movie.genre_id.map(gen=>{
                return(
                    <div>{gen.name}</div>
                )
              })
                ):(null)
               }
              </div>
          </div>
      </div>

      </div>
  </div>
  )
}

export default ShowUi