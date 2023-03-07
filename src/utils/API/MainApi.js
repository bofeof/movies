
import { beatFilmUrl } from '../moviesConstants';

export default class MainApi {
  constructor(configAPI) {
    this._configAPI = configAPI;
  }

  _getToken() {
    this._configAPI.headers.authorization = `Bearer ${localStorage.getItem('moviesToken')}`;
  }

  async _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const userMessage = await res.json().then((errText) => errText.message || '');
    return Promise.reject(new Error(`Ошибка: ${res.status}. ${userMessage}`));
  }

  // movies

  createCard(movieData) {
    this._getToken();

    const newCard = {
      movieId: movieData?.id,
      nameRU: movieData?.nameRU,
      nameEN: movieData?.nameEN,
      director: movieData?.director,
      country: movieData?.country,
      year: movieData?.year,
      duration: movieData?.duration,
      description: movieData?.description,
      trailerLink: movieData?.trailerLink,
      image:
        `${beatFilmUrl}/${movieData?.image?.formats?.thumbnail?.url}` ||
        `${beatFilmUrl}/${movieData?.image?.formats?.small?.url}`,
      thumbnail:
        `${beatFilmUrl}/${movieData?.image?.formats?.small?.url}` ||
        `${beatFilmUrl}/${movieData?.image?.formats?.thumbnail?.url}`,
    };

    return fetch(`${this._configAPI.mainMoviesUrl}/movies`, {
      method: 'POST',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
      body: JSON.stringify(newCard),
    }).then((res) => this._getResponse(res));
  }
}
