import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../features/movies/movieSlice";

const SortDropdown = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.movies.sortBy || "");

  const handleChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <FormControl sx={{ minWidth: 150, marginBottom: 2 }}>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortBy} label="Sort By" onChange={handleChange}>
        <MenuItem value="title">Title (A-Z)</MenuItem>
        <MenuItem value="release_date">Release Year</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
