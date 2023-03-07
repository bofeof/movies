import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import errorMessages from '../../utils/errorMessages';

export default function MoviesCardList({ isSavedSection, movies, isLoadError, onCreateMovie }) {
  return (
    <section className="movies-preloader" aria-label="Список фильмов">
      { (() => {

          if(isLoadError){
            return(<p className='movies-preloader__message'>{errorMessages.loadError}</p>)
          }

          if(movies.length === 0){
            return (<p className='movies-preloader__message'>{errorMessages.notFoundError}</p>)
          }

          return (<ul className="movies-list">
            {movies.map((card) => (
              <MoviesCard key={card.id} cardKey={card.id} card={card} isSavedSection={isSavedSection} onCreateMovie={onCreateMovie} />
            ))}
          </ul>)

        })()
      }


    </section>
  );
}
