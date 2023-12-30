/* eslint-disable */

import React, { useContext } from "react";
import Button from "../../components/button/Button.jsx";
import './LogOut.css'

import { AuthContext } from "../../context/AuthContext.jsx";


function LogOut() {
	
	const { isAuth, user, logout } = useContext( AuthContext );
	
	
	return (
	
	<section className='section-container logout-set-width'>
		<h1>Log Out</h1>
		{isAuth ?
		<>
			<p>Are you sure you want to log out?</p>
			<Button
			text='Log Out'
			handleClick={logout}
			/>
			<a className='link-to-moviesearch' href='/'>Back to Movie Search</a>
		</>
		
		:
		<>
			<article className='logout-details'>
				<p>You are logged out</p>
				<i>Go to <a href='/'>Movie Search</a> or <a href='/login'>Log in</a></i>
			
			</article>
		</>
		}
	</section>
	)
}

export default LogOut;