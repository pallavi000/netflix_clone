import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import logo from '../../images/Logo.png'
import Sidebar from '../admin/Sidebar'
import Subscription from './Subscription'

function Header() {
  const navigate= useNavigate()
  let user
  try {

    user = JSON.parse(localStorage.getItem('user'))

    
  } catch (error) {
    user=null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    user && user.role=='admin'?(
      <Sidebar/>
    ):user && user.plan=="premium"?(
      <div className='header-section' >
        <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link class="navbar-brand logo-text" to="/">GPSView</Link>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item">
          <Link class="nav-link active" to="/show">Start</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/tv-show">Shows</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/movies">Movies</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/new">New</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/my-list">My List</Link>
        </li>

    </ul>
    <div className=' btn-signin' onClick={()=>logout()}>Logout</div>
  </div>
</nav>
    </div>
    ):user?(
      <div className=' header-section' >
        <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link class="navbar-brand logo-text" to="/">GPSView</Link>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
     
    </ul>
    <div className=' btn-signin' onClick={()=>logout()}>Logout</div>
  </div>
</nav>
    </div>
    ):(
    <div className=' header-section' >
        <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
  <Link class="navbar-brand logo-text" to="/">GPSView</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
     
    </ul>
    <Link className=' btn-signin' to="/sign-in">Sign In</Link>
  </div>
</nav>
    </div>
    )
  )
}

export default Header