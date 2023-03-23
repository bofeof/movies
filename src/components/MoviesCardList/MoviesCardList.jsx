import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import ERROR_MESSAGES from '../../utils/errorMessages';

export default function MoviesCardList({
  isSavedSection,
  movies,
  isLoadError,
  onCreateMovie,
  onRemoveMovie,
  currentGalleryHeight,
  isNotFound,
  isFirstRun
}) {
  const galleryHeightStyle = {
    maxHeight: currentGalleryHeight,
  };

  return (
    <section className="movies-preloader" aria-label="Список фильмов" style={galleryHeightStyle}>
      {(() => {
        if (isLoadError) {
          return <p className="movies-preloader__message">{ERROR_MESSAGES.loadError}</p>;
        }

        if (isNotFound && !isFirstRun) {
          return <p className="movies-preloader__message">{ERROR_MESSAGES.notFoundError}</p>;
        }

        return (
          <ul className="movies-list">
            {movies.map((card) => (
              <MoviesCard
                key={isSavedSection ? card.movieId : card.id}
                cardKey={isSavedSection ? card.movieId : card.id}
                card={card}
                isSavedSection={isSavedSection}
                onCreateMovie={onCreateMovie}
                onRemoveMovie={onRemoveMovie}
              />
            ))}
          </ul>
        );
      })()}
    </section>
  );
}
