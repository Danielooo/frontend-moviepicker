import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import AuthContextProvider, {AuthContext} from "../../context/AuthContext";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import './../../App.css';

// import './logIn.css';


function LogIn() {
  // const [ email, setEmail ] = useState('');
  // const [ password, setPassword ] = useState('');
  const [error, toggleError] = useState(false);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);
  const {register, handleSubmit, formState: {errors}} = useForm();


  async function handleFormSubmit({username, password}) {
    toggleError(false);

    try {
      const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
        "username": username,
        "password": password,
      })

      login(response.data.accessToken);
    } catch (e) {
      console.error(e);
      toggleError(true);
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

                <div className='section-input-line'>
                  <label htmlFor="email-field">
                    Email:
                  </label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="email-field"
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Dit veld is verplicht'
                      },
                      minLength: {
                        value: 1,
                        message: 'Input moet minstens 1 teken bevatten'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Input mag maar max 50 tekens zijn',
                      },
                      validate: (value) => value.includes('@') || 'Email moet een @ bevatten',
                    })}
                  />
                </div>
                {errors.name && <p>{errors.name.message}</p>}


                <div className='section-input-line'>
                  <label htmlFor="password-field">
                    Wachtwoord:
                  </label>

                  <input
                    className='section-input-field'
                    type="text"
                    id="password-field"
                    {...register('password')}
                  />
                </div>

                <button type='submit' className='regular-button'>
                  Log in
                </button>

                {errors && <p>{errors.response}</p>}
              </form>

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


