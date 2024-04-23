import React from "react";
import "./movie.css";
import { MovieType } from "./type";

interface MovieCardProps {
  movie: MovieType;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
