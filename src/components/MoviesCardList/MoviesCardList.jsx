import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({ isSavedSection, beatFilms }) {
  return (
    <section className="movies-preloader" aria-label="Список фильмов">
      <ul className="movies-list">
        {beatFilms.map((card) => (
          <MoviesCard key={card.id} cardKey={card.id} card={card} isSavedSection={isSavedSection} />
        ))}
      </ul>
    </section>
  );
}
