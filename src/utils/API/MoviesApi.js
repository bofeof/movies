import { beatFilmUrlAPI } from '../moviesConstants';

export default class MoviesApi {
  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
  }

  getBeatMovies() {
    return fetch(`${beatFilmUrlAPI}`, {
      method: 'GET',
    }).then((res) => this._getResponse(res));
  }
}
