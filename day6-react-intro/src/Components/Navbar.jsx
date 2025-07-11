import React from 'react';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">MySite</h2>
      <div className="links">
        <span>Home</span>
        <span>About</span>
      </div>
    </nav>
  );
}

export default Navbar;
