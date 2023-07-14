import './App.css';
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Profile from './pages/profile/Profile';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Randomizer from "./pages/randomizer/Randomizer";
// import WheelPage from './pages/wheelPage/WheelPage';

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
          <Route path='/signin' element={<SignIn />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/randomizer' element={<Randomizer />} />
          {/*<Route path='/wheelpage' element={<WheelPage />} />*/}

        </Routes>
      </div>
    </>
  );
}

export default App;
