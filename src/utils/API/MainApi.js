export default class MainApi{

  constructor(configAPI) {
    this._configAPI = configAPI;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
  }



  // user

  // movies
}
