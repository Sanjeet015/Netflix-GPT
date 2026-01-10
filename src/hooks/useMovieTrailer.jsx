import { useDispatch, useSelector } from "react-redux"
import { API_OPTIONS } from "../utils/constants"
import { addTrailerVideo } from "../utils/moviesSlice"
import { useEffect } from "react"

const useMovieTrailer = (movieId)=>{
  const dispatch = useDispatch()
  const movieVideo = useSelector(store=>store.movies.getMovieVideo)
  const getMovieVideo = async()=>{
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)

    const json = await data.json()

    const filteredTrailer = json.results.filter (video=>video.type=="Trailer")
    const trailer = filteredTrailer.length===0?json.results[0]:filteredTrailer[0]
    dispatch(addTrailerVideo(trailer))
  } 

  useEffect(()=>{
    !movieVideo && getMovieVideo()
  },[])
}

export default useMovieTrailer