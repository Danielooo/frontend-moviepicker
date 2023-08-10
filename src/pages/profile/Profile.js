import React, {useContext, useEffect, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

// TODO toon ook userid, info, role
// TODO aanpas knop voor elementen
// TODO wachtwoord veranderen

function Profile() {
  const { isAuth, user } = useContext(AuthContext);
  const [ profileData, setProfileData ] = useState({});

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
        setProfileData(response.data);
      } catch (e) {
        console.error(e)
      }
    }
    void fetchProfileData();
  }, [])

  return (
    <>
      <div className='main-outer-container'>
      <h1>Profile page</h1>

      {isAuth ?
        <>
          <section>
            <h2>Welkom!</h2>
            <p><strong>Gebruikersnaam:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </section>

          <section>
            <h2>Strikt geheime profiel-content</h2>

            {/*ZORGEN DAT PROFILEDATA TITLE EN CONTENT HIER WORDEN GETOOND*/}
            {Object.keys(profileData).length > 0 &&
              <>
                <h3>{profileData.title}</h3>
                <p>{profileData.content}</p>
              </>
            }

          </section>
          <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
        :
        <h2>Niet ingelogd</h2>
      }
      </div>
    </>
  );
}

export default Profile;
