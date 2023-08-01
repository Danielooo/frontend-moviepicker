import React from 'react';

function SearchOnActor({handleActorSubmit, actorName, setActorName, errorActor}) {

  return (
    <>
      <form onSubmit={handleActorSubmit}>
        <label htmlFor="actorNameInput">Actor Name:</label>
        <input
          type="text"
          id="actorNameInput"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />
        <button type="submit">Search Actor</button>
      </form>
      {errorActor && <p>Acteur fout gespeld of technische fout. Voer opnieuw in</p>}
    </>
)
}

export default SearchOnActor;