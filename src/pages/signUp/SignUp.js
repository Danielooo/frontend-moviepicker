import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './SignUp.css'

function SignUp() {

  const [error, toggleError] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('')
  const [loading, toggleLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {errors}} = useForm();

  async function onFormSubmit({username, email, password, role}) {


    toggleError(false);
    toggleLoading(true);

    try {
      await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
        'username': username,
        'email': email,
        'password': password,
        'role': role,
      });

      navigate('/signedup')

    } catch (e) {
      console.error(e);

      if (e.response.data.message) {
        setErrorMessage(e.response.data.message)
      } else {
        setErrorMessage(
          `An unknown error occurred. Please check your input and try again. Error code: ${e.response.status}`)
      }

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

              <form onSubmit={handleSubmit(onFormSubmit)}>

                {/*  Username  */}
                <div className='section-input-line'>
                  <label htmlFor="username-field">Username:</label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="username-field"
                    {...register('username', {
                      required: {
                        value: true,
                        message: 'Username is required'
                      },
                      minLength: {
                        value: 6,
                        message: 'Username must contain at least 6 characters',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Username must not exceed the maximum of 15 characters',
                      },
                    })}
                  />
                </div>
                  {errors.username && <p className='error-message'>{errors.username.message}</p>}

                {/*  Email  */}
                <div className='section-input-line'>
                  <label htmlFor="email-field">Email:</label>
                  <input
                    className='section-input-field'
                    type="text"
                    id="email-field"
                    {...register('email', {
                      required: {
                        value: true,
                        message: 'Email address is required'
                      },
                      minLength: 6,
                      message: 'Email address must contain at least 6 characters',
                      validate: (value) => value.includes('@') || 'Email address must contain @',
                    })}
                  />
                </div>
                {errors.email && <p className='error-message'>{errors.email.message}</p>}

                {/*  Password  */}
                <div className='section-input-line'>
                  <label htmlFor="password-field">Password:</label>
                  <input
                    className='section-input-field'
                    type="password"
                    id="password-field"
                    {...register('password', {
                      required: {
                        value: true,
                        message: 'Password is required'
                      },
                      minLength: 6,
                      message: 'Password must contain at least 6 characters',
                      validate: (value) => value.includes('@', '!', '#') || 'Password must contain characters \'@\', \'!\', \'#\'',
                    })}

                  />
                </div>
                {errors.password && <p className='error-message'>{errors.password.message}</p>}

                {/*/!*  Personal info  *!/*/}
                {/*<div className='section-input-line'>*/}
                {/*  <label htmlFor="info-field">Personal info:</label>*/}
                {/*  <input*/}
                {/*    className='section-input-field'*/}
                {/*    type="text"*/}
                {/*    id="info-field"*/}
                {/*    {...register('info', {*/}

                {/*    })}*/}
                {/*  />*/}
                {/*</div>*/}
                {/*{errors.info && <p className='error-message'>{errors.info.message}</p>}*/}

                {/*  Role  */}
                <div className='section-input-line'>
                  <label htmlFor="role-field">Admin or User:</label>

                  <select
                    className='section-input-field'
                    id="admin-field"
                    {...register('role', {
                      required: true,
                      message: 'This field is required'
                    })}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {errors.role && <p className='error-message'>{errors.role.message}</p>}

                <button
                  className='regular-button'
                  type='submit'
                  disabled={loading}
                >
                  Sign Up
                </button>
                { errorMessage && <p className='error-message'>{ errorMessage }</p> }

              </form>
            </div>
          </section>
        </main>
      </main>

    </>
  )
}

export default SignUp;