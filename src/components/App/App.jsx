import { Route, Routes, Navigate } from 'react-router-dom';

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

// tmp user context
const userLogIn = true;

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />

        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />

        {userLogIn ? (
          <>
            <Route
              path="/movies"
              element={
                <>
                  <Header />
                  <Movies isSavedSection={false} />
                  <Footer />
                </>
              }
            />

            <Route
              path="/saved-movies"
              element={
                <>
                  <Header />
                  <SavedMovies isSavedSection />
                  <Footer />
                </>
              }
            />

            <Route
              path="/profile"
              element={
                <>
                  <Header />
                  <Profile />
                </>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
