
import React from 'react'
import detail1 from '../../images/showdetail1.png'
import detail2 from '../../images/showdetail2.png'

function ShowDetail() {
  return (
  <div className='movie-detail-section'>
      <div className='movie-cover-image'>
          <img src={detail1} className='img-fluid'/>
      </div>
      <div className='movie-title-info'>
          <div className='movie-category-path'>Home &nbsp; / &nbsp; TV Show</div>
          <div className='movie-detail-name'>Lost In Space</div>
      </div>
      <div className='movie-description row mt-3'>
      <div className='col-md-6 movie-description-image '>
            <img src={detail2} className="img-fluid"/>
      </div>
      <div className='movie-full-description col-md-6'>
          <div className='full-detail-title'>Have You Seen Our Robot?</div>
          <div className='full-detail-paragraph'>The mission to save Scarecrow takes an unexpected turn, throwing the Resolute into chaos. Judy hatches a plan to get a ship to Alpha Centauri.</div>
          <div className='movie-detail-rating'> <i class="fa-regular fa-star"></i> 8.3</div>
          <div className='full-detail-component py-3 row'>
          <div className='col-md-6'>
                <div className='full-detail-type'>Type</div>
              <div className='full-detail-type-info'>TV Show</div>
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
              <div className='full-detail-type-info'>6</div>
          </div>
          <div className='col-md-6'>
                <div className='full-detail-type'>No. of episodes</div>
              <div className='full-detail-type-info'>20</div>
          </div>
              
          </div>
          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Episode run time</div>
              <div className='full-detail-type-info'>Movie</div>
          </div>

          <div className='full-detail-component py-3'>
              <div className='full-detail-type'>Genres</div>
              <div className='full-detail-type-info'>Action & Adventure, Sci-Fi & Fantasy, Drama</div>
          </div>
      </div>

      </div>
  </div>

  )
}

export default ShowDetail