
import "./index.css";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { movieCards } = props;
  const { id, title, posterPath, rating } = movieCards;
  let roundedNumber = parseFloat(rating.toFixed(1));
  return (
    <Link to={`/movies/${id}`} className="link-item">
      <div className="card-container" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
        />
        <div className="card-body-all">
          <h6 className="card-title-all" style={{ color: 'white' }}>{title}</h6>
          <p className="card-text-all" style={{ color: 'white' }}>Rating: {roundedNumber}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

