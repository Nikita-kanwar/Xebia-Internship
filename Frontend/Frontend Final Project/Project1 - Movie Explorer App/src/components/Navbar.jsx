import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>Movie Explorer</Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
      <Button color="inherit" component={Link} to="/add">Add Movie</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;
