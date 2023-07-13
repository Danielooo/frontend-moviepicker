import React, { createContext, useState } from 'react'


export const ShortlistContext = createContext(null);

function ShortlistContextProvider({ children }) {
  const [ shortlist, setShortlist ] = useState([]);

  return (
    <ShortlistContext.Provider value={{shortlist, setShortlist}}>
      {children}
    </ShortlistContext.Provider>
  )
}

export default ShortlistContextProvider;