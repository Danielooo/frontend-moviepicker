import React from 'react';
import {Link} from "react-router-dom";
import './About.css';

function About() {

  return (

    <>
      <main className='main-outer-container'>
        <main className='main-inner-container'>
          <section className='about-container section-outer-container'>
            <div className='section-inner-container'>

              <h2 className='login-title'>About</h2>

              <p>Movie Picker is a product of Movie Picker Limited<br />
              When you want to watch a movie but don't know which one...<br />
              Try Movie Picker!
              </p>

            </div>
          </section>
        </main>
      </main>
    </>
  )
}

export default About;