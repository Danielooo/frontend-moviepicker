import React, { useContext } from 'react';

// images
import camera from '../../assets/icons/icon-camera.svg';
import avatar from '../../assets/icons/icon-avatar.svg';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './NavBar.css';


function NavBar() {
  const { isAuth, user, logout } = useContext(AuthContext);


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
          
          
          {isAuth ?
            <NavLink className='nav-link' to='/logout'>
              Log out
            </NavLink>
            :
            <NavLink className='nav-link' to='/login'>
              Log in
            </NavLink>
          }
          

          <NavLink className='nav-link' to='/signup'>
            Sign up
          </NavLink>

          <NavLink className='profile-container welcome-user' to={'/profile'}>
            <img className='profile-avatar' src={avatar} alt='camera-icon' />
            { isAuth &&
            <>
              <p className='welcome-user'>Welcome {user.username }!</p>
            </>
            
            }
          </NavLink>
          
        </div>
      </nav>
    </>
  );
}

export default NavBar;
