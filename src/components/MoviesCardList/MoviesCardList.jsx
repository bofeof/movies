import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import errorMessages from '../../utils/errorMessages';

export default function MoviesCardList({
  isSavedSection,
  movies,
  isLoadError,
  onCreateMovie,
  onRemoveMovie,
  currentGalleryHeight,
}) {
  const galleryHeightStyle = {
    maxHeight: currentGalleryHeight
    // height: currentGalleryHeight,
  };

  return (
    <section className="movies-preloader" aria-label="Список фильмов" style={galleryHeightStyle}>
      {(() => {
        if (isLoadError) {
          return <p className="movies-preloader__message">{errorMessages.loadError}</p>;
        }

        if (movies.length === 0) {
          return <p className="movies-preloader__message">{errorMessages.notFoundError}</p>;
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
