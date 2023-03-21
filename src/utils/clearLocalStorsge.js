export default function clearLocalStorage() {
  localStorage.removeItem('moviesToken');
  localStorage.removeItem('searchInputValue');
  localStorage.removeItem('searchInputValueSaved');
  localStorage.removeItem('isShorts');
  localStorage.removeItem('isShortsSaved');

  localStorage.removeItem('isNotFoundMovies');
  localStorage.removeItem('isFirstRunMovies');
  localStorage.removeItem('isNotFoundSaved');
  localStorage.removeItem('isFirstRunSaved');
}
