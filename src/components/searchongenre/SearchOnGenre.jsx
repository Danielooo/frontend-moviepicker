import React from 'react';

function SearchOnGenre(
  {genreAndIdListOfApi, errorGenreList, errorGenre, handleGenreSubmit, genreChoice, setGenreChoice})
{

  return(
    <>
      { genreAndIdListOfApi.length > 0 && !errorGenreList && (
          <>
            {/*component*/}
            <form className='section-form' onSubmit={handleGenreSubmit}>
              <div className='section-input-line'>
              <label htmlFor="genreInput">Genre:</label>
              <select
                className='section-input-field'
                id='genreInput'
                value={ genreChoice }
                onChange={(e) => setGenreChoice(e.target.value)}
              >
                
                {genreAndIdListOfApi.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              </div>
              <button className='regular-button' type='submit' >Search Genre</button>
            </form>
            { errorGenre && <p className='error-message'>An error occurred. Please try again</p> }

          </>
        )
      }

    { errorGenreList &&
        <p>An error occurred during fetching the genre options. Please refresh the page.</p>
    }

  </>
  )
}

export default SearchOnGenre;