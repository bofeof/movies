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
import MainContent from '../MainContent/MainContent';

import MoviesApi from '../../utils/API/MoviesApi';
import MainApi from '../../utils/API/MainApi';
import UserAuth from '../../utils/API/UserAuth';

import WindowContext from '../../contexts/WindowContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import showLoadMoreButton from '../../utils/showLoadMoreButton';
import defineCurrentWindowSize from '../../utils/defineCurrentWindowSize';
import filterMovieData from '../../utils/filterMovieData';
import clearLocalStorage from '../../utils/clearLocalStorsge';
import defineGalleryHeight from '../../utils/defineGalleryHeight';
import { REACT_API_CONFIG } from '../../utils/API/mainApiConfig';
import USER_MESSAGES from '../../utils/userMessages';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const BeatFilmAPI = new MoviesApi();
  const MainAPI = new MainApi(REACT_API_CONFIG);
  const UserAPI = new UserAuth(REACT_API_CONFIG);

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  const [isPreloaderActive, setIsPreloaderActive] = useState(false);
  const [infoPopUpTitle, setInfoPopUpTitle] = useState(USER_MESSAGES.errorHeader);

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
  const [movieGalleryHeigh, setMovieGalleryHeight] = useState(defineGalleryHeight(moreButtonCounter));

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
  const [movieGalleryHeighSaved, setMovieGalleryHeightSaved] = useState(defineGalleryHeight(moreButtonCounterSaved));

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
    if (['/signup', '/signin'].includes(location.pathname) && loggedIn) {
      handleRedirectToMovies();
      return;
    }
    navigate(location.pathname);
  }

  function updateSize() {
    setWindowWidth(window.innerWidth);
  }

  function showErrorPopUp(err) {
    setInfoPopUpTitle(USER_MESSAGES.errorHeader);
    setInfoMessage(err.message);
    setIsInfoPopupOpen(!isInfoPopupOpen);
  }

  // Check localstorage and filters after refreshing
  function checkNotFoundFiltersSaved() {
    if (
      savedMovies.length === 0 &&
      localStorage.getItem('searchInputValueSaved') === '' &&
      localStorage.getItem('isShortsSaved') === 'false'
    ) {
      setIsFirstRunSaved(true);
    } else {
      setIsFirstRunSaved(false);
    }
  }

  function checkNotFoundFiltersMovies() {
    if (localStorage.getItem('searchInputValue') === '' && localStorage.getItem('isShorts') === 'false') {
      setIsFirstRunMovies(true);
    } else {
      setIsFirstRunMovies(false);
    }
  }

  // save all states of saved and beat movies locally
  useEffect(() => {
    localStorage.setItem('searchInputValue', searchInputValue.searchinput || '');
    localStorage.setItem('searchInputValueSaved', searchInputValueSaved.searchinput || '');
    localStorage.setItem('isShorts', isShorts);
    localStorage.setItem('isShortsSaved', isShortsSaved);
    localStorage.setItem('isNotFoundMovies', beatMoviesFiltered.length === 0);
    localStorage.setItem('isNotFoundSaved', savedMoviesFiltered.length === 0);

    localStorage.setItem('isFirstRunMovies', isFirstRunMovies);
    localStorage.setItem('isFirstRunSaved', isFirstRunSaved);
  }, [
    searchInputValue,
    searchInputValueSaved,
    isShorts,
    isShortsSaved,
    savedMoviesFiltered,
    isFirstRunMovies,
    isFirstRunSaved,
  ]);

  // First run: get current window size
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // First run: check login, get movies data
  useEffect(() => {
    UserAPI.checkUser()
      .then((res) => {
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
            setInfoPopUpTitle(USER_MESSAGES.errorHeader);
            setInfoMessage(USER_MESSAGES.errorTextUnexpected);
            setIsInfoPopupOpen(!isInfoPopupOpen);
            setIsPreloaderActive(false);
          })
          .finally(() => {
            setIsPreloaderActive(false);
          });
      })
      .catch(() => {
        redirectToSelectedUrl();
      });
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

  function handleSetMoreButtonCounter() {
    setMoreButtonCounter((prevConter) => prevConter + 1);
  }

  function filterBeatMovies() {
    checkNotFoundFiltersMovies();
    const updatedBeatMoviesFiltered = filterMovieData(beatMovies, searchInputValue, isShorts, false);
    handleSetBeatMoviesFiltered(updatedBeatMoviesFiltered);
    setIsNotFoundMovies(updatedBeatMoviesFiltered.length === 0);
  }

  const handleSetIsShorts = useCallback(() => {
    setIsShorts(!isShorts);
    checkNotFoundFiltersMovies();
  }, [isShorts]);

  useEffect(() => {
    checkNotFoundFiltersMovies();
    filterBeatMovies();
  }, [beatMovies, isShorts, navigate]);

  useEffect(() => {
    const galleryHeightParams = defineGalleryHeight(moreButtonCounter);
    setMovieGalleryHeight((prevState) => ({
      ...prevState,
      ...galleryHeightParams,
    }));
  }, [windowWidth, moreButtonCounter, beatMoviesFiltered]);

  useEffect(() => {
    const size = defineCurrentWindowSize(windowWidth);
    setCurrentGalleryHeight(movieGalleryHeigh[size]);
  }, [windowWidth, movieGalleryHeigh]);

  useEffect(() => {
    const isMoreVisibleStatus = showLoadMoreButton(windowWidth, beatMoviesFiltered, currentGalleryHeight);
    setIsMoreButtonVisible(isMoreVisibleStatus);
  }, [windowWidth, currentGalleryHeight, movieGalleryHeigh, beatMoviesFiltered, moreButtonCounter, navigate]);

  // reset counter if filter\input data is changed
  useEffect(() => {
    setMoreButtonCounter(0);
  }, [searchInputValue, isShorts]);

  // SAVED MOVIES
  function handleSetSavedMoviesFiltered(updatedFilteredSavedMovies) {
    setSavedMoviesFiltered(() => updatedFilteredSavedMovies);
  }

  function handleSetMoreButtonCounterSaved() {
    setMoreButtonCounterSaved((prevConter) => prevConter + 1);
  }

  function filterSavedMovies() {
    checkNotFoundFiltersSaved();
    const updatedFilteredSavedMovies = filterMovieData(savedMovies, searchInputValueSaved, isShortsSaved, true);
    handleSetSavedMoviesFiltered(updatedFilteredSavedMovies);
    setIsNotFoundSaved(updatedFilteredSavedMovies.length === 0);
  }

  const handleSetIsShortsSaved = useCallback(() => {
    setIsShortsSaved(!isShortsSaved);
  }, [isShortsSaved]);

  useEffect(() => {
    filterSavedMovies();
  }, [isShortsSaved, savedMovies, navigate]);

  useEffect(() => {
    const galleryHeight = defineGalleryHeight(moreButtonCounterSaved);
    setMovieGalleryHeightSaved((prevState) => ({
      ...prevState,
      ...galleryHeight,
    }));
  }, [windowWidth, moreButtonCounterSaved, isShortsSaved, savedMoviesFiltered]);

  useEffect(() => {
    const size = defineCurrentWindowSize(windowWidth);
    setCurrentGalleryHeightSaved(movieGalleryHeighSaved[size]);
  }, [windowWidth, moreButtonCounterSaved, movieGalleryHeighSaved]);

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
        updateSavingStatus(newMovie, true);
        setSavedMovies((prevSate) => [newMovie.data, ...prevSate]);
        setSavedMoviesFiltered((prevSate) => [newMovie.data, ...prevSate]);
      })
      .catch((err) => {
        showErrorPopUp(err);
      });
  }

  function handleRemoveMovie(movieData) {
    const movieIdRemoved = movieData._id || savedMovies.find((item) => item.movieId === movieData.id)._id;
    MainAPI.removeMovie(movieIdRemoved)
      .then((removedMovie) => {
        updateSavingStatus(removedMovie, false);
        setSavedMovies((prev) => prev.filter((savedMovie) => movieIdRemoved !== savedMovie._id && { ...savedMovie }));
        setSavedMoviesFiltered((prev) =>
          prev.filter((savedMovie) => movieIdRemoved !== savedMovie._id && { ...savedMovie })
        );
      })
      .catch((err) => {
        showErrorPopUp(err);
      });
  }

  // USER
  function handleLoggedIn(loggedInData) {
    UserAPI.signin(loggedInData)
      .then((res) => {
        if (res.message === 'Пользователь зашел в аккаунт') {
          UserAPI.checkUser()
            .then(() => {
              setLoggedIn(true);
              handleRedirectToMovies();
            })
            .catch((err) => {
              showErrorPopUp(err);
            });
        } else {
          setLoggedIn(false);
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        showErrorPopUp(err);
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
        setInfoPopUpTitle(USER_MESSAGES.successHeader);
        setInfoMessage(USER_MESSAGES.successTextRegister);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      })
      .catch((err) => {
        showErrorPopUp(err);
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
    UserAPI.signout()
      .then(() => {
        clearLocalStorage();
        clearStates();
        setLoggedIn(false);
        handleRedirectToMain();
      })
      .catch((err) => {
        showErrorPopUp(err);
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
      .then(() => {
        setInfoPopUpTitle(USER_MESSAGES.successHeader);
        setInfoMessage(USER_MESSAGES.successTextDataChanged);
        setIsInfoPopupOpen(!isInfoPopupOpen);
      })
      .catch((err) => {
        showErrorPopUp(err);
      });
  }

  const headerOptions = {
    loggedIn,
    onRedirectToMain: () => handleRedirectToMain,
    onRedirectToMovies: () => handleRedirectToMovies(),
    onRedirectToSavedMovies: () => handleRedirectToSavedMovies(),
    onRedirectToProfile: (evt) => handleRedirectToProfile(evt),
    onRedirectToSignIn: () => handleRedirectToSignIn(),
    onRedirectToSignUp: () => handleRedirectToSignUp(),
  };

  const loginOptions = {
    onRedirectToMain: () => handleRedirectToMain(),
    onLoggedIn: (loggedInData) => handleLoggedIn(loggedInData),
    onRedirectToAuth: () => handleRedirectToSignUp(),
  };

  const registerOption = {
    onRedirectToMain: () => handleRedirectToMain(),
    onUserRegister: (userRegisterData) => handleUserRegister(userRegisterData),
    onRedirectToAuth: () => handleRedirectToSignIn(),
  };

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
                  <MainContent isHeaderRequired isFooterRequired headerOptions={headerOptions} element={<Main />} />
                }
              />
              <Route
                exact
                path="/signin"
                element={
                  <MainContent
                    isHeaderRequired={false}
                    isFooterRequired={false}
                    element={<Login loginOptions={loginOptions} />}
                  />
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  <main>
                    <Register registerOption={registerOption} />
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
