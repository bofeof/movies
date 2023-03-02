import MoviesCard from '../MoviesCard/MoviesCard';
import { mainUrl, movies } from '../../utils/moviesConstants';
import './MoviesCardList.css';

export default function MoviesCardList({ isSavedSection }) {
  return (
    <section className="movies-preloader" aria-label="Список фильмов">
      <ul className="movies-list">
        {movies.map((card) => (
          <MoviesCard key={card.id} cardKey={card.id} card={card} mainUrl={mainUrl} isSavedSection={isSavedSection} />
        ))}
      </ul>
    </section>
  );
}
