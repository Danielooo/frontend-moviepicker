import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from './SignUp.module.css';
import Button from "../../components/button/Button.jsx";

const baseUrl = 'https://api.datavortex.nl/moviepicker'

function SignUpDatavortex() {

    // eslint-disable-next-line
    const [ error, toggleError ] = useState( false );
    const [ errorMessage, setErrorMessage ] = useState( '' );
    const [ loading, toggleLoading ] = useState( false );
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function onFormSubmit( { username, email, password, role } ) {
        toggleError( false );
        toggleLoading( true );

        try {
            await axios.post( `${baseUrl}/users`, {
                "username": "testuser",
                "email": "testuser@gmail.com",
                "password": "testpassword",
                "info": "testinfo",
                "authorities": [
                    {
                        "authority": "USER"
                    }
                ]
            } );

            navigate( '/signedup' );

        } catch ( e ) {
            console.error( e );

            if ( e.response.data.message ) {
                setErrorMessage( e.response.data.message );
            } else {
                setErrorMessage(
                    `An unknown error occurred. Please check your input and try again. Error code: ${e.response.status}` );
            }

            toggleError( true );
        }

        toggleLoading( false );
    }

    return (
        <>

            <section className={`section-container ${styles[ 'signup-set-width' ]}`}>
                <h1>Sign Up</h1>

                <form
                    className={styles[ 'signup-form' ]}
                    onSubmit={handleSubmit( onFormSubmit )}
                >

                    {/*  Username  */}
                    <div className='section-input-line'>
                        <label htmlFor='username-field'>Username:</label>
                        <input
                            className={styles[ 'section-input-field' ]}
                            type='text'
                            id='username-field'
                            {...register( 'username', {
                                required: {
                                    value: true,
                                    message: 'Username is required'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]{6,20}$/,
                                    message: 'Username must be between 6 and 20 characters and can only contain letters and numbers',
                                },
                            } )}
                        />
                    </div>
                    {errors.username && <p className='error-message'>{errors.username.message}</p>}

                    {/*  Email  */}
                    <div className='section-input-line'>
                        <label htmlFor='email-field'>Email:</label>
                        <input
                            className={styles[ 'section-input-field' ]}
                            type='text'
                            id='email-field'
                            {...register( 'email', {
                                required: {
                                    value: true,
                                    message: 'Email address is required'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Email must have an \'@\' symbol; should contain a domain (like .com or .nl) ',
                                }
                            } )}
                        />
                    </div>
                    {errors.email && <p className='error-message'>{errors.email.message}</p>}

                    {/*  Password  */}
                    <div className='section-input-line'>
                        <label htmlFor='password-field'>Password:</label>
                        <input
                            className={styles[ 'section-input-field' ]}
                            type='password'
                            id='password-field'
                            {...register( 'password', {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                pattern: {
                                    value: /^(?=.*[@!#])[a-zA-Z0-9@!#]{6,}$/,
                                    message: 'Password must contain at least 6 characters and include !, @ and #',
                                }
                            } )}

                        />
                    </div>
                    {errors.password && <p className='error-message'>{errors.password.message}</p>}

                    {/*  Role  */}
                    <div className='section-input-line'>
                        <label htmlFor='role-field'>Admin or User:</label>

                        <select
                            className={styles[ 'section-input-field' ]}
                            id='role-field'
                            {...register( 'role', {
                                required: true,
                                message: 'This field is required'
                            } )}
                        >
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                    {errors.role && <p className='error-message'>{errors.role.message}</p>}

                    <Button
                        type='submit'
                        disabled={loading}
                        text='Sign Up'
                    />
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                </form>
            </section>


        </>
    );
}

export default SignUp;