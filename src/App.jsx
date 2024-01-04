import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import NavBar from './components/navbar/NavBar.jsx';
import MovieSearch from './pages/movieSearch/MovieSearch.jsx';
import About from './pages/about/About.jsx';
import Profile from './pages/profile/Profile.jsx';
import LogIn from './pages/login/LogIn.jsx';
import LogOut from './pages/logout/LogOut.jsx';
import SignUp from './pages/signUp/SignUp.jsx';
import Footer from './components/footer/Footer.jsx';
import SignedUp from "./pages/signedup/SignedUp.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Randomizer from './pages/randomizer/Randomizer.jsx';
import LoggedOut from './pages/loggedOut/LoggedOut.jsx';


function App() {
    
    const navigate = useNavigate();
    
    
    return (
        <>
            <header>
                <NavBar/>
            </header>
            
            <main>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={<MovieSearch/>}
                    />
                    <Route
                        exact
                        path='/favorites'
                        element={<Favorites/>}
                    />
                    <Route
                        exact
                        path='/about'
                        element={<About/>}
                    />
                    <Route
                        exact
                        path='/profile'
                        element={<Profile/>}
                    />
                    <Route
                        exact
                        path='/login'
                        element={<LogIn/>}
                    />
                    <Route
                        exact
                        path='/logout'
                        element={<LogOut/>}
                    />
                    <Route
                        exact
                        path='/signup'
                        element={<SignUp/>}
                    />
                    <Route
                        exact
                        path='/signedup'
                        element={<SignedUp/>}
                    />
                    <Route
                        exact
                        path='/randomizer'
                        element={<Randomizer/>}
                    />
                    <Route
                        path='*'
                        element={<PageNotFound/>}
                    />
                    <Route
                        exact
                        path='/loggedout'
                        element={<LoggedOut/>}
                    />
                
                
                </Routes>
            </main>
            
            <footer>
                <Footer/>
            </footer>
        </>
    );
}

export default App;
