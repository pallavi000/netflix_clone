import React, { useEffect, useState } from 'react'
import symbol from '../../images/symbol.png'
import show1 from '../../images/show1.png'
import show2 from '../../images/show2.png'
import show3 from '../../images/show3.png'
import show4 from '../../images/show4.png'
import axios from 'axios'

function Shows() {

    const[genre,setGenre] =useState([])


    useEffect(() => {
    getMovie()
    }, [])

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    async function getMovie(){
        try {
            const response = await axios.get('/frontend/genre/all',config)
            console.log('movies',response.data)
            setGenre(response.data)
        } catch (error) {
            
        }
    }
    

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

{genre.map(gen=>{
    return(
        gen.movies && gen.movies.length!=0?(
            <div className='show-card'>
   <div className='see-again-text'>{gen.name} <i class="fa-solid fa-angle-right ml-2"></i></div>
   <div className='show-see-again row align-items-center '>
   {gen.movies.map(movie=>{
       return(
        <div className='col-md-2 col-sm-6 show-card'>
             <img src={movie.image} className="img-fluid"></img>
         </div>
       )
   })}
    </div>
   </div>

    ):(null)
       
    )
})}
   

   </div>
   </div>
  )
}

export default Shows