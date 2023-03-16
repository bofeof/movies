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

  onClickMoreButton,
  currentGalleryHeight,
  isMoreButtonVisible,
}) {
  return (
    <div className="movies">
      <SearchForm
        onClickFilter={onClickFilter}
        filterStatus={filterStatus}
        onSearchSubmit={onSetBeatMoviesFiltered}
        searchInputValue={searchInputValue}
        onSetSearchInputValue={onSetSearchInputValue}
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
            currentGalleryHeight={currentGalleryHeight}
          />
          {isMoreButtonVisible && <ShowMoreButton onClickMoreButton={onClickMoreButton} />}
        </>
      )}
    </div>
  );
}
