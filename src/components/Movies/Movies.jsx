import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
// import Preloader from '../Preloader/Preloader';

export default function Movies({ isSavedSection, beatFilms }) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList isSavedSection={isSavedSection} beatFilms={beatFilms} />
      <ShowMoreButton />
    </div>
  );
}
