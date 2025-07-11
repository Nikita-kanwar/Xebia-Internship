import React from "react";
import "./Hero.css";

function Hero({ title = "Welcome to MySite" }) {
  return (
    <section id="hero" className="hero">
      <h1 className="">{title}</h1>
      <p>
        Hi there! I'm Nikita, the creator of MySite. This platform is my passion
        project where I share my journey, ideas, and creative works. Whether
        you're here to read my blog, explore my projects, or just get to know me
        a little better, I hope you find something that resonates with you.
      </p>
      <img
        src="https://images.unsplash.com/photo-1750440017810-41f1fe3b88d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Visual"
        className="hero-image"
      />
    </section>
  );
}

export default Hero;
