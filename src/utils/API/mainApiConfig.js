const REACT_APP_BASE_URL = 'http://localhost:3005/api';
const configMainAPI = {
  mainMoviesUrl: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    authorization: "",
  }
};

export { configMainAPI, REACT_APP_BASE_URL };
