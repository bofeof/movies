import { beatFilmUrlAPI } from '../moviesConstants';

export default class BeatFilmAPI {
  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
  }

  getbeatFilms() {
    return fetch(`${beatFilmUrlAPI}`, {
      method: 'GET',
    }).then((res) => this._getResponse(res));
  }
}
