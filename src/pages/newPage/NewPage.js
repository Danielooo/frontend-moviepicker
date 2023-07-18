import React, { useState, useEffect } from 'react';
import axios from "axios";

function NewPage() {
  const [moviesByActor, setMoviesByActor] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN_ACTOR}`
    }
  };

useEffect(() => {
  async function fetchMoviesByActor(name) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/person?query=${name}`,
      options
    );
    setMoviesByActor(response.data.results);
  }
  const result = fetchMoviesByActor('Tom Cruise');
}, [moviesByActor]);


  console.log(moviesByActor)

return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}

export default NewPage;