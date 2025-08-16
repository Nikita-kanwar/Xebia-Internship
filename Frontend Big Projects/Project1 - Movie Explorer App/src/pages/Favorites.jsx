import React from "react";
import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import { Typography } from "@mui/material";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const movies = useSelector((state) => state.movies.movies);
  const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));

  if (!favoriteMovies.length) return <Typography sx={{ padding: 2 }}>No favorites added</Typography>;

  return <MovieList movies={favoriteMovies} />;
};

export default Favorites;
