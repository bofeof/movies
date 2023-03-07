export default class UserAuth {
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

  signup(userData) {
    this._getToken();
    return fetch(`${this._configAPI.mainMoviesUrl}/signup`, {
      method: 'POST',
      headers: this._configAPI.headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  signin(userData) {
    this._getToken();
    return fetch(`${this._configAPI.mainMoviesUrl}/signin`, {
      method: 'POST',
      headers: this._configAPI.headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  checkToken(token) {
    return fetch(`${this._configAPI.mainMoviesUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }
}
