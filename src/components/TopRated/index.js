import "./index.css";
import { useState, useEffect } from "react";
import Header from "../Header";
import MovieCard from "../MovieCard";
import axios from "axios";

const TopRated = () => {
  const [topratedMoviesList, setTopratedMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredtop, setFilteredTopMovies] = useState([]);

  useEffect(() => {
    getTopratedMovies();
  }, []);

  const getTopratedMovies = async () => {
    try {
      
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=7e21488faa12a0f73f6971ea43f9283f&language=en-US&page=1`;
      const response = await axios.get(apiUrl);
     
      const updatedData = response.data.results.map((movie) => ({
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        id: movie.id,
        rating: movie.vote_average,
      }));
      setTopratedMoviesList(updatedData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleSearch = async(searchInput)=>{
    console.log(searchInput)
    if (searchInput.trim() === '') {
      await getTopratedMovies();
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7e21488faa12a0f73f6971ea43f9283f&language=en-US&query=${searchInput}&page=1`
      );
      const fetchedData = response.data;
      const updatedData = fetchedData.results.map((movie) => ({
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        id: movie.id,
        rating: movie.vote_average,
      }));
      setFilteredTopMovies(updatedData);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  }

  return (
    <div>
      <Header handleSearch={handleSearch} />

        <div className="top-most-conatiner">
        <ul className="popular-movies-list">
          
          {filteredtop.length > 0
            ? filteredtop.map((movie) => <MovieCard key={movie.id} movieCards={movie} />)
            : topratedMoviesList.map((movie) => <MovieCard key={movie.id} movieCards={movie} />)}
        </ul>
        </div>

    </div>
  );
};

export default TopRated;
