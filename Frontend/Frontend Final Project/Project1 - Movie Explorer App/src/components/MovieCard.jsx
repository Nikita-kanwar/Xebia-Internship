import React from "react";
import { Card, CardContent, CardMedia, IconButton, Typography, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/movies/favoritesSlice";
import { rateMovie } from "../features/ratings/ratingSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const ratings = useSelector((state) => state.ratings);

  const handleFavorite = () => {
    dispatch(toggleFavorite(movie.id));
    toast.success(favorites.includes(movie.id) ? "Removed from favorites" : "Added to favorites");
  };

  const handleRating = (e, newValue) => {
    dispatch(rateMovie({ movieId: movie.id, rating: newValue }));
    toast.success("Rating submitted!");
  };

  return (
    <Card sx={{ maxWidth: 200, margin: 2 }}>
      <Link to={`/movie/${movie.id}`}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <IconButton onClick={handleFavorite} color={favorites.includes(movie.id) ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
        <Rating value={ratings[movie.id] || 0} onChange={handleRating} />
      </CardContent>
    </Card>
  );
};

export default MovieCard;
