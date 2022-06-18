import React from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router-dom'

function VideoPlayer(props) {
    
    const location = useLocation()

    console.log(location)
    const video = location.state

    return (
    <div className='movies-section'>
        <ReactPlayer url={video}
        playing={false}
        controls={true}
        width={'100%'}
        height={'100%'}
         />
    </div>
  )
}

export default VideoPlayer
