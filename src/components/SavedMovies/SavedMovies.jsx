import './SavedMovies.css';
import { useCallback, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import WindowContext from '../../contexts/WindowContext';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({
  isSavedSection,
  savedMovies,
  onClickFilter,
  filterStatus,
  searchInputValue,
  onSetSearchInputValue,
  isLoadError,
  filteredSavedMovies,
  onSetFilterSavedMovies,
  onCreateMovie,
  onRemoveMovie,
  isPreloaderActive,
}) {
  const windowWidth = useContext(WindowContext);

  const showAllMoviesSaved = useCallback(() => {
    onSetFilterSavedMovies(savedMovies);
  }, [savedMovies]);

  function showLoadMoreButton() {
    if (windowWidth > 800 && filteredSavedMovies.length > 12) {
      return true;
    }
    if (windowWidth < 768 && filteredSavedMovies.length >= 8) {
      return true;
    }
    if (windowWidth < 500 && filteredSavedMovies.length >= 5) {
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
            movies={filteredSavedMovies}
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
