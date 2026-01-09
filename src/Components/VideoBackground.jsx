import { useSelector } from "react-redux"
import useMovieTrailer from "../hooks/useMovieTrailer"

function VideoBackground({movieId}) {
  const trailerVideo = useSelector(store=>store.movies?.trailerVideo)
  useMovieTrailer(movieId)
  return (
    <div className="w-full -mt-8">
      <iframe className="w-full aspect-video"
        src={`https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerVideo?.key}&start=10
    &end=55
    &modestbranding=1
    &playsinline=1`}></iframe>
      </div>
  )
}

export default VideoBackground