import React, { useContext } from 'react';
import camera from '../../assets/camera-icon.jpg';
import avatar from '../../assets/avatar-icon.jpg';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './NavBar.css';
import axios from "axios";


function NavBar() {
  const { isAuth, user, login, logout } = useContext(AuthContext);
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

        <div className='nav-links'>
          <NavLink className='nav-link' to='/'>
            Home
          </NavLink>

          <NavLink className='nav-link' to='/about'>
            About
          </NavLink>

          <NavLink className='nav-link' to='/signin'>
            Log in
          </NavLink>

          <NavLink className='nav-link' to='/signup'>
            Sign up
          </NavLink>

          <Link className='nav-link' to={'/profile'}>
            <img src={avatar} alt='camera-icon' />
          </Link>

          {/* Conditionally rendered when the user is logged in */}
          <button
            className='nav-link'
            type="button"
            onClick={logout}
            >
            Log out
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
