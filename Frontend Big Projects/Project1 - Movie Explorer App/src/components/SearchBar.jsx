// src/components/SearchBar.jsx
import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { fetchMovies, setSearchQuery } from "../features/movies/movieSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchTerm));
    dispatch(fetchMovies(searchTerm));
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}
    >
      <TextField
        variant="outlined"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleChange}
        size="small"
      />
      <IconButton type="submit" color="primary">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
