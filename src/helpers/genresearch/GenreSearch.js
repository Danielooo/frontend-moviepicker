import React from 'react';
import axios from 'axios';

export async function getGenresAndIdsOfApi(setGenreAndIdListOfApi, toggleErrorGenreList, options) {
  toggleErrorGenreList(false)

  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options)

    setGenreAndIdListOfApi(response.data.genres)
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
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreChoiceId}&sort_by=popularity.desc&page=1?include_adult=false`, options)


    setMovies(response.data.results)
  } catch (e) {
    toggleLoading(false)
    toggleErrorGenre(true)
    console.error(e)
  }
}