import React, { useContext } from 'react';
import camera from '../assets/camera-icon.jpg';
import avatar from '../assets/avatar-icon.jpg';
import { Link, useNavigate } from "react-router-dom";
// import { testNoviBackend } from "../context/AuthContext";

import { AuthContext } from "../context/AuthContext";

import './NavBar.css';
import axios from "axios";


function NavBar() {
  const { isAuth, user, login, logout, testNoviBackend } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <>
      <nav>
        <Link to='/'>
          <span className='logo-container'>
            <img src={camera} alt='camera-icon' />
            <h3>Moo-V Picker</h3>
          </span>
        </Link>

        <div>
          <button
            type="button"
            onClick={() => navigate('/signin')}
          >
            Log in
          </button>

          <button
            type="button"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>

          <button
            type="button"
            onClick={() => navigate('/about')}
          >
            About
          </button>

          <Link to={'/profile'}>
            <img src={avatar} alt='camera-icon' />
          </Link>


          <button
            type="button"
            onClick={login}
            >
            Log in (mock)
          </button>

          <button
            type="button"
            onClick={logout}
            >
            Log out (mock)
          </button>

          <button
            type="button"
            onClick={testNoviBackend}
            >
            Test Novi Backend (inspect console)
          </button>

          {/* Conditionally rendered when the user is logged in */}
          <button
            type="button"
            // logs out the user and redirects to the home page
            // onClick={logout}
          >
            Log out
          </button>


        </div>
      </nav>
    </>
  );
}

export default NavBar;
