import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import Pagination from "react-js-pagination";


function List() {
const[lists,setLists]= useState([])
const [is_loader,setIs_loader] = useState(false)

const[pageno,setPageno]=  useState(1)
const[totalItems,setTotalItems] = useState(0)
const[itemsCountPerPage,setItemsContPerPage] = useState(12)

    const config={
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    useEffect(() => {
        setIs_loader(true)
     getWatchlist()
    }, [])


    async function getWatchlist(){
        try {
            const data={
                pageno,
                itemsCountPerPage
            }
            const response = await axios.post('/frontend/watchlist',data,config)
            console.log(response.data)
            setTotalItems(response.data.totalCount)
            setLists(response.data.list)
            setIs_loader(false)
        } catch (error) {
            console.log(error.request.response)
        }
    }

    function paginate(pageno){
        setPageno(pageno)
        getWatchlist()
      }

    async function removeFromList(e,id){
        e.preventDefault()
        try {
            const response = await axios.delete('/watchlist/'+id,config)
            var newlist = lists.filter(list=>list.movie_id._id!=id)
            setLists(newlist)
        } catch (error) {
            console.log(error.request.response)
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
    <div className='movies-section'>
    
        <div className='movie-top-section'>
            <div className='movie-header'>My List</div>
            <div className='start-btn-section row mt-3'>
            <input type="text" className='start-input' placeholder='Email address'></input>
            <button className='btn-start d-flex align-items-center '>Search <i class="fa-solid fa-angle-right ml-2"></i> </button>
        </div>
        
        <div className='row movies'>
        {lists.map(list=>{
            return(
                <Link className='col-md-3 col-sm-6 mt-5' to="/show-detail">
                <div className='movie-card'>
                 <div className='movie-image-container'>
                 <div className='movie-image '>
                <img src={list.movie_id?.image} className='img-fluid'/>
                </div>
                <div className='movie-rating' onClick={(e)=>removeFromList(e,list.movie_id._id)}><i class="fa-solid fa-star"></i> 6.8</div>
            </div>
            <div className='movie-name'>{list.movie_id.name}</div>
            </div>
        </Link>
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

export default List