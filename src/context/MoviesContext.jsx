import React, { createContext, useState } from 'react';


export const MoviesContext = createContext(null);


function MoviesContextProvider({children}) {
	
	const [movies, setMovies] = useState([])
	
	const moviesData = {
		movies: movies,
		setMovies: setMovies,
	}
	
	return (
		<MoviesContext.Provider value={moviesData}>
			{children}
		</MoviesContext.Provider>
	)
}

export default MoviesContextProvider;