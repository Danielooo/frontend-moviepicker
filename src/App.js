import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Profile from './pages/profile/Profile';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';

import { Routes, Route } from 'react-router-dom';


// Create pages:
// TODO: Create NavBar page
// TODO: Create Routes on Home page
// TODO: create Routes, import Router, Routes

function App() {
  return (
    <>
      <NavBar />

      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
