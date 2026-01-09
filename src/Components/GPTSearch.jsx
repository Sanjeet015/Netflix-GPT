import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import { BG_URL } from '../utils/constants'

function GPTSearch() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 -z-10">
      <img className="w-full h-full object-cover" src={BG_URL} alt="Background-image" />
     </div>
      <div className="relative z-10">
        <GPTSearchBar/>
        <GPTMovieSuggestion/>
      </div>
    </div>
  )
}

export default GPTSearch