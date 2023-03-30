export default class UserAuth {
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

  signup(userData) {
    return fetch(`${this._configAPI.mainMoviesUrl}/signup`, {
      method: 'POST',
      headers: this._configAPI.headers,
      body: JSON.stringify(userData),
    }).then((res) => this._getResponse(res));
  }


  signin(userData) {
    return fetch(`${this._configAPI.mainMoviesUrl}/signin`, {
      method: 'POST',
      headers: this._configAPI.headers,
      body: JSON.stringify(userData),
      credentials: this._configAPI.credentials,
    }).then((res) => this._getResponse(res));
  }

  signout(){
    return fetch(`${this._configAPI.mainMoviesUrl}/signout`,{
      method: 'GET',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
    })
  }

  checkUser() {
    return fetch(`${this._configAPI.mainMoviesUrl}/users/me`, {
      method: 'GET',
      headers: this._configAPI.headers,
      credentials: this._configAPI.credentials,
    }).then((res) => this._getResponse(res));
  }
}
