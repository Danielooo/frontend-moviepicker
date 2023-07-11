import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './SignUp.css'

function SignUp() {

  const [ error, toggleError ] = useState(false);
  const [ loading, toggleLoading ] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onFormSubmit({ username, email, password }) {
    toggleError(false);
    toggleLoading(true);

    try {
      await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
        'username': username ,
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
      <h1>Signup page</h1>

      {/* TODO: error handing > username moet minimaal 6 tekens zijn */}
      <form onSubmit={ handleSubmit(onFormSubmit) }>
        <label htmlFor="username-field">
          Username:
          <input
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
        </label>

        {/* TODO: error handing > email moet een @ bevatten */}
        <label htmlFor="email-field">
          Email:
          <input
            type="text"
            id="email-field"
            {...register('email', {
              required: {
                value: true,
                message: 'Dit veld is verplicht'
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        {/* TODO: error handing > password moet minimaal 6 tekens zijn */}
        <label htmlFor="password-field">
          Wachtwoord:
          <input
            type="text"
            id="password-field"
            {...register('password', {
              required: true,
              // validate: (value) => value.includes('@', '!')
            })}

          />
        </label>
        {errors.password && <p>{errors.password.message}</p>}

        <label htmlFor="info-field">
          Persoonlijke info:
          <input
            type="text"
            id="info-field"
            {...register('info', {
              required: true,
            })}
          />
        </label>
        {errors.info && <p>{errors.info.message}</p>}

        {/* TODO dropdown menu met opties 'user' en 'admin' */}
        <label htmlFor="role-field">
          Admin of User:
          <input
            type="text"
            id="admin-field"
            {...register('admin', {
              required: true,
            })}
          />
        </label>
        {errors.role && <p>{errors.role.message}</p>}

        <button
          type='submit'
          className='form-button'
          disabled={loading}
        >
          Registreer
        </button>

      </form>

    </>
  )
}

export default SignUp;