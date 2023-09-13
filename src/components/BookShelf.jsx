import React, { useEffect, useState } from 'react'
import '../styles/Bookshelf.scss'
import '../styles/Home.scss'
import { Link } from 'react-router-dom';

export default function BookShelf() {

  const [bookShelfList, setBookShelfList] = useState([])

  useEffect(() => {
    const data = localStorage.getItem('bookShelfList');
    const list = JSON.parse(data);
    setBookShelfList(list);
  }, []);
  
  return (
    <div className="container">
      <span className='title'>My Bookshelf</span>
      <Link to='/' className='btn go-back-btn'>Go back</Link>
      {((bookShelfList && bookShelfList.length === 0) || !bookShelfList) && <span className='display-message' style={{width: '13rem'}}>Your bookshelf is empty!</span>}
      <div className="body-container grid p-3">
        {
          bookShelfList &&
          bookShelfList.map((item, index) => (
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
                {/* <button onClick={() => addToBookshelf(item)} className="btn">+ Add to bookshelf</button> */}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
