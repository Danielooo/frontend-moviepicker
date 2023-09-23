import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from 'axios';

import './Profile.css'

// TODO toon ook userid, info, role
// TODO aanpas knop voor elementen
// TODO wachtwoord veranderen

function Profile() {
    const {isAuth, user} = useContext(AuthContext);
  
  useEffect(() => {
    async function fetchProfileData() {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get('https://frontend-educational-backend.herokuapp.com/api/user', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
    
    void fetchProfileData();
  }, [])
  
  return (
  <>
    <section className='section-container profile-set-width'>
      <h1>Profile</h1>
      
      {isAuth ?
      <>
        <section>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </section>
        
        
        <p>Go to <Link to="/">Movie Search</Link></p>
      </>
      :
      (
      <>
        <p>You're currently not logged in</p>
        <p>Click <Link to={{pathname: '/login'}}>here</Link> to go to the log in page</p>
      </>
      )
      }
    </section>
  </>
  )
  ;
}

export default Profile;
