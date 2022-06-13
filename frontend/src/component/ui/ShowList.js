import React from 'react'
import { Link } from 'react-router-dom'

function ShowList({movie}) {
  return (
    <Link className='col-md-3 col-sm-6 show-card' to={`/show-detail/${movie._id}`}>
    <img src={movie.image} className="img-fluid"></img>
</Link>
  )
}

export default ShowList