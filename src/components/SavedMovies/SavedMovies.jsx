import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
// import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ isSavedSection, savedMovies, onClickFilter, filterStatus }) {
  return (
    <div className="saved-movies">
      <SearchForm onClickFilter={onClickFilter} filterStatus={filterStatus} />
      <MoviesCardList isSavedSection={isSavedSection} movies={savedMovies} />
      <ShowMoreButton />
    </div>
  );
}
