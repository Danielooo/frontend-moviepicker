import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import isTokenValid from "../helpers/isTokenValid";


// zorgt ervoor dat andere pages kunnen abonneren op de context
export const AuthContext = createContext( {} );

function AuthContextProvider( { children } ) {
    const navigate = useNavigate();
    
    const [ auth, setAuth ] = useState( {
        isAuth: false,
        user: null,
        status: 'pending',
    } );
    
    useEffect( () => {
        try {
            const token = localStorage.getItem( 'token' );
            
            if ( token && isTokenValid( token ) ) {
                const decodedToken = jwt_decode( token );
                void fetchUserData( decodedToken.sub, token, );
            } else {
                setAuth( {
                    ...auth,
                    status: 'done'
                } );
            }
            
        } catch ( e ) {
            console.error( e );
        }
    }, [] );
    
    
    function login( JWT ) {
        localStorage.setItem( 'token', JWT );
        
        const decodedToken = jwt_decode( JWT );
        
        void fetchUserData( decodedToken.sub, JWT, '/profile' );
    }
    
    function logout() {
        localStorage.removeItem( 'token' );
        
        setAuth( {
            ...auth,
            isAuth: false,
            user: null,
            status: 'done',
        } );
        navigate( '/loggedout' );
    }
    
    
    async function fetchUserData( id, token, redirectUrl ) {
        try {
            const result = await axios.get( `https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            } );
            
            setAuth( {
                ...auth,
                isAuth: true,
                
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id
                },
                
                status: 'done',
            } );
            
            
            if ( redirectUrl ) {
                navigate( redirectUrl );
            }
        } catch ( e ) {
            console.error( e );
            setAuth( {
                ...auth,
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }
    
    // Geeft onderstaande elementen door aan de AuthContext
    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout,
    };
    
    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;