import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

import Preloader from '../Preloader/Preloader';

export default function Movies({ moviesOptions }) {
  return (
    <div className="movies">
      <SearchForm
        onClickFilter={moviesOptions.onClickFilter}
        filterStatus={moviesOptions.filterStatus}
        onSearchSubmit={moviesOptions.onSetBeatMoviesFiltered}
        searchInputValue={moviesOptions.searchInputValue}
        onSetSearchInputValue={moviesOptions.onSetSearchInputValue}
      />

      {moviesOptions.isPreloaderActive ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            isSavedSection={moviesOptions.isSavedSection}
            movies={moviesOptions.beatMoviesFiltered}
            isLoadError={moviesOptions.isLoadError}
            onCreateMovie={moviesOptions.onCreateMovie}
            onRemoveMovie={moviesOptions.onRemoveMovie}
            isPreloaderActive={moviesOptions.isPreloaderActive}
            currentGalleryHeight={moviesOptions.currentGalleryHeight}
            isNotFound={moviesOptions.isNotFound}
            isFirstRun={moviesOptions.isFirstRun}
          />
          {moviesOptions.isMoreButtonVisible && <ShowMoreButton onClickMoreButton={moviesOptions.onClickMoreButton} />}
        </>
      )}
    </div>
  );
}
