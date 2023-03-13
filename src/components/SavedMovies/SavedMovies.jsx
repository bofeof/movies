import './SavedMovies.css';
import { useCallback, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import WindowContext from '../../contexts/WindowContext';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({
  isSavedSection,

  onClickFilter,
  filterStatus,
  searchInputValue,
  onSetSearchInputValue,
  isLoadError,
  savedMoviesFiltered,
  onSetFilterSavedMovies,
  onCreateMovie,
  onRemoveMovie,
  isPreloaderActive,
}) {
  const windowWidth = useContext(WindowContext);

  const showAllMoviesSaved = useCallback(() => {
    onSetFilterSavedMovies();
  }, []);

  function showLoadMoreButton() {
    if (windowWidth > 800 && savedMoviesFiltered.length > 12) {
      return true;
    }
    if (windowWidth < 768 && savedMoviesFiltered.length >= 8) {
      return true;
    }
    if (windowWidth < 500 && savedMoviesFiltered.length >= 5) {
      return true;
    }
    return false;
  }

  return (
    <div className="saved-movies">
      <SearchForm
        isSavedSection={isSavedSection}
        onClickFilter={onClickFilter}
        filterStatus={filterStatus}
        onSearchSubmit={onSetFilterSavedMovies}
        searchInputValue={searchInputValue}
        onSetSearchInputValue={onSetSearchInputValue}
        onShowAllMovies={showAllMoviesSaved}
        onHideAllMovies={null}
      />

      {isPreloaderActive ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            isSavedSection={isSavedSection}
            movies={savedMoviesFiltered}
            isLoadError={isLoadError}
            onCreateMovie={onCreateMovie}
            onRemoveMovie={onRemoveMovie}
          />
          {showLoadMoreButton() && <ShowMoreButton />}
        </>
      )}
    </div>
  );
}
