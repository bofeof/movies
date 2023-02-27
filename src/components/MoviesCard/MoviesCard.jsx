import './MoviesCard.css';

export default function MoviesCard({ card, mainUrl, key, isSavedSection }) {
  return (
    <li className="movie-card">
      <img className="movie-card__cover" src={`${mainUrl}/${card.image.formats.thumbnail.url}`} alt={card.nameRU} />
      <div className="movie-card__info">
        <div className="movie-card__description">
          <h4 className="movie-card__name">{card.nameRU}</h4>

          {isSavedSection ? (
            <label className="movie-card__label" htmlFor={key}>
              <input className="movie-card__checkbox_hidden" type="checkbox" id={key} />
              <span className="movie-card__remove-button" />
            </label>
          ) : (
            <label className="movie-card__label" htmlFor={key}>
              <input className="movie-card__checkbox_hidden" type="checkbox" id={key} />
              <span className="movie-card__save-button" />
            </label>
          )}

        </div>
        <p className="movie-card__duration">{card.duration}</p>
      </div>
    </li>
  );
}
