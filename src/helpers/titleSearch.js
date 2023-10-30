import axios from "axios";



const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
	},
};

export async function getMoviesByTitle(toggleErrorTitle, toggleLoading, setMovies, movieTitle) {
	
	try {
		toggleErrorTitle(false)
		console.log('movietitle: ', movieTitle)
		
		const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&page=1`, options)
	
		console.log('response results: ', response.data.results)
		
		setMovies(response.data.results)
		
		
	} catch (e) {
		toggleErrorTitle(true)
		console.error(e)
	
	} finally {
		toggleLoading(false)
	}
}

