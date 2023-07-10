// copy from banana securyty.
// TODO: create logout function

import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import IsTokenValid from "../helpers/IsTokenValid";

// zorgt ervoor dat andere pages kunnen abonneren op de context
export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const navigate = useNavigate();

  const [ auth, setAuth] = useState({
    isAuth: false,
    user: null,
    status: 'pending',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && IsTokenValid(token)) {
      const decodedToken = jwt_decode(token);
      void fetchUserData(decodedToken.sub, token,);
    } else {
      setAuth({
        ...auth,
        status: 'done'
      })
    }
  }, []);


  function login( JWT ) {
    localStorage.setItem('token', JWT);

    const decodedToken = jwt_decode(JWT);

    void fetchUserData(decodedToken.sub, JWT, '/profile');
    console.log('login invoked')
  }

  function logout() {
    localStorage.clear();

    setAuth({
      ...auth,
      isAuth: false,
      user: null,
      status: 'done',
    });
    navigate('/');
    console.log('logout invoked')
  }


  async function fetchUserData ( id, token, redirectUrl ) {
    try {
      const result = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      setAuth({
        ...auth,
        isAuth: true,

        user: {
          username: result.data.username,
          email: result.data.email,
          id: result.data.id
        },

        status: 'done',
      });


      if (redirectUrl) {
        navigate(redirectUrl);
      }
    } catch (e) {
      console.error(e);
      setAuth( {
        ...auth,
        isAuth: false,
        user: null,
        status: 'done',
      })
    }
  }

  // Geeft onderstaande elementen door aan de AuthContext
  // Delete testNoviBackend na afmaken project
  const contextData = {
    isAuth: auth.isAuth,
    user: auth.user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {auth.status === 'done' ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;