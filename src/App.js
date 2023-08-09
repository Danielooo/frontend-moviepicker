import './App.css';
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Profile from './pages/profile/Profile';
import LogIn from './pages/logIn/logIn';
import SignUp from './pages/signUp/SignUp';
import WheelPage from './pages/wheelPage/WheelPage';
import Footer from './components/footer/Footer';

import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <NavBar />

      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<SignUp />} />
          {/*<Route path='/randomizer' element={<Randomizer />} />*/}
          <Route path='/wheel' element={<WheelPage />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
