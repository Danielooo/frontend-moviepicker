import React, {useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import './SignUp.css'

function SignUp() {

  const [error, toggleError] = useState(false);
  const [loading, toggleLoading] = useState(false);
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm();

  async function onFormSubmit({username, email, password}) {
    toggleError(false);
    toggleLoading(true);

    try {
      await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
        'username': username,
        'email': email,
        'password': password,
      });

      navigate('/signin')
    } catch (e) {
      console.error(e);
      toggleError(true);
    }

    toggleLoading(false);
  }

  return (
    <>
      <main className='main-outer-container'>
        <main className='main-inner-container'>
          <section className='section-outer-container'>
            <div className='section-inner-container'>

              <h1>Sign Up</h1>

              {/* TODO: error handling > username moet minimaal 6 tekens zijn */}
              <form onSubmit={handleSubmit(onFormSubmit)}>

                <div className='section-input-line'>
                  <label htmlFor="username-field">Username:</label>
                    <input
                      className='section-input-field'
                      type="text"
                      id="username-field"
                      {...register('username', {
                        required: {
                          value: true,
                          message: 'Dit veld is verplicht'
                        },
                      })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>


                {/* TODO: error handing > email moet een @ bevatten */}
                <div className='section-input-line'>
                <label htmlFor="email-field">Email:</label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="email-field"
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Dit veld is verplicht'
                      },
                    })}
                  />
                </div>
                  {errors.email && <p>{errors.email.message}</p>}


                {/* TODO: error handing > password moet minimaal 6 tekens zijn */}
                <div className='section-input-line'>
                <label htmlFor="password-field">Wachtwoord:</label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="password-field"
                    {...register('password', {
                      required: true,
                      // validate: (value) => value.includes('@', '!')
                    })}

                  />
                </div>
                {errors.password && <p>{errors.password.message}</p>}

                <div className='section-input-line'>
                <label htmlFor="info-field">Persoonlijke info:</label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="info-field"
                    {...register('info', {
                      required: true,
                    })}
                  />
                </div>
                {errors.info && <p>{errors.info.message}</p>}

                {/* TODO dropdown menu met opties 'user' en 'admin' */}
                <div className='section-input-line'>
                <label htmlFor="role-field">Admin or User:</label>

                  <input
                    className='section-input-field'
                    type="text"
                    id="admin-field"
                    {...register('admin', {
                      required: true,
                    })}
                  />
                </div>
                {errors.role && <p>{errors.role.message}</p>}

                <button
                  className='regular-button'
                  type='submit'
                  disabled={loading}
                >
                  Sign Up
                </button>

              </form>
            </div>
          </section>
        </main>
      </main>

    </>
  )
}

export default SignUp;