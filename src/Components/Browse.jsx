import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearch from './GPTSearch';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import Footer from './Footer';
import { useSelector } from 'react-redux';

function Browse() {

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies()
  useUpcomingMovies()
  useTopRatedMovies()

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-grow">
        {showGptSearch ? (<GPTSearch/>):
        (<>
          <MainContainer/>
          <SecondaryContainer/>
        </>)}
      </div>
      <Footer/>
    </div>
  )
}

export default Browse