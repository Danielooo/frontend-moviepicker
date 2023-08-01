import React from 'react';

function SearchOnGenre(
  {genreAndIdListOfApi, errorGenreList, errorGenre, handleGenreSubmit, genreChoice, setGenreChoice})
{

  return(
    <>
      { genreAndIdListOfApi.length > 0 && !errorGenreList && (
          <>
            {/*component*/}
            <form onSubmit={handleGenreSubmit}>
              <label htmlFor="genreInput">Genre:</label>
              <select
                id="genreInput"
                value={ genreChoice }
                onChange={(e) => setGenreChoice(e.target.value)}
              >
                <option value=''>Select a genre</option>
                {genreAndIdListOfApi.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <button type='submit'>Search Genre</button>
            </form>
            { errorGenre && <p>Fout bij het kiezen van een genre. Probeer opnieuw</p> }

          </>
        )
      }

    { errorGenreList &&
    <p>There was an error fetching the genre options. Please try again.</p>
    }

  </>
  )
}

export default SearchOnGenre;