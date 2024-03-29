import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Toastr from 'toastr';
import '../../../../node_modules/toastr/build/toastr.css'




function EditMovie(props) {
    const[name,setName] = useState('')
    const[detail,setDetail] = useState('')
    const[image,setImage] = useState('')
    const[type,setMovieType] = useState('')
    const[release_date,setRelease_date] = useState('')
    const[duration,setDuration] = useState('')
    const[genre,setGenre] = useState([])
    const[season_no,setSeason_no] = useState('')
    const[no_of_episode,setNo_of_episode] = useState('')
    const[videos,setVideos] = useState('')
    const[video,setVideo] = useState('')
    const[trailer,setTrailer] = useState('')
    const[genre_id,setGenre_id] = useState('')
    const[movie,setMovie] = useState({})
    const[feature,setFeature] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)


    const config={
        headers:{
          'access-token':localStorage.getItem('token')
        }
      }
  
      useEffect(() => {
       getGenre()
       getmovie()
      }, [])
    console.log('props',props)
      async function getmovie(){
          try {
            const response = await  axios.get('/movie/'+params.id,config)
            setMovie(response.data)
            setName(response.data.name)
            setDetail(response.data.detail)
            setImage(response.data.image)
            setRelease_date(response.data.release_date)
            setDuration(response.data.duration)
            setSeason_no(response.data.season_no)
            setNo_of_episode(response.data.no_of_episode)
            setVideo(response.data.video)
            setVideos(response.data.videos)
            setGenre_id(response.data.genre_id)
            setFeature(response.data.feature)
            setMovieType(response.data.type)
          console.log(response.data.type)
          
            console.log(response.data)
          } catch (error) {
              console.log(error.request.response)
          }
      }
  
      async function getGenre(){
      try {
        const response= await axios.get('/genre',config)
        setGenre(response.data)
      } catch (error) {
      }
      }
      
     async function editmovie(e){
       e.preventDefault()
       setIsLoading(true)
        try {
         const data = new FormData()
         data.append('name',name)
         data.append('detail',detail)
         data.append('image',image)
         data.append('type',type)
         data.append('release_date',release_date)
         data.append('duration',duration)
         data.append('genre_id',genre_id)
         data.append('no_of_episode',no_of_episode)
         data.append('season_no',season_no)
         data.append('videos',videos)
         data.append('video',video)
         data.append('trailer',trailer)
         data.append('feature',feature)

         console.log(data)

  
          var response = await axios.put('/movie/update/'+params.id,data,config)
          console.log(response.data)
          setIsLoading(false)
          navigate(-1)
          Toastr.success('Updated Movie')
          
        } catch (error) {
          console.log(error.request.response)
          Toastr.error(error.request.response)
          setIsLoading(false)

        }
      }

  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <div className='card'>
        <div className='card-body text-right d-flex justify-content-between align-items-center'>
        <h2 className='pl-3'>Edit Movie</h2>
            <button className='btn btn-info' onClick={()=>navigate(-1)}>Back</button>
        </div>
    </div>
    <div className='card py-5 px-3'>
      <div className='card-body'>
      <form onSubmit={(e)=>editmovie(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Movie Name</label>
      <input type="text" className="form-control color"  name="name" defaultValue={movie.name} onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput"/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Detail</label>
      <textarea type="text" className="form-control color"  name="detail" defaultValue={movie.detail} onChange={(e)=>setDetail(e.target.value)}  id="formGroupExampleInput"  rows={4}></textarea>
    </div>
    <div className="form-group row">
    <div className='col-md-8'>
    <label htmlFor="formGroupExampleInput">Image</label>
      <input type="file" className="form-control color"  name="image"   onChange={(e)=>setImage(e.target.files[0])}  id="formGroupExampleInput"/>
    </div>
     <div className='col-md-4 text-right'>
      <img src={movie.image} className="img-fluid w-75"/>
     </div>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Type</label>
     <select className='form-control'  onChange={(e)=>setMovieType(e.target.value)}>
         <option value="">Select type</option>
        {movie.type=="movie"?(
          <option value="movie" selected>Movie</option>
        ):(
          <option value="movie">Movie</option>
        )}
        {movie.type=="series"?(
          <option value="series" selected>Series</option>
        ):(
          <option value="series">Series</option>
        )}
     </select>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Release Date</label>
      <input type="date" className="form-control color" defaultValue={movie.release_date}  name="release_date" onChange={(e)=>setRelease_date(e.target.value)}  id="formGroupExampleInput" placeholder="Release date"/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Duration</label>
      <input type="text" className="form-control color"  defaultValue={movie.duration} name="release_date" onChange={(e)=>setDuration(e.target.value)}  id="formGroupExampleInput" placeholder="movie duration"/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Select Genre</label>
      <select className='form-control' onChange={(e)=>setGenre_id(e.target.value)}>
      <option value="">Select Genre</option>
   {genre.map(gen=>{
     return(
      genre_id.includes(gen._id)?(
        <option value={gen._id} selected>{gen.name}</option>
      
      ):(
        <option value={gen._id}>{gen.name}</option>
      )
     )
   })}      
       </select>
    </div>
    {type=="series"?(
      <>
      <div className="form-group">
      <label htmlFor="formGroupExampleInput">Season No</label>
      <input type="text" className="form-control color" defaultValue={movie.season_no} name="season_no" onChange={(e)=>setSeason_no(e.target.value)}  id="formGroupExampleInput" placeholder="Season No"/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">No of Episode</label>
      <input type="text" className="form-control color" defaultValue={movie.no_of_episode} name="no_of_episode" onChange={(e)=>setNo_of_episode(e.target.value)}  id="formGroupExampleInput" placeholder="No of Episode"/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Upload Videos</label>
      <input type="file" className="form-control color"  name="videos" onChange={(e)=>setVideos(e.target.files[0])}  id="formGroupExampleInput" placeholder="No of Episode"/>
    </div>
      </>
    ):(null)}
    

    <div className="form-group row">
    <div className='col-md-8'>
    <label htmlFor="formGroupExampleInput">Upload Video</label>
      <input type="file" className="form-control color"  name="video" onChange={(e)=>setVideo(e.target.files[0])}  id="formGroupExampleInput" placeholder="No of Episode"/>
    </div>
    <div className='col-md-4'>
      <video src={movie.video} controls={true} className="img-fluid"/>
    </div>
    </div>

    <div className="form-group row">
    <div className='col-md-8'>
    <label htmlFor="formGroupExampleInput">Upload Trailer</label>
      <input type="file" className="form-control color"  name="trailer" onChange={(e)=>setTrailer(e.target.files[0])}  id="formGroupExampleInput" placeholder="Upload Trailer"/>
    </div>
    <div className='col-md-4'>
      <video src={movie.trailer} controls={true} className="img-fluid"/>
    </div>
    </div>

    <div className='form-group'>
    {movie.feature==true?(
      <input type="checkbox" checked onChange={()=>setFeature(!feature)} defaultValue={movie.feature}/>
    ):(
      <input type="checkbox" onChange={()=>setFeature(!feature)} defaultValue={movie.feature}></input>

    )}
      <span>Feature this {movie.type}</span>
    </div>
    {isLoading?(
      <button type="submit" className="btn btn-start loading-btn" disabled>Submit</button>

    ):(
      <button type="submit" className="btn btn-start">Submit</button>

    )}
  </form>
      </div>
    </div>
    
    </div>
    </div>
  )
}

export default EditMovie
