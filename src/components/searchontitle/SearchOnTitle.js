import React from 'react';
import './../../App.css';

function SearchOnTitle({handleTitleSubmit, title, setTitle, errorTitle}) {
	
	return (
	<>
		<form className='section-form' onSubmit={handleTitleSubmit}>
			
			<div className='section-input-line'>
				<label htmlFor='titleInput'>Movie Title</label>
				<input
				className='section-input-field'
				placeholder="title of movie"
				type="text"
				id="titleInput"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<button className='regular-button' type="submit">Search Title
			</button>
		</form>
		{errorTitle && <p className='error-message'>Title is misspelled or not in database. Please check your entry. </p>}
	</>
	)
}

export default SearchOnTitle;