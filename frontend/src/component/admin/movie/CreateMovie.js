import axios from 'axios'
import React, { useEffect, useState } from 'react'

function CreateMovie() {
    const[name,setName] = useState('')
    const[detail,setDetail] = useState('')
    const[image,setImage] = useState('')
    const[type,setType] = useState('')
    const[release_date,setRelease_date] = useState('')
    const[duration,setDuration] = useState('')
    const[genre,setGenre] = useState([])
    const[season_no,setSeason_no] = useState('')
    const[no_of_episode,setNo_of_episode] = useState('')
    const[videos,setVideos] = useState('')
    const[video,setVideo] = useState('')
    const[trailer,setTrailer] = useState('')
    const[genre_id,setGenre_id] = useState('')

    const config={
      headers:{
        'access-token':localStorage.getItem('token')
      }
    }

    useEffect(() => {
     getGenre()
    }, [])

    async function getGenre(){
    try {
      const response= await axios.get('/genre',config)
      setGenre(response.data)
    } catch (error) {
      
    }
    }
    

   async function addmovie(e){
     e.preventDefault()
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

        var response = await axios.post('/movie/add-movie',data,config)
        console.log(response.data)
        
      } catch (error) {
        console.log(error.request.response)
      }
    }


  return (
    <div className="content-wrapper">
    <div className="container w-50 mx-auto">
    <form onSubmit={(e)=>addmovie(e)}>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Movie Name</label>
      <input type="text" className="form-control color"  name="name" onChange={(e)=>setName(e.target.value)}  id="formGroupExampleInput"  required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Detail</label>
      <input type="text" className="form-control color"  name="detail" onChange={(e)=>setDetail(e.target.value)}  id="formGroupExampleInput" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Image</label>
      <input type="file" className="form-control color"  name="image" onChange={(e)=>setImage(e.target.files[0])}  id="formGroupExampleInput"  required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Type</label>
     <select className='form-control' onChange={(e)=>setType(e.target.value)}>
         <option value="">Select type</option>
         <option value="movie">Movie</option>
         <option value="series">Series</option>
     </select>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Release Date</label>
      <input type="date" className="form-control color"  name="release_date" onChange={(e)=>setRelease_date(e.target.value)}  id="formGroupExampleInput" placeholder="Release date" required/>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Duration</label>
      <input type="text" className="form-control color"  name="release_date" onChange={(e)=>setDuration(e.target.value)}  id="formGroupExampleInput" placeholder="movie duration" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Select Genre</label>
      <select className='form-control' onChange={(e)=>setGenre_id(e.target.value)}>
      <option value="">Select Genre</option>
   {genre.map(gen=>{
     return(
          <option value={gen._id}>{gen.name}</option>
     )
   })}
          
      </select>
    </div>
    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Season No</label>
      <input type="text" className="form-control color"  name="season_no" onChange={(e)=>setSeason_no(e.target.value)}  id="formGroupExampleInput" placeholder="Release date" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">No of Episode</label>
      <input type="text" className="form-control color"  name="no_of_episode" onChange={(e)=>setNo_of_episode(e.target.value)}  id="formGroupExampleInput" placeholder="No of Episode" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Upload Videos</label>
      <input type="file" className="form-control color"  name="videos" onChange={(e)=>setVideos(e.target.files[0])}  id="formGroupExampleInput" placeholder="No of Episode" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Upload Video</label>
      <input type="file" className="form-control color"  name="video" onChange={(e)=>setVideo(e.target.files[0])}  id="formGroupExampleInput" placeholder="No of Episode" required/>
    </div>

    <div className="form-group">
      <label htmlFor="formGroupExampleInput">Upload Trailer</label>
      <input type="file" className="form-control color"  name="trailer" onChange={(e)=>setTrailer(e.target.files[0])}  id="formGroupExampleInput" placeholder="Upload Trailer" required/>
    </div>
    

   <button type="submit" className="btn btn-primary">Submit</button>
  </form>
    </div>
    </div>
  )
}

export default CreateMovie