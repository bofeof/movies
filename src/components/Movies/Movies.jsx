
import { useCallback, useContext } from 'react';

import WindowContext from '../../contexts/WindowContext';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import Preloader from '../Preloader/Preloader';

export default function Movies({
  isSavedSection,

  onClickFilter,
  filterStatus,
  searchInputValue,
  onSetSearchInputValue,
  isLoadError,
  beatMoviesFiltered,
  onSetBeatMoviesFiltered,
  onCreateMovie,
  onRemoveMovie,
  isPreloaderActive,
}) {
  const windowWidth = useContext(WindowContext);

  function showLoadMoreButton() {
    if (windowWidth > 800 && beatMoviesFiltered.length > 12) {
      return true;
    }
    if (windowWidth < 768 && beatMoviesFiltered.length >= 8) {
      return true;
    }
    if (windowWidth < 500 && beatMoviesFiltered.length >= 5) {
      return true;
    }
    return false;
  }

  const hideAllMovies = useCallback(() => {
    onSetBeatMoviesFiltered(() => []);
  }, []);

  return (
    <div className="movies">
      <SearchForm
        onClickFilter={onClickFilter}
        filterStatus={filterStatus}
        onSearchSubmit={onSetBeatMoviesFiltered}
        searchInputValue={searchInputValue}
        onSetSearchInputValue={onSetSearchInputValue}
        onShowAllMovies={null}
        onHideAllMovies={hideAllMovies}
      />

      {isPreloaderActive ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            isSavedSection={isSavedSection}
            movies={beatMoviesFiltered}
            isLoadError={isLoadError}
            onCreateMovie={onCreateMovie}
            onRemoveMovie={onRemoveMovie}
            isPreloaderActive={isPreloaderActive}
          />
          {showLoadMoreButton() && <ShowMoreButton />}
        </>
      )}
    </div>
  );
}
