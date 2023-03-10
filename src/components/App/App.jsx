/* eslint-disable react/jsx-no-bind */

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

import MoviesApi from '../../utils/API/MoviesApi';
import MainApi from '../../utils/API/MainApi';
import UserAuth from '../../utils/API/UserAuth';
import { configMainAPI } from '../../utils/API/mainApiConfig';
import WindowContext from '../../contexts/WindowContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const BeatFilmAPI = new MoviesApi();
  const MainAPI = new MainApi(configMainAPI);
  const UserAPI = new UserAuth(configMainAPI);

  const navigate = useNavigate();
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // user
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // beat movies
  const [beatMovies, setBeatMovies] = useState([]);
  const [isLoadError, setIsLoadError] = useState(false);
  const [filteredBeatMovies, setFilterBeatMovies] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState({ searchinput: '' });
  const [isShorts, setIsShorts] = useState(false);
  const handleSetIsShorts = useCallback(() => {
    setIsShorts(() => !isShorts);
  }, [isShorts]);

  // saved movies
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchInputValueSaved, setSearchInputValueSaved] = useState({ searchinput: '' });
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);

  // window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  function updateSize() {
    setWindowWidth(window.innerWidth);
  }

  // saved movies
  const [isShortsSaved, setIsShortsSaved] = useState(false);

  const handleSetIsShortsSaved = useCallback(() => {
    setIsShortsSaved(() => !isShortsSaved);
  }, [isShortsSaved]);

  // update widnow size
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // first run for search inputs
  useEffect(() => {
    setSearchInputValue((prevValue) => ({
      ...prevValue,
      searchinput: '',
    }));
  }, []);

  // REDIRECT
  function handleRedirectToMain() {
    navigate('/');
  }

  function handleRedirectToMovies() {
    navigate('/movies');
  }

  function handleRedirectToSavedMovies() {
    navigate('/saved-movies');
  }

  function handleRedirectToProfile(evt) {
    evt.preventDefault();
    navigate('/profile');
  }

  function handleRedirectToSignIn() {
    navigate('/signin');
  }

  function handleRedirectToSignUp() {
    navigate('/signup');
  }

  function handleRedirectNotFoundToBack() {
    navigate(-1);
  }

  // first run: check login, get movies data
  useEffect(() => {
    if (localStorage.getItem('moviesToken')) {
      UserAPI.checkToken(localStorage.getItem('moviesToken'))
        .then((res) => {
          // if jwt secret key is changed by dev while user has active session
          if (!res || !res.data) {
            localStorage.clear();
            setLoggedIn(false);
            handleRedirectToSignIn();
            return;
          }

          setLoggedIn(true);
          setCurrentUser(res.data);
          handleRedirectToMovies();

          // get data
          Promise.all([MainAPI.getAllMovies(), BeatFilmAPI.getBeatMovies()])
            .then(([savedMoviesData, beatMoviesData]) => {
              // set saved movies
              setSavedMovies(savedMoviesData.data);
              setFilteredSavedMovies(savedMoviesData.data);

              // check if movie is saved
              const savedList = savedMoviesData.data.map((savedMovie) => savedMovie.movieId);
              const updatedBeat = beatMoviesData.map((beatMovie) =>
                savedList.includes(beatMovie.id)
                  ? Object.assign(beatMovie, { isMovieSaved: true })
                  : Object.assign(beatMovie, { isMovieSaved: false })
              );

              setBeatMovies(updatedBeat);
            })
            .catch((err) => {
              setIsLoadError(() => true);
              setErrorMessage(err.message);
              setIsInfoPopupOpen(!isInfoPopupOpen);
            });
        })
        .catch(() => {
          handleRedirectToSignIn();
        });

      // OLD get saved movies
      // MainAPI.getAllMovies()
      //   .then((res) => {
      //     setSavedMovies(res.data);
      //     setFilteredSavedMovies(res.data);
      //   })
      //   .catch((err) => {
      //     setErrorMessage(err.message);
      //     setIsInfoPopupOpen(!isInfoPopupOpen);
      //   });

      // get beat movies
      // BeatFilmAPI.getBeatMovies()
      //   .then((beatMoviesData) => {
      //     const updateBeatMoviesData = beatMoviesData.map((item) => Object.assign(item, { isMovieSaved: false }));
      //     updateBeatMoviesData.map((beatMovie) =>
      //       filteredSavedMovies.map(
      //         (savedMovie) => beatMovie.id === savedMovie.movieId && Object.assign(beatMovie, { isMovieSaved: true })
      //       )
      //     );
      //     setBeatMovies(() => updateBeatMoviesData);
      //   })
      //   .catch(() => {
      //     setIsLoadError(() => true);
      //   });
    }
  }, [loggedIn]);

  // POPUP
  const closeInfoPopUp = useCallback(() => {
    setIsInfoPopupOpen(!isInfoPopupOpen);
  }, [isInfoPopupOpen]);

  // function updateSavingStatus(status){

  // }

  // CARD ACTIONS
  function createMovie(movieData) {
    MainAPI.createMovie(movieData)
      .then((newMovie) => {
        // beatfilm section, update saved-status
        setBeatMovies(
          beatMovies.map((beatMovie) =>
            movieData.id === beatMovie.id ? { ...beatMovie, isMovieSaved: true } : { ...beatMovie }
          )
        );

        // saved section
        setSavedMovies((prevSate) => [newMovie.data, ...prevSate]);
        setFilteredSavedMovies((prevSate) => [newMovie.data, ...prevSate]);

        setFilterBeatMovies(
          filteredBeatMovies.map((beatMovie) =>
            beatMovie.id === movieData.id ? { ...beatMovie, isMovieSaved: true } : { ...beatMovie }
          )
        );
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function removeMovie(movieData) {
    const movieIdRemoved = movieData._id || savedMovies.find((item) => item.movieId === movieData.id)._id;
    // remove from db
    MainAPI.removeMovie(movieIdRemoved)
      .then(() => {
        // beatfilm section, update saved-status
        setBeatMovies((prev) =>
          prev.map((beatMovie) =>
            movieData.id === beatMovie.id ? { ...beatMovie, isMovieSaved: false } : { ...beatMovie }
          )
        );
        setFilterBeatMovies((prev) =>
          prev.map((beatMovie) =>
            beatMovie.id === movieData.id ? { ...beatMovie, isMovieSaved: false } : { ...beatMovie }
          )
        );

        // saved section
        setSavedMovies((prev) => prev.filter((savedMovie) => movieIdRemoved !== savedMovie._id && { ...savedMovie }));
        setFilteredSavedMovies((prev) =>
          prev.filter((savedMovie) => movieIdRemoved !== savedMovie._id && { ...savedMovie })
        );

      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  // USER ACTION
  function handleLoggedIn(loggedInData) {
    UserAPI.signin(loggedInData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('moviesToken', res.token);

          UserAPI.checkToken(localStorage.getItem('moviesToken'))
            .then(() => {
              setLoggedIn(true);
              handleRedirectToMovies();
            })
            .catch((err) => {
              setErrorMessage(err.message);
              setIsInfoPopupOpen(!isInfoPopupOpen);
            });
        } else {
          setLoggedIn(false);
          setIsInfoPopupOpen(!isInfoPopupOpen);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function handleUserRegister(userRegisterData) {
    UserAPI.signup(userRegisterData)
      .then((res) => {
        if (res.data) {
          handleRedirectToSignIn();
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function handleUserUpdate(userData) {
    MainAPI.updateUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: newUserData.data.name,
          email: newUserData.data.email,
        }));
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function handleUserLogout() {
    localStorage.clear();
    setLoggedIn(false);
    handleRedirectToSignIn();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <WindowContext.Provider value={windowWidth}>
        <div className="app">
          <div className="app__container">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header
                      loggedIn={loggedIn}
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
                    <Login
                      onRedirectToMain={handleRedirectToMain}
                      onHandleLoggedIn={handleLoggedIn}
                      onRedirectToAuth={handleRedirectToSignUp}
                    />
                  </main>
                }
              />

              <Route
                path="/signup"
                element={
                  <main>
                    <Register
                      onRedirectToMain={handleRedirectToMain}
                      onHandleUserRegister={handleUserRegister}
                      onRedirectToAuth={handleRedirectToSignIn}
                    />
                  </main>
                }
              />

              {loggedIn ? (
                <>
                  <Route
                    path="/movies"
                    element={
                      <>
                        <Header
                          loggedIn={loggedIn}
                          onRedirectToMain={handleRedirectToMain}
                          onRedirectToMovies={handleRedirectToMovies}
                          onRedirectToSavedMovies={handleRedirectToSavedMovies}
                          onRedirectToProfile={handleRedirectToProfile}
                          onRedirectToSignIn={handleRedirectToSignIn}
                          onRedirectToSignUp={handleRedirectToSignUp}
                        />

                        <main>
                          <Movies
                            isSavedSection={false}
                            beatMovies={beatMovies}
                            onClickFilter={handleSetIsShorts}
                            searchInputValue={searchInputValue}
                            onSetSearchInputValue={setSearchInputValue}
                            filterStatus={isShorts}
                            isLoadError={isLoadError}
                            filteredBeatMovies={filteredBeatMovies}
                            onSetFilterBeatMovies={setFilterBeatMovies}
                            onCreateMovie={createMovie}
                            onRemoveMovie={removeMovie}
                          />
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
                          loggedIn={loggedIn}
                          onRedirectToMain={handleRedirectToMain}
                          onRedirectToMovies={handleRedirectToMovies}
                          onRedirectToSavedMovies={handleRedirectToSavedMovies}
                          onRedirectToProfile={handleRedirectToProfile}
                          onRedirectToSignIn={handleRedirectToSignIn}
                          onRedirectToSignUp={handleRedirectToSignUp}
                        />

                        <main>
                          <SavedMovies
                            isSavedSection
                            savedMovies={savedMovies}
                            onClickFilter={handleSetIsShortsSaved}
                            filterStatus={isShortsSaved}
                            searchInputValue={searchInputValueSaved}
                            onSetSearchInputValue={setSearchInputValueSaved}
                            isLoadError={isLoadError}
                            filteredSavedMovies={filteredSavedMovies}
                            onSetFilterBeatMovies={setFilteredSavedMovies}
                            onCreateMovie={createMovie}
                            onRemoveMovie={removeMovie}
                          />
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
                          loggedIn={loggedIn}
                          onRedirectToMain={handleRedirectToMain}
                          onRedirectToMovies={handleRedirectToMovies}
                          onRedirectToSavedMovies={handleRedirectToSavedMovies}
                          onRedirectToProfile={handleRedirectToProfile}
                          onRedirectToSignIn={handleRedirectToSignIn}
                          onRedirectToSignUp={handleRedirectToSignUp}
                        />
                        <main>
                          <Profile onHandleSubmit={handleUserUpdate} onHandleLogOut={handleUserLogout} />
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
          <InfoPopUp isOpen={isInfoPopupOpen} onClose={closeInfoPopUp} message={errorMessage} />
        </div>
      </WindowContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
