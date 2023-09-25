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


	const favoritesActions = {
		favorites,
		setFavorites,
		clearFavoritesAndLocalStorageFavorites,
	}


	return (
	<FavoritesContext.Provider value={favoritesActions}>
		{children}
	</FavoritesContext.Provider>
	)
}

export default FavoritesContextProvider;