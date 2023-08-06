import React from 'react';
import './../../App.css';

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
                id="genreInput"
                value={ genreChoice }
                onChange={(e) => setGenreChoice(e.target.value)}
                // onKeyDown={(e) => {
                //   if (e.key === 'Enter') {
                //     handleGenreSubmit(); // Call your submit function
                //   }
                // }}

              >
                <option value=''>Select a genre</option>
                {genreAndIdListOfApi.map((genre) => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              </div>
              <button className='regular-button' type='submit'>Search Genre</button>
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