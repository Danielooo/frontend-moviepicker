import React, { useContext } from 'react';

// images
import camera from '../../assets/icons/icon-camera.svg';
import avatar from '../../assets/icons/icon-avatar.svg';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './NavBar.css';
import axios from "axios";


function NavBar() {
  const { isAuth, user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate()


  return (
    <>
      <nav>
        <Link to='/' className='logo-container'>
            <img className='home-icon-camera' src={camera} alt='camera-icon' />
              <h3 className='home-icon-title'>Movie Picker</h3>

        </Link>

        <div className='nav-links'>
          <NavLink className='nav-link' to='/'>
            Movie Search
          </NavLink>

          <NavLink className='nav-link' to='/about'>
            About
          </NavLink>

          <NavLink className='nav-link' to='/login'>
            Log in
          </NavLink>

          <NavLink className='nav-link' to='/signup'>
            Sign up
          </NavLink>

          <Link className='profile-container' to={'/profile'}>
            <img className='profile-avatar' src={avatar} alt='camera-icon' />
          </Link>

          {/* Conditionally rendered when the user is logged in */}
          { isAuth &&
            <>
              <p>Welcome {user.username }!</p>
              <div className='logout-container'>
                <button
                  className='regular-button'
                  type="button"
                  onClick={logout}
                >
                  Log out
                </button>
              </div>
            </>

          }
        </div>
      </nav>
    </>
  );
}

export default NavBar;
