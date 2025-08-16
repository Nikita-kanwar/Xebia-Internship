import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, CircularProgress } from "@mui/material";

const API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDB key

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (!movie) return <Typography sx={{ padding: 2 }}>Movie not found</Typography>;

  return (
    <div style={{ margin: 20 }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: 300, marginBottom: 16 }}
      />
      <Typography variant="h4">{movie.title}</Typography>
      <Typography variant="subtitle1">Release Date: {movie.release_date}</Typography>
      <Typography variant="body1">{movie.overview}</Typography>
      <Typography variant="body2">Genres: {movie.genres.map((g) => g.name).join(", ")}</Typography>
    </div>
  );
};

export default MovieDetail;
