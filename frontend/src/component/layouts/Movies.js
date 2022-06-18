import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import movie1 from '../../images/movie1.png'
import movie2 from '../../images/movie2.png'
import movie3 from '../../images/movie3.png'
import movie4 from '../../images/movie4.png'
import axios from 'axios'
import star from '../../images/star.png'
import MovieList from '../ui/MovieList'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import Pagination from "react-js-pagination";

function Movies() {
  const[movies,setMovies] = useState([])
  const params = useParams()
  const[ratingImg,setRatingImg] = useState('')
  const[isList,setIsList] = useState(false)
  const [is_loader,setIs_loader] = useState(false)
  const[input,setInput]= useState('')

    const[pageno,setPageno]=  useState(1)
    const[totalItems,setTotalItems] = useState(0)
    const[itemsCountPerPage,setItemsContPerPage] = useState(12)




  useEffect(() => {
      setIs_loader(true)
   getmovie()
  }, [])

  const config = {
      headers:{
          'access-token':localStorage.getItem('token')
      }
  }

  async function getmovie(){
      try {
          const data={
              'type':'movie',
              pageno,
              itemsCountPerPage
          }
          const response = await axios.post('/frontend/movie/type',data,config)
          setMovies(response.data.arr)
          setIs_loader(false)
          setTotalItems(response.data.totalCount)
          
      } catch (error) {
          console.log(error.request.response)
      }
  }

 async function search(e){
     e.preventDefault()
    const data={
        input,
        type:'movie'
    }
    try {
        const response = await axios.post('/frontend/search',data,config)
        console.log(response.data)
        setMovies(response.data)
        
    } catch (error) {
        console.log(error.request.response)
    }
  }

  
  function paginate(pageno){
    setPageno(pageno)
    getmovie()
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
        <div className='movies-section'>
       
        <div className='movie-top-section'>
            <div className='movie-header'>Movies</div>
            <form onSubmit={(e)=>search(e)}>
            <div className='start-btn-section row mt-3'>
            <input type="text" className='start-input' onChange={(e)=>setInput(e.target.value)} placeholder='Email address'></input>
            <button className='btn-start d-flex align-items-center ' type="submit">Search <i class="fa-solid fa-angle-right ml-2"></i> </button>
        </div>
            </form>
            
        
        <div className='row movies'>
        {movies.map(movie=>{
            return(
                <MovieList movie={movie} />
            )
        })}
        
           
        </div>
        </div>
        <Pagination
          activePage={pageno}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItems}
          pageRangeDisplayed={5}
          onChange={(e)=>paginate(e)}
          itemClass="page-item"
            linkClass="page-link"
        />
    </div>
      )

   
  )
}



export default Movies
