import React, { createContext, useState } from 'react'


export const ShortlistContext = createContext(null);

function ShortlistContextProvider({ children }) {
  const [ shortlist, setShortlist ] = useState([]);

  const shortlistActions = {
    shortlist,
    setShortlist,
  }




  return (
    <ShortlistContext.Provider value={ shortlistActions }>
      {children}
    </ShortlistContext.Provider>
  )
}

export default ShortlistContextProvider;