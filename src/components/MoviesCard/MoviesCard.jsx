import './MoviesCard.css';
import { BEAT_MAIN_URL } from '../../utils/moviesConstants';

function convertMins(mins) {
  const h = Math.trunc(mins / 60);
  const min = mins % 60;
  return `${h}ч${min}м`;
}

export default function MoviesCard({ card, cardKey, isSavedSection, onCreateMovie, onRemoveMovie }) {
  const thumbnail = isSavedSection
    ? card.image
    : `${BEAT_MAIN_URL}/${card?.image?.formats?.thumbnail?.url || card?.image?.formats?.small?.url}`;

  function handleSaveRemoveMovie(evt) {
    if (evt.target.checked && !isSavedSection) {
      onCreateMovie(card);
    } else {
      onRemoveMovie(card);
    }
  }

  return (
    <li className="movie-card">
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img className="movie-card__cover" src={thumbnail} alt={card?.nameRU} />
      </a>
      <div className="movie-card__info">
        <div className="movie-card__description">
          <h4 className="movie-card__name">{card?.nameRU || card?.nameEN}</h4>

          {isSavedSection ? (
            <label className="movie-card__label" htmlFor={cardKey}>
              <input className="movie-card__checkbox movie-card__checkbox_hidden" type="checkbox" id={cardKey} onChange={handleSaveRemoveMovie}/>
              <span className="movie-card__remove-button" />
            </label>
          ) : (
            <label className="movie-card__label" htmlFor={cardKey}>
              <input
                className="movie-card__checkbox movie-card__checkbox_hidden"
                type="checkbox"
                id={cardKey}
                onChange={handleSaveRemoveMovie}
                defaultChecked={card.isMovieSaved}
              />
              <span className="movie-card__save-button" />
            </label>
          )}
        </div>
        <p className="movie-card__duration">{convertMins(card?.duration || 0)}</p>
      </div>
    </li>
  );
}
