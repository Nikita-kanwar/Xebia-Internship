import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div id='about' className='about'>
      <div className="about-text">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia pariatur perspiciatis illum doloribus corrupti quod animi aliquid ab tenetur voluptates!</p>
      </div>
      <div className="hobbies">
        <ul>
          <li>Web Development</li>
          <li>Sports</li>
          <li>Writing</li>
        </ul>
      </div>
    </div>
  )
}

export default About
