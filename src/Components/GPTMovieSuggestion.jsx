import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import MovieList from './MovieList'

function GPTMovieSuggestion() {
  const { movieNames, searchQuery } = useSelector(state => state.gpt)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!movieNames) return

    const fetchMoviesData = async () => {
      setLoading(true)
      try {
        // Parse movie names from Gemini response (comma-separated), cleaning any bullets or markdown
        const movieList = movieNames
          .split(',')
          .map(name => name.replace(/[*_#`]/g, '').replace(/^\s*\d+[\.\-\)]\s*/, '').trim())
          .filter(name => name.length > 0)

        // Fetch each movie from TMDB
        const allMovies = []

        for (const movieName of movieList) {
          const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`,
            API_OPTIONS
          )
          const json = await data.json()
          
          // Get the first result if available
          if (json.results && json.results.length > 0) {
            allMovies.push(json.results[0])
          }
        }

        setMovies(allMovies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMoviesData()
  }, [movieNames])

  if (!movieNames) {
    return <div className="text-white text-center py-8">Search for movie recommendations to get started</div>
  }

  return (
    <div className='bg-black bg-opacity-90 text-white py-8 px-6 my-4 pointer-events-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        🎬 Recommendations for: <span className='text-red-500'>"{searchQuery}"</span>
      </h1>
      
      {loading ? (
        <div className='text-center py-8'>
          <p className='text-xl'>Loading recommendations...</p>
        </div>
      ) : (
        <>
          {movies.length > 0 ? (
            <MovieList title="Suggested Movies" movies={movies} />
          ) : (
            <div className='text-center py-8'>
              <p className='text-xl text-gray-400'>No movies found for your recommendations</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GPTMovieSuggestion