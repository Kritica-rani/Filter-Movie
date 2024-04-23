import React, { useEffect, useState } from "react";
import { MovieGenre } from "./types";
import { getGenreList } from "../../services/apis";

type MovieFilterProps = {
  onSelectGenre: (genre: number) => void;
};

const MovieFilter: React.FC<MovieFilterProps> = ({ onSelectGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [movieGenere, setMoviGenere] = useState<MovieGenre[]>([]);

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenre(genreId);
    onSelectGenre(genreId);
  };
  useEffect(() => {
    const data = async () => {
      const genere = await getGenreList();

      setMoviGenere(genere.genres);
    };
    data();
  }, []);

  return (
    <div>
      <div className="genre-buttons">
        {movieGenere &&
          movieGenere.length > 0 &&
          movieGenere.map((genre) => (
            <button
              key={genre.id}
              className={
                genre.id === selectedGenre ? " filter-btn active" : "filter-btn"
              }
              onClick={() => handleGenreSelect(genre.id)}
            >
              {genre.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default MovieFilter;
