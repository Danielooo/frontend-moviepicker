import React, {useEffect, useState} from 'react';
import MovieCard from "../moviecard/MovieCard";
import './MovieSelection.css';

function MovieSelection({loading, movies, setMovies}) {
	
	return (
	<div className='movie-cards'>
		{loading === true && <i>Loading...</i>}
		{movies.length > 0 ? movies.map((movie) => (
		
		<MovieCard
		key={movie.id}
		movie={movie}
		setMovies={setMovies}
		/>
		))
		:
		<>
			<i>- Empty -</i>
		</>
		}
	</div>
	)
}

export default MovieSelection;