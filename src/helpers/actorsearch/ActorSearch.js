import React from 'react';
import axios from "axios";

import { controller, options } from '../../pages/moviesearch/MovieSearch';

export async function getActorIdByName(toggleErrorActor, toggleLoading, setActorId, actorName) {
  try {
    toggleErrorActor(false)
    toggleLoading(true)

    const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${actorName}`, options)
    setActorId(response.data.results[0].id)


    return function cleanup() {
      controller.abort();
    }
    
  } catch (e) {
    toggleErrorActor(true)
    console.error(e)
  
  } finally {
    toggleLoading(false);
  }
}


export async function getMoviesByActorId(toggleErrorActor, toggleLoading, setMovies, actorId) {
  try {
    toggleErrorActor(false)

    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=vote_average.desc&vote_average.gte=7.0&vote_count.gte=200&page=1?include_adult=false`, options)

    setMovies(response.data.results) // array met movies
    
    return function cleanup() {
      controller.abort();
    }
    
  } catch (e) {
    toggleErrorActor(true)
    console.error(e)
    
  } finally {
    toggleLoading(false);
  }
}
