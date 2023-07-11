import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContextProvider, { AuthContext } from "../../context/AuthContext";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// TODO: Formulier maken
// TODO: Token opslaan in local storage
// TODO: Redirect naar home page
// TODO: Error handling

function SignIn() {
  // const [ email, setEmail ] = useState('');
  // const [ password, setPassword ] = useState('');
  const [ error, toggleError ] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();


  async function handleFormSubmit({ username, password }) {
    toggleError(false);

    try {
      const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
        "username": username,
        "password" : password,
      })

      login(response.data.accessToken);
    } catch (e) {
      console.error(e);
      toggleError(true);
    }
  }


  return (
    <>
      <h1>Sign in page</h1>

      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <label htmlFor="username-field">
          Username:

          <input
            type="text"
            id="username-field"
            {...register('username')}
          />
        </label>

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
          {errors.name && <p>{errors.name.message}</p>}
        </label>

        <label htmlFor="password-field">
          Wachtwoord:

          <input
            type="text"
            id="password-field"
            {...register('password')}
          />
        </label>

        <button type='submit'>
          Inloggen
        </button>

        {errors && <p>{errors.response}</p>}
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;


