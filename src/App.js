import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

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
