const REACT_APP_BASE_URL = 'http://localhost:3005/api';
const REACT_API_CONFIG = {
  mainMoviesUrl: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    authorization: "",
  }
};

export { REACT_API_CONFIG, REACT_APP_BASE_URL };
