import React from 'react'
import detail1 from '../../images/detail1.png'
import detail2 from '../../images/detail2.png'

function MovieDetail() {
  return (
  <div className='movie-detail-section'>
      <div className='movie-cover-image'>
          <img src={detail1} className='img-fluid'/>
      </div>
      <div className='movie-title-info'>
          <div className='movie-category-path'>Home / Movies</div>
          <div className='movie-detail-name'>Avengers: Endgame</div>
      </div>
      <div className='movie-description row mt-3'>
      <div className='col-md-6 movie-description-image '>
            <img src={detail2} className="img-fluid"/>
      </div>
      <div className='movie-full-description col-md-6'>
          <div className='full-detail-title'>Part of the journey is the end.</div>
          <div className='full-detail-paragraph'>After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.</div>
          <div className='movie-detail-rating'> <i class="fa-regular fa-star"></i> 8.3</div>
          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Type</div>
              <div className='full-detail-type-info'>Movie</div>
          </div>
          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Release Time</div>
              <div className='full-detail-type-info'>2019-04-24</div>
          </div>
          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Run time</div>
              <div className='full-detail-type-info'>181 min.</div>
          </div>
          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Type</div>
              <div className='full-detail-type-info'>Movie</div>
          </div>
      </div>

      </div>
  </div>
  )
}

export default MovieDetail