import NavBar from './components/navbar/NavBar';
import MovieSearch from './pages/moviesearch/MovieSearch';
import About from './pages/about/About';
import Profile from './pages/profile/Profile';
import LogIn from './pages/login/LogIn';
import LogOut from './pages/logout/LogOut';
import SignUp from './pages/signUp/SignUp';
import Wheel from './pages/wheel/Wheel';
import Footer from './components/footer/Footer';
import SignedUp from "./pages/signedup/SignedUp";


import { Routes, Route } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom';
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Favorites from "./pages/favorites/Favorites";



function App() {

    const navigate = useNavigate();

    
    return (
    <>
            <NavBar/>
            
            <main>
                <Routes>
                    <Route exact path='/' element={<MovieSearch/>}/>
                    <Route exact path='/favorites' element={<Favorites/>}/>
                    <Route exact path='/about' element={<About/>}/>
                    <Route exact path='/profile' element={<Profile/>}/>
                    <Route exact path='/login' element={<LogIn/>}/>
                    <Route exact path='/logout' element={<LogOut/>} />
                    <Route exact path='/signup' element={<SignUp/>}/>
                    <Route exact path='/signedup' element={<SignedUp/>}/>
                    <Route exact path='/wheel' element={<Wheel/>}/>
                    
                    <Route path='*' element={<PageNotFound/>}/>
                
                </Routes>
            </main>
            
            <Footer/>
    </>
    );
}

export default App;
