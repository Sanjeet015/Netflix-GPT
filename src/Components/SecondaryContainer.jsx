import MovieList from './MovieList'
import { useSelector } from 'react-redux'

function SecondaryContainer() {
  const movies = useSelector(store=> store.movies)
  return (
    <div className='bg-black'>

      <div className='-mt-48 pl-2 relative z-20'>
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies={movies.trendingMovies}/>
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
        <MovieList title={"Popular"} movies={movies.popularMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
      </div>


      {/**
        MovieList - popular
          -movieCard*n
        MovieList - Now Playing
        MovieList - Trending
        MovieList - Horror
       */}
    </div>
  )
}

export default SecondaryContainer