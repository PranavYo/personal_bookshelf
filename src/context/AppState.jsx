import React, { useState } from 'react'
import AppContext from './AppContext'

export default function AppState(props) {

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearchResults = async (query) => {
    setLoading(true);
    const url = `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
    const response = await fetch(url);
    const responseJson = await response.json()
    setSearchResults(responseJson.docs);
    setLoading(false);
  }

  return (
    <AppContext.Provider value={{searchResults, setSearchResults, getSearchResults, loading}}>
      {props.children}
    </AppContext.Provider>
  )
}
