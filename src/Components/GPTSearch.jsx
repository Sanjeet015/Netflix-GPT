import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestion from './GPTMovieSuggestion'
import Header from './Header'
import { BG_URL } from '../utils/constants'

function GPTSearch() {
  return (

    <>
    <div className="absolute inset-0 -z-50 pointer-events-none">
      <img className="w-full h-full object-cover" src={BG_URL} alt="Background-image" />
    </div>
      <div className="min-h-screen relative">
      
      <div className="relative z-40">
        <Header/>
      </div>
      <div className="relative z-10 pt-4 pointer-events-auto pt-[35%] md:pt-0">
        <GPTSearchBar/>
        <GPTMovieSuggestion/>
      </div>
    </div>
    </>
    
  )
}

export default GPTSearch