import './SavedMovies.css';
import { useCallback, useContext, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import WindowContext from '../../contexts/WindowContext';
// import Preloader from '../Preloader/Preloader';

export default function SavedMovies({
  isSavedSection,
  savedMovies,
  onClickFilter,
  filterStatus,
  searchInputValue,
  onSetSearchInputValue,
  isLoadError,
  filteredSavedMovies,
  onSetFilterBeatMovies,
  onCreateMovie,
  onRemoveMovie,
}) {
  const windowWidth = useContext(WindowContext);

  const handleFilterMovies = useCallback(
    (filterData) => {
      const newMovieData = savedMovies.filter(
        (movie) =>
          (movie?.nameRU.toLowerCase().includes(filterData.data.toLowerCase()) ||
            movie?.nameEN.toLowerCase().includes(filterData.data.toLowerCase())) &&
          (filterStatus ? movie?.duration <= 40 : movie?.duration >= 0)
      );

      onSetFilterBeatMovies(() => newMovieData);
    },
    [savedMovies, filterStatus, onSetFilterBeatMovies]
  );

  const showAllMoviesSaved = useCallback(() => {
    onSetFilterBeatMovies(() => savedMovies);
  }, [savedMovies]);

  useEffect(()=>{
    onSetFilterBeatMovies(savedMovies)
  }, [savedMovies])

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
        onSearchSubmit={handleFilterMovies}
        searchInputValue={searchInputValue}
        onSetSearchInputValue={onSetSearchInputValue}
        onShowAllMovies={showAllMoviesSaved}
        onHideAllMovies={null}
      />
      <MoviesCardList
        isSavedSection={isSavedSection}
        movies={filteredSavedMovies}
        isLoadError={isLoadError}
        onCreateMovie={onCreateMovie}
        onRemoveMovie={onRemoveMovie}
      />
      {showLoadMoreButton() && <ShowMoreButton />}
    </div>
  );
}
