import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

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
  const navigate = useNavigate();

  const handleRedirectToMain = useCallback((evt) => {
    evt.preventDefault();
    navigate('/');
  }, [navigate]);

  const handleRedirectToMovies = useCallback((evt) => {
    evt.preventDefault();
    navigate('/movies');
  }, [navigate]);

  const handleRedirectToSavedMovies = useCallback((evt) => {
    evt.preventDefault();
    navigate('/saved-movies');
  }, [navigate]);

  const handleRedirectToProfile = useCallback((evt) => {
    evt.preventDefault();
    navigate('/profile');
  }, [navigate]);

  const handleRedirectToSignIn = useCallback((evt) => {
    evt.preventDefault();
    navigate('/signin');
  }, [navigate]);

  const handleRedirectToSignUp = useCallback((evt) => {
    evt.preventDefault();
    navigate('/signup');
  }, [navigate]);


  const handleRedirectNotFoundToBack = useCallback((evt) => {
    evt.preventDefault();
    navigate(-1);
  }, [navigate]);

  return (
    <div className="app">
      <div className='app__container'>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  userLogIn={userLogIn}
                  onRedirectToMain={handleRedirectToMain}
                  onRedirectToMovies={handleRedirectToMovies}
                  onRedirectToSavedMovies={handleRedirectToSavedMovies}
                  onRedirectToProfile={handleRedirectToProfile}
                  onRedirectToSignIn={handleRedirectToSignIn}
                  onRedirectToSignUp={handleRedirectToSignUp}
                />
                <Main />
                <Footer />
              </>
            }
          />

          <Route path="/signin" element={<Login onRedirectToMain={handleRedirectToMain} />} />
          <Route path="/signup" element={<Register onRedirectToMain={handleRedirectToMain} />} />

          {userLogIn ? (
            <>
              <Route
                path="/movies"
                element={
                  <>
                    <Header
                      userLogIn={userLogIn}
                      onRedirectToMain={handleRedirectToMain}
                      onRedirectToMovies={handleRedirectToMovies}
                      onRedirectToSavedMovies={handleRedirectToSavedMovies}
                      onRedirectToProfile={handleRedirectToProfile}
                      onRedirectToSignIn={handleRedirectToSignIn}
                      onRedirectToSignUp={handleRedirectToSignUp}
                    />
                    <Movies isSavedSection={false} />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/saved-movies"
                element={
                  <>
                    <Header
                      userLogIn={userLogIn}
                      onRedirectToMain={handleRedirectToMain}
                      onRedirectToMovies={handleRedirectToMovies}
                      onRedirectToSavedMovies={handleRedirectToSavedMovies}
                      onRedirectToProfile={handleRedirectToProfile}
                      onRedirectToSignIn={handleRedirectToSignIn}
                      onRedirectToSignUp={handleRedirectToSignUp}
                    />
                    <SavedMovies isSavedSection />
                    <Footer />
                  </>
                }
              />

              <Route
                path="/profile"
                element={
                  <>
                    <Header
                      userLogIn={userLogIn}
                      onRedirectToMain={handleRedirectToMain}
                      onRedirectToMovies={handleRedirectToMovies}
                      onRedirectToSavedMovies={handleRedirectToSavedMovies}
                      onRedirectToProfile={handleRedirectToProfile}
                      onRedirectToSignIn={handleRedirectToSignIn}
                      onRedirectToSignUp={handleRedirectToSignUp}
                    />
                    <Profile />
                  </>
                }
              />

              <Route path="*" element={<PageNotFound onRedirectNotFoundToBack = {handleRedirectNotFoundToBack} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
