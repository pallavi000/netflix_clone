import React, { useEffect, useState } from 'react'
import symbol from '../../images/symbol.png'
import show1 from '../../images/show1.png'
import show2 from '../../images/show2.png'
import show3 from '../../images/show3.png'
import show4 from '../../images/show4.png'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import { Link } from 'react-router-dom'
import ShowList from '../ui/ShowList'

function Shows() {

    const[genre,setGenre] =useState([])
    const[feature,setFeature] = useState({})
    const[history,setHistory] = useState([])
    const [is_loader,setIs_loader] = useState(false)


    useEffect(() => {
    setIs_loader(true)
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
            console.log('movies',response.data.arr)
            console.log('history',response.data.history)
            setHistory(response.data.history)
            setGenre(response.data.arr)
            setFeature(response.data.feature)
            setIs_loader(false)
            console.log('feature',response.data.feature)
        } catch (error) {
            
        }
    }
    

  return (
    is_loader?(
        <Oval
        height="100"
        width="100"
        color='#94142C'
        ariaLabel='loading'
        secondaryColor="#ddd"
      />
      ):(
    <div className='show-main'>
   
   {feature?(
    <div className='show-section' style={{backgroundImage:`url(${feature.image})`}}>
    <div>
            <div className='d-flex align-items-center'>
                <img src={symbol} className="img-fluid"/>
                <div className='show-text'>{feature.type}</div>
            </div>
            <div className='show-header'>{feature.name}</div>
            <div className='d-flex'>
                <div className='show-play'><i class="fa-solid fa-play mr-2"></i> Play</div>
                <div className='show-more-info'> <i class="fa-solid fa-circle-info mr-2"></i>More-info</div>
            </div>
            </div>
        </div>
   ):(null)}
        
  

   <div className='show-category-section'>
   {history && history.length!=0?(
    <div className='show-card'>
   <Link className='see-again-text' to="/history">Watch History<i class="fa-solid fa-angle-right ml-2"></i></Link>
   <div className='show-see-again row align-items-center '>
   {history.map(movie=>{
    <ShowList movie={movie.movie_id}/>
   })}
    </div>
   </div>
   ):(null)}


{genre.map(gen=>{
    return(
        gen.movies && gen.movies.length!=0?(
            <div className='show-card'>
   <div className='see-again-text'>{gen.name} <i class="fa-solid fa-angle-right ml-2"></i></div>
   <div className='show-see-again row align-items-center '>
   {gen.movies.map(movie=>{
       return(
        <ShowList movie={movie}/>
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
  )
}

export default Shows