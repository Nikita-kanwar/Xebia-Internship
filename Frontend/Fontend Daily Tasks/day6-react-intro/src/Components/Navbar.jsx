import React from 'react';
import './Navbar.css'

function Navbar() {
  return (
    <nav id='navbar' className="navbar">
      <h2 className="logo">My Portfolio Site</h2>
       <ul className="links">
    <li><a href="#hero">Home</a></li>
    <li><a href="#about">About</a></li>
       </ul>
    </nav>
  );
}

export default Navbar;
