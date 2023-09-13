import './App.css';
import Home from './components/Home';
import AppState from './context/AppState';
import { Route, Routes } from 'react-router-dom';
import BookShelf from './components/BookShelf';

function App() {
  return (
    <AppState>
      <Routes>
        <Route path='/' element={ <Home /> }  />
        <Route path='/mybookshelf' element={ <BookShelf /> } />
      </Routes>
    </AppState>
  );
}

export default App;
