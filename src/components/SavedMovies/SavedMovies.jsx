import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ moviesSavedOptions }) {
  return (
    <div className="saved-movies">
      <SearchForm
        isSavedSection={moviesSavedOptions.isSavedSection}
        onClickFilter={moviesSavedOptions.onClickFilter}
        filterStatus={moviesSavedOptions.filterStatus}
        onSearchSubmit={moviesSavedOptions.onSetFilterSavedMovies}
        searchInputValue={moviesSavedOptions.searchInputValue}
        onSetSearchInputValue={moviesSavedOptions.onSetSearchInputValue}
      />

      {moviesSavedOptions.isPreloaderActive ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList
            isSavedSection={moviesSavedOptions.isSavedSection}
            movies={moviesSavedOptions.savedMoviesFiltered}
            isLoadError={moviesSavedOptions.isLoadError}
            onCreateMovie={moviesSavedOptions.onCreateMovie}
            onRemoveMovie={moviesSavedOptions.onRemoveMovie}
            currentGalleryHeight={moviesSavedOptions.currentGalleryHeight}
            isNotFound={moviesSavedOptions.isNotFound}
            isFirstRun={moviesSavedOptions.isFirstRun}
          />
          {moviesSavedOptions.isMoreButtonVisibleSaved && <ShowMoreButton onClickMoreButton={moviesSavedOptions.onClickMoreButton} />}
        </>
      )}
    </div>
  );
}
