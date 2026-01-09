import React from 'react'
import MovieCard from './MovieCard'

function MovieList({title,movies}) {
  // console.log(movies)
  return (
    <div className='text-white'>
      <h1 className='text-xl font-semibold mb-2'>
        {title}
      </h1>
      <div className='flex overflow-x-scroll scrollbar-hide gap-8'>
        {movies?.map(movie=><MovieCard key={movie.id} poster_path={movie.poster_path}/>)}
      </div>
    </div>
  )
}

export default MovieList