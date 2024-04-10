
import "./index.css";
import { useState, useEffect } from "react";
import Header from "../Header";
import MovieCard from "../MovieCard";
import axios from 'axios';

const Home = () => {
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    getPopularMovies();
  }, []);
  const getPopularMovies = async () => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=7e21488faa12a0f73f6971ea43f9283f&language=en-US&page=1`;
      const response = await axios.get(apiUrl);
      const fetchedData = response.data;
      const updatedData = fetchedData.results.map((movie) => ({
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        id: movie.id,
        rating: movie.vote_average,
      }));
      setPopularMoviesList(updatedData);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const handleSearch = async(searchInput)=>{
    console.log(searchInput)
    
    try {
      if (searchInput.trim() === '') {
        await getPopularMovies();
      }
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
      setFilteredMovies(updatedData);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  }
  

  return (
    <div>
      <Header handleSearch={handleSearch} />
      <div className="top-most-conatiner">
      
        <ul className="popular-movies-list">
      
          {filteredMovies.length > 0
            ? filteredMovies.map((movie) => <MovieCard key={movie.id} movieCards={movie} />):
            popularMoviesList.map((movie) => (<MovieCard key={movie.id} movieCards={movie} />
          ))}
        </ul>
        </div>
    
    </div>
  );
};

export default Home;

