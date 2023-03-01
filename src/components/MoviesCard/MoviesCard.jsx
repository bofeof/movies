import './MoviesCard.css';

function convertMins(mins) {
  const h = Math.trunc(mins / 60);
  const min = mins % 60;
  return `${h}ч${min}м`;
}

export default function MoviesCard({ card, mainUrl, cardKey, isSavedSection }) {
  return (
    <li className="movie-card">
      <img className="movie-card__cover" src={`${mainUrl}/${card.image.formats.thumbnail.url}`} alt={card.nameRU} />
      <div className="movie-card__info">
        <div className="movie-card__description">
          <h4 className="movie-card__name">{card.nameRU}</h4>

          {isSavedSection ? (
            <label className="movie-card__label" htmlFor={cardKey}>
              <input className="movie-card__checkbox_hidden" type="checkbox" id={cardKey} />
              <span className="movie-card__remove-button" />
            </label>
          ) : (
            <label className="movie-card__label" htmlFor={cardKey}>
              <input className="movie-card__checkbox_hidden" type="checkbox" id={cardKey} />
              <span className="movie-card__save-button" />
            </label>
          )}
        </div>
        <p className="movie-card__duration">{convertMins(card.duration)}</p>
      </div>
    </li>
  );
}
