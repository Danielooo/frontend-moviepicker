import React from 'react';
import axios from 'axios';

export async function getMoviesByDecade(
  setMovies, selectedDecade, toggleLoading, toggleErrorDecade, options) {

  try {
    toggleLoading(true);
    toggleErrorDecade(false)

    const currentYear = new Date().getFullYear();
    const startYear = getStartYearForDecade(selectedDecade, currentYear);
    const endYear = startYear + 9;

    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startYear}&primary_release_date.lte=${endYear}&sort_by=popularity.desc&page=1?include_adult=false`, options
    );

    setMovies(response.data.results);
  } catch (error) {
    console.error('Error fetching movies:', error);
    toggleErrorDecade(true)
  }

  toggleLoading(false);
};


// Options for dropdown in Home
function getStartYearForDecade(selectedDecade, currentYear) {
  switch (selectedDecade) {
    case '2020s':
      return 2020;
    case '2010s':
      return 2010;
    case '2000s':
      return 2000;
    case '1990s':
      return 1990;
    case '1980s':
      return 1980;
    case '1970s':
      return 1970;
    case '1960s':
      return 1960;
    case '1950s':
      return 1950;
    case '1940s':
      return 1940;
    case '1930s':
      return 1930;
    case '1920s':
      return 1920;
    case '1910s':
      return 1910;
    case '1900s':
      return 1900;
    // Add more cases if needed
    default:
      return currentYear;
  }
}