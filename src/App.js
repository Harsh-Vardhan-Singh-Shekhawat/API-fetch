import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  function fetchMoviesHandler(){
    setIsLoading(true)
    fetch('https://swapi.dev/api/films/')
    .then(response =>{
      return response.json();
    })
    .then(data =>{
      const tranformedData = data.results.map(moviesData => {
        return {
        id:moviesData.episode_id,
        title:moviesData.title,
        openingText:moviesData.opening_crawl,
        releaseDate:moviesData.release_date
    }})
      setMovies(tranformedData);
      setIsLoading(false);
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section> 
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
      </section>
      
    </React.Fragment>
  );
}

export default App;
