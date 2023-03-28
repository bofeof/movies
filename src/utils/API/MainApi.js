import { BEAT_MAIN_URL } from '../moviesConstants';

export default class MainApi {
  constructor(configAPI) {
    this._configAPI = configAPI;
  }

  async _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    const userMessage = await res.json().then((errText) => errText.message || '');
    return Promise.reject(new Error(`Ошибка: ${res.status}. ${userMessage}`));
  }

  // users
  getUserInfo() {
    return fetch(`${this._configAPI.mainMoviesUrl}/users/me`, {
      method: 'GET',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
    }).then((res) => this._getResponse(res));
  }

  updateUserInfo(userData) {
    return fetch(`${this._configAPI.mainMoviesUrl}/users/me`, {
      method: 'PATCH',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  // movies
  getAllMovies() {
    return fetch(`${this._configAPI.mainMoviesUrl}/movies`, {
      method: 'GET',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
    }).then((res) => this._getResponse(res));
  }

  createMovie(movieData) {
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
        `${BEAT_MAIN_URL}/${movieData?.image?.formats?.thumbnail?.url}` ||
        `${BEAT_MAIN_URL}/${movieData?.image?.formats?.small?.url}`,
      thumbnail:
        `${BEAT_MAIN_URL}/${movieData?.image?.formats?.small?.url}` ||
        `${BEAT_MAIN_URL}/${movieData?.image?.formats?.thumbnail?.url}`,
    };
    return fetch(`${this._configAPI.mainMoviesUrl}/movies`, {
      method: 'POST',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
      body: JSON.stringify(newCard),
    }).then((res) => this._getResponse(res));
  }

  removeMovie(movieId) {
    return fetch(`${this._configAPI.mainMoviesUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
    }).then((res) => this._getResponse(res));
  }
}
