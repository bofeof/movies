import { Route, Routes } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import PageNotFound from '../NotFoundPage/PageNotFound';
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

// tmp user
const userLogIn = true;

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />

        {userLogIn ? (
          <>
            <Route path="/movies" element={<Movies isSavedSection={false} />} />
            <Route path="/saved-movies" element={<SavedMovies isSavedSection />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </>
        ) : (
          <Main />
        )}

        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
