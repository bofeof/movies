export default function filterMovieData(movies, searchValue, shortsFilter, isSavedSection) {
  const searchText = searchValue.searchinput || '';
  if (searchText === '' && !isSavedSection) {
    return [];
  }

  const updatedMovies = movies.filter(
    (movie) =>
      (movie?.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie?.nameEN.toLowerCase().includes(searchText.toLowerCase())) &&
      (shortsFilter ? movie?.duration <= 40 : movie?.duration >= 0)
  );
  return updatedMovies;
}
