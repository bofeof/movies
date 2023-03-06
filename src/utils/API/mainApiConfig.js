const REACT_APP_BASE_URL = 'https://localhost:3001';
const configMainAPI = {
  mainMoviesUrl: REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": 'application/json',
  },
  credentials: 'include'
};

export { configMainAPI, REACT_APP_BASE_URL };
