import React from 'react';
import "./Hero.css"

function Hero({ title = "Welcome to MySite" }) {
  return (
    <section className="hero">
      <h1>{title}</h1>
      <p>This is a simple multi-component React application. Explore and enjoy!</p>
      <img 
        src="https://images.unsplash.com/photo-1750440017810-41f1fe3b88d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Visual" 
        className="hero-image"
      />
    </section>
  );
}

export default Hero;
