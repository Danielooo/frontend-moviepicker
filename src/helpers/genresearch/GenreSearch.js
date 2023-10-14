import React from 'react';
import axios from 'axios';

import { controller, options } from '../../pages/moviesearch/MovieSearch'


export async function getGenresAndIdsOfApi(setGenreAndIdListOfApi, toggleErrorGenreList) {
  toggleErrorGenreList(false)

  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options)

    setGenreAndIdListOfApi(response.data.genres)
    
    return function cleanup() {
      controller.abort();
    }
  } catch (e) {
    toggleErrorGenreList(true)
    console.error(e)
  }
}


export function getGenreIdByInput(
  toggleLoading, toggleErrorGenre, setGenreChoiceId, genreAndIdListOfApi, genreChoice) {

  toggleLoading(true)

  if (genreAndIdListOfApi.length > 0 && genreChoice) {
    try {

      const genre = genreAndIdListOfApi.find(genre => genre.name.toLowerCase() === genreChoice.toLowerCase());
      setGenreChoiceId(genre.id);

    } catch (e) {
      toggleLoading(false)
      toggleErrorGenre(true)
      console.error(e)
    }
  }
}

export async function getMoviesByGenreId(
  setMovies, toggleLoading, toggleErrorGenre, genreChoiceId, options) {

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreChoiceId}&sort_by=vote_average.desc&vote_average.gte=7.0&vote_count.gte=200&page=1?include_adult=false`, options)


    setMovies(response.data.results)
    
    return function cleanup() {
      controller.abort();
    }
    
  } catch (e) {
    toggleErrorGenre(true)
    console.error(e)
  
  } finally {
    toggleLoading(false)
  }
}