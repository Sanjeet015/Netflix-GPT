import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import gemini from '../utils/gemini'
import { addGptMovieResult } from '../utils/gptSlice'

function GPTSearchBar() {
  const searchText = useRef(null)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleGptSearchClick = async () => {
    const query = searchText.current?.value?.trim()
    if (!query) {
      alert('Please enter a search query')
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      if (!import.meta.env.VITE_GEMINI_KEY) {
        throw new Error('VITE_GEMINI_KEY is missing in your .env file. Please add a valid Gemini API key.')
      }

      const geminiQuery = "Act as a movie recommendation system and suggest some movies for the query : " + query + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Koi Mil Gaya, Golmal"
      
      const result = await gemini.generateContent(geminiQuery)
      const text = result.response.text()
      console.log('Gemini Response:', text)
      
      // Dispatch the result to Redux store
      dispatch(addGptMovieResult({ movieNames: text, searchQuery: query }))
      
      // Clear search input after successful query
      if (searchText.current) {
        searchText.current.value = ''
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      const errStr = error?.message || String(error)
      
      if (errStr.includes('leaked') || errStr.includes('403')) {
        setErrorMessage('Your Gemini API key was blocked by Google because it was leaked on GitHub. Please generate a new key at Google AI Studio (aistudio.google.com) and update your .env file.')
      } else if (errStr.includes('API_KEY_INVALID') || errStr.includes('API key not valid')) {
        setErrorMessage('Invalid Gemini API Key. Please verify the key in your .env file.')
      } else if (errStr.includes('VITE_GEMINI_KEY is missing')) {
        setErrorMessage(errStr)
      } else {
        setErrorMessage(`Failed to get recommendations: ${error.message || 'Please check your connection and try again.'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='pt-[10%] md:pt-[10%] flex flex-col items-center'>
      <form className="mx-auto mt-6 w-full max-w-3xl rounded-sm bg-black/80 p-2 backdrop-blur-md" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-12 gap-2">
          <input
            ref={searchText}
            type="text"
            placeholder="Search for movie recommendations (e.g. 'retro sci-fi movies', 'funny romantic comedies')..."
            disabled={loading}
            className="col-span-9 rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-red-500 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-3 rounded-lg bg-red-600 text-white text-lg font-medium transition hover:bg-red-700 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={handleGptSearchClick}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Searching...</span>
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {errorMessage && (
        <div className="mx-auto mt-4 w-full max-w-3xl p-4 rounded-lg bg-red-950/80 border border-red-500 text-red-200 text-sm backdrop-blur-md">
          <p className="font-semibold text-red-400 mb-1">⚠️ Gemini API Error</p>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  )
}

export default GPTSearchBar