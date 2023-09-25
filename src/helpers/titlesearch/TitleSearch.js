import axios from "axios";


export async function getMoviesByTitle(toggleErrorTitle, toggleLoading, setMovies, options, movieTitle) {
	try {
		toggleErrorTitle(false)
		
		const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&page=1`, options)
		
		setMovies(response.data.results)
	} catch (e) {
		toggleErrorTitle(true)
		toggleLoading(false)
		console.error(e)
	}
}

