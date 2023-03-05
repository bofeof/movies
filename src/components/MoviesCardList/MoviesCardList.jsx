import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ isSavedSection, movies }) {
  return (
    <section className="movies-preloader" aria-label="Список фильмов">
      <ul className="movies-list">
        {movies.map((card) => (
          <MoviesCard key={card.id} cardKey={card.id} card={card} isSavedSection={isSavedSection} />
        ))}
      </ul>
    </section>
  );
}
