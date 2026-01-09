import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import gemini from '../utils/gemini'
import { addGptMovieResult } from '../utils/gptSlice'

function GPTSearchBar() {
  const searchText = useRef(null)
  const dispatch = useDispatch()

  const handleGptSearchClick = async()=>{
    if (!searchText.current.value.trim()) {
      alert('Please enter a search query')
      return
    }

    try {
      const geminiQuery = "Act as a movie recommendation system and suggest some movies for the query : "+searchText.current.value+". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Koi Mil Gaya, Golmal"
      
      const result = await gemini.generateContent(geminiQuery)
      const text = result.response.text()
      console.log('Gemini Response:', text)
      
      // Dispatch the result to Redux store
      dispatch(addGptMovieResult({ movieNames: text, searchQuery: searchText.current.value }))
      
      // Clear search input after successful query
      searchText.current.value = ''
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      alert('Failed to get recommendations. Please try again.')
    }
  }
  return (
    
    <div className='pt-[10%] flex justify-center'>
      <form className="mx-auto mt-6 w-full max-w-3xl rounded-sm bg-black/80 p-2 backdrop-blur-md" onSubmit={(e)=>e.preventDefault()}>
        <div className="grid grid-cols-12 gap-2" >
          
          <input ref={searchText}
            type="text"
            placeholder="Search for movie recommendations..."
            className="col-span-9 rounded-lg bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-red-500"
          />

          <button
            type="submit"
            className="col-span-3 rounded-lg bg-red-600 text-white text-lg font-medium transition hover:bg-red-700 active:scale-95 cursor-pointer"
        
            onClick={handleGptSearchClick}
          >
            Search
          </button>

        </div>
      </form>

    </div>
  )
}

export default GPTSearchBar