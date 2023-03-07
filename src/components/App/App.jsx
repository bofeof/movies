/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
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
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

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

  const [userId, setUserId] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loginName, setLoginName] = useState('');

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

  // get beat movies
  useEffect(() => {
    BeatFilmAPI.getbeatMovies()
      .then((beatMoviesData) => {
        setBeatMovies(() => beatMoviesData);
      })
      .catch(() => {
        setIsLoadError(() => true);
      });
  }, []);

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

  // FIRST RUN
  useEffect(() => {
    if (localStorage.getItem('moviesToken')) {
      UserAPI.checkToken(localStorage.getItem('moviesToken'))
        .then((res) => {
          // if jwt secret key is changed by dev while user has active session
          if (!res || !res.data) {
            // localStorage.clear();
            setLoggedIn(false);
            handleRedirectToSignIn();
            return;
          }

          setLoggedIn(true);
          setCurrentUser(res.data)
          setUserId(() => res.data._id);
          setLoginName(() => res.data.name);
          setUserEmail(() => res.data.email);
          handleRedirectToMovies();
        })
        .catch((err) => {
          handleRedirectToSignIn();
        });
    }
  }, [loggedIn]);

  // POPUP
  const closeInfoPopUp = useCallback(() => {
    setIsInfoPopupOpen(!isInfoPopupOpen);
    // setErrorMessage('');
  }, [isInfoPopupOpen]);

  // CARD ACTIONS
  function createMovie(movieData) {
    MainAPI.createCard(movieData)
      .then((newMovie) => {
        setSavedMovies((prevSate) => [newMovie.data, ...prevSate]);
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
            .then((resUser) => {
              // set res to localstorage
              setUserId(() => resUser.data._id);
              setUserEmail(() => resUser.data.email);
              setLoginName(() => resUser.data.name);

              setLoggedIn(true);
              handleRedirectToMain();
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

  function handleUserUpdate(userData){
    // UserAPI.
    // setCurrentUser()
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
                          <Profile onHandleSubmit={handleUserUpdate} onHandleLogOut={handleUserLogout}/>
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
