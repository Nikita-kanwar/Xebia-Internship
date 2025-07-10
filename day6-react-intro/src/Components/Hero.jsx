import React from 'react'
import "./Hero.css"

const Hero = () => {
  return (
    <div id='home' className='home'>
      <div className="home-text">
          <h1>Welcome to MySite</h1>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit esse possimus iure,
         eos placeat corrupti laboriosam praesentium magnam sunt maxime?</p>
      </div>
      <div className="image">
        <img src="https://images.unsplash.com/photo-1751810106007-907f11cbc15a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOHx8fGVufDB8fHx8fA%3D%3D" alt="Example Image" />
      </div>
    

    </div>
  )
}

export default Hero
