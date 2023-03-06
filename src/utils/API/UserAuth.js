export default class UserAuth {
  constructor(configAPI) {
    this._configAPI = configAPI;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
  }

  signup(userData) {
    return fetch(`${this._configAPI.REACT_APP_BASE_URL}/signup`, {
      method: 'POST',
      headers: this._configAPI.headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  signin(userData) {
    return fetch(`${this._configAPI.REACT_APP_BASE_URL}/signin`, {
      method: 'POST',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }

  signout() {
    fetch(`${this._configAPI.REACT_APP_BASE_URL}/signout`, {
      methon: 'GET',
      headers: this._configAPI.headers,
    }).then((res) => this._getResponse(res));
  }
}
