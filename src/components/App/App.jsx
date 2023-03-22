import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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

import showLoadMoreButton from '../../utils/showLoadMoreButton';
import defineCurrentWindowSize from '../../utils/defineCurrentWindowSize';
import filterMovieData from '../../utils/filterMovieData';
import clearLocalStorage from '../../utils/clearLocalStorsge';
import MOVIE_CARD_PARAMS from '../../utils/movieConstants';
import WINDOW_WIDTH from '../../utils/windowConstants';
import { REACT_API_CONFIG } from '../../utils/API/mainApiConfig';

function App() {
  const location = useLocation();

  const BeatFilmAPI = new MoviesApi();
  const MainAPI = new MainApi(REACT_API_CONFIG);
  const UserAPI = new UserAuth(REACT_API_CONFIG);

  const navigate = useNavigate();

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [infoPopUpTitle, setInfoPopUpTitle] = useState('Внимание!');

  // User
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // Beat movies
  const [beatMovies, setBeatMovies] = useState([]);
  const [isLoadError, setIsLoadError] = useState(false);
  const [beatMoviesFiltered, setBeatMoviesFiltered] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState({
    searchinput: '' || localStorage.getItem('searchInputValue'),
  });
  const [isShorts, setIsShorts] = useState(localStorage.getItem('isShorts') === 'true');

  const [isNotFoundMovies, setIsNotFoundMovies] = useState(!localStorage.getItem('isNotFoundMovies') === 'true');
  const [isFirstRunMovies, setIsFirstRunMovies] = useState(
    localStorage.getItem('isFirstRunMovies') ? localStorage.getItem('isFirstRunMovies') === 'true' : true
  );

  // Show-more button for movie section
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [currentGalleryHeight, setCurrentGalleryHeight] = useState(0);
  const [moreButtonCounter, setMoreButtonCounter] = useState(0);
  const [movieGalleryHeigh, setMovieGalleryHeigh] = useState({
    // start h + n click * card h + gap * n row
    large:
      WINDOW_WIDTH.large +
      moreButtonCounter *
        (MOVIE_CARD_PARAMS.large.movieHeight + MOVIE_CARD_PARAMS.large.movieGap) *
        MOVIE_CARD_PARAMS.large.movieRow,
    medium:
      WINDOW_WIDTH.medium +
      moreButtonCounter *
        (MOVIE_CARD_PARAMS.medium.movieHeight + MOVIE_CARD_PARAMS.medium.movieGap) *
        MOVIE_CARD_PARAMS.medium.movieRow,
    small:
      WINDOW_WIDTH.small +
      moreButtonCounter *
        (MOVIE_CARD_PARAMS.small.movieHeight + MOVIE_CARD_PARAMS.small.movieGap) *
        MOVIE_CARD_PARAMS.small.movieRow,
  });

  // Saved movies
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchInputValueSaved, setSearchInputValueSaved] = useState({
    searchinput: '' || localStorage.getItem('searchInputValueSaved'),
  });
  const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([]);
  const [isShortsSaved, setIsShortsSaved] = useState(localStorage.getItem('isShortsSaved') === 'true');

  const [isNotFoundSaved, setIsNotFoundSaved] = useState(localStorage.getItem('isNotFoundSaved') === 'true');
  const [isFirstRunSaved, setIsFirstRunSaved] = useState(
    localStorage.getItem('isFirstRunSaved') ? localStorage.getItem('isFirstRunSaved') === 'true' : true
  );

  // Show-more button for saved-movie section
  const [isMoreButtonVisibleSaved, setIsMoreButtonVisibleSaved] = useState(false);
  const [currentGalleryHeightSaved, setCurrentGalleryHeightSaved] = useState(0);
  const [moreButtonCounterSaved, setMoreButtonCounterSaved] = useState(0);
  const [movieGalleryHeighSaved, setMovieGalleryHeighSaved] = useState({
    // start h + n click save section * card h + gap * n row
    large:
      WINDOW_WIDTH.large +
      moreButtonCounterSaved *
        (MOVIE_CARD_PARAMS.large.movieHeight + MOVIE_CARD_PARAMS.large.movieGap) *
        MOVIE_CARD_PARAMS.large.movieRow,
    medium:
      WINDOW_WIDTH.medium +
      moreButtonCounterSaved *
        (MOVIE_CARD_PARAMS.medium.movieHeight + MOVIE_CARD_PARAMS.medium.movieGap) *
        MOVIE_CARD_PARAMS.medium.movieRow,
    small:
      WINDOW_WIDTH.small +
      moreButtonCounterSaved *
        (MOVIE_CARD_PARAMS.small.movieHeight + MOVIE_CARD_PARAMS.small.movieGap) *
        MOVIE_CARD_PARAMS.small.movieRow,
  });

  // Window width
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

    const hasPreviousRoute = location.key !== 'default';
    if (hasPreviousRoute) {
      navigate(-1);
    } else {
      handleRedirectToMain();
    }

  }, [navigate]);

  function redirectToSelectedUrl() {
    // for logged-in user
    if (['/signup', '/signin'].includes(location.pathname)) {
      handleRedirectToMovies();
      return;
    }
    navigate(location.pathname);
  }

  function updateSize() {
    setWindowWidth(window.innerWidth);
  }

  // Check localstorage and filters after refreshing
  function checkNotFoundFiltersSaved() {
    if (
      savedMovies.length === 0 &&
      localStorage.getItem('searchInputValueSaved') === '' &&
      localStorage.getItem('isShortsSaved') === 'false'
    ) {
      setIsFirstRunSaved(true);
      localStorage.setItem('isFirstRunSaved', true);
    } else {
      setIsFirstRunSaved(false);
      localStorage.setItem('isFirstRunSaved', false);
    }
  }

  function checkNotFoundFiltersMovies() {
    if (localStorage.getItem('searchInputValue') === '' && localStorage.getItem('isShorts') === 'false') {
      setIsFirstRunMovies(true);
      localStorage.setItem('isFirstRunMovies', true);
    } else {
      setIsFirstRunMovies(false);
      localStorage.setItem('isFirstRunMovies', false);
    }
  }

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
            clearLocalStorage();
            setLoggedIn(false);
            handleRedirectToSignIn();
            return;
          }

          setLoggedIn(true);
          setCurrentUser(res.data);

          redirectToSelectedUrl();

          setIsPreloaderActive(true);

          Promise.all([MainAPI.getAllMovies(), BeatFilmAPI.getBeatMovies()])
            .then(([savedMoviesData, beatMoviesData]) => {
              setSavedMovies(savedMoviesData.data);
              setSavedMoviesFiltered(savedMoviesData.data.reverse());

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

  // First run: check local storage and filters
  useEffect(() => {
    checkNotFoundFiltersSaved();
    checkNotFoundFiltersMovies();
  }, []);

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
  function handleSetBeatMoviesFiltered(updatedBeatMoviesFiltered) {
    setBeatMoviesFiltered(updatedBeatMoviesFiltered);
  }

  function filterBeatMovies() {
    checkNotFoundFiltersMovies();
    const updatedBeatMoviesFiltered = filterMovieData(beatMovies, searchInputValue, isShorts, false);
    handleSetBeatMoviesFiltered(updatedBeatMoviesFiltered);
    setIsNotFoundMovies(updatedBeatMoviesFiltered.length === 0);
    localStorage.setItem('isNotFoundMovies', updatedBeatMoviesFiltered.length === 0);
  }

  // // filter data - first run + if prev filter exists (local storage)
  useEffect(() => {
    checkNotFoundFiltersMovies();
    filterBeatMovies();
  }, [beatMovies]);

  // filter movies
  useEffect(() => {
    checkNotFoundFiltersMovies();
    filterBeatMovies();
  }, [isShorts, navigate]);

  const handleSetIsShorts = useCallback(() => {
    localStorage.setItem('isShorts', !isShorts);
    setIsShorts(!isShorts);
    checkNotFoundFiltersMovies();
  }, [isShorts]);

  function handleSetMoreButtonCounter() {
    setMoreButtonCounter((prevConter) => prevConter + 1);
  }

  // define size of movie section
  useEffect(() => {
    setMovieGalleryHeigh((prevState) => ({
      ...prevState,
      // start h + n click * card h + gap * n row
      large:
        WINDOW_WIDTH.large +
        moreButtonCounter *
          (MOVIE_CARD_PARAMS.large.movieHeight + MOVIE_CARD_PARAMS.large.movieGap) *
          MOVIE_CARD_PARAMS.large.movieRow,
      medium:
        WINDOW_WIDTH.medium +
        moreButtonCounter *
          (MOVIE_CARD_PARAMS.medium.movieHeight + MOVIE_CARD_PARAMS.medium.movieGap) *
          MOVIE_CARD_PARAMS.medium.movieRow,
      small:
        WINDOW_WIDTH.small +
        moreButtonCounter *
          (MOVIE_CARD_PARAMS.small.movieHeight + MOVIE_CARD_PARAMS.small.movieGap) *
          MOVIE_CARD_PARAMS.small.movieRow,
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
    checkNotFoundFiltersSaved();
    const updatedFilteredSavedMovies = filterMovieData(savedMovies, searchInputValueSaved, isShortsSaved, true);
    handleSetSavedMoviesFiltered(updatedFilteredSavedMovies);
    setIsNotFoundSaved(updatedFilteredSavedMovies.length === 0);
    localStorage.setItem('isNotFoundSaved', updatedFilteredSavedMovies.length === 0);
  }

  const handleSetIsShortsSaved = useCallback(() => {
    setIsShortsSaved((prev) => !prev);
  }, []);

  useEffect(() => {
    filterSavedMovies();
  }, []);

  useEffect(() => {
    checkNotFoundFiltersSaved();
    localStorage.setItem('isShortsSaved', isShortsSaved);
    filterSavedMovies();
  }, [isShortsSaved, savedMovies, navigate]);

  function handleSetMoreButtonCounterSaved() {
    setMoreButtonCounterSaved((prevConter) => prevConter + 1);
  }

  useEffect(() => {
    setMovieGalleryHeighSaved((prevState) => ({
      ...prevState,
      large:
        WINDOW_WIDTH.large +
        moreButtonCounterSaved *
          (MOVIE_CARD_PARAMS.large.movieHeight + MOVIE_CARD_PARAMS.large.movieGap) *
          MOVIE_CARD_PARAMS.large.movieRow,
      medium:
        WINDOW_WIDTH.medium +
        moreButtonCounterSaved *
          (MOVIE_CARD_PARAMS.medium.movieHeight + MOVIE_CARD_PARAMS.medium.movieGap) *
          MOVIE_CARD_PARAMS.medium.movieRow,
      small:
        WINDOW_WIDTH.small +
        moreButtonCounterSaved *
          (MOVIE_CARD_PARAMS.small.movieHeight + MOVIE_CARD_PARAMS.small.movieGap) *
          MOVIE_CARD_PARAMS.small.movieRow,
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

  useEffect(() => {
    localStorage.setItem('searchInputValue', searchInputValue.searchinput || '');
    localStorage.setItem('searchInputValueSaved', searchInputValueSaved.searchinput || '');
    localStorage.setItem('isShorts', isShorts);
    localStorage.setItem('isShortsSaved', isShortsSaved);
  }, [searchInputValue, searchInputValueSaved, isShorts, isShortsSaved]);

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
          handleLoggedIn({ email: userRegisterData.email, password: userRegisterData.password });
        }
      })
      .then(() => {
        setInfoPopUpTitle('Ура!');
        setInfoMessage('Вы успешно зарегистрированы и вошли в систему');
        setIsInfoPopupOpen(!isInfoPopupOpen);
      })
      .catch((err) => {
        setInfoPopUpTitle('Внимание!');
        setInfoMessage(err.message);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      });
  }

  function clearStates() {
    setCurrentUser({});
    setBeatMovies([]);
    setSavedMovies([]);
    setSavedMoviesFiltered([]);
    setBeatMoviesFiltered([]);
    setSearchInputValue('');
    setSearchInputValueSaved('');
    setIsShorts(false);
    setIsShortsSaved(false);
  }

  function handleUserLogout() {
    clearLocalStorage();
    clearStates();

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
                exact
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
                exact
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
                exact
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
                            isNotFound={isNotFoundMovies}
                            isFirstRun={isFirstRunMovies}
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
                exact
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
                            isNotFound={isNotFoundSaved}
                            isFirstRun={isFirstRunSaved}
                          />
                        </main>

                        <Footer />
                      </>
                    }
                  />
                }
              />
              <Route
                exact
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
                  <main>
                    <PageNotFound onClick={handleRedirectNotFoundToBack} />
                  </main>
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
