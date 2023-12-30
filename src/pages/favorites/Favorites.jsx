import React, { useState, useContext } from 'react';
import './Favorites.css';
import MovieSelection from "../../components/movieselection/MovieSelection.jsx";

import { FavoritesContext } from "../../context/FavoritesContext.jsx";
import { MoviesContext } from '../../context/MoviesContext.jsx';
import Button from "../../components/button/Button.jsx";


function Favorites() {
	const { favorites, setFavorites, clearFavoritesAndLocalStorageFavorites } = useContext( FavoritesContext );
	const { movies, setMovies } = useContext( MoviesContext );
	
	const [ loading, toggleLoading ] = useState( false );
	
	return (
	<>
		<div className='section-container'>
			
			<h1>Favorites</h1>
			
			<p>
				Here's a list of all your favorite movies. <br/>If you want you can add them to your shortlist
			</p>
			
			{Object.keys( favorites ).length > 0 &&
			<Button handleClick={clearFavoritesAndLocalStorageFavorites} text='Clear Favorites'/>
			}
			
			<MovieSelection
			loading={loading}
			movies={favorites}
			setMovies={setMovies}
			/>
		</div>
	</>
	)
}

export default Favorites;

