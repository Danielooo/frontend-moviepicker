import React, { useContext } from 'react';

// images
import camera from '../../assets/icons/navbar/MooVPickr-04.svg';
import avatar from '../../assets/icons/navbar/MooVPickr-05.svg';



import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import './NavBar.css';


function NavBar() {
    const { isAuth, user, logout } = useContext( AuthContext );
    
    
    return (
        <>
            <nav>
                <Link
                    to='/'
                    className='logo-container'
                >
                    <img
                        className='home-icon-camera'
                        src={camera}
                        alt='camera-icon'
                    />
                
                </Link>
                
                <div className='nav-links'>
                    {/*<NavLink className='nav-link' to='/'>*/}
                    <NavLink
                        className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='/'
                    >
                        Movie Search
                    </NavLink>
                    
                    <NavLink
                        className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='randomizer'
                    >
                        Randomizer
                    </NavLink>
                    
                    {/*{isAuth &&*/}
                    <NavLink
                        className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='/favorites'
                    >
                        Favorites
                    </NavLink>
                    {/*}*/}
                    
                    <NavLink
                        className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='/about'
                    >
                        About
                    </NavLink>
                    
                    
                    {isAuth ?
                        <NavLink
                            className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                            to='/logout'
                        >
                            Log out
                        </NavLink>
                        :
                        <NavLink
                            className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                            to='/login'
                        >
                            Log in
                        </NavLink>
                    }
                    
                    
                    <NavLink
                        className={( { isActive } ) => isActive ? 'nav-link-active' : 'nav-link'}
                        to='/signup'
                    >
                        Sign up
                    </NavLink>
                    
                    <NavLink
                        className='profile-container welcome-user'
                        to={'/profile'}
                    >
                        <img
                            className='profile-avatar'
                            src={avatar}
                            alt='camera-icon'
                        />
                        {isAuth &&
                            <>
                                <p className='welcome-user'>Welcome {user.username}!</p>
                            </>
                            
                        }
                    </NavLink>
                
                </div>
            </nav>
        </>
    );
}

export default NavBar;
