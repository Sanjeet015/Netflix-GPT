import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

function Browse() {

  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>

      {/**
      MainContainer
        -VideoBackground
        -Video Title
      SecondaryContainer
        -MoviesList*n
        -cards*n
       */}
    </div>
  )
}

export default Browse