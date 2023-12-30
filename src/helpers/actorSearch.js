import axios from "axios";

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_APP_AUTH_TOKEN}`,
	},
};

export async function getActorIdByName( toggleErrorActor, toggleLoading, setActorId, actorName ) {
	try {
		toggleErrorActor( false )
		toggleLoading( true )
		
		console.log( 'getActorId invoked:', actorName )
		
		const response = await axios.get( `https://api.themoviedb.org/3/search/person?query=${actorName}`, options )
		console.log( 'response: ', response.data )
		
		console.log( 'response invoked' )
		setActorId( response.data.results[ 0 ].id )
		
		
	} catch ( e ) {
		toggleErrorActor( true )
		toggleLoading( false )
		console.error( e )
	}
}


export async function getMoviesByActorId( toggleErrorActor, toggleLoading, setMovies, actorId ) {
	try {
		toggleErrorActor( false )
		
		const response = await axios.get( `https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=vote_average.desc&vote_average.gte=7.0&vote_count.gte=200&page=1?include_adult=false`, options )
		
		setMovies( response.data.results ) // array met movies
		
	} catch ( e ) {
		toggleErrorActor( true )
		toggleLoading( false )
		console.error( e )
	}
}
