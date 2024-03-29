import React from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import $ from 'jquery'

function Sidebar(props) {

const navigate = useNavigate();


  function logout(e){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/');
  }
   
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");


  function dashboard(){
    $('.sidebar').toggleClass("open");
    menuBtnChange();
  }
  
  // following are the code to change sidebar button(optional)
  function menuBtnChange() {
    if($('.sidebar').hasClass("open")){
      $('#btn').removeClass("fa-bars");
      $('#btn').addClass("fa-align-right")
    }else {
       $('#btn').removeClass("fa-align-right")
       $('#btn').addClass("fa-bars");
    }
   }



    return (
  <div class="sidebar">
  <div class="logo-details">
    <i class="fa fa-bandcamp icon" aria-hidden="true"></i>
      <div class="logo_name">Ecommerce</div>
        <i class="fa fa-bars" id="btn" onClick={(e)=>dashboard(e)} aria-hidden="true"></i>
  </div>
  <ul class="nav-list">
    <li>
      <Link to="/admin/dashboard">
        <i class="fa fa-th-large" aria-hidden="true"></i>
        <span class="links_name">Dashboard</span>
      </Link>
       <span class="tooltip">Dashboard</span>
    </li>
        <li>
     <Link to="/admin/movie/index">
       <i class="fa fa-audio-description" aria-hidden="true"></i>
       <span class="links_name">Movie</span>
     </Link>
     <span class="tooltip">Movie</span>
   </li>
   <li>
   <Link to="/admin/genre/index">
    <i class="fa fa-star" aria-hidden="true"></i>
     <span class="links_name">Genre</span>
   </Link>
   <span class="tooltip">Genre</span>
 </li>
   <li>
     <Link to="/admin/user/index">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">User</span>
     </Link>
     <span class="tooltip">User</span>
   </li>

   <li>
     <Link to="/admin/subscription/index">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">Subscription</span>
     </Link>
     <span class="tooltip">Subscription</span>
   </li>

   <li>
     <Link to="/admin/user-subscription">
      <i class="fa fa-th" aria-hidden="true"></i>
       <span class="links_name">User Subscription</span>
     </Link>
     <span class="tooltip">User Subscription</span>
   </li>
 
   <li class="profile">
       <div class="profile-details">
       <Link to="/admin/profile">
       <i class="fa fa-cog" aria-hidden="true"></i>

         <div class="name_job">
           <div class="name">user name</div>
           <div class="job">Admin</div>
         </div>
         </Link>
       </div>
       <i class="fa fa-sign-out" id ="log_out" onClick={()=>logout()} aria-hidden="true"></i>
   </li>
  </ul>
</div>

    )
}

export default Sidebar
