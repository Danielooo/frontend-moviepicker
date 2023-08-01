import React from 'react';

function SearchOnDecade({handleDecadeSubmit, selectedDecade, setSelectedDecade, decades, errorDecade}) {

  return (

    <div>
      <form onSubmit={handleDecadeSubmit}>
        <label htmlFor='DecadeInput'>Decade: </label>
        <select
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
        <button type='submit'>Search Decade</button>
      </form>
      { errorDecade && <p>Fout bij het kiezen van een decennium. Probeer opnieuw</p> }
    </div>

  )
}

export default SearchOnDecade;