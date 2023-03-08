/* eslint-disable no-unused-vars */

import { useCallback, useState, useContext } from 'react';

import WindowContext from '../../contexts/WindowContext';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

// import Preloader from '../Preloader/Preloader';

export default function Movies({
  isSavedSection,
  beatMovies,
  onClickFilter,
  filterStatus,
  searchInputValue,
  onSetSearchInputValue,
  isLoadError,
  filteredBeatMovies,
  onSetFilterBeatMovies,
  onCreateMovie,
  onRemoveMovie
}) {
  const windowWidth = useContext(WindowContext);

  const handleFilterMovies = useCallback(
    (filterData) => {
      const newMovieData = beatMovies.filter(
        (movie) =>
          (movie?.nameRU.toLowerCase().includes(filterData.data.toLowerCase()) ||
            movie?.nameEN.toLowerCase().includes(filterData.data.toLowerCase())) &&
          (filterStatus ? movie?.duration <= 40 : movie?.duration >= 0)
      );

      onSetFilterBeatMovies(() => newMovieData);
    },
    [beatMovies, filterStatus, onSetFilterBeatMovies]
  );

  function showLoadMoreButton() {
    if (windowWidth > 800 && filteredBeatMovies.length > 12) {
      return true;
    }
    if (windowWidth < 768 && filteredBeatMovies.length >= 8) {
      return true;
    }
    if (windowWidth < 500 && filteredBeatMovies.length >= 5) {
      return true;
    }
    return false;
  }

  const hideAllMovies = useCallback (()=>{
    onSetFilterBeatMovies(() => [])
  }, [])

  return (
    <div className="movies">
      <SearchForm
        onClickFilter={onClickFilter}
        filterStatus={filterStatus}
        onSearchSubmit={handleFilterMovies}
        searchInputValue={searchInputValue}
        onSetSearchInputValue={onSetSearchInputValue}

        onShowAllMovies={null}
        onHideAllMovies={hideAllMovies}
      />
      <MoviesCardList
        isSavedSection={isSavedSection}
        movies={filteredBeatMovies}
        isLoadError={isLoadError}
        onCreateMovie={onCreateMovie}
        onRemoveMovie={onRemoveMovie}
      />
      {showLoadMoreButton() && <ShowMoreButton />}
    </div>
  );
}
