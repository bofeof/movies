import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
// import Preloader from '../Preloader/Preloader';

export default function SavedMovies({ isSavedSection }) {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList isSavedSection={isSavedSection} />
      <ShowMoreButton />
    </div>
  );
}
