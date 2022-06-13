import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import detail1 from '../../images/detail1.png'
import detail2 from '../../images/detail2.png'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from  'react-loader-spinner'
import ShowDetail from './ShowDetail'
import MovieUi from '../ui/MovieUi'
import ShowUi from '../ui/ShowUi'

function MovieDetail() {
    const[movie,setMovie] = useState({})
    const [is_loader,setIs_loader] = useState(false)
    const params = useParams()
    console.log(params)

    const config = {
        headers:{
            'access-token':localStorage.getItem('token')
        }
    }

    useEffect(() => {
        setIs_loader(true)
     getmovie()
    }, [])

    async function getmovie(){
        try {
            const response = await axios.get('/movie/'+params.id,config)
            console.log(response.data)
            setMovie(response.data)
            setIs_loader(false)
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
        movie.type=="movie" ? (
            <MovieUi movie={movie}/>
        ):(
            <ShowUi movie={movie}/>
        )
      )
  )
}

export default MovieDetail