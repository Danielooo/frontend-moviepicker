import axios from "axios";
import {controller, options} from "../../pages/moviesearch/MovieSearch";


export async function getMoviesByTitle(toggleErrorTitle, toggleLoading, setMovies, movieTitle) {
	try {
		toggleErrorTitle(false)
		
		const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&page=1`, options)
		
		setMovies(response.data.results)
		
		return function cleanup() {
			controller.abort();
		}
		
	} catch (e) {
		toggleErrorTitle(true)
		console.error(e)
	
	} finally {
		toggleLoading(false)
	}
}

