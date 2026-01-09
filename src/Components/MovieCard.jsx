import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

function MovieCard({poster_path}) {
  return (
   <div className='min-w-[200px] rounded overflow-hidden'>
     <div className='transform-gpu
                hover:scale-103 transition-transform duration-200 ease-in-out'>
      <img src={IMG_CDN_URL+poster_path} alt="movieCard"/>
    </div>
   </div>
  )
}

export default MovieCard