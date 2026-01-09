import { createSlice } from "@reduxjs/toolkit"

const gptSlice = createSlice({
  name:'gpt',
  initialState:{
    showGptSearch:false,
    movieNames: null,
    searchQuery: null
  },
  reducers:{
    toggleGptSearchView : (state)=>{
      state.showGptSearch = !state.showGptSearch
    },
    addGptMovieResult : (state, action)=>{
      const {movieNames, searchQuery} = action.payload
      state.movieNames = movieNames
      state.searchQuery = searchQuery
    }
  }
})

export const {toggleGptSearchView, addGptMovieResult} = gptSlice.actions

export default gptSlice.reducer