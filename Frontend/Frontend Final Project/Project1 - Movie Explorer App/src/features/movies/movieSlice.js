

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "5f59d0d095042816d8df078b7a6a5ea1"; 

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query = "Avengers") => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return response.data.results;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
    currentPage: 1,
    sortBy: "", 
    searchQuery: "",
  },
  reducers: {
    addMovie: (state, action) => {
      state.movies.unshift(action.payload);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [
          ...state.movies.filter((m) => m.id < 0),
          ...action.payload,
        ];
        state.status = "succeeded";
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addMovie, setCurrentPage, setSortBy, setSearchQuery } =
  movieSlice.actions;
export default movieSlice.reducer;
