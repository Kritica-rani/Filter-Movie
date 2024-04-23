import React, { useRef, useState } from "react";
import { getMovieDetails } from "../../services/apis";
import Movie from "./Movie";
import "./movie.css";
import { MovieType } from "./type";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import MovieFilter from "../FilterButtons/FilterButton";

const Movies = () => {
  const [movieDataByYear, setMovieDataByYear] = useState<{
    [year: number]: MovieType[];
  }>({});
  const [loading, setLoading] = useState(false);
  const [movieYear, setMovieYear] = useState(2011);
  const [currentGenere, setCurrentGenere] = useState<number | undefined>(
    undefined
  );
  const yearRef = useRef(2012);
  const fetchMovieData = async (year: number, genreId?: number) => {
    try {
      setLoading(true);
      const data = await getMovieDetails(year, genreId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMovieDataByYear((prevData: any) => {
        // Check if genreId is defined
        if (genreId !== undefined) {
          // Replace previous data with new data for the specified year and genre
          return { ...prevData, [year]: data };
        } else {
          // Append new data to the existing movies for the specified year
          const existingMovies = prevData[year] || [];
          const updatedMovies = [...existingMovies, ...data];
          return { ...prevData, [year]: updatedMovies };
        }
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching movie data:", error);
    }
  };

  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !loading) {
      const nextYear = movieYear + 1;
      setMovieYear(nextYear);
      yearRef.current = nextYear;
      fetchMovieData(nextYear, currentGenere);
    }
  };

  const targetRef = useIntersectionObserver(handleIntersection);
  const onSelectGenre = (genereId: number) => {
    setCurrentGenere(genereId);
    fetchMovieData(yearRef.current, genereId);
  };
  return (
    <>
      <MovieFilter onSelectGenre={onSelectGenre} />
      <div className="movies-container">
        {Object.entries(movieDataByYear).map(([year, movies]) => (
          <div key={year}>
            <h1 style={{ color: "white" }}>Year: {year}</h1>
            <div className="movie-list">
              {movies.map((film) => (
                <div key={film.id}>
                  <Movie movie={film} />
                </div>
              ))}
            </div>
          </div>
        ))}
        {loading && <p>Loading...</p>}
        <div ref={targetRef} /> {/* Intersection observer target */}
      </div>
    </>
  );
};

export default Movies;
