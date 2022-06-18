import React,{useState,useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import * as echarts from 'echarts';
import $ from 'jquery'


function Dashboard() {
  const [latest,setLatest] = useState([])
  const[popular,setPopular] = useState([])
  const[users,setUsers]= useState([])
  const [is_loader,setIs_loader] = useState(false)
  const [data,setData] = useState([])
  const[totalUser,setTotalUser]= useState(0)
  const[totalMovies,setTotalMovies]= useState(0)
  const[totalSeries,setTotalSeries]= useState(0)
  const[totalGenre,setTotalGenre]= useState(0)
  const ref= useRef()
  
  

  useEffect(()=>{
    getData()
  },[])

 function makePieChart() {
    var div = document.querySelector('.piechart')
    var myChart = echarts.init(div);
  var option;
  option = {
    title: {
      text: 'User Types',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
  
 }

 useEffect(() => {
    makePieChart()
 }, [data])
 

 

  const config={
    headers:{
      'access-token':localStorage.getItem('token')
    }
  }

  async function getData(){
    setIs_loader(true)
    try {
      const response = await axios.get('/frontend/latest/dashboard',config)
      console.log(response.data)
      setLatest(response.data.movies)
      setPopular(response.data.popular)
      setUsers(response.data.users)
      setTotalUser(response.data.totalUser)
      setTotalMovies(response.data.totalMovie)
      setTotalGenre(response.data.totalGenre)
      setTotalSeries(response.data.totalSeries)
      setData([
        {
          name:'Free User',
          value:response.data.freeUser

        },
        {
          name:'Premium User',
          value:response.data.premiumUser
        }
      ])
      setIs_loader(false)
      makePieChart()
    } catch (error) {

      console.log(error.message)
      setIs_loader(false)
    }
  }

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

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
        <div className="content-wrapper">

        <div className='piechart' ref={ref} style={{height:'400px'}}></div>

          <div class="dash-cards">
          <div class="dash-card-single">
            <div>
              <h1>{totalUser}</h1>
              <span>Users</span>
            </div>
            <div>
              <i class="fa fa-user"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>{totalMovies}</h1>
              <span>Movies</span>
            </div>
            <div>
            <i class="fa-solid fa-clapperboard"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>{totalSeries}</h1>
              <span>Series</span>
            </div>
            <div>
            <i class="fa-solid fa-film"></i>
            </div>
          </div>
    
          <div class="dash-card-single">
            <div>
              <h1>{totalGenre}</h1>
              <span>Genre</span>
            </div>
            <div>
              <i class="fa fa-th" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div>
        <div className="table-responsive mt-5">
        <h3>Active Users</h3>
        <table>
        <thead>
            <tr className='table-head'>
                <th>Name</th>
                <th>Email</th>
                <th>Subscription</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {users.map(user=>{
          return(
            <tr class="table-body">
            
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.plan}</td>
            <td><Link className="table-edit" to={`/admin/user/edit/${user._id}`}>Edit</Link></td>
        </tr>
          )
        })}
        </tbody>
    </table>
    </div>
        <div className="table-responsive mt-5">
        <h3>Latest Movies</h3>
        <table>
        <thead>
            <tr className='table-head'>
                <th>Name</th>
                <th>Category</th>
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
           
            <td>{movie.watchListCount}</td>
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
            <td>{movie.watchListCount}</td>
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
  )
}

export default Dashboard