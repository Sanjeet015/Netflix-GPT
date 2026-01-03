import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

function MovieCard({poster_path}) {
  return (
    <div className='min-w-[200px] rounded'>
      <img src={IMG_CDN_URL+poster_path} alt="movieCard"/>
    </div>
  )
}

export default MovieCard