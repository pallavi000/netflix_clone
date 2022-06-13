import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieList from '../ui/MovieList'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import Pagination from "react-js-pagination";


function History() {

    const[movies,setMovies]=useState([])
    const [is_loader,setIs_loader] = useState(false)

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
                pageno,
                itemsCountPerPage
            }
          
            const response = await axios.post('/frontend/history',data,config)
            console.log(response.data.arr)
            setMovies(response.data.arr)
            setIs_loader(false)
            setTotalItems(response.data.totalCount)
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
            <div className='movie-header'>History</div>
            <div className='start-btn-section row mt-3 w-50'>
            <input type="text" className='start-input' placeholder='Email address'></input>
            <button className='btn-start d-flex align-items-center '>Search <i class="fa-solid fa-angle-right ml-2"></i> </button>
        </div>
        <div className='row movies'>
        {movies.map(movie=>{
            return(
                <MovieList movie={movie.movie_id}/>
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

export default History