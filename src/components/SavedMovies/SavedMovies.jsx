import './SavedMovies.css';
import { useCallback } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
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

  onClickMoreButton,
  currentGalleryHeight,
  isMoreButtonVisibleSaved
}) {

  const showAllMoviesSaved = useCallback(() => {

    onSetFilterSavedMovies();
  }, []);

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
            currentGalleryHeight = {currentGalleryHeight}
          />
          {isMoreButtonVisibleSaved && <ShowMoreButton onClickMoreButton = {onClickMoreButton} />}
        </>
      )}
    </div>
  );
}
