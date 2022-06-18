import React, { useState } from 'react'
import Header from '../layouts/Header'
import frame1 from '../../images/frame1.png'
import Footer from '../layouts/Footer'
import Accordion from '../ui/Accordion'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()
    const[email,setEmail] = useState('')

    function getstart(){
        localStorage.setItem('email',email)
        navigate('/sign-up')
    }
  return (
      <>
    <div className='home-section d-flex justify-content-center align-items-center'>
    <div className='banner-header-section mx-auto w-50 pt-5'>
    <div>
        <div className='banner-title'>Unlimited movies, TV shows and more.</div>
        <div className='banner-subtitle'>Watch anywhere. Cancel anytime.</div>
        <div className='banner-description mt-3'>Ready to watch? Enter your email to create or restart your membership.</div>
        <div className='start-btn-section row mt-3 w-100'>
            <input type="text" className='start-input' onChange={(e)=>setEmail(e.target.value)} placeholder='Email address'></input>
            <button className='btn-start' onClick={()=>getstart()}>Get Started </button>
        </div>
        </div>
    </div>
    </div>
    <div className='movie-category row '>
        <div className='movie-category-detail'>
            <div className='movie-category-detail-title'>Enjoy on your TV.</div>
            <div className='movie-category-detail-subtitle'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</div>
        </div>
        <div className='movie-category-image'>
            <img src={frame1} className='img-fluid'></img>
        </div>
    </div>

    <div className='movie-category row'>
        <div className='movie-category-image'>
            <img src={frame1} className='img-fluid'></img>
        </div>
        <div className='movie-category-detail'>
            <div className='movie-category-detail-title'>Download your shows to watch offline.</div>
            <div className='movie-category-detail-subtitle'>Save your favorites easily and always have something to watch.</div>
        </div>
    </div>

    <div className='movie-category row'>
        <div className='movie-category-detail'>
            <div className='movie-category-detail-title'>Watch everywhere.</div>
            <div className='movie-category-detail-subtitle'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</div>
        </div>
        <div className='movie-category-image'>
            <img src={frame1} className='img-fluid'></img>
        </div>
    </div>

    <div className='movie-category row '>
        <div className='movie-category-image'>
            <img src={frame1} className='img-fluid'></img>
        </div>
        <div className='movie-category-detail'>
            <div className='movie-category-detail-title'>Create profiles for kids.</div>
            <div className='movie-category-detail-subtitle'>Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</div>
        </div>
    </div>

    <div className='movie-category p-5'>
    <div className='movie-category-detail-title mx-auto text-center mb-5 mt-3'>Frequently Asked Questions</div>
   <Accordion/>
    <div className='banner-description'>Ready to watch? Enter your email to create or restart your membership.</div>
    <div className='start-btn-section membership-btn row mx-auto mt-3 mb-5 '>
            <input type="text" className='start-input' placeholder='Email address'></input>
            <button className='btn-start'>Get Started </button>
        </div>
    </div>
    </>
  )
}

export default Home