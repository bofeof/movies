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
  const [infoMessage, setInfoMessage] = useState('');

  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [infoPopUpTitle, setInfoPopUpTitle] = useState('Внимание!');

  // user
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // beat movies
  const [beatMovies, setBeatMovies] = useState([]);
  const [isLoadError, setIsLoadError] = useState(false);
  const [beatMoviesFiltered, setBeatMoviesFiltered] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState({ searchinput: '' });
  const [isShorts, setIsShorts] = useState(false);

  // saved movies
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchInputValueSaved, setSearchInputValueSaved] = useState({ searchinput: '' });
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]);
  const [isShortsSaved, setIsShortsSaved] = useState(false);

  // window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Redirect
  const handleRedirectToMain = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleRedirectToMovies = useCallback(() => {
    navigate('/movies');
  }, [navigate]);

  const handleRedirectToSavedMovies = useCallback(() => {
    navigate('/saved-movies');
  }, [navigate]);

  const handleRedirectToProfile = useCallback(
    (evt) => {
      evt.preventDefault();
      navigate('/profile');
    },
    [navigate]
  );

  const handleRedirectToSignIn = useCallback(() => {
    navigate('/signin');
  }, [navigate]);

  const handleRedirectToSignUp = useCallback(() => {
    navigate('/signup');
  }, [navigate]);

  const handleRedirectNotFoundToBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  function updateSize() {
    setWindowWidth(window.innerWidth);
  }

  // First run: search inputs
  useEffect(() => {
    setSearchInputValue((prevValue) => ({
      ...prevValue,
      searchinput: '',
    }));
    setSearchInputValueSaved((prevValue) => ({
      ...prevValue,
      searchinput: '',
    }));
  }, []);

  // update widnow size
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // First run: check login, get movies data
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

          // get data + preloader
          setIsPreloaderActive(!isPreloaderActive);

          Promise.all([MainAPI.getAllMovies(), BeatFilmAPI.getBeatMovies()])
            .then(([savedMoviesData, beatMoviesData]) => {
              // set saved movies
              setSavedMovies(savedMoviesData.data);
              setSavedMoviesFiltered(savedMoviesData.data.reverse());

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
              setInfoPopUpTitle('Внимание!');
              setInfoMessage(err.message);
              setIsInfoPopupOpen(!isInfoPopupOpen);
            })
            .finally(setIsPreloaderActive(!isPreloaderActive));
        })
        .catch(() => {
          handleRedirectToSignIn();
        });
    }
  }, [loggedIn]);

  // POPUP
  const closeInfoPopUp = useCallback(() => {
    setIsInfoPopupOpen(!isInfoPopupOpen);
  }, [isInfoPopupOpen]);

  function updateSavingStatus(movieUpdated, status) {
    setBeatMovies(
      beatMovies.map((beatMovie) =>
        movieUpdated.data.movieId === beatMovie.id ? { ...beatMovie, isMovieSaved: status } : { ...beatMovie }
      )
    );

    setBeatMoviesFiltered(
      beatMoviesFiltered.map((beatMovie) =>
        movieUpdated.data.movieId === beatMovie.id ? { ...beatMovie, isMovieSaved: status } : { ...beatMovie }
      )
    );
  }

  // FILTERS
  // update filtered lists of movies
  function handleSetBeatMoviesFiltered(updatedbeatMoviesFiltered) {
    setBeatMoviesFiltered(updatedbeatMoviesFiltered);
  }

  function handleSetFilterSavedMovies(updatedFilteredSavedMovies) {
    setSavedMoviesFiltered(() => updatedFilteredSavedMovies);
  }

  // select data w/ filters
  function filterMovieData(movies, searchValue, shortsFilter, isSavedSection) {
    if (searchValue.searchinput === '' && !isSavedSection) {
      return [];
    }
    const updatedMovies = movies.filter(
      (movie) =>
        (movie?.nameRU.toLowerCase().includes(searchValue.searchinput.toLowerCase()) ||
          movie?.nameEN.toLowerCase().includes(searchValue.searchinput.toLowerCase())) &&
        (shortsFilter ? movie?.duration <= 40 : movie?.duration >= 0)
    );
    return updatedMovies;
  }

  function filterBeatMovies() {
    const updatedbeatMoviesFiltered = filterMovieData(beatMovies, searchInputValue, isShorts, false);
    handleSetBeatMoviesFiltered(updatedbeatMoviesFiltered);
  }

  function filterSavedMovies() {
    const updatedFilteredSavedMovies = filterMovieData(savedMovies, searchInputValueSaved, isShortsSaved, true);
    handleSetFilterSavedMovies(updatedFilteredSavedMovies);
  }

  useEffect(() => {
    filterBeatMovies();
  }, [isShorts]);

  useEffect(() => {
    filterSavedMovies();
  }, [isShortsSaved, savedMovies]);

  // filters
  const handleSetIsShorts = useCallback(() => {
    setIsShorts(!isShorts);
  }, [isShorts]);

  const handleSetIsShortsSaved = useCallback(() => {
    setIsShortsSaved(!isShortsSaved);
  }, [isShortsSaved]);

  // CARD ACTIONS
  function handleCreateMovie(movieData) {
    MainAPI.createMovie(movieData)
      .then((newMovie) => {
        // update beatfilms
        updateSavingStatus(newMovie, true);

        // add new movie to save-section
        setSavedMovies((prevSate) => [newMovie.data, ...prevSate]);
        // check card for saved filter
        setSavedMoviesFiltered((prevSate) => [newMovie.data, ...prevSate]);
        // filterSavedMovies();
      })
      .catch((err) => {
        setInfoPopUpTitle('Внимание!');
        setInfoMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function handleRemoveMovie(movieData) {
    const movieIdRemoved = movieData._id || savedMovies.find((item) => item.movieId === movieData.id)._id;
    // remove from db
    MainAPI.removeMovie(movieIdRemoved)
      .then((removedMovie) => {
        // update beatfilms
        updateSavingStatus(removedMovie, false);

        // saved section
        setSavedMovies((prev) => prev.filter((savedMovie) => movieIdRemoved !== savedMovie._id && { ...savedMovie }));
        setSavedMoviesFiltered((prev) =>
          prev.filter((savedMovie) => movieIdRemoved !== savedMovie._id && { ...savedMovie })
        );
      })
      .catch((err) => {
        setInfoPopUpTitle('Внимание!');
        setInfoMessage(err.message);
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
              setInfoPopUpTitle('Внимание!');
              setInfoMessage(err.message);
              setIsInfoPopupOpen(!isInfoPopupOpen);
            });
        } else {
          setLoggedIn(false);
          setInfoPopUpTitle('Внимание!');
          setInfoMessage('Непредвиденная ошибка. Повторите свое действие еще раз');
          setIsInfoPopupOpen(!isInfoPopupOpen);
        }
      })
      .catch((err) => {
        setInfoPopUpTitle('Внимание!');
        setInfoMessage(err.message);
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
      .then(() => {
        setInfoPopUpTitle('Ура!');
        setInfoMessage('Вы успешно зарегистрированы');
        setIsInfoPopupOpen(!isInfoPopupOpen);
      })
      .catch((err) => {
        setInfoPopUpTitle('Внимание!');
        setInfoMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function handleUserLogout() {
    localStorage.clear();
    setLoggedIn(false);
    handleRedirectToMain();
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
      .then(() => {
        setInfoPopUpTitle('Ура!');
        setInfoMessage('Данные изменены');
        setIsInfoPopupOpen(!isInfoPopupOpen);
      })
      .catch((err) => {
        setInfoPopUpTitle('Внимание!');
        setInfoMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
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
                            beatMoviesFiltered={beatMoviesFiltered}
                            onSetBeatMoviesFiltered={filterBeatMovies}
                            onCreateMovie={handleCreateMovie}
                            onRemoveMovie={handleRemoveMovie}
                            isPreloaderActive={isPreloaderActive}
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
                            savedMoviesFiltered={savedMoviesFiltered}
                            onSetFilterSavedMovies={filterSavedMovies}
                            onCreateMovie={handleCreateMovie}
                            onRemoveMovie={handleRemoveMovie}
                            isPreloaderActive={isPreloaderActive}
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
          <InfoPopUp isOpen={isInfoPopupOpen} onClose={closeInfoPopUp} message={infoMessage} title={infoPopUpTitle} />
        </div>
      </WindowContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
