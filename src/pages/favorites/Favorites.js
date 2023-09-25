import React, {useState, useContext} from 'react';
import './Favorites.css';
import MovieSelection from "../../components/movieselection/MovieSelection";

import {FavoritesContext} from "../../context/FavoritesContext";





function Favorites() {
	const {favorites, setFavorites, clearFavoritesAndLocalStorageFavorites} = useContext(FavoritesContext);
	
	const [loading, toggleLoading] = useState(false);


	return (
	<>
		<div className='section-container'>

			<h1>Favorites</h1>

			<p>Here's a list of all your favorite movies.</p>
			<p>If you want you can add them to your shortlist</p>

			<MovieSelection
				loading={loading}
				movies={favorites}
				// handleAddToShortlist={handleAddToShortlist}
				// isMovieInShortlist={isMovieInShortlist}
			/>
		</div>
	</>
	)
}

export default Favorites;

