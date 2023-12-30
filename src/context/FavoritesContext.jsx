import React, {createContext, useEffect, useState} from 'react'


export const FavoritesContext = createContext(null);

function FavoritesContextProvider({children}) {
	const [favorites, setFavorites] = useState([]);
	const [afterMount, setAfterMount] = useState(false)


	useEffect(() => {
		// checks if favorites exists. If not, declares favorites in localStorage and sets favorites to empty array
		try {
			if (localStorage.getItem('localStorageFavorites')) {
				const arrayAsString = localStorage.getItem('localStorageFavorites')
				const parsedFavorites = JSON.parse(arrayAsString);

				setFavorites(parsedFavorites)
				setAfterMount(true);

			} else {
				const emptyArray = [];
				localStorage.setItem('localStorageFavorites', JSON.stringify(emptyArray))
				setFavorites(emptyArray)
			}
		} catch (e) {
			console.error('error retrieving favorites from localStorage: ', e);
		}

	}, [])

	// Every time favorites state is updated >> localStorageFavorites is updated as well
	// if (afterMount) prevents infinite loop on favorites on mount
	useEffect(() => {
		if (afterMount) {
			favoritesToLocalStorageFavorites()
		}
	}, [favorites]);
	
	function isMovieInFavorites(movieId) {
		return favorites.some((item) => item.id === movieId);
	}

	function getLocalStorageFavorites() {
		return localStorage.getItem('localStorageFavorites')
	}

	function favoritesToLocalStorageFavorites() {
		const updatedFavorites = JSON.stringify(favorites);

		localStorage.setItem('localStorageFavorites', updatedFavorites)
	}

	function localStorageFavoritesToEmptyArray() {
		localStorage.setItem('localStorageFavorites', JSON.stringify([]))
	}

	function clearFavoritesAndLocalStorageFavorites() {
		setFavorites([])
		localStorageFavoritesToEmptyArray()
	}
	
	function handleAddToFavorites(movie, setMovies) {
		
		// if (favorites.length < 10) {
			setFavorites((prevFavorites) => [...prevFavorites, movie]);
			setMovies((prevMovies) =>
			prevMovies.map((prevMovie) =>
			prevMovie.id === movie.id ? {...prevMovie, isAdded: true} : prevMovie
			)
			);
		// } else {
		// 	alert('you can only have 10 movies in your Shortlist')
		// }
		
	}
	
	function handleRemoveFromFavorites(movie, setMovies) {
		setFavorites((prevFavorites) =>
		prevFavorites.filter((prevMovie) => prevMovie.id !== movie.id)
		);
		setMovies((prevMovies) =>
		prevMovies.map((prevMovie) =>
		prevMovie.id === movie.id ? {...prevMovie, isAdded: false} : prevMovie
		)
		);
	}


	const favoritesActions = {
		favorites,
		setFavorites,
		isMovieInFavorites,
		getLocalStorageFavorites,
		favoritesToLocalStorageFavorites,
		localStorageFavoritesToEmptyArray,
		clearFavoritesAndLocalStorageFavorites,
		handleAddToFavorites,
		handleRemoveFromFavorites
	}


	return (
	<FavoritesContext.Provider value={favoritesActions}>
		{children}
	</FavoritesContext.Provider>
	)
}

export default FavoritesContextProvider;