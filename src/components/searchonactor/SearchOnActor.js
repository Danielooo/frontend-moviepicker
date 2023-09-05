import React from 'react';
import './../../App.css';

function SearchOnActor({handleActorSubmit, actorName, setActorName, errorActor}) {

  return (
    <>
      <form className='section-form' onSubmit={handleActorSubmit}>

        <div className='section-input-line'>
          <label htmlFor='actorNameInput'>Actor Name:</label>
          <input
            className='section-input-field'
            type="text"
            id="actorNameInput"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
          />
        </div>
        <button className='regular-button' type="submit">Search Actor
        </button>
      </form>
      {errorActor && <p className='error-message'>Actor is misspelled or not in database. Please check your entry. </p>}
    </>
  )
}

export default SearchOnActor;