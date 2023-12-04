/* eslint-disable */

import React, { useState } from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './SignUp.css'
import Button from "../../components/button/Button.jsx";

function SignUp() {
	
	// eslint-disable-next-line
	const [ error, toggleError ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' )
	const [ loading, toggleLoading ] = useState( false );
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm();
	
	async function onFormSubmit( { username, email, password, role } ) {
		
		
		toggleError( false );
		toggleLoading( true );
		
		try {
			await axios.post( 'https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
				'username': username,
				'email': email,
				'password': password,
				'role': role,
			} );
			
			navigate( '/signedup' )
			
		} catch ( e ) {
			console.error( e );
			
			if ( e.response.data.message ) {
				setErrorMessage( e.response.data.message )
			} else {
				setErrorMessage(
				`An unknown error occurred. Please check your input and try again. Error code: ${e.response.status}` )
			}
			
			toggleError( true );
		}
		
		toggleLoading( false );
	}
	
	return (
	<>
		
		<section className='section-container signup-set-width'>
			<h1>Sign Up</h1>
			
			<form onSubmit={handleSubmit( onFormSubmit )}>
				
				{/*  Username  */}
				<div className='section-input-line'>
					<label htmlFor="username-field">Username:</label>
					<input
					className='section-input-field'
					type="text"
					id="username-field"
					{...register( 'username', {
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
					} )}
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
					{...register( 'email', {
						required: {
							value: true,
							message: 'Email address is required'
						},
						minLength: 6,
						message: 'Email address must contain at least 6 characters',
						validate: ( value ) => value.includes( '@' ) || 'Email address must contain @',
					} )}
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
					{...register( 'password', {
						required: {
							value: true,
							message: 'Password is required'
						},
						minLength: 6,
						message: 'Password must contain at least 6 characters',
						validate: ( value ) => value.includes( '@', '!', '#' ) || 'Password must contain characters \'@\', \'!\', \'#\'',
					} )}
					
					/>
				</div>
				{errors.password && <p className='error-message'>{errors.password.message}</p>}
				
				{/*  Role  */}
				<div className='section-input-line'>
					<label htmlFor="role-field">Admin or User:</label>
					
					<select
					className='section-input-field'
					id="role-field"
					{...register( 'role', {
						required: true,
						message: 'This field is required'
					} )}
					>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				{errors.role && <p className='error-message'>{errors.role.message}</p>}
				
				<Button
				className='regular-button'
				type='submit'
				disabled={loading}
				text='Sign Up'
				/>
				{errorMessage && <p className='error-message'>{errorMessage}</p>}
			</form>
		</section>
	
	
	</>
	)
}

export default SignUp;