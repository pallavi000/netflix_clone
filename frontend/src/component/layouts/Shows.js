import React from 'react'
import symbol from '../../images/symbol.png'
import show1 from '../../images/show1.png'
import show2 from '../../images/show2.png'
import show3 from '../../images/show3.png'
import show4 from '../../images/show4.png'

function Shows() {
  return (
    <div className='show-main'>
   <div className='show-section'>
        <div className=''>
            <div className='d-flex align-items-center'>
                <img src={symbol} className="img-fluid"/>
                <div className='show-text'>SHOW</div>
            </div>
            <div className='show-header'>MOVIE NAME</div>
            <div className='d-flex'>
                <div className='show-play'><i class="fa-solid fa-play mr-2"></i> Play</div>
                <div className='show-more-info'> <i class="fa-solid fa-circle-info mr-2"></i>More-info</div>
            </div>
        </div>
   </div>

   <div className='show-category-section'>
   <div className='show-card'>
   <div className='see-again-text'>Trending now <i class="fa-solid fa-angle-right ml-2"></i></div>
   <div className='show-see-again row align-items-center '>
   <div className=' col-md-2 col-sm-6 show-card'>
       <img src={show1} className="img-fluid"></img>
   </div>
   <div className=' col-md-2 col-sm-6 show-card'>
       <img src={show2} className="img-fluid"></img>
   </div>
   <div className=' col-md-2 col-sm-6 show-card'>
       <img src={show3} className="img-fluid"></img>
   </div>
   <div className=' col-md-2 col-sm-6 show-card'>
       <img src={show4} className="img-fluid"></img>
   </div>
   <div className=' col-md-2 col-sm-6 show-card'>
       <img src={show4} className="img-fluid"></img>
   </div>
   <div className=' col-md-2 col-sm-6 show-card'>
       <img src={show4} className="img-fluid"></img>
   </div>
    </div>
   </div>


   <div className='show-card'>
   <div className='see-again-text'>See again <i class="fa-solid fa-angle-right ml-2"></i></div>
   <div className='show-see-again row align-items-center '>
   <div className='col-md-2 col-sm-6 show-card'>
       <img src={show1} className="img-fluid"></img>
   </div>
   <div className='col-md-2 col-sm-6 show-card'>
       <img src={show2} className="img-fluid"></img>
   </div>
   <div className='col-md-2 col-sm-6 show-card'>
       <img src={show3} className="img-fluid"></img>
   </div>
   <div className='col-md-2 col-sm-6 show-card'>
       <img src={show4} className="img-fluid"></img>
   </div>
   <div className='col-md-2 col-sm-6 show-card'>
       <img src={show1} className="img-fluid"></img>
   </div>
   <div className='col-md-2 col-sm-6 show-card'>
       <img src={show2} className="img-fluid"></img>
   </div>
    </div>
   </div>

   </div>
   </div>
  )
}

export default Shows