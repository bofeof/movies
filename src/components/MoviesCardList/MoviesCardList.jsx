import MoviesCard from '../MoviesCard/MoviesCard';
import { mainUrl, movies } from '../../utils/moviesConstants';
import './MoviesCardList.css'

export default function MoviesCardList() {
  return (
    <section className='preloader' aria-label="Список фильмов">
      <ul className="movies-list">
        {movies.map((card) => <MoviesCard key={card.id} card={card} mainUrl={mainUrl} />)}
      </ul>
    </section>
  );
}
