import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

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
import InfoPopUp from '../InfoPopUp/InfoPopUp';

import BeatFilmAPI from '../../utils/API/MoviesApi';

// tmp user context
const userLogIn = true;

function App() {
  const navigate = useNavigate();
  const beatFilmAPI = new BeatFilmAPI();
  const [beatMovies, setBeatFilmsData] = useState([]);

  useEffect(() => {
    // get data from beat-movies, user info
    Promise.all([beatFilmAPI.getbeatFilms()]).then(([beatMoviesData]) => {
      setBeatFilmsData(beatMoviesData);
    });
  });

  const handleRedirectToMain = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/');
    },
    [navigate]
  );

  const handleRedirectToMovies = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/movies');
    },
    [navigate]
  );

  const handleRedirectToSavedMovies = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/saved-movies');
    },
    [navigate]
  );

  const handleRedirectToProfile = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/profile');
    },
    [navigate]
  );

  const handleRedirectToSignIn = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/signin');
    },
    [navigate]
  );

  const handleRedirectToSignUp = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/signup');
    },
    [navigate]
  );

  const handleRedirectNotFoundToBack = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate(-1);
    },
    [navigate]
  );


// beat movies
  const [isShorts, setIsShorts] = useState(false);
  const handleSetIsShorts = useCallback(() => {
    setIsShorts(() => !isShorts);
  }, [isShorts]);

  // saved movies
  const [isShortsSaved, setIsShortsSaved] = useState(false);
  const handleSetIsShortsSaved = useCallback(() => {
    setIsShortsSaved(()=> !isShortsSaved);
  }, [isShortsSaved]);

  return (
    <div className="app">
      <div className="app__container">
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

                <main>
                  <Main />
                </main>

                <Footer />
              </>
            }
          />

          <Route
            path="/signin"
            element={
              <main>
                <Login onRedirectToMain={handleRedirectToMain} />
              </main>
            }
          />

          <Route
            path="/signup"
            element={
              <main>
                <Register onRedirectToMain={handleRedirectToMain} />
              </main>
            }
          />

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

                    <main>
                      <Movies isSavedSection={false} beatMovies={beatMovies} onClickFilter={handleSetIsShorts} filterStatus={isShorts} />
                    </main>

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

                    <main>
                      <SavedMovies isSavedSection savedMovies={beatMovies} onClickFilter={handleSetIsShortsSaved} filterStatus={isShortsSaved}/>
                    </main>

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
                    <main>
                      <Profile />
                    </main>
                  </>
                }
              />

              <Route
                path="*"
                element={
                  <main>
                    <PageNotFound onRedirectNotFoundToBack={handleRedirectNotFoundToBack} />
                  </main>
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
      <InfoPopUp />
    </div>
  );
}

export default App;
