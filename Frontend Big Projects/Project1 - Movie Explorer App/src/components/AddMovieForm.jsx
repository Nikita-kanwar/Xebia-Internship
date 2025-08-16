// src/components/AddMovieForm.jsx
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMovie } from "../features/movies/movieSlice";
import { toast } from "react-toastify";

const AddMovieForm = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addMovie({
        id: -Date.now(),
        poster_path: form.image,
        title: form.title,
        overview: form.description,
        release_date: form.year,
      })
    );
    toast.success("Movie added successfully!");
    setForm({ title: "", year: "", description: "", image: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: 300,
        margin: "16px auto",
      }}
    >
      <TextField
        name="title"
        label="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <TextField
        name="year"
        label="Year"
        value={form.year}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={3}
        required
      />
      <TextField
        name="image"
        label="Image URL"
        value={form.image}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">
        Add Movie
      </Button>
    </form>
  );
};

export default AddMovieForm;
