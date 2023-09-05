import React from 'react';
import './../../App.css';

function SearchOnDecade({handleDecadeSubmit, selectedDecade, setSelectedDecade, decades, errorDecade}) {

  return (

    <div>
      <form className='section-form' onSubmit={handleDecadeSubmit}>
        <div className='section-input-line'>
          <label htmlFor='DecadeInput'>Decade: </label>
          <select
            className='section-input-field'
            id='DecadeInput'
            value={selectedDecade}
            onChange={(e) => setSelectedDecade(e.target.value)}
          >
            {decades.map((decade) => (
              <option key={decade} value={decade}>
                {decade}
              </option>
            ))}
          </select>
          </div>
        <button className='regular-button' type='submit'>Search Decade</button>
      </form>
      { errorDecade && <p className='error-message'>An error occurred. Please try again</p> }
    </div>

  )
}

export default SearchOnDecade;