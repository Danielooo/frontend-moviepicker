import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
  },
};

export async function findActorIdByName(name) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?query=${name}`,
      options
    );

    if (response.status === 200) {
      const data = response.data;
      if (data.results.length > 0) {
        const actor = data.results[0];
        return actor.id;
      }
    }
    throw new Error(`Actor not found or error finding actor: ${response.status}`);
  } catch (error) {
    throw new Error(`Error finding actor: ${error.message}`);
  }
}

export async function findMoviesByActorId(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_cast=${id}&sort_by=popularity.desc&language=en-US&page=1`,
      options
    );

    if (response.status === 200) {
      const data = response.data;
      return data.results.slice(0, 10);
    }
    throw new Error(`Error finding movies: ${response.status}`);
  } catch (error) {
    throw new Error(`Error finding movies: ${error.message}`);
  }
}
