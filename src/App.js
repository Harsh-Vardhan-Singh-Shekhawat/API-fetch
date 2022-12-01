import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  function fetchMoviesHandler(){
    setIsLoading(true)
    setError(null)
    fetch('https://swapi.dev/api/films/')
    .then(response =>{
      return response.json();
    })
    .then(data => {
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
  async function addMovieHandler(movie) {
    // console.log(movie)
     const response = await fetch('https://movieworld-6cfd9-default-rtdb.firebaseio.com/movies.json' , {
      method:'POST',
      body:JSON.stringify(movie)
    });

    const data = await response.json();
    
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section> 
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0&& <p>No movies found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
      
    </React.Fragment>
  );
}

export default App;
