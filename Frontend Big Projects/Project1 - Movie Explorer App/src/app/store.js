import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/movieSlice";
import favoritesReducer from "../features/movies/favoritesSlice";
import ratingReducer from "../features/ratings/ratingSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    ratings: ratingReducer,
  },
});
