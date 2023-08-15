import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import AuthContextProvider, {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './../../App.css';

// import './login.css';


function LogIn() {
  // const [ email, setEmail ] = useState('');
  // const [ password, setPassword ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors}} = useForm();


  async function handleFormSubmit({username, password}) {
    setErrorMessage('');

    try {
      const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
        "username": username,
        "password": password,
      })

      login(response.data.accessToken);
    } catch (e) {
      console.error(e);
      setErrorMessage(e.response.status);
    }
  }


  return (
    <>
      <main className='main-outer-container'>
        <main className='main-inner-container'>
          <section className='section-outer-container'>
            <div className='section-inner-container'>

              <h1 className='login-title'>LOG IN</h1>


              <form onSubmit={handleSubmit(handleFormSubmit)}>

                {/*  Username  */}
                <div className='section-input-line'>
                  <label htmlFor="username-field" className='login-label'>
                    Username:
                  </label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="username-field"
                    {...register('username')}
                  />
                </div>

                {/*  Password  */}
                <div className='section-input-line'>
                  <label htmlFor="password-field">
                    Password:
                  </label>

                  <input
                    className='section-input-field'
                    type="password"
                    id="password-field"
                    {...register('password')}
                  />
                </div>

                <button type='submit' className='regular-button'>
                  Log in
                </button>

                {errors && <p>{errors.response}</p>}
              </form>
              { errorMessage && <p className='error-message'>
                Log in failed. Please check username an password an try again  (error code: {errorMessage})</p> }

              <p className='signup-line'>No account yet? <Link to="/signup">Sign up here</Link></p>
            </div>
          </section>
        </main>
      </main>
    </>
  )
    ;
}

export default LogIn;


