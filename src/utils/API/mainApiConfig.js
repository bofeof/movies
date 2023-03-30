const REACT_APP_BASE_URL = 'https://api.bofeof-movies.nomoredomains.work/api';
const REACT_API_CONFIG = {
  mainMoviesUrl: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    "Access-Control-Allow-Credentials": true
  },
  credentials: 'include',
};

export { REACT_API_CONFIG, REACT_APP_BASE_URL };
