import { Route, Routes, useNavigate } from 'react-router-dom';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import MoviesApi from '../../utils/API/MoviesApi';
import MainApi from '../../utils/API/MainApi';
import UserAuth from '../../utils/API/UserAuth';

import WindowContext from '../../contexts/WindowContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { REACT_API_CONFIG } from '../../utils/API/mainApiConfig';
import showLoadMoreButton from '../../utils/showLoadMoreButton';
import defineCurrentWindowSize from '../../utils/defineCurrentWindowSize';
import filterMovieData from '../../utils/filterMovieData';

function App() {
  const BeatFilmAPI = new MoviesApi();
  const MainAPI = new MainApi(REACT_API_CONFIG);
  const UserAPI = new UserAuth(REACT_API_CONFIG);

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

  // show-more button for movie section
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [currentGalleryHeight, setCurrentGalleryHeight] = useState(0);
  const [moreButtonCounter, setMoreButtonCounter] = useState(0);
  const [movieGalleryHeigh, setMovieGalleryHeigh] = useState({
    large: 1068 + moreButtonCounter * (218 + 32),
    medium: 1236 + moreButtonCounter * (257 + 36),
    small: 1315 + moreButtonCounter * (235 + 20),
  });

  // saved movies
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchInputValueSaved, setSearchInputValueSaved] = useState({ searchinput: '' });
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]);
  const [isShortsSaved, setIsShortsSaved] = useState(false);

  // show-more button for saved-movie section
  const [isMoreButtonVisibleSaved, setIsMoreButtonVisibleSaved] = useState(false);
  const [currentGalleryHeightSaved, setCurrentGalleryHeightSaved] = useState(0);
  const [moreButtonCounterSaved, setMoreButtonCounterSaved] = useState(0);
  const [movieGalleryHeighSaved, setMovieGalleryHeighSaved] = useState({
    large: 1068 + moreButtonCounterSaved * (218 + 32),
    medium: 1236 + moreButtonCounterSaved * (257 + 36),
    small: 1315 + moreButtonCounterSaved * (235 + 20),
  });

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

  // First run: set search inputs
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

  // First run: get current window size
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

          setIsPreloaderActive(true);

          Promise.all([MainAPI.getAllMovies(), BeatFilmAPI.getBeatMovies()])
            .then(([savedMoviesData, beatMoviesData]) => {
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
            .catch(() => {
              setIsLoadError(() => true);
              setInfoPopUpTitle('Внимание!');
              setInfoMessage('Что-то пошло не так...');
              setIsInfoPopupOpen(!isInfoPopupOpen);
              setIsPreloaderActive(false);
            })
            .finally(() => {
              setIsPreloaderActive(false);
            });
        })
        .catch(() => {
          handleRedirectToSignIn();
        });
    }
  }, [loggedIn]);

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

  // MOVIES
  function handleSetBeatMoviesFiltered(updatedbeatMoviesFiltered) {
    setBeatMoviesFiltered(updatedbeatMoviesFiltered);
  }

  function filterBeatMovies() {
    const updatedbeatMoviesFiltered = filterMovieData(beatMovies, searchInputValue, isShorts, false);
    handleSetBeatMoviesFiltered(updatedbeatMoviesFiltered);
  }

  // filter movies
  useEffect(() => {
    filterBeatMovies();
  }, [isShorts]);

  const handleSetIsShorts = useCallback(() => {
    setIsShorts(!isShorts);
  }, [isShorts]);

  // show more button
  function handleSetMoreButtonCounter() {
    setMoreButtonCounter((prevConter) => prevConter + 1);
  }

  // define size of movie section
  useEffect(() => {
    setMovieGalleryHeigh((prevState) => ({
      ...prevState,
      // start h + n click * card h + gap * n row
      large: 1068 + moreButtonCounter * (218 + 32) * 1,
      medium: 1236 + moreButtonCounter * (257 + 36) * 1,
      small: 1315 + moreButtonCounter * (235 + 20) * 5,
    }));
  }, [windowWidth, moreButtonCounter, isShorts, beatMoviesFiltered]);

  useEffect(() => {
    const size = defineCurrentWindowSize(windowWidth);
    setCurrentGalleryHeight(movieGalleryHeigh[size]);
  }, [windowWidth, moreButtonCounter, movieGalleryHeigh]);

  // check hiddens for movie section
  useEffect(() => {
    const isMoreVisibleStatus = showLoadMoreButton(windowWidth, beatMoviesFiltered, currentGalleryHeight);
    setIsMoreButtonVisible(isMoreVisibleStatus);
  }, [windowWidth, moreButtonCounter, currentGalleryHeight, movieGalleryHeigh, navigate]);

  useEffect(() => {
    setMoreButtonCounter(0);
  }, [searchInputValue, isShorts]);

  // SAVED MOVIES
  function handleSetSavedMoviesFiltered(updatedFilteredSavedMovies) {
    setSavedMoviesFiltered(() => updatedFilteredSavedMovies);
  }

  function filterSavedMovies() {
    const updatedFilteredSavedMovies = filterMovieData(savedMovies, searchInputValueSaved, isShortsSaved, true);
    handleSetSavedMoviesFiltered(updatedFilteredSavedMovies);
  }

  useEffect(() => {
    filterSavedMovies();
  }, [isShortsSaved, savedMovies]);

  // show all saved movies if input is empty
  useEffect(() => {
    if (searchInputValueSaved === '') {
      setIsShortsSaved(!isShortsSaved);
      filterSavedMovies();
    }
  }, [searchInputValueSaved]);

  const handleSetIsShortsSaved = useCallback(() => {
    setIsShortsSaved(!isShortsSaved);
  }, [isShortsSaved]);

  // Saved more button
  function handleSetMoreButtonCounterSaved() {
    setMoreButtonCounterSaved((prevConter) => prevConter + 1);
  }

  // define size of saved-movie section
  useEffect(() => {
    setMovieGalleryHeighSaved((prevState) => ({
      ...prevState,
      // start h + n click * card h + gap * n row
      large: 1068 + moreButtonCounterSaved * (218 + 32) * 1,
      medium: 1236 + moreButtonCounterSaved * (257 + 36) * 1,
      small: 1315 + moreButtonCounterSaved * (235 + 20) * 5,
    }));
  }, [windowWidth, moreButtonCounterSaved, isShortsSaved, savedMoviesFiltered]);

  useEffect(() => {
    const size = defineCurrentWindowSize(windowWidth);
    setCurrentGalleryHeightSaved(movieGalleryHeighSaved[size]);
  }, [windowWidth, moreButtonCounterSaved, movieGalleryHeighSaved]);

  // check hiddens for saved-movie section
  useEffect(() => {
    const isMoreVisibleStatusSaved = showLoadMoreButton(windowWidth, savedMoviesFiltered, currentGalleryHeightSaved);
    setIsMoreButtonVisibleSaved(isMoreVisibleStatusSaved);
  }, [
    windowWidth,
    moreButtonCounterSaved,
    currentGalleryHeightSaved,
    movieGalleryHeighSaved,
    savedMoviesFiltered,
    navigate,
  ]);

  useEffect(() => {
    setMoreButtonCounterSaved(0);
  }, [searchInputValueSaved, isShortsSaved]);

  // CARDS
  function handleCreateMovie(movieData) {
    MainAPI.createMovie(movieData)
      .then((newMovie) => {
        // update beatfilms
        updateSavingStatus(newMovie, true);

        // add new movie to save-section
        setSavedMovies((prevSate) => [newMovie.data, ...prevSate]);
        // check card for saved filter
        setSavedMoviesFiltered((prevSate) => [newMovie.data, ...prevSate]);
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

  // USER
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
                exact
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
              <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
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
                            onClickMoreButton={handleSetMoreButtonCounter}
                            currentGalleryHeight={currentGalleryHeight}
                            isMoreButtonVisible={isMoreButtonVisible}
                          />
                        </main>

                        <Footer />
                      </>
                    }
                  />
                }
              />
              <Route />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
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
                            onClickMoreButton={handleSetMoreButtonCounterSaved}
                            currentGalleryHeight={currentGalleryHeightSaved}
                            isMoreButtonVisibleSaved={isMoreButtonVisibleSaved}
                          />
                        </main>

                        <Footer />
                      </>
                    }
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
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
                }
              />

              <Route
                path="*"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={
                      <main>
                        <PageNotFound onRedirectNotFoundToBack={handleRedirectNotFoundToBack} />
                      </main>
                    }
                  />
                }
              />
            </Routes>
          </div>
          <InfoPopUp isOpen={isInfoPopupOpen} onClose={closeInfoPopUp} message={infoMessage} title={infoPopUpTitle} />
        </div>
      </WindowContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
