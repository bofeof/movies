import { MOVIE_SHORT_TIME } from "./moviesConstants";

export default function filterMovieData(movies, searchValue, shortsFilter, isSavedSection) {
  const searchText = searchValue.searchinput || '';
  if (searchText === '' && !isSavedSection) {
    return [];
  }

  const updatedMovies = movies.filter(
    (movie) =>
      (movie?.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        movie?.nameEN.toLowerCase().includes(searchText.toLowerCase())) &&
      (shortsFilter ? movie?.duration <= MOVIE_SHORT_TIME : movie?.duration >= 0)
  );
  return updatedMovies;
}
