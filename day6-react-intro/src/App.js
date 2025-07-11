import React from 'react';
import Navbar from './Components/Navbar';
import About from './Components/About.jsx'
import Hero from './Components/Hero.jsx'
import  "./App.css"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero title="Welcome to My Portfolio" />
      <About />
    </div>
  );
}

export default App;
