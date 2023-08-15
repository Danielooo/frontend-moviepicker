import React from 'react';
import { Link } from "react-router-dom";
import './SignedUp.css';

function SignedUp() {

  return (

    <>
      <main className='main-outer-container'>
        <main className='main-inner-container'>
          <section className='about-container section-outer-container'>
            <div className='section-inner-container'>

              <h2 className='login-title'>Sign up succesful!</h2>

              <p>You have succefully signed up for Movie Picker<br />
                Click <Link to={{ pathname: '/login' }}>here</Link> to log in<br />
              </p>

            </div>
          </section>
        </main>
      </main>
    </>
  )
}

export default SignedUp;