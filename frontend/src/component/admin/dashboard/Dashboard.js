import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [latest,setLatest] = useState([])
  const[popular,setPopular] = useState([])
  const[users,setUsers]= useState([])

  useEffect(()=>{
    getData()
  },[])

  const config={
    headers:{
      'access-token':localStorage.getItem('token')
    }
  }

  async function getData(){
    try {
      const response = await axios.get('/frontend/latest/dashboard',config)
      console.log(response.data)
      setLatest(response.data.movies)
      setPopular(response.data.popular)
      setUsers(response.data.users)
    } catch (error) {
      console.log(error.request.response)
    }
  }

  return (
  
        <div className="content-wrapper">

          <div class="dash-cards">
          <div class="dash-card-single">
            <div>
              <h1>54</h1>
              <span>Customers</span>
            </div>
            <div>
              <i class="fa fa-user"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>55</h1>
              <span>Products</span>
            </div>
            <div>
              <i class="fa fa-product-hunt" aria-hidden="true"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>54</h1>
              <span>Orders</span>
            </div>
            <div>
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>54</h1>
              <span>Income</span>
            </div>
            <div>
              <i class="fa fa-money" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div>
        <div className="table-responsive mt-5">
        <h3>Latest Movies</h3>
        <table>
        <thead>
            <tr className='table-head'>
                <th>Name</th>
                <th>Category</th>
                <th>Popularity/Interest</th>
                <th>Watchlist</th>
                <th>Stareams</th>
                <th>Release Date </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {latest.map(movie=>{
          return(
            <tr class="table-body">
            <td className='row align-items-center'><img src={movie.image} className='img-fluid dashboard-table-image'/>{movie.name}</td>
            <td >
            {movie.genre_id.map(genre=>{
              return(
                <div className='table-category-flex'>
                <div className="table-category">{genre.name}</div>
                 </div>
              )
            })}
            </td>
            <td></td>
            <td>2,34,567</td>
            <td>{movie.stream}</td>
            <td>{movie.release_date}</td>
            <td><Link className="table-edit" to={`/admin/movie/edit/${movie._id}`}>Edit</Link></td>
        </tr>
          )
        })}
       
       

        </tbody>
    </table>
    </div>

    <div className="table-responsive mt-5">
        <h3>Trending Movies</h3>
        <table>
        <thead>
            <tr className='table-head'>
                <th>Name</th>
                <th>Category</th>
                <th>Popularity/Interest</th>
                <th>Watchlist</th>
                <th>Stareams</th>
                <th>Release Date </th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {popular.map(movie=>{
          return(
            <tr class="table-body">
            <td className='d-flex align-items-center '><img src={movie.image} className='img-fluid dashboard-table-image'/>{movie.name}</td>
            <td >
            {movie.genre_id.map(genre=>{
              return(
                <div className='table-category-flex'>
                <div className="table-category">{genre.name}</div>
                 </div>
              )
            })}
            </td>
            <td></td>
            <td>2,34,567</td>
            <td>{movie.stream}</td>
            <td>{movie.release_date}</td>
            <td><Link className="table-edit" to={`/admin/movie/edit/${movie._id}`}>Edit</Link></td>
        </tr>
          )
        })}
       
       

        </tbody>
    </table>
    </div>
        </div>
        </div>


  )
}

export default Dashboard