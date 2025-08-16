import React from "react";
import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <Typography sx={{ padding: 2 }}>No movies found</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  );
};

export default MovieList;
