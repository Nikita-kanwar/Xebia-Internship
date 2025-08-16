// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, setCurrentPage } from "../features/movies/movieSlice";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import Pagination from "@mui/material/Pagination";
import { CircularProgress, Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, status, error, currentPage } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handlePageChange = (e, page) => dispatch(setCurrentPage(page));

  if (status === "loading")
    return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
  if (status === "failed")
    return <Typography sx={{ padding: 2 }}>{error}</Typography>;

  const itemsPerPage = 8;
  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const pageCount = Math.ceil(movies.length / itemsPerPage);

  return (
    <div style={{ padding: 16 }}>
      <SearchBar />
      <SortDropdown />
      <MovieList movies={paginatedMovies} />
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
      />
    </div>
  );
};

export default Home;
