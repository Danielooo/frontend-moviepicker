import React from 'react';
import axios from "axios";

export async function getActorIdByName(toggleErrorActor, toggleLoading, setActorId, options, actorName) {
  try {
    toggleErrorActor(false)
    toggleLoading(true)

    const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${actorName}`, options)
    setActorId(response.data.results[0].id)


  } catch (e) {
    toggleErrorActor(true)
    toggleLoading(false)
    console.error(e)
  }
}


export async function getMoviesByActorId(toggleErrorActor, toggleLoading, setMovies, options, actorId) {
  try {
    toggleErrorActor(false)

    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=popularity.desc&page=1?include_adult=false`, options)

    setMovies(response.data.results) // array met movies
    // console.log('movies: ', movies)
  } catch (e) {
    toggleErrorActor(true)
    toggleLoading(false)
    console.error(e)
  }
}
