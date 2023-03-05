import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';

// import Preloader from '../Preloader/Preloader';

export default function Movies({ isSavedSection, beatMovies, onClickFilter, filterStatus }) {

  return (
    <div className="movies">
      <SearchForm  onClickFilter={onClickFilter} filterStatus={filterStatus}/>
      <MoviesCardList isSavedSection={isSavedSection} movies={beatMovies} />
      <ShowMoreButton />
    </div>
  );
}
