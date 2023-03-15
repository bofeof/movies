export default function filterMovieData(movies, searchValue, shortsFilter, isSavedSection) {
  if (searchValue.searchinput === '' && !isSavedSection) {
    return [];
  }
  const updatedMovies = movies.filter(
    (movie) =>
      (movie?.nameRU.toLowerCase().includes(searchValue.searchinput.toLowerCase()) ||
        movie?.nameEN.toLowerCase().includes(searchValue.searchinput.toLowerCase())) &&
      (shortsFilter ? movie?.duration <= 40 : movie?.duration >= 0)
  );
  return updatedMovies;
}
