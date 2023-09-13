import React, { useContext, useEffect, useState } from 'react'
import '../styles/Home.scss'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import { MagnifyingGlass } from 'react-loader-spinner'

export default function Home() {

  const {searchResults, getSearchResults, loading} = useContext(AppContext)

  const [hasSearched, setHasSearched] = useState(false)
  const [bookShelfList, setBookShelfList] = useState([])

  const searchDelayMs = 1000

  useEffect(() => {
    const localData = localStorage.getItem('bookShelfList');
    if(localData) {
      const list = JSON.parse(localData);
      setBookShelfList(list);
    }
  }, []);

  useEffect(() => {
    if(bookShelfList.length > 0)
      localStorage.setItem('bookShelfList', JSON.stringify(bookShelfList));
  }, [bookShelfList])
  
  let searchTimeout;
  const handeInputChange = (e) => {
    setHasSearched(true);
    const encodedQuery = encodeURI(e.target.value);
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      getSearchResults(encodedQuery);
    }, searchDelayMs);
  }

  const addToBookshelf = (item) => {
    const addedBook = bookShelfList.filter((book) => book.key === item.key);
    if(addedBook.length === 0) setBookShelfList([...bookShelfList, item]);
  }

  const isBookAdded = (item) => {
    const addedBook = bookShelfList.filter((book) => book.key === item.key); 
    return (addedBook.length > 0);
  }

  return (
    <div className='home-container'>
      <nav className='nav-bar mb-5'>
        <div className="search-bar">
          <label htmlFor='input-box' className='search-label me-3'>Search by book name:</label>
          <input type="text" id='input-box' onChange={handeInputChange} autoComplete='off' />
        </div>
        <Link className='btn' to='/mybookshelf'>My Bookshelf</Link>
      </nav>
      <div className="body-container grid p-3">
        {!loading && !hasSearched && searchResults.length === 0 && <span className='display-message' style={{width: '15rem'}}>Search results appear here</span>}
        {!loading && hasSearched && searchResults.length === 0 &&  <span className='display-message' style={{width: '10rem'}}>No results</span>}
        <MagnifyingGlass
          visible={loading}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{position: 'absolute', zIndex: '1',left: '0',
          right: '0', 
          top: '25vh',
          margin: 'auto',
          width: 'auto'}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor = '#c0efff'
          color = '#e15b64'
        />
        {
          !loading &&
          searchResults.length > 0 &&
          searchResults.map((item, index) => (
            <div key={index} className="card" style={{width: "16rem"}}>
              <img 
                src={item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`: 'https://dummyimage.com/180x190/dedede/3b3b3b&text=Image+Not+Available'} 
                className="card-img-top" 
                alt="book-cover" 
                style={{height: '15rem'}}
              />
              <div className="card-body">
                <h5 className="card-title" style={{color: '#3A4374'}}>{item.title}</h5>
                <p className="card-text"> {item.author_name && <span className='author-text'>Author:</span>} {item.author_name && item.author_name.map((d) => `${d}, `)}</p>
                <button onClick={() => addToBookshelf(item)} className="btn">{isBookAdded(item) ? 'Added' : '+ Add to bookshelf'}</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
