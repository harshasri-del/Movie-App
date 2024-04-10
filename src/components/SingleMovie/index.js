import "./index.css";
import { useState, useEffect } from "react";
import Header from "../Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import SimilarCastItem from "../SimilarCastItem"

const SingleMovie = () => {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSingleMovie();
    getSimilarCast();
  }, []);

  const getSingleMovie = async () => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=7e21488faa12a0f73f6971ea43f9283f&language=en-US`;
      const response = await axios.get(apiUrl);
      setSingleMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching single movie:", error);
      setError(error);
      setLoading(false);
    }
  };

  const getSimilarCast=async () => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7e21488faa12a0f73f6971ea43f9283f&language=en-US`;
      const response = await axios.get(apiUrl);
      setCast(response.data.cast);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cast:", error);
      setError(error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <div className="single-movie-container">
        <div className="top-container">
          <div className="left-top-container">
            <div className="poster-left-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${singleMovie.poster_path}`}
                alt={singleMovie.title}
                className="poster-image"
              />
              <div className="left-inner-container">
                <h3>{singleMovie.title}</h3>
                <p>Rating: {singleMovie.vote_average}</p>
                <div className="time-container">
                  <p className="time">{singleMovie.runtime} Min</p>
                  {singleMovie.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </div>
                <div className="date-container">
                  <h6>Release Date: {singleMovie.release_date}</h6>
                </div>
              </div>
            </div>
            <div className="left-bottom">
              <h2>overview </h2>
              <p>{singleMovie.overview}</p>
            </div>
          </div>
          <div className="poster-right-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`}
              alt={singleMovie.title}
              className="backdrop-image"
            />
          </div>
        </div>
        <div className="bottom-container">
          <h1>Cast</h1>
          <ul className="similar-cast-list">
              {cast.map(each => (
                <SimilarCastItem
                  castDetails={each}
                  key={each.id}
                />
              ))}
            </ul>
          </div>

      </div>
    </div>

  );
};

export default SingleMovie;
